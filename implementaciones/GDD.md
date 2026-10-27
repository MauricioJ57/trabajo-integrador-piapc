# GDD breve — Turno de Noche

**Versión:** 0.1
**Fecha:** 27/10/2026
**Autor:** Mauricio Jacki
**Stack:** Phaser 4 + Vite + JavaScript
**Tipo:** prototipo 2D top-down de infiltración con NPC

## 1. Idea

El jugador es un ladrón que entra a un depósito nocturno, roba una reliquia
y debe volver a la salida sin ser atrapado por dos guardias. Los guardias
patrullan, ven, persiguen e investigan la última posición conocida del
jugador. El prototipo permite cambiar en vivo el algoritmo de búsqueda y la
forma de navegación para observar cómo cambia el comportamiento.

## 2. Objetivo y bucle de juego

1. El jugador aparece en la entrada del escenario.
2. Debe llegar hasta la reliquia, tomarla y volver a la entrada.
3. Si un guardia lo alcanza, pierde y puede reiniciar.
4. Al volver a la entrada con la reliquia, gana.

No hay combate. La única defensa del jugador es romper la línea de vista y
usar los obstáculos como cobertura.

## 3. Controles

| Acción | Tecla |
|---|---|
| Mover | WASD o flechas |
| Búsqueda BFS / A* | 1 / 2 |
| Navegación grilla cruda / suavizada | 3 / 4 |
| Nuevo escenario | N |
| Reiniciar partida | R |
| Mostrar/ocultar depuración | V |

Las mismas opciones están disponibles como botones en un panel lateral.

## 4. Escenario y variación

- Grilla de 24 x 16 celdas de 32 px; borde siempre bloqueado.
- Cada escenario se genera con obstáculos rectangulares aleatorios.
- La entrada, la reliquia y los puntos de patrulla se eligen entre celdas
  alcanzables.
- Se exige que la reliquia y los puntos de patrulla sean alcanzables desde
  la entrada mediante un flood fill (BFS de validación).
- La reliquia se ubica a una distancia mínima de la entrada.
- Los guardias comienzan lejos de la entrada.
- Si un intento genera un mapa inválido, se descarta y se reintenta.
- Cambiar búsqueda o navegación NO regenera el escenario, para poder
  comparar el mismo mapa. "Nuevo escenario" sí lo regenera.
- Todo escenario generado debe ser jugable y permitir completar el objetivo.

## 5. Jugador

- Movimiento continuo en 8 direcciones.
- Colisión manual contra celdas bloqueadas, con deslizamiento por eje.
- Velocidad algo mayor que la de un guardia persiguiendo, para que huir
  sea posible pero no trivial.
- Indicador visual de si lleva la reliquia.

## 6. NPC: guardias

Dos guardias con percepción, objetivos y comportamiento autónomo.

**Objetivos del NPC**

- Custodiar su zona mediante patrullaje.
- Detectar y perseguir al intruso.
- Investigar la última posición conocida si pierde de vista al jugador.
- Volver a su ruta cuando termina la investigación.
- Capturar al jugador por contacto.

**No** siguen una trayectoria fija preparada: la ruta de cada tramo se
calcula en tiempo de ejecución sobre el escenario actual.

## 7. Percepción

Un guardia detecta al jugador si se cumplen las tres condiciones:

1. Distancia menor o igual al radio de visión (aprox. 5 celdas).
2. El jugador está dentro del cono de visión (aprox. 70°) según la última
   dirección de movimiento del guardia.
3. La línea de vista entre guardia y jugador no está bloqueada por una
   pared u obstáculo (trazado de línea sobre la grilla).

Al detectar, guarda la posición del jugador como "última posición conocida"
y pasa a CHASE. Mientras lo vea, actualiza esa posición.

No hay oído ni medidor de sospecha: la detección es inmediata, pero solo se
pierde si el guardia llega a tocarlo.

## 8. Comportamiento: FSM

