# Spec 05 — Percepción y FSM

**Estado:** pendiente
**Depende de:** 04
**Referencia:** `implementaciones/GDD.md`, secciones 6, 7, 8 y 13.

## Objetivo

Dar a los guardias percepción visual y una FSM de cuatro estados, con
persecución, investigación, retorno, captura y derrota.

## Comportamiento esperado

- Cada guardia tiene un cono de visión de aproximadamente 70° y 5 celdas de
  radio, orientado según su última dirección de movimiento.
- La detección requiere distancia, ángulo y línea de vista libre; la línea
  de vista se bloquea con obstáculos de la grilla.
- Al detectar al jugador, el guardia recuerda su última posición conocida.
- FSM:
  - **PATROL:** recorre sus puntos de patrulla.
  - **CHASE:** persigue al jugador o a su última posición; si lo ve,
    actualiza la posición recordada.
  - **SEARCH:** llega a la última posición conocida y gira el cono durante
    aproximadamente 2 segundos.
  - **RETURN:** vuelve al punto de patrulla más cercano y retoma PATROL.
- En CHASE el guardia se mueve más rápido que patrullando, pero más lento
  que el jugador.
- Si el guardia toca al jugador, se produce la derrota y se detiene la
  partida.
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

1. Cruzar el cono de un guardia y verificar que cambia a CHASE.
2. Escaparse detrás de un obstáculo y observar que va a la última posición
   conocida y entra en SEARCH.
3. Esperar a que termine la búsqueda y confirmar que vuelve a PATROL.
4. Dejarse tocar y comprobar la derrota y el reinicio con R.
5. Repetir la persecución con BFS y A*, y con las dos navegaciones.
