# Spec 06 — UI y bucle completo

**Estado:** completada (verificada por el autor)
**Fecha:** 03/11/2026
**Depende de:** 05
**Referencia:** `implementaciones/GDD.md`, secciones 3, 12, 13 y 14.

## Objetivo

Cerrar la experiencia jugable con un panel lateral clickeable, estado de la
partida y mensajes claros de victoria y derrota.

## Implementación

| Archivo | Cambio |
|---|---|
| `src/game/scenes/Game.js` | Panel con botones clickeables, estados activos/deshabilitados, estado de partida y bloqueo de opciones en victoria/derrota. |
| `src/game/entities/guard.js` | Etiquetas de estado a 11 px y conos ligeramente más visibles, sin cambiar la IA. |
| `implementaciones/README.md` | Versión 0.7, estados de specs 05/06, controles y alcance actualizados. |
| `implementaciones/specs/05-percepcion-fsm.md` | Estado actualizado a completada tras la verificación del autor. |
| `implementaciones/specs/06-ui-bucle-completo.md` | Estado, implementación y criterios de prueba actualizados. |
| `implementaciones/specs/README.md` | Estados de las specs 05 y 06 actualizados. |
| `implementaciones/registro de código/registro.md` | Registro de archivos y comprobaciones de la spec 06. |

## Comportamiento esperado

- El área de juego convive con un panel lateral que muestra:
  - algoritmo de búsqueda activo y botones BFS/A*;
  - navegación activa y botones grilla/suavizada;
  - botones de nuevo escenario, reinicio y depuración;
  - indicador de si el jugador lleva la reliquia.
- Las teclas se muestran dentro de cada botón: `BFS (1)`, `A* (2)`,
  `Grilla (3)`, `Suavizada (4)`, `Depuración (V)`, `Nuevo escenario (N)` y
  `Reiniciar (R)`.
- El botón activo se distingue por borde y texto de acento, sin cambiar el
  relleno.
- Todas las opciones funcionan con mouse y con las teclas definidas mientras
  la partida está en curso.
- En victoria o derrota, solo quedan habilitados **Reiniciar** y **Nuevo
  escenario**; búsqueda, navegación y depuración se deshabilitan también por
  teclado.
- Cambiar búsqueda o navegación no regenera el escenario.
- La victoria y la derrota muestran un mensaje y permiten reiniciar con R o
  generar otro escenario con N.
- El estado muestra búsqueda, navegación, depuración, situación de la partida
  y reliquia.
- Las etiquetas de estado de los guardias y los conos son legibles.
- La interfaz no tapa el área de juego ni impide completar el objetivo.

## Fuera de alcance

- Menú de inicio, pausa, opciones persistentes, sonido, animaciones,
  puntaje, cronómetro y guardado.
- Sprites, arte final y publicación.

## Cómo comprobarla jugando

1. Completar una partida usando solo los botones del panel.
2. Perder y reiniciar; generar un escenario nuevo desde el panel.
3. Probar las cuatro combinaciones de búsqueda y navegación.
4. Confirmar que cambiar opciones no regenera el mapa.
5. Verificar que en victoria y derrota solo funcionan Reiniciar y Nuevo
   escenario, tanto con mouse como con teclado.
6. Comprobar los estados activos de BFS/A*, Grilla/Suavizada y Depuración.
7. Verificar que los mensajes de victoria y derrota se leen y permiten
   continuar.
8. Confirmar que el panel no tapa el tablero y que las etiquetas y los conos
   de los guardias se distinguen.
