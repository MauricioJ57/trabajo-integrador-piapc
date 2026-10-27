# Specs — Turno de Noche

Índice del proceso spec-driven del prototipo. Cada spec se implementa, se
prueba jugando y se cierra antes de pasar a la siguiente.

## Orden y dependencias

| Orden | Spec | Depende de | Estado |
|---|---|---|---|
| 01 | [Base jugable](01-base-jugable.md) | — | pendiente |
| 02 | [Escenario variable](02-escenario-variable.md) | 01 | pendiente |
| 03 | [Búsquedas BFS y A*](03-busquedas.md) | 02 | pendiente |
| 04 | [Guardias y navegación](04-guardias-navegacion.md) | 03 | pendiente |
| 05 | [Percepción y FSM](05-percepcion-fsm.md) | 04 | pendiente |
| 06 | [UI y bucle completo](06-ui-bucle-completo.md) | 05 | pendiente |
| 07 | [Entrega y presentación](07-entrega-presentacion.md) | 06 | pendiente |

## Convenciones

- Una spec por vez.
- Antes de implementar se propone un plan corto y se espera aprobación.
- Al terminar se ejecutan las comprobaciones disponibles y se pide al autor
  las pruebas jugables que no se puedan automatizar.
- Si cambia el alcance, primero se actualizan `GDD.md` y la spec afectada.
- No se agregan dependencias ni herramientas de gestión de specs.
- Todos los documentos nuevos se guardan dentro de `implementaciones/`.
