# Spec 02 — Escenario variable y objetivo

**Estado:** pendiente
**Depende de:** 01
**Referencia:** `implementaciones/GDD.md`, secciones 2, 4 y 13.

## Objetivo

Generar escenarios variables y jugables, con entrada, reliquia y puntos de
patrulla alcanzables, y cerrar el objetivo de robar y volver a la entrada.

## Comportamiento esperado

- N genera un escenario nuevo; R reinicia la partida conservando el actual.
- El generador coloca obstáculos rectangulares aleatorios y celdas sueltas,
  sin tapar la entrada.
- La entrada se elige entre celdas libres; la reliquia se coloca a una
  distancia mínima de la entrada.
- Se generan 4 puntos de patrulla por guardia, alcanzables y separados entre
  sí y de la entrada.
- Una validación por flood fill (BFS) comprueba que la reliquia y todos los
  puntos de patrulla sean alcanzables desde la entrada.
- Si el intento es inválido, se descarta y se reintenta con menos obstáculos
  si hace falta.
- El jugador puede recoger la reliquia al pisarla y se muestra si la lleva.
- Al volver a la entrada con la reliquia se muestra un mensaje simple de
  victoria y se detiene la partida.
- Todas las configuraciones generadas deben permitir completar el objetivo.

## Fuera de alcance

- Guardias, derrota y captura.
- Visualización de búsquedas o navegación.
- Panel clickeable y mensajes elaborados.
- Puertas, llaves, semillas o guardado de escenarios.

## Cómo comprobarla jugando

1. Presionar N al menos cinco veces y verificar que cambian obstáculos,
   entrada y reliquia.
2. En cada escenario, recorrer el mapa hasta la reliquia y volver.
3. Confirmar que ningún mapa queda bloqueado ni con la reliquia inaccesible.
4. Comprobar que R conserva el mapa y que N lo reemplaza.
5. Verificar que al volver con la reliquia aparece la victoria.
