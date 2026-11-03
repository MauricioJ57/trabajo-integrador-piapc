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

## Spec 03 — Búsquedas BFS y A*

**Estado:** completada
**Fecha:** 02/11/2026

### Archivos creados

| Ruta | Cambio |
|---|---|
| `src/game/world/pathfinding.js` | BFS y A* en 4 direcciones, reconstrucción de ruta y registro de celdas visitadas. |

### Archivos modificados

| Ruta | Cambio |
|---|---|
| `src/game/scenes/Game.js` | Selección BFS/A* con 1/2, depuración con V, panel de estado y dibujo de celdas visitadas y ruta. |
| `src/game/config.js` | Colores `debugVisited` y `debugPath`. |
| `implementaciones/README.md` | Versión 0.4, estado de spec 03, controles y alcance actualizados. |
| `implementaciones/specs/03-busquedas.md` | Estado completada y ruta hacia la entrada después de recoger la reliquia. |
| `implementaciones/specs/README.md` | Estado de la spec 03 actualizado a completada. |
| `implementaciones/registro de código/registro.md` | Este documento de registro. |

### Comprobaciones realizadas

- `node`: 500 escenarios generados; todas las rutas BFS y A* son válidas,
  respetan obstáculos y tienen la misma longitud.
- `node`: BFS y A* devuelven una ruta de una celda cuando origen y destino
  coinciden, y `null` cuando el destino está bloqueado.
- `node`: las celdas visitadas incluyen el origen en ambos algoritmos.
- `npm.cmd run build`: compilación de producción completada correctamente.
- Chrome headless: panel con BFS y depuración apagada; con V se dibujan ruta y
  celdas visitadas; con 2 el panel pasa a A* y la ruta se mantiene válida.
- Servidor Vite: renderizado verificado con capturas headless.

### Pendiente de prueba manual

- Alternar 1 y 2 en el mismo mapa y comparar ruta y celdas exploradas.
- Moverse con la depuración activa y confirmar que la ruta se recalcula y
  esquiva obstáculos.
- Generar escenarios con N y comprobar que la depuración sigue funcionando.
- Recoger la reliquia y confirmar que la ruta apunta a la entrada.
- Probar R antes y después de la victoria con la depuración activa.

## Spec 04 — Guardias, patrullaje y navegación

**Estado:** implementada (pendiente de comprobación)
**Fecha:** 02/11/2026

### Archivos creados

| Ruta | Cambio |
|---|---|
| `src/game/world/navigation.js` | Comprobación de línea de vista y simplificación de rutas con waypoints. |
| `src/game/entities/guard.js` | Guardia con patrullaje, espera, navegación cruda/suavizada y reinicio. |

### Archivos modificados

| Ruta | Cambio |
|---|---|
| `src/game/config.js` | Tamaño, velocidad y espera de guardias; colores de guardias y rutas de depuración. |
| `src/game/scenes/Game.js` | Creación y reinicio de guardias, actualización, teclas 3/4, panel y rutas de depuración. |
| `implementaciones/README.md` | Versión 0.5, estado de spec 04, controles y alcance actualizados. |
| `implementaciones/specs/04-guardias-navegacion.md` | Estado implementada, rutas de guardias en depuración y comprobaciones actualizadas. |
| `implementaciones/specs/README.md` | Estado de la spec 04 actualizado a implementada. |
| `implementaciones/registro de código/registro.md` | Este documento de registro. |

### Comprobaciones pendientes (para ejecutar por el autor)

Ejecutar desde la raíz del proyecto.

```powershell
npm.cmd run build
```

```powershell
$script = @'
import { generateScenario } from './src/game/world/scenario.js';
import { Grid } from './src/game/world/grid.js';
import { findPath } from './src/game/world/pathfinding.js';
import { hasClearSegment, smoothPath } from './src/game/world/navigation.js';
import { GUARD_SIZE } from './src/game/config.js';

const same = (a, b) => a.col === b.col && a.row === b.row;
const adjacent = (a, b) => (
    Math.abs(a.col - b.col) + Math.abs(a.row - b.row) === 1
);
const halfSize = GUARD_SIZE / 2;
const failures = [];

for (let scenarioIndex = 0; scenarioIndex < 500; scenarioIndex++) {
    const scenario = generateScenario();
    const grid = new Grid(scenario.map);

    for (const patrol of scenario.guardPatrols) {
        if (patrol.length !== 4) {
            failures.push('patrulla incompleta');
        }

        for (let pointIndex = 0; pointIndex < patrol.length; pointIndex++) {
            const from = patrol[pointIndex];
            const to = patrol[(pointIndex + 1) % patrol.length];

            for (const algorithm of ['bfs', 'astar']) {
                const path = findPath(grid, from, to, algorithm);

                if (!path) {
                    failures.push(`sin ruta ${algorithm}`);
                    continue;
                }

                if (!same(path[0], from) || !same(path[path.length - 1], to)) {
                    failures.push(`extremos incorrectos ${algorithm}`);
                }

                for (let index = 1; index < path.length; index++) {
                    if (!adjacent(path[index - 1], path[index])) {
                        failures.push(`paso no adyacente ${algorithm}`);
                    }
                }

                const smooth = smoothPath(grid, path, halfSize);

                for (let index = 1; index < smooth.length; index++) {
                    const start = grid.tileToWorldCenter(
                        smooth[index - 1].col,
                        smooth[index - 1].row
                    );
                    const end = grid.tileToWorldCenter(
                        smooth[index].col,
                        smooth[index].row
                    );

                    if (!hasClearSegment(grid, start, end, halfSize)) {
                        failures.push(`segmento suavizado bloqueado ${algorithm}`);
                    }
                }
            }
        }
    }
}

console.log('Escenarios:', 500);
console.log('Fallos:', failures.length);

if (failures.length > 0) {
    console.log(failures.slice(0, 10));
}
'@

$script | node --input-type=module -
```

- Iniciar con `npm.cmd run dev`, abrir `http://localhost:8080` y comprobar que
  los dos guardias patrullan sin atravesar paredes.
- Verificar que al llegar a un punto esperan aproximadamente 1 segundo.
- Activar V y comprobar que se ven las rutas restantes de ambos guardias con
  colores distintos.
- Alternar 3 y 4 y comprobar que el movimiento cambia entre crudo y suavizado.
- Alternar 1 y 2 y comprobar que el mapa no se regenera y que el cambio se
  aplica al siguiente tramo.
- Presionar N y comprobar que cambian los puntos de patrulla y las rutas.
- Presionar R y comprobar que jugador, reliquia y guardias vuelven al inicio
  conservando la configuración activa.
- Confirmar que el jugador todavía puede recoger la reliquia y volver a la
  entrada para ganar.
