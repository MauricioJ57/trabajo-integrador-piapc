# Registro de código

Registro de los archivos agregados y modificados por spec. Se actualiza al
terminar cada implementación.

## Spec 01 — Base jugable

**Estado:** completada
**Fecha:** 02/11/2026

### Archivos creados

| Ruta | Cambio |
|---|---|
| `src/game/config.js` | Constantes de grilla, tablero, panel, jugador y colores. |
| `src/game/world/grid.js` | Mapa estático 24×16, consultas de celdas, conversión de coordenadas y colisión AABB. |
| `src/game/entities/player.js` | Jugador con movimiento en 8 direcciones, colisión por eje, deslizamiento y reinicio. |
| `implementaciones/README.md` | Metadatos del proyecto, estado actual, ejecución y controles. |
| `implementaciones/registro de código/registro.md` | Este documento de registro. |

### Archivos modificados

| Ruta | Cambio |
|---|---|
| `src/game/scenes/Game.js` | Reemplazo de la escena demo por el tablero, panel placeholder, controles y jugador. |
| `src/game/main.js` | Fondo de la escena cambiado a `#0b0f14`. |
| `index.html` | Idioma a `es` y título “Turno de Noche”. |
| `implementaciones/specs/01-base-jugable.md` | Estado actualizado a completada. |
| `implementaciones/specs/README.md` | Estado de la spec 01 actualizado a completada. |

### Comprobaciones realizadas

- `node`: mapa estático con 269 celdas libres, todas alcanzables desde la
  entrada `(2,2)`.
- `node`: colisión contra paredes, límites del tablero, deslizamiento por eje
  y reinicio verificados con un mock de escena.
- `npm.cmd run build`: compilación de producción completada correctamente.
- Servidor Vite: respuesta HTTP 200 para la página y `src/main.js`.
- Captura headless con Chrome: tablero, jugador y panel se renderizan.

### Pendiente de prueba manual

- Confirmar en el navegador el movimiento con WASD y flechas, el
  deslizamiento en diagonal contra paredes y el reinicio con R.
