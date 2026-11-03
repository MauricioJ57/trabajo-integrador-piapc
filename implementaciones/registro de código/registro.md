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

**Estado:** completada (verificada por el autor)
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

### Comprobaciones automatizadas (para ejecutar por el autor)

Ejecutar desde la raíz del proyecto. El autor ya confirmó el comportamiento
jugable de esta spec.

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

## Spec 05 — Percepción y FSM

**Estado:** implementada (pendiente de comprobación)
**Fecha:** 03/11/2026

### Archivos creados

| Ruta | Cambio |
|---|---|
| `src/game/world/vision.js` | Línea de vista supercover, comprobación de cono y construcción del cono recortado por paredes. |

### Archivos modificados

| Ruta | Cambio |
|---|---|
| `src/game/config.js` | Velocidad de persecución, radio/ángulo de visión, barrido de búsqueda, distancia de captura y colores de conos/derrota. |
| `src/game/entities/guard.js` | FSM PATROL/CHASE/SEARCH/RETURN, última posición conocida, etiqueta de estado, cono y detección de contacto. |
| `src/game/scenes/Game.js` | Actualización de guardias con el jugador, captura, overlay de derrota, prioridad de victoria y reinicio de overlays. |
| `implementaciones/README.md` | Versión 0.6, estado de la spec 05, próximo paso y alcance actualizados. |
| `implementaciones/GDD.md` | Detalle de la espera en PATROL y del barrido de 180° en SEARCH ajustado a la implementación. |
| `implementaciones/specs/04-guardias-navegacion.md` | Estado actualizado a completada tras la verificación del autor. |
| `implementaciones/specs/05-percepcion-fsm.md` | Estado, implementación, comportamiento y pruebas jugables actualizados. |
| `implementaciones/specs/README.md` | Estados de las specs 04 y 05 actualizados. |
| `implementaciones/registro de código/registro.md` | Este documento de registro. |

### Comprobaciones para el autor

No se ejecutaron durante esta implementación. Ejecutar desde la raíz del
proyecto.

```powershell
npm.cmd run build
```

```powershell
$script = @'
import {
    BOARD_X,
    GRID_COLS,
    GRID_ROWS,
    TILE_SIZE,
    VISION_HALF_ANGLE,
    VISION_RADIUS
} from './src/game/config.js';
import { Grid, TILE_FLOOR, TILE_WALL } from './src/game/world/grid.js';
import {
    buildVisionCone,
    hasLineOfSight,
    isInVisionCone
} from './src/game/world/vision.js';

const failures = [];
const makeGrid = () => new Grid(
    Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(TILE_FLOOR))
);
const center = (grid, col, row) => grid.tileToWorldCenter(col, row);

const blocked = makeGrid();
blocked.map[2][3] = TILE_WALL;

if (hasLineOfSight(blocked, { col: 1, row: 2 }, { col: 5, row: 2 })) {
    failures.push('la linea de vista atraviesa una pared');
}

if (!hasLineOfSight(blocked, { col: 1, row: 1 }, { col: 5, row: 1 })) {
    failures.push('la linea de vista bloquea una linea libre');
}

const corner = makeGrid();
corner.map[1][2] = TILE_WALL;
corner.map[2][1] = TILE_WALL;

if (hasLineOfSight(corner, { col: 1, row: 1 }, { col: 2, row: 2 })) {
    failures.push('la linea de vista atraviesa una esquina bloqueada');
}

const open = makeGrid();
const origin = center(open, 1, 1);
const front = { x: origin.x + 80, y: origin.y };
const back = { x: origin.x - 80, y: origin.y };
const far = { x: origin.x + VISION_RADIUS + 1, y: origin.y };
const outsideAngle = VISION_HALF_ANGLE + 0.02;
const outside = {
    x: origin.x + Math.cos(outsideAngle) * 80,
    y: origin.y + Math.sin(outsideAngle) * 80
};

if (!isInVisionCone(origin, 0, front, VISION_RADIUS, VISION_HALF_ANGLE)) {
    failures.push('no detecta un objetivo al frente');
}

if (isInVisionCone(origin, 0, back, VISION_RADIUS, VISION_HALF_ANGLE)) {
    failures.push('detecta un objetivo detrás');
}

if (isInVisionCone(origin, 0, outside, VISION_RADIUS, VISION_HALF_ANGLE)) {
    failures.push('detecta fuera del ángulo');
}

if (isInVisionCone(origin, 0, far, VISION_RADIUS, VISION_HALF_ANGLE)) {
    failures.push('detecta fuera del radio');
}

const coneGrid = makeGrid();
coneGrid.map[2][2] = TILE_WALL;
const coneOrigin = center(coneGrid, 1, 2);
const points = buildVisionCone(
    coneGrid,
    coneOrigin,
    0,
    VISION_RADIUS,
    VISION_HALF_ANGLE
);
const wallLeft = BOARD_X + 2 * TILE_SIZE;

for (const point of points.slice(1)) {
    const distance = Math.hypot(
        point.x - coneOrigin.x,
        point.y - coneOrigin.y
    );
    const tile = coneGrid.worldToTile(point.x, point.y);

    if (point.x >= wallLeft - 0.001) {
        failures.push('el cono atraviesa la pared');
        break;
    }

    if (!coneGrid.isWalkable(tile.col, tile.row)) {
        failures.push('el cono contiene un punto en pared');
        break;
    }

    if (distance > VISION_RADIUS + 0.001) {
        failures.push('el cono excede el radio');
        break;
    }
}

console.log('Fallos:', failures.length);

if (failures.length > 0) {
    console.log(failures);
    process.exitCode = 1;
}
'@

$script | node --input-type=module -
```

- Iniciar con `npm.cmd run dev`, abrir `http://localhost:8080` y cruzar el
  cono de un guardia: debe pasar a CHASE con etiqueta y cono rojos.
- Escaparse detrás de una pared: debe ir a la última posición conocida, entrar
  en SEARCH con cono amarillo y barrer 180° durante 2 segundos.
- Esperar el fin de SEARCH: debe volver con RETURN y luego PATROL, con cono
  blanco.
- Confirmar que la espera de PATROL conserva la orientación del cono.
- Dejarse tocar en PATROL, CHASE, SEARCH y RETURN: debe aparecer la derrota y
  detenerse la partida.
- Comprobar que R reinicia la partida y N genera un escenario nuevo desde la
  derrota.
- Confirmar que no hay detección a través de paredes y que el cono visible se
  recorta contra ellas.
- Repetir la persecución con BFS y A*, y con navegación cruda y suavizada.
- Confirmar que el jugador sigue siendo más rápido que un guardia en CHASE.
- Verificar que la victoria con la reliquia sigue funcionando y que R/N
  restauran correctamente jugador, reliquia y guardias.
