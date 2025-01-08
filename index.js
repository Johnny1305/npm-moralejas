const translate = require('google-translate-api-x');
const moralejas = require('./src/moralejas.json').moralejas;

const moraleja = {
    TXT: function () {
        const indiceAleatorio = Math.floor(Math.random() * moralejas.length);
        return moralejas[indiceAleatorio];
    },
    HTML: function (opciones = {}) {
        const indiceAleatorio = Math.floor(Math.random() * moralejas.length);
        const moralejaSeleccionada = moralejas[indiceAleatorio];

        // Establecer los estilos predeterminados
        const estilos = {
            fontFamily: "'Arial', sans-serif",
            border: '2px solid #3498db',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: '#ecf0f1',
            margin: '20px',
            maxWidth: '600px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            fontSize: '18px',
            color: '#2c3e50',
            ...opciones.styles, // Sobrescribir con las opciones proporcionadas por el usuario
        };

        return `
            <div style="
                font-family: ${estilos.fontFamily};
                border: ${estilos.border};
                padding: ${estilos.padding};
                border-radius: ${estilos.borderRadius};
                background-color: ${estilos.backgroundColor};
                margin: ${estilos.margin};
                max-width: ${estilos.maxWidth};
                box-shadow: ${estilos.boxShadow};
            ">
                <p style="
                    font-size: ${estilos.fontSize};
                    color: ${estilos.color};
                    margin: 0;
                ">${moralejaSeleccionada}</p>
            </div>`;
    },
    TranslateTXT: async function (language = 'en') {
        const indiceAleatorio = Math.floor(Math.random() * moralejas.length);
        const textoOriginal = moralejas[indiceAleatorio];

        try {
            const traducido = await translate(textoOriginal, { to: language });
            return traducido.text;
        } catch (error) {
            console.error('Error al traducir la moraleja:', error);
            return 'No se pudo traducir la moraleja.';
        }
    },
    TranslateHTML: async function (language = 'en', opciones = {}) {
        const indiceAleatorio = Math.floor(Math.random() * moralejas.length);
        const textoOriginal = moralejas[indiceAleatorio];

        try {
            const traducido = await translate(textoOriginal, { to: language });

            // Establecer los estilos predeterminados
            const estilos = {
                fontFamily: "'Arial', sans-serif",
                border: '2px solid #3498db',
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: '#ecf0f1',
                margin: '20px',
                maxWidth: '600px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                fontSize: '18px',
                color: '#2c3e50',
                ...opciones.styles, // Sobrescribir con las opciones proporcionadas por el usuario
            };

            return `
                <div style="
                    font-family: ${estilos.fontFamily};
                    border: ${estilos.border};
                    padding: ${estilos.padding};
                    border-radius: ${estilos.borderRadius};
                    background-color: ${estilos.backgroundColor};
                    margin: ${estilos.margin};
                    max-width: ${estilos.maxWidth};
                    box-shadow: ${estilos.boxShadow};
                ">
                    <p style="
                        font-size: ${estilos.fontSize};
                        color: ${estilos.color};
                        margin: 0;
                    ">${traducido.text}</p>
                </div>`;
        } catch (error) {
            console.error('Error al traducir la moraleja:', error);
            return '<p>No se pudo traducir la moraleja.</p>';
        }
    }
};

module.exports = moraleja;
