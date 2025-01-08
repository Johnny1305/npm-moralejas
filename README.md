<div align="center">
<h1>
 < NPM Moralejas >
</h1>
<p>Este paquete npm proporciona una colección de moralejas graciosas y aleatorias que puedes utilizar para añadir un toque de humor a tu aplicación o proyecto.</p>
</div>

<p></p>

<div align="center">

<p align="center">
   <img src="https://img.shields.io/npm/dt/moralejas?style=for-the-badge">
   <img src="https://img.shields.io/github/stars/Johnny1305/npm-moralejas?style=for-the-badge">
   <img src="https://img.shields.io/github/issues/Johnny1305/npm-moralejas?style=for-the-badge">
   <img src="https://img.shields.io/npm/v/moralejas?style=for-the-badge">
   <img src="https://img.shields.io/github/license/Johnny1305/npm-moralejas?style=for-the-badge">
</p>

</div>


## Instalación

Para instalar el paquete, utiliza el siguiente comando npm:

```bash
npm install moralejas
```

## Uso
```js
const moraleja = require('moralejas');

console.log(moraleja.TXT()); // Obtener una moraleja aleatoria en formato TEXTO
console.log(moraleja.HTML()); // Obtener una moraleja aleatoria en formato HTML

```
```js
const moraleja = require('moralejas');
// Personalizar estilo HTML

// Ejemplo de uso con estilos personalizados
const opcionesEstilos = {
    styles: {
        backgroundColor: '#ffcccb', // Cambiar el color de fondo a rosa claro
        color: '#ff5733', // Cambiar el color del texto a naranja
        fontSize: '20px' // Aumentar el tamaño de fuente
    }
};

console.log(moraleja.HTML(opcionesEstilos)); // Llama al método HTML con estilos personalizados
```
```js
const EstilosPorDefecto = {
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
        };
```

## Soporte Multilenguaje
El paquete también permite traducir las moralejas a diferentes idiomas usando la función `TranslateTXT` o `TranslateHTML`.

### Ejemplo de traducción a texto
```js
(async () => {
    const moralejaTraducida = await moraleja.TranslateTXT('en'); // Traduce al inglés
    console.log(moralejaTraducida);
})();
```

### Ejemplo de traducción en HTML
```js
(async () => {
    const opcionesEstilos = {
        styles: {
            backgroundColor: '#dff9fb',
            color: '#130f40',
            fontSize: '16px',
        },
    };

    const moralejaTraducidaHTML = await moraleja.TranslateHTML('fr', opcionesEstilos); // Traduce al francés
    console.log(moralejaTraducidaHTML);
})();
```

### Lista de Idiomas Soportados

