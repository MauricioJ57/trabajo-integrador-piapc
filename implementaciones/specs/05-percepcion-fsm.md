# Spec 05 — Percepción y FSM

**Estado:** completada (verificada por el autor)
**Fecha:** 03/11/2026
**Depende de:** 04
**Referencia:** `implementaciones/GDD.md`, secciones 6, 7, 8 y 13.

## Objetivo

Dar a los guardias percepción visual y una FSM de cuatro estados, con
persecución, investigación, retorno, captura y derrota.

## Implementación

| Archivo | Cambio |
|---|---|
| `src/game/config.js` | Velocidad de persecución, visión, barrido de búsqueda, distancia de captura y colores de conos/derrota. |
| `src/game/world/vision.js` | Línea de vista supercover, comprobación de ángulo/distancia y construcción del cono recortado por paredes. |
| `src/game/entities/guard.js` | FSM PATROL/CHASE/SEARCH/RETURN, última posición conocida, etiqueta de estado, cono y contacto con el jugador. |
| `src/game/scenes/Game.js` | Actualización de guardias con el jugador, captura, overlay de derrota, prioridad de victoria y reinicio de overlays. |

## Comportamiento esperado

- Cada guardia tiene un cono de visión de 70° y 5 celdas de radio, orientado
  según su última dirección de movimiento. El cono se dibuja siempre y se
  recorta al chocar con paredes.
- La detección requiere distancia, ángulo y línea de vista libre; la línea
  de vista se bloquea con obstáculos de la grilla.
- Al detectar al jugador, el guardia recuerda su última posición conocida.
- FSM:
  - **PATROL:** recorre sus puntos de patrulla. Durante la espera mantiene la
    última orientación del cono.
  - **CHASE:** persigue al jugador o a su última posición; si lo ve,
    actualiza la posición recordada.
  - **SEARCH:** llega a la última posición conocida y barre el cono 180°
    (±90°) durante 2 segundos.
  - **RETURN:** vuelve al punto de patrulla más cercano y retoma PATROL.
- En CHASE el guardia se mueve a 100 px/s; patrullando, buscando y
  regresando se mueve a 70 px/s.
- Si el guardia toca al jugador, se produce la derrota y se detiene la
  partida. La victoria tiene prioridad si ocurre en el mismo frame.
- El estado se muestra como etiqueta sobre el guardia y el cono cambia de
  color: blanco en PATROL, amarillo en SEARCH/RETURN y rojo en CHASE.
- La búsqueda y la navegación seleccionadas siguen funcionando en todos los
  estados.

## Fuera de alcance

- Oído, ruido, medidor de sospecha y detección gradual.
- Combate, dificultades o IA de equipo.
- Nuevos algoritmos de búsqueda o navegación.
- Panel clickeable y arte final.

## Cómo comprobarla jugando

1. Cruzar el cono de un guardia y verificar que pasa a CHASE, con etiqueta y
   cono rojos.
2. Escaparse detrás de un obstáculo y observar que va a la última posición
   conocida y entra en SEARCH, con cono amarillo.
3. Esperar los 2 segundos de barrido y confirmar que pasa a RETURN y luego a
   PATROL, con cono blanco.
4. Dejarse tocar en PATROL, CHASE, SEARCH y RETURN: debe aparecer la derrota
   y detenerse la partida.
5. Comprobar que R reinicia la partida y N genera un escenario nuevo desde la
   derrota.
6. Confirmar que no hay detección a través de paredes y que el cono visible se
   recorta contra ellas.
7. Repetir la persecución con BFS y A*, y con las dos navegaciones.
8. Confirmar que la victoria con la reliquia sigue funcionando y que el
   reinicio también restaura a los guardias.
