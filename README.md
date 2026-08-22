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

  
Una pequeña librería de Node.js para obtener moralejas, frases divertidas y reflexiones de forma aleatoria.  
  
Incluye soporte para:  
  
\- 🎲 Moralejas aleatorias  
\- 🔎 Búsqueda de moralejas  
\- 🏷️ Categorías y etiquetas  
\- 🎯 Filtros  
\- 📚 Obtener varias moralejas sin repetir  
\- 🌐 Traducción a otros idiomas  
\- 🌐 Generación de HTML  
\- 🎨 Personalización de estilos  
\- 🔒 Escape de contenido HTML  
\- 📦 API sencilla para Node.js  
\- 🔄 Compatibilidad con la API original  
  
\---  
  
## Instalación  
  
Instala el paquete con npm:  
  
```bash  
npm install moralejas
```
También puedes instalarlo con:

```
yarn add moralejas
```

o:

```
pnpm add moralejas
```

  

## Requisitos

-   Node.js >= 14
-   npm

La funcionalidad de traducción requiere conexión a Internet.

  

## Uso básico

Importa el paquete:

```
const moralejas = require('moralejas');
```

Y obtén una moraleja:
```javascript
const moraleja = moralejas.random();  
  
console.log(moraleja);
```
Resultado:
```json
{  
  id: 42,  
  text: "Una buena lista de tareas también necesita vacaciones.",  
  language: "es",  
  category: "trabajo",  
  tags: \["productividad", "humor"\]  
}
```
  

# API

## `random(options)`

Obtiene una moraleja aleatoria.
```javascript
const moraleja = moralejas.random();  
  
console.log(moraleja.text);
```
### Opciones

Puedes filtrar las moralejas:
```javascript
const moraleja = moralejas.random({  
  category: 'humor'  
});
```
Por idioma:
```javascript
const moraleja = moralejas.random({  
  language: 'es'  
});
```
Por etiquetas:
```javascript
const moraleja = moralejas.random({  
  tags: \['cafe'\]  
});
```
También puedes controlar el sistema para evitar repeticiones:
```javascript
const moraleja = moralejas.random({  
  avoidRepeat: true,  
  historySize: 10  
});
```

## Opciones disponibles

| Opción      | Tipo     | Descripción                                    |
| ----------- | -------- | ---------------------------------------------- |
| category    | string   | Filtra por categoría                           |
| language    | string   | Filtra por idioma                              |
| tags        | string[] | Filtra por etiquetas                           |
| avoidRepeat | boolean  | Evita repetir moralejas recientes              |
| historySize | number   | Número de moralejas recientes que se recuerdan |

  

# `randomMany(count, options)`

Obtiene varias moralejas aleatorias sin repetir.
```javascript
const moralejas = moralejas.randomMany(5);  
  
console.log(moralejas);
```
Resultado:
```json
[  
  {  
    id: 12,  
    text: "...",  
    language: "es",  
    category: "aprendizaje",  
    tags: \["aprendizaje", "esfuerzo"\]  
  },  
  {  
    id: 38,  
    text: "...",  
    language: "es",  
    category: "tecnologia",  
    tags: \["seguridad", "copias"\]  
  }  
]
```
También acepta filtros:
```javascript
const resultados = moralejas.randomMany(5, {  
  category: 'humor'  
});
```
Por etiquetas:
```javascript
const resultados = moralejas.randomMany(5, {  
  tags: \['cafe'\]  
});
```
La cantidad solicitada nunca puede ser menor que `1`.

  

# `get(id)`

Obtiene una moraleja concreta mediante su ID.
```javascript
const moraleja = moralejas.get(1);  
  
console.log(moraleja);
```
Si el ID no existe:
```javascript
const moraleja = moralejas.get(999999);  
  
console.log(moraleja);
```
Resultado:

```javascript
undefined
```

  

# `search(query, options)`

Busca moralejas por texto, categoría o etiquetas.
```javascript
const resultados = moralejas.search('cafe');  
  
console.log(resultados);
```
La búsqueda no distingue entre mayúsculas y minúsculas.

También permite buscar sin preocuparse por los acentos:

```javascript
moralejas.search('tecnologia');
```

y:

```javascript
moralejas.search('TECNOLOGIA');
```

son equivalentes.

