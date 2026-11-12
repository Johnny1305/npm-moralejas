# Changelog

Todas las versiones relevantes de `moralejas`.

## [2.1.0] - 2026-11-12

### Añadido

-   Tipos TypeScript (`index.d.ts`) y `exports`/`types` en `package.json`.
-   Opción `history` en `random()` y `randomMany()` para que el llamador gestione las repeticiones.
-   Workflow de CI con Node 18, 20 y 22.
-   Prettier y `tsc --noEmit` como herramientas de desarrollo.
-   Tests de búsqueda multi-palabra, historial explícito y pools vacíos.

### Cambiado

-   `search()` busca cada palabra por separado (en cualquier orden) en texto, categoría y etiquetas.
-   El historial de `avoidRepeat` se guarda por combinación de filtros, no de forma global.
-   `randomMany()` respeta `avoidRepeat` e `historySize`.
-   `random()` y `randomMany()` devuelven `undefined`/`[]` cuando ningún elemento coincide, en lugar de lanzar una excepción.
-   La dependencia de traducción se carga solo al traducir.
-   Requisito mínimo: Node.js 18 (antes 14, sin soporte).

### Corregido

-   `.github/dependabot.yml` tenía `package-ecosystem` vacío y no funcionaba.
-   Los tests de traducción dependían de Internet; ahora se simula el cliente por defecto.

### Eliminado

-   Dependencia `@vitalets/google-translate-api`, declarada pero sin uso.
-   `module.exports.default`, que creaba una referencia circular al módulo.
-   `node_modules` deja de estar versionado en git.