| Idioma                 | Código  |
|-------------------------|---------|
| Afrikáans              | `af`    |
| Albanés                | `sq`    |
| Alemán                 | `de`    |
| Amhárico               | `am`    |
| Árabe                  | `ar`    |
| Armenio                | `hy`    |
| Azerí                  | `az`    |
| Bambara                | `bm`    |
| Basco                  | `eu`    |
| Bielorruso             | `be`    |
| Bengalí                | `bn`    |
| Bislama                | `bi`    |
| Bosnio                 | `bs`    |
| Búlgaro                | `bg`    |
| Catalán                | `ca`    |
| Cebuan                 | `ceb`   |
| Checo                  | `cs`    |
| Chichewa               | `ny`    |
| Chino (Simplificado)   | `zh-CN` |
| Chino (Tradicional)    | `zh-TW` |
| Córnico                | `kw`    |
| Coreano                | `ko`    |
| Corso                  | `co`    |
| Criollo haitiano       | `ht`    |
| Croata                 | `hr`    |
| Danés                  | `da`    |
| Dzongkha               | `dz`    |
| Eslovaco               | `sk`    |
| Esloveno               | `sl`    |
| Español                | `es`    |
| Estonio                | `et`    |
| Feroés                 | `fo`    |
| Finés                  | `fi`    |
| Francés                | `fr`    |
| Frisón                 | `fy`    |
| Gaélico escocés        | `gd`    |
| Galés                  | `cy`    |
| Gallego                | `gl`    |
| Georgiano              | `ka`    |
| Griego                 | `el`    |
| Guaraní                | `gn`    |
| Gujarati               | `gu`    |
| Hausa                  | `ha`    |
| Hawaiano               | `haw`   |
| Hebreo                 | `he`    |
| Hindi                  | `hi`    |
| Hmong                  | `hmn`   |
| Húngaro                | `hu`    |
| Igbo                   | `ig`    |
| Indonesio              | `id`    |
| Irlandés               | `ga`    |
| Islandés               | `is`    |
| Italiano               | `it`    |
| Japonés                | `ja`    |
| Javanés                | `jw`    |
| Canarés                | `kn`    |
| Kazajo                 | `kk`    |
| Jemer                  | `km`    |
| Kinyarwanda            | `rw`    |
| Kirguís                | `ky`    |
| Kurdo (Kurmanji)       | `ku`    |
| Lao                    | `lo`    |
| Latín                  | `la`    |
| Letón                  | `lv`    |
| Lituano                | `lt`    |
| Luxemburgués           | `lb`    |
| Macedonio              | `mk`    |
| Malgache               | `mg`    |
| Malayo                 | `ms`    |
| Malabar                | `ml`    |
| Maltés                 | `mt`    |
| Maorí                  | `mi`    |
| Marathi                | `mr`    |
| Mongol                 | `mn`    |
| Birmano                | `my`    |
| Nepalí                 | `ne`    |
| Noruego                | `no`    |
| Oriya                  | `or`    |
| Panyabí                | `pa`    |
| Pastún                 | `ps`    |
| Persa                  | `fa`    |
| Polaco                 | `pl`    |
| Portugués              | `pt`    |
| Rumano                 | `ro`    |
| Ruso                   | `ru`    |
| Samoano                | `sm`    |
| Gaélico escocés        | `gd`    |
| Serbio                 | `sr`    |
| Sesotho                | `st`    |
| Shona                  | `sn`    |
| Sindhi                 | `sd`    |
| Cingalés               | `si`    |
| Eslovaco               | `sk`    |
| Somalí                 | `so`    |
| Sotho                  | `st`    |
| Español                | `es`    |
| Sundanés               | `su`    |
| Suajili                | `sw`    |
| Sueco                  | `sv`    |
| Tagalo                 | `tl`    |
| Tayiko                 | `tg`    |
| Tamil                  | `ta`    |
| Tártaro                | `tt`    |
| Telugu                 | `te`    |
| Tailandés              | `th`    |
| Turco                  | `tr`    |
| Ucraniano              | `uk`    |
| Uigur                  | `ug`    |
| Uzbeko                 | `uz`    |
| Vietnamita             | `vi`    |
| Xhosa                  | `xh`    |
| Yidis                  | `yi`    |
| Yoruba                 | `yo`    |
| Zulú                   | `zu`    |


## Contribución
¡Si tienes moralejas graciosas para agregar, no dudes en contribuir! Simplemente sigue estos pasos:

1. Realiza un fork del repositorio.
2. Crea una rama para tus cambios: `git checkout -b nueva-moraleja`.
3. Agrega tus moralejas en el archivo `src/moralejas.json`.
4. Guarda tus cambios y haz un commit: `git commit -m "Añadir nuevas moralejas"`.
5. Envía tus cambios al repositorio: `git push origin nueva-moraleja`.
6. Abre un Pull Request.

<a href="https://github.com/Johnny1305/npm-moralejas/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Johnny1305/npm-moralejas" />
</a>

¡Espero que disfrutes de las moralejas y que agregues algunas propias! Si encuentras algún problema o tienes sugerencias, no dudes en abrir un problema o un pull request. ¡Diviértete programando!
