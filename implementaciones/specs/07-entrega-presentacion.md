# Spec 07 — Entrega y presentación

**Estado:** pendiente
**Depende de:** 06
**Referencia:** `implementaciones/GDD.md` y requisitos del trabajo.

## Objetivo

Dejar el repositorio listo para entregar y preparar una presentación breve
que explique las decisiones y el funcionamiento del prototipo.

## Comportamiento esperado

- El README existente en la raíz se actualiza con:
  - descripción breve del juego;
  - requisitos e instrucciones de ejecución;
  - controles;
  - enlaces a `implementaciones/GDD.md` y al índice de specs;
  - limitaciones conocidas.
- Se crea `implementaciones/PRESENTACION.md` con un guion que cubra:
  - búsqueda (BFS y A*);
  - navegación (grilla cruda y suavizada);
  - percepción (cono, línea de vista y memoria);
  - objetivos y decisiones de los NPC;
  - FSM y sus estados;
  - escenarios variables y patrullaje adaptativo;
  - uso de OpenCode y proceso spec-driven, mostrando una spec;
  - limitaciones del prototipo.
- Las instrucciones permiten ejecutar el proyecto desde una copia limpia.
- `npm run build` completa sin errores.

## Fuera de alcance

- Deploy, hosting, video, servicios pagos e informe extenso.
- Cambios de alcance o nuevas funcionalidades de juego.

## Cómo comprobarla

1. Seguir el README desde cero: `npm install`, `npm run dev`.
2. Abrir `http://localhost:8080` y jugar una partida completa.
3. Ejecutar `npm run build` y verificar que termina correctamente.
4. Revisar que el guion de presentación cubra todos los puntos pedidos y
   que se pueda exponer en el tiempo disponible.
