const moraleja = require('./index.js');

(async () => {
    // Prueba de TXT
    console.log("Moraleja en texto:");
    console.log(moraleja.TXT());

    // Prueba de HTML
    console.log("\nMoraleja en HTML:");
    console.log(moraleja.HTML());

    // Prueba de traducción TXT
    console.log("\nMoraleja traducida al inglés:");
    const traducidaTXT = await moraleja.TranslateTXT('en');
    console.log(traducidaTXT);

    // Prueba de traducción HTML
    console.log("\nMoraleja traducida al francés en HTML:");
    const traducidaHTML = await moraleja.TranslateHTML('fr', {
        styles: { backgroundColor: '#f9f9f9', fontSize: '16px', color: '#333' }
    });
    console.log(traducidaHTML);
})();
