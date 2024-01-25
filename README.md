# Moralejas Aleatorias

Este paquete npm proporciona una colección de moralejas graciosas y aleatorias que puedes utilizar para añadir un toque de humor a tu aplicación o proyecto.

## Instalación

Para instalar el paquete, utiliza el siguiente comando npm:

```bash
npm install moralejas
```

## Uso
```js
const moraleja = require('moralejas');

// Obtener una moraleja aleatoria en formato TEXTO

console.log(moraleja.TXT());

```
```js
const moraleja = require('moralejas');

// Obtener una moraleja aleatoria en formato HTML

console.log(moraleja.HTML());


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
3. Agrega tus moralejas en el archivo `index.js`.
4. Guarda tus cambios y haz un commit: `git commit -m "Añadir nuevas moralejas"`.
5. Envía tus cambios al repositorio: `git push origin nueva-moraleja`.
6. Abre un Pull Request.


¡Espero que disfrutes de las moralejas y que agregues algunas propias! Si encuentras algún problema o tienes sugerencias, no dudes en abrir un problema o un pull request. ¡Diviértete programando!