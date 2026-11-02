---
Nombre del proyecto: trabajo-integrador-piapc
Nombre del juego: Turno de Noche
Estudiante/s: Mauricio Jacki
Estado: en desarrollo
Versión: 0.2
---

# Implementaciones

Documentación del trabajo integrador de PIAPC.

## Documentos

- [GDD breve](GDD.md)
- [Índice de specs](specs/README.md)
- [Registro de código](registro%20de%20código/registro.md)

## Estado actual

- Spec 01 — Base jugable: completada.
- Próxima spec: 02 — Escenario variable y objetivo.

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
| Reiniciar posición | R |

## Alcance de esta etapa

La base jugable incluye la grilla, el jugador y la colisión contra paredes.
Todavía no hay generación aleatoria, reliquia, guardias, búsquedas ni panel
de opciones.
