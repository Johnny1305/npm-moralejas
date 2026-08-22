const translate = require('google-translate-api-x');
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

let lastIds = [];

/**
 * Devuelve un índice aleatorio.
 */
function randomIndex(length) {
    return Math.floor(Math.random() * length);
}

/**
 * Normaliza un texto para facilitar búsquedas y comparaciones.
 */
function normalize(value) {
    return String(value ?? '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
}

/**
 * Busca una moraleja por ID.
 */
function getById(id) {
    const numericId = Number(id);

    if (!Number.isInteger(numericId)) {
        return undefined;
    }

    return moralejas.find((item) => item.id === numericId);
}

/**
 * Comprueba si una moraleja coincide con los filtros.
 */
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

        if (
            !options.tags.every((tag) =>
                itemTags.includes(normalize(tag))
            )
        ) {
            return false;
        }
    }

    return true;
}

/**
 * Obtiene las moralejas que cumplen los filtros.
 */
function getPool(options = {}) {
    const pool = moralejas.filter((item) => matches(item, options));

    if (pool.length === 0) {
        throw new Error(
            'No hay moralejas que coincidan con los filtros indicados.'
        );
    }

    return pool;
}

/**
 * Devuelve una copia de una moraleja.
 */
function clone(item) {
    if (!item) {
        return undefined;
    }

    return {
        ...item,
        tags: [...item.tags]
    };
}

/**
 * Obtiene una moraleja aleatoria.
 *
 * Opciones:
 * - category
 * - language
 * - tags
 * - avoidRepeat
 * - historySize
 */
function random(options = {}) {
    const pool = getPool(options);

    const avoidRepeat = options.avoidRepeat ?? true;

    let available = pool;

    if (avoidRepeat && pool.length > 1) {
        const previousIds = new Set(lastIds);

        const filtered = pool.filter(
            (item) => !previousIds.has(item.id)
        );

        if (filtered.length > 0) {
            available = filtered;
        }
    }

    const selected =
        available[randomIndex(available.length)];

    if (avoidRepeat) {
        const historySize = Math.min(
            Math.max(Number(options.historySize) || 10, 1),
            Math.max(pool.length - 1, 1)
        );

        lastIds = [
            selected.id,
            ...lastIds.filter((id) => id !== selected.id)
        ].slice(0, historySize);
    }

    return clone(selected);
}

/**
 * Obtiene varias moralejas aleatorias sin repetir.
 */
function randomMany(count = 1, options = {}) {
    const requested = Number(count);

    if (!Number.isInteger(requested) || requested < 1) {
        throw new TypeError(
            'count debe ser un entero mayor que 0.'
        );
    }

    const pool = getPool(options);

    const amount = Math.min(requested, pool.length);

    const result = [];
    const used = new Set();

    while (result.length < amount) {
        const available = pool.filter(
            (item) => !used.has(item.id)
        );

        const selected =
            available[randomIndex(available.length)];

        used.add(selected.id);
        result.push(clone(selected));
    }

    return result;
}

/**
 * Obtiene una moraleja por ID.
 */
function get(id) {
    return clone(getById(id));
}

/**
 * Busca moralejas por texto, categoría o tags.
 */
function search(query, options = {}) {
    const term = normalize(query);

    if (!term) {
        return [];
    }

    const limit = Number.isInteger(Number(options.limit))
        ? Math.max(Number(options.limit), 1)
        : 20;

    return moralejas
        .filter((item) => matches(item, options))
        .map((item) => {
            const haystack = normalize(
                [
                    item.text,
                    item.category,
                    ...item.tags
                ].join(' ')
            );

            const score = haystack.includes(term)
                ? normalize(item.text).includes(term)
                    ? 2
                    : 1
                : 0;

            return {
                item,
                score
            };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(({ item }) => clone(item));
}

/**
 * Devuelve todas las categorías disponibles.
 */
function categories() {
    return [
        ...new Set(
            moralejas.map((item) => item.category)
        )
    ].sort();
}

/**
 * Devuelve todos los tags disponibles.
 */
function tags() {
    return [
        ...new Set(
            moralejas.flatMap((item) => item.tags)
        )
    ].sort();
}

/**
 * Escapa caracteres HTML para evitar inyección.
 */
function escapeHTML(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Convierte una moraleja en HTML.
 *
 * Puede recibir:
 * - un objeto moraleja
 * - un texto directamente
 */
function toHTML(moraleja, options = {}) {
    const item =
        typeof moraleja === 'string'
            ? { text: moraleja }
            : moraleja;

    if (
        !item ||
        typeof item.text !== 'string'
    ) {
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

/**
 * Traduce un texto.
 */
async function translateText(
    text,
    language = 'en'
) {
    if (
        typeof text !== 'string' ||
        !text.trim()
    ) {
        throw new TypeError(
            'text debe ser una cadena no vacía.'
        );
    }

    if (
        typeof language !== 'string' ||
        !language.trim()
    ) {
        throw new TypeError(
            'language debe ser un código de idioma válido.'
        );
    }

    const result = await translate(text, {
        to: language
    });

    return result.text;
}

/**
 * Traduce una moraleja manteniendo sus metadatos.
 */
async function translateMoraleja(
    moraleja,
    language = 'en'
) {
    const item =
        typeof moraleja === 'number'
            ? getById(moraleja)
            : moraleja;

    if (
        !item ||
        typeof item.text !== 'string'
    ) {
        throw new TypeError(
            'translateMoraleja necesita una moraleja válida o su ID.'
        );
    }

    const translatedText =
        await translateText(
            item.text,
            language
        );

    return {
        ...clone(item),
        text: translatedText,
        language
    };
}

/**
 * Obtiene una moraleja aleatoria y la traduce.
 */
async function randomTranslated(
    language = 'en',
    options = {}
) {
    const item = random(options);

    return translateMoraleja(
        item,
        language
    );
}

/**
 * Traduce una moraleja y la convierte en HTML.
 */
async function translateHTML(
    moraleja,
    language = 'en',
    options = {}
) {
    const translated =
        await translateMoraleja(
            moraleja,
            language
        );

    return toHTML(
        translated,
        options
    );
}

/**
 * API pública.
 */
const api = {
    // API moderna
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

    // Compatibilidad con la API original
    TXT: () => random().text,

    HTML: (options = {}) =>
        toHTML(
            random(),
            options
        ),

    TranslateTXT: (language = 'en') =>
        randomTranslated(language)
            .then((item) => item.text),

    TranslateHTML: (
        language = 'en',
        options = {}
    ) =>
        randomTranslated(language)
            .then((item) =>
                toHTML(item, options)
            )
};

module.exports = api;

module.exports.moralejas = moralejas;

module.exports.default = api;