## Limitar resultados
```javascript
const resultados = moralejas.search('vida', {  
  limit: 5  
});
```
## Combinar búsqueda y filtros
```javascript
const resultados = moralejas.search('comida', {  
  category: 'humor',  
  limit: 10  
});
```
  

# `categories()`

Obtiene todas las categorías disponibles.
```javascript
const categorias = moralejas.categories();  
  
console.log(categorias);
```
Ejemplo:
```json
[  
  'amistad',  
  'amor',  
  'aprendizaje',  
  'bienestar',  
  'comida',  
  'dinero',  
  'familia',  
  'humor',  
  'naturaleza',  
  'organizacion',  
  'sabiduria',  
  'superacion',  
  'tecnologia',  
  'trabajo',  
  'viajes'  
]
```
  

# `tags()`

Obtiene todas las etiquetas disponibles.
```javascript
const tags = moralejas.tags();  
  
console.log(tags);
```
  

# HTML

El paquete permite convertir una moraleja en HTML.

## `toHTML(moraleja, options)`
```javascript
const moraleja = moralejas.random();  
  
const html = moralejas.toHTML(moraleja);  
  
console.log(html);
```
También puedes pasar directamente un texto:
```javascript
const html = moralejas.toHTML(  
  'Nunca dejes para mañana lo que puedes hacer hoy.'  
);  
  
console.log(html);
```
El resultado es un `string` HTML:
```javascript
<div style="...">  
  <p style="...">  
    Nunca dejes para mañana lo que puedes hacer hoy.  
  </p>  
</div>
```
  

# Personalizar HTML

Puedes modificar los estilos:
```javascript
const html = moralejas.toHTML(  
  moralejas.random(),  
  {  
    styles: {  
      color: 'red',  
      fontSize: '24px',  
      backgroundColor: '#ffffff'  
    }  
  }  
);
```
Los estilos personalizados sobrescriben los estilos predeterminados.

## Estilos disponibles

Los estilos predeterminados son:
```json
{  
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
}
```
Puedes modificar cualquiera de ellos:
```javascript
const html = moralejas.toHTML(  
  moralejas.random(),  
  {  
    styles: {  
      border: '3px solid black',  
      padding: '30px',  
      borderRadius: '20px',  
      fontSize: '25px'  
    }  
  }  
);
```
  

# Seguridad HTML

El contenido generado por `toHTML()` se escapa antes de introducirse en el HTML.

Por ejemplo:
```javascript
const html = moralejas.toHTML(  
  '<script>alert("hola")</script>'  
);
```
El contenido se convierte en texto HTML escapado en lugar de ejecutarse como código.

Esto permite utilizar `toHTML()` de forma más segura cuando el texto proviene de una fuente externa.

  

# Traducciones

`moralejas` utiliza `google-translate-api-x` para traducir las moralejas.

La traducción es asíncrona y requiere conexión a Internet.

  

## `translate(text, language)`

Traduce un texto directamente.
```javascript
const resultado = await moralejas.translate(  
  'Hola mundo',  
  'en'  
);  
  
console.log(resultado);
```
Resultado:

```javascript
Hello world
```

  

# `translateMoraleja(moraleja, language)`

Traduce una moraleja manteniendo sus metadatos.
```javascript
const moraleja = moralejas.get(1);  
  
const traducida =  
  await moralejas.translateMoraleja(  
    moraleja,  
    'en'  
  );  
  
console.log(traducida);
```
Resultado:
```json
{  
  id: 1,  
  text: "...",  
  language: "en",  
  category: "humor",  
  tags: \["..."\]  
}
```
También puedes utilizar directamente el ID:
```javascript
const traducida =  
  await moralejas.translateMoraleja(  
    1,  
    'en'  
  );
```
  

# `randomTranslated(language, options)`

Obtiene una moraleja aleatoria y la traduce.
```javascript
const moraleja =  
  await moralejas.randomTranslated('en');  
  
console.log(moraleja);
```
También puedes aplicar filtros:
```javascript
const moraleja =  
  await moralejas.randomTranslated(  
    'en',  
    {  
      category: 'humor'  
    }  
  );
```
  

# `translateHTML(moraleja, language, options)`

