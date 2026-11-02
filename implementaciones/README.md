---
Nombre del proyecto: trabajo-integrador-piapc
Nombre del juego: Turno de Noche
Estudiante/s: Mauricio Jacki
Estado: en desarrollo
Versión: 0.3
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
- Próxima spec: 03 — Búsquedas BFS y A*.

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

## Alcance de esta etapa

El prototipo genera un escenario con obstáculos, entrada marcada y reliquia.
El jugador debe recoger la reliquia y volver a la entrada para ganar. Todavía
no hay guardias, búsquedas, navegación ni panel de opciones clickeable.