| Estado | Comportamiento | Salidas |
|---|---|---|
| PATROL | Va al siguiente punto de patrulla calculando la ruta; espera y gira el cono al llegar. | Ve al jugador → CHASE |
| CHASE | Persigue al jugador o a su última posición conocida. | Lo ve → mantiene CHASE. Llega sin verlo → SEARCH. Contacto → captura. |
| SEARCH | Va a la última posición conocida y gira el cono durante ~2 s. | Ve al jugador → CHASE. Termina el tiempo → RETURN. |
| RETURN | Calcula ruta al punto de patrulla más cercano. | Ve al jugador → CHASE. Llega → PATROL. |

El estado actual se muestra como etiqueta sobre cada guardia y el cono
cambia de color: blanco en PATROL, amarillo en SEARCH/RETURN y rojo en CHASE.

## 9. Algoritmos de búsqueda

Ambos operan sobre la misma grilla, con movimiento en 4 direcciones y
celdas bloqueadas:

- **BFS:** no informado, explora por niveles, camino de menor cantidad de pasos.
- **A*:** informado, usa distancia Manhattan como heurística.

Se eligen desde el panel o con 1/2. La ruta se recalcula cuando cambia el
objetivo, cuando el guardia queda bloqueado o cuando se regenera el mapa.
El modo depuración puede pintar celdas exploradas y la ruta resultante.

Cambiar de BFS a A* no cuenta como alternativa de navegación: es solo un
cambio de búsqueda.

## 10. Alternativas de navegación

Son seleccionables con 3/4 y funcionan con cualquiera de las dos búsquedas:

1. **Grilla cruda:** el guardia recorre la ruta celda por celda, moviéndose
   solo en horizontal/vertical y girando en cada esquina. Movimiento
   robótico y predecible.
2. **Ruta suavizada:** se simplifica la ruta eliminando puntos intermedios
   cuando hay línea de vista libre entre waypoints; el guardia se mueve en
   línea recta entre esos puntos, con chequeo de esquinas. Movimiento más
   natural y con diagonales.

El cambio se aplica en vivo al siguiente tramo de la ruta.

## 11. Patrullaje adaptativo

- Cada guardia recibe 4 puntos de patrulla alcanzables y separados.
- Al terminar un tramo, espera ~1 s y gira el cono.
- La ruta al siguiente punto se calcula con el algoritmo y la navegación
  seleccionados.
- Si se regenera el escenario, se generan nuevos puntos y rutas.
- Nunca se usa una lista fija de posiciones preparada de antemano.

## 12. Interfaz y retroalimentación

- Panel lateral con botones para búsqueda, navegación, nuevo escenario,
  reinicio y depuración.
- Texto de estado: algoritmo activo, navegación activa y si lleva la reliquia.
- Etiquetas de estado sobre los guardias.
- Conos de visión visibles.
- Mensaje de victoria o derrota con opción de reiniciar.

## 13. Victoria y derrota

- **Victoria:** volver a la entrada con la reliquia.
- **Derrota:** cualquier guardia toca al jugador.
- Reinicio con R: mismo escenario y configuración.
- Nuevo escenario con N: mapa, reliquia y patrullas nuevas.

## 14. Criterios de aceptación para la demo

1. El juego inicia y se puede jugar con WASD/flechas.
2. Se puede alternar BFS/A* y se observa la ruta o las celdas exploradas.
3. Se puede alternar grilla cruda/suavizada y el movimiento cambia.
4. Los guardias patrullan rutas calculadas sobre el mapa actual.
5. Al ser vistos, los guardias persiguen; al perder de vista, investigan
   la última posición y luego vuelven a patrullar.
6. Al ser tocado, se pierde; al volver con la reliquia, se gana.
7. "Nuevo escenario" cambia obstáculos, reliquia y patrullas, y el mapa
   sigue siendo completable.
8. Cambiar búsqueda o navegación no regenera el mapa.

## 15. Fuera de alcance

- Oído, ruido, puertas, llaves, combate, sprint o agacharse.
- DFS, Dijkstra, GOAP, árboles de comportamiento o utilidad.
- Sprites, animaciones, sonido, música, minimapa, puntaje o cronómetro.
- Semillas, guardado de escenarios, tablas comparativas o métricas.
- Multijugador, móvil, publicación y servicios externos.
- Más de dos guardias o más de un nivel.

## 16. Ejecución

```bash
npm install
npm run dev
```

Abrir `http://localhost:8080`. El README final detallará los pasos y las
opciones de control.
