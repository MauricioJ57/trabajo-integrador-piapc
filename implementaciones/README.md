---
Nombre del proyecto: trabajo-integrador-piapc
Nombre del juego: Turno de Noche
Estudiante/s: Mauricio Jacki
Estado: en desarrollo
Versión: 0.4
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
- Próxima spec: 04 — Guardias y navegación.

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
| Activar o desactivar depuración | V |

## Alcance de esta etapa

El prototipo genera un escenario con obstáculos, entrada marcada y reliquia.
El jugador debe recoger la reliquia y volver a la entrada para ganar. La
búsqueda activa (BFS o A*) calcula la ruta al objetivo y la depuración permite
ver la ruta y las celdas exploradas. Todavía no hay guardias, navegación,
FSM ni panel de opciones clickeable.
