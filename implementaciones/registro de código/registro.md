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

## Spec 02 — Escenario variable y objetivo

**Estado:** completada
**Fecha:** 02/11/2026

### Archivos creados

| Ruta | Cambio |
|---|---|
| `src/game/world/scenario.js` | Generador de mapas, entrada, reliquia, validación por flood fill y puntos de patrulla. |
| `src/game/entities/relic.js` | Representación de la reliquia, recolección, restauración y destrucción. |

### Archivos modificados

| Ruta | Cambio |
|---|---|
| `src/game/world/grid.js` | De mapa estático a clase `Grid` con mapa mutable y colisión sobre la grilla activa. |
| `src/game/entities/player.js` | Recibe la grilla activa y agrega `resetTo` para reaparecer en la entrada. |
| `src/game/scenes/Game.js` | Generación de escenario, marcador de entrada, reliquia, recolección, victoria, overlay y teclas N/R. |
| `src/game/config.js` | Colores de entrada, reliquia, overlay y texto de victoria. |
| `implementaciones/README.md` | Estado de la spec 02, controles y alcance actualizados. |
| `implementaciones/specs/02-escenario-variable.md` | Estado actualizado a completada. |
| `implementaciones/specs/README.md` | Estado de la spec 02 actualizado a completada. |
| `implementaciones/registro de código/registro.md` | Este documento de registro. |

### Comprobaciones realizadas

- `node`: 500 escenarios generados, 0 fallos de validación.
- `node`: entrada siempre en celda libre junto al borde; reliquia alcanzable
  con distancia de camino entre 12 y 39 celdas; 8 puntos de patrulla
  alcanzables, separados y fuera de la reliquia.
- `npm.cmd run build`: compilación de producción completada correctamente.
- Servidor Vite: respuesta HTTP 200 y renderizado verificado con captura
  headless de Chrome.

### Pendiente de prueba manual

- Presionar N al menos cinco veces y comprobar que cambian obstáculos,
  entrada y reliquia.
- Recorrer el escenario, recoger la reliquia y volver a la entrada para
  verificar la victoria y el overlay.
- Probar R durante la partida y después de la victoria: debe conservar el
  mapa y restaurar jugador y reliquia.
- Comprobar que N reemplaza el mapa y que la colisión sigue funcionando.
