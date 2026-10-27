# Spec 01 — Base jugable

**Estado:** pendiente
**Depende de:** —
**Referencia:** `implementaciones/GDD.md`, secciones 3, 4 y 5.

## Objetivo

Reemplazar la escena demo del template por una escena jugable mínima:
grilla visible, jugador con movimiento y colisión manual contra paredes.

## Comportamiento esperado

- La escena principal ocupa el área de juego de 1024 x 768.
- La grilla es de 24 x 16 celdas de 32 px y el borde siempre está bloqueado.
- Se usa un mapa estático de prueba con algunos obstáculos internos.
- El jugador se mueve en 8 direcciones con WASD o flechas.
- La colisión es manual contra celdas bloqueadas, con deslizamiento por eje:
  si se mueve en diagonal contra una pared, no se traba.
- El jugador no puede atravesar paredes ni salir de la grilla.
- R reinicia la posición del jugador en el mismo mapa.
- Se muestra un texto mínimo con los controles disponibles.

## Fuera de alcance

- Generación aleatoria de escenarios.
- Guardias, percepción, FSM y captura.
- Reliquia, victoria y derrota.
- Algoritmos de búsqueda y navegación.
- Panel de botones, arte, sonido y animaciones.

## Cómo comprobarla jugando

1. Ejecutar `npm run dev` y abrir `http://localhost:8080`.
2. Mover al jugador con WASD y con flechas.
3. Intentar atravesar el borde y cada obstáculo.
4. Moverse en diagonal contra una pared y comprobar que desliza.
5. Presionar R y verificar que vuelve a la posición inicial.
