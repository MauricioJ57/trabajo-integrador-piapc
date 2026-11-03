# Specs — Turno de Noche

Índice del proceso spec-driven del prototipo. Cada spec se implementa, se
prueba jugando y se cierra antes de pasar a la siguiente.

## Orden y dependencias

| Orden | Spec | Depende de | Estado |
|---|---|---|---|
| 01 | [Base jugable](01-base-jugable.md) | — | completada |
| 02 | [Escenario variable](02-escenario-variable.md) | 01 | completada |
| 03 | [Búsquedas BFS y A*](03-busquedas.md) | 02 | completada |
| 04 | [Guardias y navegación](04-guardias-navegacion.md) | 03 | completada |
| 05 | [Percepción y FSM](05-percepcion-fsm.md) | 04 | completada |
| 06 | [UI y bucle completo](06-ui-bucle-completo.md) | 05 | completada |
| 07 | [Entrega y presentación](07-entrega-presentacion.md) | 06 | completada |

La presentación de la spec 07 se integra en el README raíz, sin crear un
documento adicional.

## Convenciones

- Una spec por vez.
- Antes de implementar se propone un plan corto y se espera aprobación.
- Al terminar se dejan escritas las comprobaciones disponibles para que las
  ejecute el autor, junto con las pruebas jugables que no se automaticen.
- Si cambia el alcance, primero se actualizan `GDD.md` y la spec afectada.
- No se agregan dependencias ni herramientas de gestión de specs.
- Todos los documentos nuevos se guardan dentro de `implementaciones/`.
