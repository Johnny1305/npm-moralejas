const assert = require('assert');
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

async function main() {
    console.log('======================================');
    console.log('🧪 TEST DE MORALEJAS');
    console.log('======================================\n');

    /*
     * =====================================
     * COMPROBACIÓN DEL MÓDULO
     * =====================================
     */

    test('El módulo se carga correctamente', () => {
        assert.ok(moralejas);
        assert.strictEqual(typeof moralejas, 'object');
    });

    /*
     * =====================================
     * random()
     * =====================================
     */

    test('random() devuelve una moraleja', () => {
        const result = moralejas.random();

        assert.ok(result);
        assert.strictEqual(typeof result, 'object');

        assert.strictEqual(
            typeof result.id,
            'number'
        );

        assert.strictEqual(
            typeof result.text,
            'string'
        );

        assert.strictEqual(
            typeof result.language,
            'string'
        );

        assert.strictEqual(
            typeof result.category,
            'string'
        );

        assert.ok(
            Array.isArray(result.tags)
        );
    });

    test('random() devuelve una moraleja diferente eventualmente', () => {
        const results = new Set();

        for (let i = 0; i < 20; i++) {
            results.add(
                moralejas.random({
                    avoidRepeat: false
                }).id
            );
        }

        assert.ok(
            results.size > 1,
            'random() parece estar devolviendo siempre la misma moraleja'
        );
    });

    /*
     * =====================================
     * random() + FILTROS
     * =====================================
     */

    test('random() permite filtrar por categoría', () => {
        const result = moralejas.random({
            category: 'humor'
        });

        assert.strictEqual(
            result.category,
            'humor'
        );
    });

    test('random() permite filtrar por idioma', () => {
        const result = moralejas.random({
            language: 'es'
        });

        assert.strictEqual(
            result.language,
            'es'
        );
    });

    test('random() permite filtrar por tags', () => {
        const result = moralejas.random({
            tags: ['cafe']
        });

        assert.ok(
            result.tags.includes('cafe')
        );
    });

    /*
     * =====================================
     * randomMany()
     * =====================================
     */

    test('randomMany() devuelve varias moralejas', () => {
        const results = moralejas.randomMany(5);

        assert.ok(
            Array.isArray(results)
        );

        assert.strictEqual(
            results.length,
            5
        );
    });

    test('randomMany() no devuelve duplicados', () => {
        const results = moralejas.randomMany(10);

        const ids = results.map(
            item => item.id
        );

        const uniqueIds = new Set(ids);

        assert.strictEqual(
            uniqueIds.size,
            ids.length
        );
    });

    test('randomMany() respeta los filtros', () => {
        const results = moralejas.randomMany(5, {
            category: 'humor'
        });

        assert.ok(
            results.length > 0
        );

        results.forEach(item => {
            assert.strictEqual(
                item.category,
                'humor'
            );
        });
    });

    test('randomMany() rechaza una cantidad inválida', () => {
        assert.throws(
            () => moralejas.randomMany(0),
            TypeError
        );
    });

    test('randomMany() rechaza números negativos', () => {
        assert.throws(
            () => moralejas.randomMany(-5),
            TypeError
        );
    });

    /*
     * =====================================
     * get()
     * =====================================
     */

    test('get() devuelve una moraleja existente', () => {
        const result = moralejas.get(1);

        assert.ok(result);

        assert.strictEqual(
            result.id,
            1
        );

        assert.strictEqual(
            typeof result.text,
            'string'
        );
    });

    test('get() devuelve undefined para un ID inexistente', () => {
        const result = moralejas.get(999999);

        assert.strictEqual(
            result,
            undefined
        );
    });

    test('get() rechaza IDs que no son números enteros', () => {
        const result = moralejas.get('hola');

        assert.strictEqual(
            result,
            undefined
        );
    });

    /*
     * =====================================
     * search()
     * =====================================
     */

    test('search() devuelve resultados', () => {
        const results = moralejas.search('cafe');

        assert.ok(
            Array.isArray(results)
        );

        assert.ok(
            results.length > 0,
            'No se encontraron resultados para "cafe"'
        );
    });

    test('search() encuentra palabras sin importar mayúsculas', () => {
        const results = moralejas.search('CAFE');

        assert.ok(
            results.length > 0
        );
    });

    test('search() encuentra palabras con/sin acentos', () => {
        const results = moralejas.search('tecnologia');

        assert.ok(
            results.length > 0
        );
    });

    test('search() permite limitar resultados', () => {
        const results = moralejas.search('vida', {
            limit: 3
        });

        assert.ok(
            results.length <= 3
        );
    });

    test('search() permite combinar filtros', () => {
        const results = moralejas.search(
            'comida',
            {
                category: 'humor'
            }
        );

        results.forEach(item => {
            assert.strictEqual(
                item.category,
                'humor'
            );
        });
    });

    test('search() devuelve array vacío para una búsqueda vacía', () => {
        const results = moralejas.search('');

        assert.deepStrictEqual(
            results,
            []
        );
    });

    test('search() devuelve array vacío si no encuentra nada', () => {
        const results = moralejas.search(
            'xyz-palabra-que-no-existe'
        );

        assert.deepStrictEqual(
            results,
            []
        );
    });

    /*
     * =====================================
     * categories()
     * =====================================
     */

    test('categories() devuelve las categorías', () => {
        const categories =
            moralejas.categories();

        assert.ok(
            Array.isArray(categories)
        );

        assert.ok(
            categories.length > 0
        );

        categories.forEach(category => {
            assert.strictEqual(
                typeof category,
                'string'
            );
        });
    });

    test('categories() no devuelve categorías duplicadas', () => {
        const categories =
            moralejas.categories();

        const unique =
            new Set(categories);

        assert.strictEqual(
            unique.size,
            categories.length
        );
    });

    /*
     * =====================================
     * tags()
     * =====================================
     */

    test('tags() devuelve los tags', () => {
        const tags =
            moralejas.tags();

        assert.ok(
            Array.isArray(tags)
        );

        assert.ok(
            tags.length > 0
        );

        tags.forEach(tag => {
            assert.strictEqual(
                typeof tag,
                'string'
            );
        });
    });

    test('tags() no devuelve tags duplicados', () => {
        const tags =
            moralejas.tags();

        const unique =
            new Set(tags);

        assert.strictEqual(
            unique.size,
            tags.length
        );
    });

    /*
     * =====================================
     * toHTML()
     * =====================================
     */

    test('toHTML() genera HTML', () => {
        const item =
            moralejas.random();

        const html =
            moralejas.toHTML(item);

        assert.strictEqual(
            typeof html,
            'string'
        );

        assert.ok(
            html.includes('<div')
        );

        assert.ok(
            html.includes('<p')
        );

        assert.ok(
            html.includes('</div>')
        );

        assert.ok(
            html.includes('</p>')
        );
    });

    test('toHTML() acepta texto directamente', () => {
        const html =
            moralejas.toHTML(
                'Esta es una moraleja de prueba.'
            );

        assert.strictEqual(
            typeof html,
            'string'
        );

        assert.ok(
            html.includes(
                'Esta es una moraleja de prueba.'
            )
        );
    });

    test('toHTML() permite personalizar estilos', () => {
        const html =
            moralejas.toHTML(
                'Moraleja de prueba',
                {
                    styles: {
                        color: 'red',
                        fontSize: '30px'
                    }
                }
            );

        assert.ok(
            html.includes('color: red')
        );

        assert.ok(
            html.includes('font-size: 30px')
        );
    });

    test('toHTML() escapa HTML', () => {
        const html =
            moralejas.toHTML(
                '<script>alert("test")</script>'
            );

        assert.ok(
            !html.includes(
                '<script>alert("test")</script>'
            )
        );

        assert.ok(
            html.includes('&lt;script&gt;')
        );
    });

    /*
     * =====================================
     * translate()
     * =====================================
     *
     * Estas pruebas necesitan Internet.
     */

    await testAsync(
        'translate() traduce un texto',
        async () => {
            const result =
                await moralejas.translate(
                    'Hola mundo',
                    'en'
                );

            assert.strictEqual(
                typeof result,
                'string'
            );

            assert.ok(
                result.length > 0
            );
        }
    );

    /*
     * =====================================
     * translateMoraleja()
     * =====================================
     */

    await testAsync(
        'translateMoraleja() traduce una moraleja',
        async () => {
            const original =
                moralejas.get(1);

            const result =
                await moralejas.translateMoraleja(
                    original,
                    'en'
                );

            assert.ok(result);

            assert.strictEqual(
                result.id,
                original.id
            );

            assert.strictEqual(
                result.language,
                'en'
            );

            assert.strictEqual(
                typeof result.text,
                'string'
            );

            assert.ok(
                result.text.length > 0
            );
        }
    );

    await testAsync(
        'translateMoraleja() acepta un ID',
        async () => {
            const result =
                await moralejas.translateMoraleja(
                    1,
                    'en'
                );

            assert.ok(result);

            assert.strictEqual(
                result.id,
                1
            );

            assert.strictEqual(
                result.language,
                'en'
            );
        }
    );

    /*
     * =====================================
     * randomTranslated()
     * =====================================
     */

    await testAsync(
        'randomTranslated() devuelve una moraleja traducida',
        async () => {
            const result =
                await moralejas.randomTranslated(
                    'en'
                );

            assert.ok(result);

            assert.strictEqual(
                typeof result.id,
                'number'
            );

            assert.strictEqual(
                typeof result.text,
                'string'
            );

            assert.strictEqual(
                result.language,
                'en'
            );
        }
    );

    await testAsync(
        'randomTranslated() permite filtros',
        async () => {
            const result =
                await moralejas.randomTranslated(
                    'en',
                    {
                        category: 'humor'
                    }
                );

            assert.strictEqual(
                result.category,
                'humor'
            );

            assert.strictEqual(
                result.language,
                'en'
            );
        }
    );

    /*
     * =====================================
     * translateHTML()
     * =====================================
     */

    await testAsync(
        'translateHTML() traduce y genera HTML',
        async () => {
            const item =
                moralejas.get(1);

            const html =
                await moralejas.translateHTML(
                    item,
                    'en'
                );

            assert.strictEqual(
                typeof html,
                'string'
            );

            assert.ok(
                html.includes('<div')
            );

            assert.ok(
                html.includes('<p')
            );
        }
    );

    await testAsync(
        'translateHTML() acepta un ID',
        async () => {
            const html =
                await moralejas.translateHTML(
                    1,
                    'en'
                );

            assert.strictEqual(
                typeof html,
                'string'
            );

            assert.ok(
                html.includes('<div')
            );
        }
    );

    /*
     * =====================================
     * API ORIGINAL
     * =====================================
     *
     * Comprobamos que las funciones
     * antiguas siguen funcionando.
     */

    test('TXT() funciona', () => {
        const result =
            moralejas.TXT();

        assert.strictEqual(
            typeof result,
            'string'
        );

        assert.ok(
            result.length > 0
        );
    });

    test('HTML() funciona', () => {
        const result =
            moralejas.HTML();

        assert.strictEqual(
            typeof result,
            'string'
        );

        assert.ok(
            result.includes('<div')
        );
    });

    await testAsync(
        'TranslateTXT() funciona',
        async () => {
            const result =
                await moralejas.TranslateTXT(
                    'en'
                );

            assert.strictEqual(
                typeof result,
                'string'
            );

            assert.ok(
                result.length > 0
            );
        }
    );

    await testAsync(
        'TranslateHTML() funciona',
        async () => {
            const result =
                await moralejas.TranslateHTML(
                    'en'
                );

            assert.strictEqual(
                typeof result,
                'string'
            );

            assert.ok(
                result.includes('<div')
            );
        }
    );

    /*
     * =====================================
     * DATASET
     * =====================================
     */

    test('El dataset moralejas está disponible', () => {
        assert.ok(
            Array.isArray(
                moralejas.moralejas
            )
        );

        assert.ok(
            moralejas.moralejas.length > 0
        );
    });

    test('Todas las moralejas tienen ID', () => {
        moralejas.moralejas.forEach(item => {
            assert.strictEqual(
                typeof item.id,
                'number'
            );
        });
    });

    test('Todas las moralejas tienen texto', () => {
        moralejas.moralejas.forEach(item => {
            assert.strictEqual(
                typeof item.text,
                'string'
            );

            assert.ok(
                item.text.trim().length > 0
            );
        });
    });

    test('Todos los IDs son únicos', () => {
        const ids =
            moralejas.moralejas.map(
                item => item.id
            );

        const uniqueIds =
            new Set(ids);

        assert.strictEqual(
            ids.length,
            uniqueIds.size
        );
    });

    test('Todas las moralejas tienen categoría', () => {
        moralejas.moralejas.forEach(item => {
            assert.strictEqual(
                typeof item.category,
                'string'
            );

            assert.ok(
                item.category.length > 0
            );
        });
    });

    test('Todas las moralejas tienen tags', () => {
        moralejas.moralejas.forEach(item => {
            assert.ok(
                Array.isArray(item.tags)
            );

            assert.ok(
                item.tags.length > 0
            );
        });
    });

    /*
     * =====================================
     * RESULTADO FINAL
     * =====================================
     */

    console.log('\n======================================');
    console.log('📊 RESULTADO');
    console.log('======================================');

    console.log(`✅ Tests correctos: ${passed}`);
    console.log(`❌ Tests fallidos:  ${failed}`);

    console.log('======================================');

    if (failed > 0) {
        console.error(
            '\n❌ Hay tests que han fallado.'
        );

        process.exitCode = 1;
    } else {
        console.log(
            '\n🎉 ¡Todos los tests han pasado!'
        );
    }
}

main().catch(error => {
    console.error(
        '\n💥 Error inesperado durante los tests:'
    );

    console.error(error);

    process.exitCode = 1;
});