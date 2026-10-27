# Spec 03 — Búsquedas BFS y A*

**Estado:** pendiente
**Depende de:** 02
**Referencia:** `implementaciones/GDD.md`, secciones 9 y 14.

## Objetivo

Implementar BFS y A* sobre la grilla, con selección en vivo y una vista de
depuración que permita observar rutas y celdas exploradas.

## Comportamiento esperado

- Un módulo de pathfinding recibe grilla, origen, destino y algoritmo, y
  devuelve una ruta válida o `null` si no hay camino.
- Ambos algoritmos usan movimiento en 4 direcciones y respetan obstáculos.
- BFS explora por niveles y devuelve un camino de menor cantidad de pasos.
- A* usa distancia Manhattan como heurística.
- Se alterna BFS/A* con las teclas 1 y 2 y se muestra el algoritmo activo.
- Cambiar de algoritmo no regenera el escenario.
- V activa o desactiva la depuración.
- Con la depuración activa se pintan las celdas exploradas y la ruta
  calculada entre el jugador y la reliquia.
- La ruta se actualiza al moverse el jugador, al cambiar de algoritmo o al
  generar un escenario nuevo.

## Fuera de alcance

- Movimiento de guardias y patrullaje.
- Navegación cruda o suavizada.
- DFS, Dijkstra y comparaciones con métricas.
- Panel de botones; por ahora alcanza con teclado y texto de estado.

## Cómo comprobarla jugando

1. Activar la depuración con V y ver la ruta desde el jugador a la reliquia.
2. Alternar 1 y 2 en el mismo mapa y comparar ruta y celdas exploradas.
3. Moverse y confirmar que la ruta se recalcula y esquiva obstáculos.
4. Generar otro escenario y verificar que la ruta sigue siendo válida.
5. Comprobar que cambiar de algoritmo no cambia el mapa.
