---
Nombre del proyecto: trabajo-integrador-piapc
Nombre del juego: Turno de Noche
Estudiante/s: Mauricio Jacki
Estado: en desarrollo
Versión: 0.5
---

# Implementaciones

Documentación del trabajo integrador de PIAPC.

## Documentos

- [GDD breve](GDD.md)
- [Índice de specs](specs/README.md)
- [Registro de código](registro%20de%20código/registro.md)

## Estado actual

- Spec 01 — Base jugable: completada.
- Spec 02 — Escenario variable y objetivo: completada.
- Spec 03 — Búsquedas BFS y A*: completada.
- Spec 04 — Guardias y navegación: implementada; pendiente de comprobación.
- Próxima spec: 05 — Percepción y FSM, después de comprobar la 04.

## Ejecución

```bash
npm install
npm run dev
```

Abrir `http://localhost:8080`.

## Controles actuales

| Acción | Tecla |
|---|---|
| Mover | WASD o flechas |
| Reiniciar partida | R |
| Nuevo escenario | N |
| Elegir búsqueda BFS / A* | 1 / 2 |
| Elegir navegación cruda / suavizada | 3 / 4 |
| Activar o desactivar depuración | V |

## Alcance de esta etapa

El prototipo genera un escenario con obstáculos, entrada marcada, reliquia y
dos guardias que patrullan puntos calculados sobre el mapa. El jugador debe
recoger la reliquia y volver a la entrada para ganar. La búsqueda activa
(BFS o A*) y la navegación (cruda o suavizada) afectan el siguiente tramo de
los guardias. La depuración permite ver la ruta del jugador y las rutas
restantes de ambos guardias. Todavía no hay visión, persecución, captura,
FSM ni panel de opciones clickeable.
