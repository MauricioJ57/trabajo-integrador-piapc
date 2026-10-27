# Spec 04 — Guardias, patrullaje y navegación

**Estado:** pendiente
**Depende de:** 03
**Referencia:** `implementaciones/GDD.md`, secciones 6, 10 y 11.

## Objetivo

Agregar dos guardias que patrullen con rutas calculadas en vivo, usando la
búsqueda seleccionada y una de las dos alternativas de navegación.

## Comportamiento esperado

- Hay dos guardias, cada uno con su lista de 4 puntos de patrulla generada
  por el escenario.
- Cada guardia calcula la ruta al siguiente punto con BFS o A* según la
  selección activa.
- Al llegar a un punto espera aproximadamente 1 segundo y pasa al siguiente.
- La navegación se alterna con 3 y 4 y se muestra la opción activa:
  - **Grilla cruda:** recorre la ruta celda por celda, solo en horizontal y
    vertical, girando en cada esquina.
  - **Ruta suavizada:** simplifica la ruta con línea de vista y se mueve en
    línea recta entre waypoints, incluyendo diagonales con chequeo de
    esquinas.
- Cambiar búsqueda o navegación no regenera el escenario y afecta el
  siguiente tramo calculado.
- Al generar un escenario nuevo se generan puntos de patrulla y rutas nuevas.
- Las rutas no son trayectorias fijas preparadas: se recalculan sobre el
  mapa actual.

## Fuera de alcance

- Cono de visión, percepción, persecución y captura.
- FSM completa; en esta spec el guardia solo patrulla.
- Sonido, animaciones y sprites.
- Panel clickeable.

## Cómo comprobarla jugando

1. Observar a los dos guardias recorriendo el mapa sin atravesar paredes.
2. Alternar 3 y 4 y comprobar que el movimiento cambia entre robótico y
   suavizado.
3. Alternar 1 y 2 y verificar que las rutas se recalculan sin regenerar el
   mapa.
4. Presionar N y comprobar que los puntos de patrulla y las rutas cambian.
5. Confirmar que el jugador sigue pudiendo completar el objetivo.
