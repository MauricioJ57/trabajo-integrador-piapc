---
Nombre del proyecto: trabajo-integrador-piapc
Nombre juego: Turno de Noche
Estudiante/s: Mauricio Jacki
Estado: prototipo funcional
Version: 1.0
---

# Turno de Noche

**Trabajo práctico integrador de PIAPC**  
Prototipo 2D top-down de infiltración con NPC, desarrollado con Phaser 4,
Vite y JavaScript.

El jugador es un ladrón que entra a un depósito nocturno, roba una reliquia y
debe volver a la entrada sin ser atrapado por dos guardias. Los guardias
patrullan, perciben, persiguen e investigan la última posición conocida. La
búsqueda y la navegación se pueden cambiar en vivo para observar cómo cambia
el comportamiento.

## Contenido

- [Requisitos](#requisitos)
- [Ejecución](#ejecución)
- [Controles](#controles)
- [Documentación](#documentación)
- [Limitaciones conocidas](#limitaciones-conocidas)
- [Modelo de IA usado](#modelo-de-ia-usado)
- [Presentación](#presentación)
- [Consigna original de PIAPC](#consigna-original-de-piapc)

## Requisitos

- Node.js 20 LTS o superior.
- npm.
- Navegador moderno con soporte para Canvas/WebGL.
- No se requieren claves, servicios externos ni backend.

## Ejecución

Desde la raíz del proyecto:

```powershell
npm install
npm run dev
```

Abrir `http://localhost:8080`.

Si PowerShell bloquea `npm.ps1`, usar los comandos equivalentes:

```powershell
npm.cmd install
npm.cmd run dev
```

El proyecto no necesita variables de entorno ni pasos adicionales para
ejecutarse desde una copia limpia.

Para generar la build de producción:

```powershell
npm run build
```

La build se genera en `dist/`.

## Controles

| Acción | Tecla |
|---|---|
| Mover | WASD o flechas |
| Elegir búsqueda BFS / A* | 1 / 2 |
| Elegir navegación grilla cruda / suavizada | 3 / 4 |
| Generar un escenario nuevo | N |
| Reiniciar la partida | R |
| Activar o desactivar la depuración | V |

Las mismas opciones están disponibles como botones en el panel lateral. En
victoria o derrota solo quedan habilitados Reiniciar y Nuevo escenario. El
juego comienza directamente, sin menú de inicio.

## Documentación

- [GDD breve](implementaciones/GDD.md)
- [Índice de specs](implementaciones/specs/README.md)
- [Registro de código](implementaciones/registro%20de%20código/registro.md)
- [Documentación de implementaciones](implementaciones/README.md)

## Limitaciones conocidas

- No hay menú de inicio, pausa, guardado, sonido, música, animaciones ni arte
  final.
- El prototipo tiene un solo nivel y dos guardias.
- Los escenarios son aleatorios y no se pueden reproducir con una semilla ni
  guardar.
- No incluye deploy, hosting ni soporte para dispositivos móviles.
- No hay combate, oído, puertas, llaves, sprint, minimapa, puntaje ni
  cronómetro.
- No hay un modelo de lenguaje dentro del juego.
- La interfaz y los controles están pensados para escritorio.

## Modelo de IA usado

El desarrollo se apoyó en **OpenCode** como asistente de código, con el modelo
**DeepSeek V4.1 Flash Free**. Se usó un proceso spec-driven básico: cada
cambio se planificó en una spec, se implementó y se registró en la
documentación del proyecto.

## Presentación

Guion sugerido para una exposición de 8 a 10 minutos.

| Tiempo | Bloque | Qué mostrar o explicar |
|---|---|---|
| 0:00–0:40 | Introducción | Presentar “Turno de Noche”, el objetivo de robar la reliquia y volver a la entrada, y el stack Phaser 4 + Vite + JavaScript. |
| 0:40–2:00 | Demo básica | Mostrar el panel y los controles; mover al jugador, recoger la reliquia y volver a la entrada. Mencionar victoria, derrota y reinicio. |
| 2:00–3:10 | Búsqueda | Alternar BFS y A* con 1/2 y mostrar la ruta y las celdas exploradas con V. BFS explora por niveles; A* usa distancia Manhattan como heurística. |
| 3:10–4:10 | Navegación | Alternar grilla cruda y ruta suavizada con 3/4 sobre el mismo mapa. Explicar movimiento celda por celda frente a waypoints con diagonales. |
| 4:10–5:40 | Percepción y FSM | Cruzar el cono de un guardia para activar CHASE; ocultarse para ver SEARCH y luego RETURN. Explicar cono, línea de vista, memoria y los cuatro estados. |
| 5:40–6:30 | NPC y escenarios | Mostrar los dos guardias, sus cuatro puntos de patrulla y el patrullaje adaptativo. Generar un escenario nuevo con N y mencionar la validación por flood fill. |
| 6:30–7:45 | OpenCode y specs | Mostrar una spec, el índice y el registro de código. Explicar el flujo planificar → implementar → documentar y el uso de OpenCode. |
| 7:45–9:00 | Cierre | Resumir limitaciones y trabajo futuro, y dejar espacio para preguntas. |

### Checklist para la demo

- Ejecutar `npm.cmd run dev` antes de comenzar.
- Abrir `http://localhost:8080` y tener a mano el GDD, el índice de specs y el
  registro de código.
- Generar un escenario con N antes de exponer y elegir un recorrido seguro.
- Activar la depuración con V para mostrar rutas y celdas visitadas.
- Si la partida termina antes de lo previsto, continuar con R o N.
- Si la exposición se acerca a los 8 minutos, acortar la demo inicial y el
  recorrido por la spec.

### Preguntas posibles

- **BFS vs A*:** ambos encuentran el camino más corto en una grilla sin pesos;
  A* usa una heurística y suele explorar menos celdas.
- **Navegación:** la grilla cruda sigue las celdas; la ruta suavizada elimina
  waypoints intermedios cuando hay línea de vista libre.
- **FSM:** PATROL, CHASE, SEARCH y RETURN separan vigilancia, persecución,
  investigación y regreso.
- **Escenarios:** se generan obstáculos, reliquia y patrullas nuevas; un flood
  fill descarta los mapas que no permiten completar el objetivo.

## Consigna original de PIAPC

### Trabajo práctico integrador de PIAPC

- Individual o equipo de hasta 2 integrantes.
- Prototipo pequeño y funcional de videojuego con uno o más NPC
  que tengan percepción, objetivos y comportamientos definidos.
- Al menos 2 algoritmos de búsqueda seleccionables, como BFS,
  DFS, Dijkstra o A*. Podemos incorporar más.
- Al menos 2 alternativas de navegación seleccionables.
  Cambiar el algoritmo de búsqueda no cuenta por sí solo
  como otra alternativa de navegación.
- Comportamiento organizado con FSM, árboles de comportamiento,
  utilidad o GOAP. No es necesario implementar todas las técnicas.
- Generar escenarios variables que cambien obstáculos, caminos
  u otros elementos que afecten los recorridos, no sólo la apariencia.
- Los escenarios deben ser jugables y permitir cumplir los objetivos.
- Si hay patrullaje, sus rutas deben adaptarse al escenario:
  no alcanza con una trayectoria fija preparada.
- Las alternativas deben poder seleccionarse y observarse jugando.
- No se exigen semillas, guardado de escenarios, comparaciones
  con condiciones idénticas, tablas ni métricas adicionales.
- Usar OpenCode y un proceso spec-driven básico.
- Entrega del GDD antes del martes 27/10/2026 a las 12:00 hs
  (hora de Argentina), en su apartado independiente de la plataforma.
- Entrega final del proyecto el 3/11/2026 y exposición el 4/11/2026.
  El 11/11 no hay actividades ni entregas.
- Repositorio público con prototipo, instrucciones de ejecución,
  README, GDD breve, specs y presentación.
- No se pide un informe extenso ni una carpeta de evidencias.
- No se exige MCP, un modelo de lenguaje dentro del juego
  ni servicios pagos.
