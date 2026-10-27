# Spec 06 — UI y bucle completo

**Estado:** pendiente
**Depende de:** 05
**Referencia:** `implementaciones/GDD.md`, secciones 3, 12, 13 y 14.

## Objetivo

Cerrar la experiencia jugable con un panel lateral clickeable, estado de la
partida y mensajes claros de victoria y derrota.

## Comportamiento esperado

- El área de juego convive con un panel lateral que muestra:
  - algoritmo de búsqueda activo y botones BFS/A*;
  - navegación activa y botones grilla/suavizada;
  - botones de nuevo escenario, reinicio y depuración;
  - indicador de si el jugador lleva la reliquia.
- Todas las opciones funcionan con mouse y con las teclas definidas.
- Cambiar búsqueda o navegación no regenera el escenario.
- La victoria y la derrota muestran un mensaje y permiten reiniciar con R o
  generar otro escenario con N.
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
5. Verificar que los mensajes de victoria y derrota se leen y permiten
   continuar.