Traduce una moraleja y genera HTML.
```javascript
const html =  
  await moralejas.translateHTML(  
    1,  
    'en'  
  );  
  
console.log(html);
```
También puedes personalizar los estilos:
```javascript
const html =  
  await moralejas.translateHTML(  
    1,  
    'en',  
    {  
      styles: {  
        color: 'blue',  
        fontSize: '24px'  
      }  
    }  
  );
```
  

# API original

Las primeras versiones de `moralejas` utilizaban una API más sencilla.

Para mantener la compatibilidad, estas funciones siguen disponibles.

  

## `TXT()`

Devuelve solamente el texto de una moraleja aleatoria.
```javascript
const texto = moralejas.TXT();  
  
console.log(texto);
```
Ejemplo:

```
Más vale empezar despacio que pasar años esperando el momento perfecto.
```

  

## `HTML()`

Devuelve una moraleja aleatoria en HTML.
```javascript
const html = moralejas.HTML();  
  
console.log(html);

También acepta estilos:

const html = moralejas.HTML({  
  styles: {  
    color: 'red',  
    fontSize: '24px'  
  }  
});
```
  

## `TranslateTXT(language)`

Obtiene una moraleja aleatoria y devuelve únicamente el texto traducido.
```javascript
const texto =  
  await moralejas.TranslateTXT('en');  
  
console.log(texto);
```
  

## `TranslateHTML(language, options)`

Obtiene una moraleja aleatoria, la traduce y devuelve HTML.
```javascript
const html =  
  await moralejas.TranslateHTML('en');  
  
console.log(html);

También permite personalizar los estilos:

const html =  
  await moralejas.TranslateHTML(  
    'en',  
    {  
      styles: {  
        color: 'red',  
        fontSize: '24px'  
      }  
    }  
  );
```
  

# Ejemplo completo

Un ejemplo sencillo utilizando varias funciones:
```javascript
const moralejas = require('moralejas');  
  
async function main() {  
  
  // Moraleja aleatoria  
  const moraleja = moralejas.random();  
  
  console.log('Moraleja:');  
  console.log(moraleja.text);  
  
  // Categoría  
  console.log('\\nCategoría:');  
  console.log(moraleja.category);  
  
  // Tags  
  console.log('\\nTags:');  
  console.log(moraleja.tags);  
  
  // Buscar  
  const resultados =  
    moralejas.search('cafe');  
  
  console.log('\\nResultados:');  
  console.log(resultados);  
  
  // Traducir  
  const traducida =  
    await moralejas.translateMoraleja(  
      moraleja,  
      'en'  
    );  
  
  console.log('\\nTraducción:');  
  console.log(traducida.text);  
  
  // HTML  
  const html =  
    moralejas.toHTML(moraleja);  
  
  console.log('\\nHTML:');  
  console.log(html);  
}  
  
main();
```
  

# Estructura de una moraleja

Cada moraleja tiene la siguiente estructura:
```json
{  
  id: 1,  
  text: 'Texto de la moraleja',  
  language: 'es',  
  category: 'humor',  
  tags: \[  
    'humor',  
    'vida'  
  \]  
}
```
### Propiedades

| Propiedad | Tipo     | Descripción            |
| --------- | -------- | ---------------------- |
| id        | number   | Identificador único    |
| text      | string   | Texto de la moraleja   |
| language  | string   | Idioma original        |
| category  | string   | Categoría              |
| tags      | string[] | Etiquetas relacionadas |

  

# Categorías

Las moralejas están organizadas en diferentes categorías, como:

-   `amistad`
-   `amor`
-   `aprendizaje`
-   `bienestar`
-   `comida`
-   `dinero`
-   `familia`
-   `humor`
-   `naturaleza`
-   `organizacion`
-   `sabiduria`
-   `superacion`
-   `tecnologia`
-   `trabajo`
-   `viajes`

Puedes consultar las categorías disponibles directamente:

```
moralejas.categories();
```

  

# Uso en Express

Puedes utilizar `moralejas` fácilmente con Express.
```javascript
const express = require('express');  
const moralejas = require('moralejas');  
  
const app = express();  
  
app.get('/moraleja', (req, res) => {  
  
  const moraleja =  
    moralejas.random();  
  
  res.json(moraleja);  
});  
  
app.listen(3000, () => {  
  console.log(  
    'Servidor iniciado en http://localhost:3000'  
  );  
});
```
  

