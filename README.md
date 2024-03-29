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
