import moralejas = require('../index');
import defaultApi from '../index';

const item: moralejas.Moraleja | undefined = moralejas.random({
    category: 'humor',
    language: 'es',
    tags: ['cafe'],
    avoidRepeat: true,
    historySize: 5,
    history: [1, 2, 3]
});

if (item) {
    const text: string = item.text;
    const tags: string[] = item.tags;
    console.log(text, tags);
}

const many: moralejas.Moraleja[] = moralejas.randomMany(3, {
    category: 'humor'
});

console.log(many.length, moralejas.get(1)?.text);

const results: moralejas.Moraleja[] = moralejas.search('vida limones', {
    limit: 5,
    category: 'humor'
});

console.log(results, moralejas.categories(), moralejas.tags());

const html: string = moralejas.toHTML('texto', { styles: { color: 'red' } });
const compatHtml: string | undefined = defaultApi.HTML({ category: 'humor' });
const compatText: string | undefined = defaultApi.TXT();

console.log(html, compatHtml, compatText);

async function translations(): Promise<void> {
    const translated: string = await moralejas.translate('hola', 'en');
    const translatedItem: moralejas.Moraleja =
        await moralejas.translateMoraleja(item ?? 1, 'en');
    const randomTranslated: moralejas.Moraleja =
        await moralejas.randomTranslated('en', { category: 'humor' });
    const translatedHtml: string = await moralejas.translateHTML(1, 'en', {
        styles: { fontSize: '12px' }
    });

    console.log(translated, translatedItem, randomTranslated, translatedHtml);
}

void translations();
