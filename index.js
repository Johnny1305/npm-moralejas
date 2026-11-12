const { moralejas } = require('./src/moralejas.json');

const DEFAULT_HTML_STYLES = {
    fontFamily: "'Arial', sans-serif",
    border: '2px solid #3498db',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#ecf0f1',
    margin: '20px',
    maxWidth: '600px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontSize: '18px',
    color: '#2c3e50'
};

const DEFAULT_HISTORY_SIZE = 10;
const DEFAULT_SEARCH_LIMIT = 20;

// Historial por combinación de filtros. Un servidor con varias peticiones
// concurrentes debería pasar `options.history` para no compartir estado.
const histories = new Map();

let translator = null;

function randomIndex(length) {
    return Math.floor(Math.random() * length);
}

function shuffle(items) {
    const copy = [...items];

    for (let i = copy.length - 1; i > 0; i--) {
        const j = randomIndex(i + 1);

        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
}

function normalize(value) {
    return String(value ?? '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
}

function tokenize(value) {
    return normalize(value)
        .split(/[^a-z0-9]+/)
        .filter(Boolean);
}

function getById(id) {
    const numericId = Number(id);

    if (!Number.isInteger(numericId)) {
        return undefined;
    }

    return moralejas.find((item) => item.id === numericId);
}

function matches(item, options = {}) {
    if (
        options.category &&
        normalize(item.category) !== normalize(options.category)
    ) {
        return false;
    }

    if (
        options.language &&
        normalize(item.language) !== normalize(options.language)
    ) {
        return false;
    }

    if (Array.isArray(options.tags) && options.tags.length > 0) {
        const itemTags = item.tags.map(normalize);

        if (!options.tags.every((tag) => itemTags.includes(normalize(tag)))) {
            return false;
        }
    }

    return true;
}

function getPool(options = {}) {
    return moralejas.filter((item) => matches(item, options));
}

function clone(item) {
    if (!item) {
        return undefined;
    }

    return {
        ...item,
        tags: [...item.tags]
    };
}

function historyKey(options) {
    return JSON.stringify([
        normalize(options.category),
        normalize(options.language),
        Array.isArray(options.tags) ? options.tags.map(normalize).sort() : []
    ]);
}

function readHistory(options, poolSize) {
    const requestedSize = Math.floor(Number(options.historySize));
    const maxSize = Math.max(poolSize - 1, 1);

    const size =
        Number.isFinite(requestedSize) && requestedSize >= 1
            ? Math.min(requestedSize, maxSize)
            : Math.min(DEFAULT_HISTORY_SIZE, maxSize);

    const explicit = Array.isArray(options.history)
        ? options.history.map(Number).filter(Number.isInteger)
        : null;

    const key = historyKey(options);

    return {
        key,
        size,
        ids: explicit ?? histories.get(key) ?? [],
        explicit: explicit !== null
    };
}

function rememberHistory(history, ids) {
    if (history.explicit) {
        return;
    }

    histories.set(history.key, [...new Set(ids)].slice(0, history.size));
}

/**
 * Devuelve una moraleja aleatoria.
 *
 * Opciones: category, language, tags, avoidRepeat, historySize y history.
 * Si se indica `history` (array de IDs), el llamador gestiona las repeticiones.
 */
function random(options = {}) {
    const pool = getPool(options);

    if (pool.length === 0) {
        return undefined;
    }

    if (!(options.avoidRepeat ?? true)) {
        return clone(pool[randomIndex(pool.length)]);
    }

    const history = readHistory(options, pool.length);
    const seen = new Set(history.ids);
    const unseen = pool.filter((item) => !seen.has(item.id));
    const available = unseen.length > 0 ? unseen : pool;
    const selected = available[randomIndex(available.length)];

    rememberHistory(history, [selected.id, ...history.ids]);

    return clone(selected);
}

/**
 * Devuelve varias moralejas aleatorias sin repetir dentro del lote.
 */
function randomMany(count = 1, options = {}) {
    const requested = Number(count);

    if (!Number.isInteger(requested) || requested < 1) {
        throw new TypeError('count debe ser un entero mayor que 0.');
    }

    const pool = getPool(options);

    if (pool.length === 0) {
        return [];
    }

    const amount = Math.min(requested, pool.length);
    const shuffled = shuffle(pool);

    if (!(options.avoidRepeat ?? true)) {
        return shuffled.slice(0, amount).map(clone);
    }

    const history = readHistory(options, pool.length);
    const seen = new Set(history.ids);
    const ordered = [
        ...shuffled.filter((item) => !seen.has(item.id)),
        ...shuffled.filter((item) => seen.has(item.id))
    ].slice(0, amount);

    rememberHistory(
        history,
        ordered.map((item) => item.id).concat(history.ids)
    );

    return ordered.map(clone);
}

function get(id) {
    return clone(getById(id));
}

/**
 * Busca por una o varias palabras en texto, categoría y etiquetas.
 * Cada palabra debe aparecer en algún campo; se puntúan las coincidencias.
 */
function search(query, options = {}) {
    const terms = tokenize(query);

    if (terms.length === 0) {
        return [];
    }

    const requestedLimit = Number(options.limit);
    const limit = Number.isInteger(requestedLimit)
        ? Math.max(requestedLimit, 1)
        : DEFAULT_SEARCH_LIMIT;

    return moralejas
        .filter((item) => matches(item, options))
        .map((item) => {
            const text = normalize(item.text);
            const words = new Set(tokenize(item.text));
            const meta = normalize([item.category, ...item.tags].join(' '));

            let score = 0;

            for (const term of terms) {
                if (words.has(term)) {
                    score += 3;
                } else if (text.includes(term)) {
                    score += 2;
                } else if (meta.includes(term)) {
                    score += 1;
                } else {
                    return { item, score: 0 };
                }
            }

            return { item, score };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(({ item }) => clone(item));
}

function categories() {
    return [...new Set(moralejas.map((item) => item.category))].sort();
}

function tags() {
    return [...new Set(moralejas.flatMap((item) => item.tags))].sort();
}

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Convierte una moraleja (o un texto) en un bloque HTML.
 * Los valores de `options.styles` se insertan tal cual: no deben venir de usuarios.
 */
function toHTML(moraleja, options = {}) {
    const item = typeof moraleja === 'string' ? { text: moraleja } : moraleja;

    if (!item || typeof item.text !== 'string') {
        throw new TypeError(
            'toHTML necesita una moraleja o un objeto con una propiedad text.'
        );
    }

    const styles = {
        ...DEFAULT_HTML_STYLES,
        ...(options.styles || {})
    };

    return `
<div style="
    font-family: ${escapeHTML(styles.fontFamily)};
    border: ${escapeHTML(styles.border)};
    padding: ${escapeHTML(styles.padding)};
    border-radius: ${escapeHTML(styles.borderRadius)};
    background-color: ${escapeHTML(styles.backgroundColor)};
    margin: ${escapeHTML(styles.margin)};
    max-width: ${escapeHTML(styles.maxWidth)};
    box-shadow: ${escapeHTML(styles.boxShadow)};
">
    <p style="
        font-size: ${escapeHTML(styles.fontSize)};
        color: ${escapeHTML(styles.color)};
        margin: 0;
    ">${escapeHTML(item.text)}</p>
</div>`.trim();
}

// La dependencia de traducción se carga solo al usarla, para no penalizar
// a quien únicamente necesita random/search/toHTML.
function loadTranslator() {
    if (!translator) {
        translator = require('google-translate-api-x');
    }

    return translator;
}

async function translateText(text, language = 'en') {
    if (typeof text !== 'string' || !text.trim()) {
        throw new TypeError('text debe ser una cadena no vacía.');
    }

    if (typeof language !== 'string' || !language.trim()) {
        throw new TypeError('language debe ser un código de idioma válido.');
    }

    const translate = loadTranslator();
    const result = await translate(text, { to: language });

    return result.text;
}

async function translateMoraleja(moraleja, language = 'en') {
    const item = typeof moraleja === 'number' ? getById(moraleja) : moraleja;

    if (!item || typeof item.text !== 'string') {
        throw new TypeError(
            'translateMoraleja necesita una moraleja válida o su ID.'
        );
    }

    const translatedText = await translateText(item.text, language);

    return {
        ...clone(item),
        text: translatedText,
        language
    };
}

async function randomTranslated(language = 'en', options = {}) {
    const item = random(options);

    return translateMoraleja(item, language);
}

async function translateHTML(moraleja, language = 'en', options = {}) {
    const translated = await translateMoraleja(moraleja, language);

    return toHTML(translated, options);
}

const api = {
    random,
    randomMany,
    get,
    search,
    categories,
    tags,
    toHTML,
    translate: translateText,
    translateMoraleja,
    randomTranslated,
    translateHTML,

    // Compatibilidad con la API original.
    TXT: () => random()?.text,

    HTML: (options = {}) => {
        const item = random(options);

        return item ? toHTML(item, options) : undefined;
    },

    TranslateTXT: (language = 'en') =>
        randomTranslated(language).then((item) => item.text),

    TranslateHTML: (language = 'en', options = {}) =>
        randomTranslated(language, options).then((item) =>
            toHTML(item, options)
        )
};

module.exports = api;

module.exports.moralejas = moralejas;
