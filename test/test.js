const assert = require('assert');

const IS_INTEGRATION =
    process.argv.includes('--integration') ||
    process.env.MORALEJAS_INTEGRATION === '1';

// Los tests unitarios simulan el cliente de traducción: no necesitan Internet.
if (!IS_INTEGRATION) {
    const translatorPath = require.resolve('google-translate-api-x');

    require.cache[translatorPath] = {
        id: translatorPath,
        filename: translatorPath,
        loaded: true,
        children: [],
        paths: [],
        exports: async (text, { to }) => ({ text: `[${to}] ${text}` })
    };
}

const moralejas = require('../');

let passed = 0;
let failed = 0;

function test(name, callback) {
    try {
        callback();
        console.log(`✅ ${name}`);
        passed++;
    } catch (error) {
        console.error(`❌ ${name}`);
        console.error(`   ${error.message}`);
        failed++;
    }
}

async function testAsync(name, callback) {
    try {
        await callback();
        console.log(`✅ ${name}`);
        passed++;
    } catch (error) {
        console.error(`❌ ${name}`);
        console.error(`   ${error.message}`);
        failed++;
    }
}

function section(title) {
    console.log(`\n--- ${title} ---`);
}

async function main() {
    console.log('======================================');
    console.log('🧪 TEST DE MORALEJAS');
    console.log('======================================');

    section('MÓDULO');

    test('El módulo se carga correctamente', () => {
        assert.ok(moralejas);
        assert.strictEqual(typeof moralejas, 'object');
    });

    section('random()');

    test('random() devuelve una moraleja', () => {
        const result = moralejas.random();

        assert.ok(result);
        assert.strictEqual(typeof result.id, 'number');
        assert.strictEqual(typeof result.text, 'string');
        assert.strictEqual(typeof result.language, 'string');
        assert.strictEqual(typeof result.category, 'string');
        assert.ok(Array.isArray(result.tags));
    });

    test('random() devuelve una moraleja diferente eventualmente', () => {
        const results = new Set();

        for (let i = 0; i < 20; i++) {
            results.add(moralejas.random({ avoidRepeat: false }).id);
        }

        assert.ok(
            results.size > 1,
            'random() parece estar devolviendo siempre la misma moraleja'
        );
    });

    test('random() permite filtrar por categoría', () => {
        const result = moralejas.random({ category: 'humor' });

        assert.strictEqual(result.category, 'humor');
    });

    test('random() permite filtrar por idioma', () => {
        const result = moralejas.random({ language: 'es' });

        assert.strictEqual(result.language, 'es');
    });

    test('random() permite filtrar por tags', () => {
        const result = moralejas.random({ tags: ['cafe'] });

        assert.ok(result.tags.includes('cafe'));
    });

    test('random() devuelve undefined si no hay coincidencias', () => {
        assert.strictEqual(
            moralejas.random({ category: 'categoria-inexistente' }),
            undefined
        );
    });

    test('random() respeta un historial explícito', () => {
        const pool = moralejas.moralejas.filter(
            (item) => item.category === 'humor'
        );
        const expected = pool[0];
        const history = pool.slice(1).map((item) => item.id);

        const result = moralejas.random({
            category: 'humor',
            history
        });

        assert.strictEqual(result.id, expected.id);
    });

    section('randomMany()');

    test('randomMany() devuelve varias moralejas', () => {
        const results = moralejas.randomMany(5);

        assert.ok(Array.isArray(results));
        assert.strictEqual(results.length, 5);
    });

    test('randomMany() no devuelve duplicados', () => {
        const results = moralejas.randomMany(10);
        const ids = results.map((item) => item.id);

        assert.strictEqual(new Set(ids).size, ids.length);
    });

    test('randomMany() respeta los filtros', () => {
        const results = moralejas.randomMany(5, { category: 'humor' });

        assert.ok(results.length > 0);

        results.forEach((item) => {
            assert.strictEqual(item.category, 'humor');
        });
    });

    test('randomMany() rechaza una cantidad inválida', () => {
        assert.throws(() => moralejas.randomMany(0), TypeError);
    });

    test('randomMany() rechaza números negativos', () => {
        assert.throws(() => moralejas.randomMany(-5), TypeError);
    });

    test('randomMany() devuelve array vacío si no hay coincidencias', () => {
        const results = moralejas.randomMany(3, {
            category: 'categoria-inexistente'
        });

        assert.deepStrictEqual(results, []);
    });

    test('randomMany() respeta un historial explícito', () => {
        const pool = moralejas.moralejas.filter(
            (item) => item.category === 'humor'
        );
        const expected = pool.slice(0, 3).map((item) => item.id);
        const history = pool.slice(3).map((item) => item.id);

        const results = moralejas.randomMany(3, {
            category: 'humor',
            history
        });

        assert.deepStrictEqual(
            results.map((item) => item.id).sort(),
            expected.sort()
        );
    });

    section('get()');

    test('get() devuelve una moraleja existente', () => {
        const result = moralejas.get(1);

        assert.ok(result);
        assert.strictEqual(result.id, 1);
        assert.strictEqual(typeof result.text, 'string');
    });

    test('get() devuelve undefined para un ID inexistente', () => {
        assert.strictEqual(moralejas.get(999999), undefined);
    });

    test('get() rechaza IDs que no son números enteros', () => {
        assert.strictEqual(moralejas.get('hola'), undefined);
    });

    section('search()');

    test('search() devuelve resultados', () => {
        const results = moralejas.search('cafe');

        assert.ok(Array.isArray(results));
        assert.ok(
            results.length > 0,
            'No se encontraron resultados para "cafe"'
        );
    });

    test('search() encuentra palabras sin importar mayúsculas', () => {
        assert.ok(moralejas.search('CAFE').length > 0);
    });

    test('search() encuentra palabras con/sin acentos', () => {
        assert.ok(moralejas.search('tecnologia').length > 0);
    });

    test('search() permite limitar resultados', () => {
        assert.ok(moralejas.search('vida', { limit: 3 }).length <= 3);
    });

    test('search() permite combinar filtros', () => {
        const results = moralejas.search('comida', { category: 'humor' });

        results.forEach((item) => {
            assert.strictEqual(item.category, 'humor');
        });
    });

    test('search() encuentra varias palabras en cualquier orden', () => {
        const direct = moralejas.search('limones vida');
        const reversed = moralejas.search('vida limones');

        assert.strictEqual(direct.length, 1);
        assert.strictEqual(direct[0].id, 2);
        assert.strictEqual(reversed.length, 1);
        assert.strictEqual(reversed[0].id, 2);
    });

    test('search() combina palabras de texto y etiquetas', () => {
        const results = moralejas.search('cafe humor');

        assert.strictEqual(results.length, 1);
        assert.strictEqual(results[0].id, 62);
    });

    test('search() devuelve array vacío para una búsqueda vacía', () => {
        assert.deepStrictEqual(moralejas.search(''), []);
    });

    test('search() devuelve array vacío si no encuentra nada', () => {
        assert.deepStrictEqual(
            moralejas.search('xyz-palabra-que-no-existe'),
            []
        );
    });

    section('categories() y tags()');

    test('categories() devuelve las categorías', () => {
        const categories = moralejas.categories();

        assert.ok(Array.isArray(categories));
        assert.ok(categories.length > 0);

        categories.forEach((category) => {
            assert.strictEqual(typeof category, 'string');
        });
    });

    test('categories() no devuelve categorías duplicadas', () => {
        const categories = moralejas.categories();

        assert.strictEqual(new Set(categories).size, categories.length);
    });

    test('tags() devuelve los tags', () => {
        const tags = moralejas.tags();

        assert.ok(Array.isArray(tags));
        assert.ok(tags.length > 0);

        tags.forEach((tag) => {
            assert.strictEqual(typeof tag, 'string');
        });
    });

    test('tags() no devuelve tags duplicados', () => {
        const tags = moralejas.tags();

        assert.strictEqual(new Set(tags).size, tags.length);
    });

    section('toHTML()');

    test('toHTML() genera HTML', () => {
        const html = moralejas.toHTML(moralejas.random());

        assert.strictEqual(typeof html, 'string');
        assert.ok(html.includes('<div'));
        assert.ok(html.includes('<p'));
        assert.ok(html.includes('</div>'));
        assert.ok(html.includes('</p>'));
    });

    test('toHTML() acepta texto directamente', () => {
        const html = moralejas.toHTML('Esta es una moraleja de prueba.');

        assert.strictEqual(typeof html, 'string');
        assert.ok(html.includes('Esta es una moraleja de prueba.'));
    });

    test('toHTML() permite personalizar estilos', () => {
        const html = moralejas.toHTML('Moraleja de prueba', {
            styles: { color: 'red', fontSize: '30px' }
        });

        assert.ok(html.includes('color: red'));
        assert.ok(html.includes('font-size: 30px'));
    });

    test('toHTML() escapa HTML', () => {
        const html = moralejas.toHTML('<script>alert("test")</script>');

        assert.ok(!html.includes('<script>alert("test")</script>'));
        assert.ok(html.includes('&lt;script&gt;'));
    });

    test('toHTML() rechaza una moraleja inválida', () => {
        assert.throws(() => moralejas.toHTML({}), TypeError);
    });

    section('Traducciones');

    console.log(
        IS_INTEGRATION
            ? '🌐 Modo integración: se usará el traductor real.'
            : '🧪 Modo unitario: cliente de traducción simulado.'
    );

    await testAsync('translate() traduce un texto', async () => {
        const result = await moralejas.translate('Hola mundo', 'en');

        assert.strictEqual(typeof result, 'string');
        assert.ok(result.length > 0);
    });

    await testAsync('translate() valida el texto', async () => {
        await assert.rejects(() => moralejas.translate('   '), TypeError);
    });

    await testAsync('translateMoraleja() traduce una moraleja', async () => {
        const original = moralejas.get(1);
        const result = await moralejas.translateMoraleja(original, 'en');

        assert.ok(result);
        assert.strictEqual(result.id, original.id);
        assert.strictEqual(result.language, 'en');
        assert.strictEqual(typeof result.text, 'string');
        assert.ok(result.text.length > 0);
    });

    await testAsync('translateMoraleja() acepta un ID', async () => {
        const result = await moralejas.translateMoraleja(1, 'en');

        assert.ok(result);
        assert.strictEqual(result.id, 1);
        assert.strictEqual(result.language, 'en');
    });

    await testAsync(
        'translateMoraleja() rechaza una moraleja inválida',
        async () => {
            await assert.rejects(
                () => moralejas.translateMoraleja(undefined, 'en'),
                TypeError
            );
        }
    );

    await testAsync(
        'randomTranslated() devuelve una moraleja traducida',
        async () => {
            const result = await moralejas.randomTranslated('en');

            assert.ok(result);
            assert.strictEqual(typeof result.id, 'number');
            assert.strictEqual(typeof result.text, 'string');
            assert.strictEqual(result.language, 'en');
        }
    );

    await testAsync('randomTranslated() permite filtros', async () => {
        const result = await moralejas.randomTranslated('en', {
            category: 'humor'
        });

        assert.strictEqual(result.category, 'humor');
        assert.strictEqual(result.language, 'en');
    });

    await testAsync('translateHTML() traduce y genera HTML', async () => {
        const html = await moralejas.translateHTML(moralejas.get(1), 'en');

        assert.strictEqual(typeof html, 'string');
        assert.ok(html.includes('<div'));
        assert.ok(html.includes('<p'));
    });

    await testAsync('translateHTML() acepta un ID', async () => {
        const html = await moralejas.translateHTML(1, 'en');

        assert.strictEqual(typeof html, 'string');
        assert.ok(html.includes('<div'));
    });

    section('API original');

    test('TXT() funciona', () => {
        const result = moralejas.TXT();

        assert.strictEqual(typeof result, 'string');
        assert.ok(result.length > 0);
    });

    test('HTML() funciona', () => {
        const result = moralejas.HTML();

        assert.strictEqual(typeof result, 'string');
        assert.ok(result.includes('<div'));
    });

    await testAsync('TranslateTXT() funciona', async () => {
        const result = await moralejas.TranslateTXT('en');

        assert.strictEqual(typeof result, 'string');
        assert.ok(result.length > 0);
    });

    await testAsync('TranslateHTML() funciona', async () => {
        const result = await moralejas.TranslateHTML('en');

        assert.strictEqual(typeof result, 'string');
        assert.ok(result.includes('<div'));
    });

    section('Dataset');

    test('El dataset moralejas está disponible', () => {
        assert.ok(Array.isArray(moralejas.moralejas));
        assert.ok(moralejas.moralejas.length > 0);
    });

    test('Todas las moralejas tienen ID', () => {
        moralejas.moralejas.forEach((item) => {
            assert.strictEqual(typeof item.id, 'number');
        });
    });

    test('Todas las moralejas tienen texto', () => {
        moralejas.moralejas.forEach((item) => {
            assert.strictEqual(typeof item.text, 'string');
            assert.ok(item.text.trim().length > 0);
        });
    });

    test('Todos los IDs son únicos', () => {
        const ids = moralejas.moralejas.map((item) => item.id);

        assert.strictEqual(new Set(ids).size, ids.length);
    });

    test('Todas las moralejas tienen categoría', () => {
        moralejas.moralejas.forEach((item) => {
            assert.strictEqual(typeof item.category, 'string');
            assert.ok(item.category.length > 0);
        });
    });

    test('Todas las moralejas tienen tags', () => {
        moralejas.moralejas.forEach((item) => {
            assert.ok(Array.isArray(item.tags));
            assert.ok(item.tags.length > 0);
        });
    });

    console.log('\n======================================');
    console.log('📊 RESULTADO');
    console.log('======================================');

    console.log(`✅ Tests correctos: ${passed}`);
    console.log(`❌ Tests fallidos:  ${failed}`);

    console.log('======================================');

    if (failed > 0) {
        console.error('\n❌ Hay tests que han fallado.');
        process.exitCode = 1;
    } else {
        console.log('\n🎉 ¡Todos los tests han pasado!');
    }
}

main().catch((error) => {
    console.error('\n💥 Error inesperado durante los tests:');
    console.error(error);
    process.exitCode = 1;
});
