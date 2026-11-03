# Spec 07 — Entrega y presentación

**Estado:** completada (verificada por el autor)
**Fecha:** 03/11/2026
**Depende de:** 06
**Referencia:** `implementaciones/GDD.md` y requisitos del trabajo.

**Nota:** la spec se marca como completada al finalizar la implementación,
según indicación del autor. Las comprobaciones quedan detalladas al final para
que las ejecute el autor.

## Objetivo

Dejar el repositorio listo para entregar y preparar una presentación breve
que explique las decisiones y el funcionamiento del prototipo.

## Implementación

| Archivo | Cambio |
|---|---|
| `README.md` | README final con descripción, requisitos, ejecución, controles, documentación, limitaciones, modelo de IA, guion de presentación y consigna original conservada. |
| `implementaciones/specs/06-ui-bucle-completo.md` | Estado actualizado a completada tras la verificación del autor. |
| `implementaciones/specs/07-entrega-presentacion.md` | Estado, implementación, comportamiento esperado y comprobaciones actualizados. |
| `implementaciones/README.md` | Versión 1.0, estados de specs 06/07, enlace al README principal y alcance del prototipo actualizados. |
| `implementaciones/specs/README.md` | Estados de las specs 06 y 07 actualizados. |
| `implementaciones/registro de código/registro.md` | Cierre de la spec 06 y registro de los cambios y comprobaciones de la spec 07. |

## Comportamiento esperado

- El README existente en la raíz se actualiza con:
  - descripción breve del juego;
  - requisitos e instrucciones de ejecución;
  - controles;
  - enlaces a `implementaciones/GDD.md`, al índice de specs y al registro de
    código;
  - limitaciones conocidas;
  - modelo de IA usado;
  - consigna original de PIAPC conservada.
- El guion de presentación se integra en el README raíz, sin crear
  `implementaciones/PRESENTACION.md`, y cubre:
  - búsqueda (BFS y A*);
  - navegación (grilla cruda y suavizada);
  - percepción (cono, línea de vista y memoria);
  - objetivos y decisiones de los NPC;
  - FSM y sus estados;
  - escenarios variables y patrullaje adaptativo;
  - uso de OpenCode y proceso spec-driven, mostrando una spec;
  - limitaciones del prototipo.
- El guion está pensado para una exposición de 8 a 10 minutos e incluye una
  tabla de tiempos, un checklist de demo y preguntas posibles.
- Las instrucciones permiten ejecutar el proyecto desde una copia limpia.
- `npm run build` completa sin errores.

## Fuera de alcance

- Deploy, hosting, video, servicios pagos e informe extenso.
- Cambios de alcance o nuevas funcionalidades de juego.
- Creación de documentos nuevos para la presentación.

## Cómo comprobarla

No se ejecutaron comprobaciones durante la implementación. Ejecutar desde la
raíz del proyecto:

1. Seguir el README desde cero: `npm install`, `npm run dev`.
2. Abrir `http://localhost:8080` y jugar una partida completa.
3. Ejecutar `npm run build` y verificar que termina correctamente.
4. Revisar que el guion de presentación cubra todos los puntos pedidos y que
   se pueda exponer en 8 a 10 minutos.
5. Verificar que los enlaces a GDD, specs y registro de código funcionen.
6. Confirmar que la consigna original se conservó y que no se creó
   `implementaciones/PRESENTACION.md` ni ningún otro documento nuevo.