# Endpoint HTML

También puedes devolver directamente HTML:
```javascript
app.get('/moraleja/html', (req, res) => {  
  
  const html =  
    moralejas.HTML();  
  
  res.send(html);  
});
```
  

# Ejemplo con filtros

Puedes crear una API que permita seleccionar categorías:
```javascript
app.get('/moraleja/:category', (req, res) => {  
  
  try {  
  
    const moraleja =  
      moralejas.random({  
        category: req.params.category  
      });  
  
    res.json(moraleja);  
  
  } catch (error) {  
  
    res.status(404).json({  
      error: error.message  
    });  
  
  }  
});
```
Por ejemplo:

```
/moraleja/humor
```

  

# Desarrollo

Clona el repositorio:

```
git clone https://github.com/Johnny1305/npm-moralejas.git
```

Entra en la carpeta:

```
cd moralejas
```

Instala las dependencias:

```
npm install
```

  

# Tests

El proyecto incluye tests para comprobar la API.

Ejecuta:

```
npm test
```

Los tests comprueban:

-   Carga del módulo
-   `random()`
-   Filtros
-   `randomMany()`
-   `get()`
-   `search()`
-   `categories()`
-   `tags()`
-   `toHTML()`
-   Escape HTML
-   Traducciones
-   `translateMoraleja()`
-   `randomTranslated()`
-   `translateHTML()`
-   API original
-   Integridad del dataset
-   IDs únicos
-   Estructura de las moralejas

Las pruebas de traducción necesitan conexión a Internet.

  

# Versionado

Este proyecto utiliza [Semantic Versioning](https://semver.org/).

Ejemplo:

```
MAJOR.MINOR.PATCH
```

Por ejemplo:

```
2.0.0
```

-   `MAJOR`: cambios incompatibles
-   `MINOR`: nuevas funcionalidades compatibles
-   `PATCH`: correcciones y pequeños cambios

  

# Dependencias

El proyecto utiliza:

```
google-translate-api-x
```

Esta dependencia se utiliza exclusivamente para las funciones de traducción.

  

# Contribuir

Las contribuciones son bienvenidas.

Si quieres añadir nuevas moralejas:

1.  Añade la moraleja a `src/moralejas.json`.
2.  Utiliza un ID único.
3.  Añade una categoría.
4.  Añade al menos una etiqueta.
5.  Ejecuta los tests:

```
npm test
```

6.  Comprueba el paquete:

```
npm pack
```

7.  Verifica que el paquete generado contiene los archivos necesarios.

  

# Añadir una nueva moraleja

Ejemplo:
```json
{  
  "id": 107,  
  "text": "Una buena idea merece al menos una oportunidad.",  
  "language": "es",  
  "category": "superacion",  
  "tags": \[  
    "ideas",  
    "oportunidades"  
  \]  
}
```
Los IDs no deben repetirse.

  

# Licencia

[MIT License](LICENSE)

Copyright (c) 2026

Se permite utilizar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y vender copias del software, siempre que se incluya el aviso de copyright y la licencia correspondiente.

  

# Autor

Creado por [Johnny](https://github.com/Johnny1305).

  

# Soporte

Si encuentras un error o tienes una idea para mejorar el paquete, puedes abrir un issue en el repositorio del proyecto.

  

# ¿Por qué `moralejas`?

La idea de este paquete es proporcionar una API sencilla para proyectos que necesiten:

-   Frases aleatorias
-   Moralejas
-   Contenido para páginas web
-   APIs de entretenimiento
-   Ejemplos de programación
-   Proyectos educativos
-   Bots
-   Aplicaciones
-   Generadores de contenido

La API básica sigue siendo muy sencilla:
```javascript
const moralejas = require('moralejas');  
  
console.log(  
  moralejas.TXT()  
);
```
Y para proyectos que necesitan más control:
```javascript
const moraleja =  
  moralejas.random({  
    category: 'humor',  
    tags: \['cafe'\]  
  });  
  
console.log(  
  moraleja.text  
);
```
  

## ⭐ Si te gusta el proyecto

Si `moralejas` te resulta útil, puedes darle una estrella al repositorio y compartirlo.

¡Gracias por utilizar `moralejas`! 🎉