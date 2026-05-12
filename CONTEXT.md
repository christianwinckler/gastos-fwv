
# Contexto – Snapshot DEV | fwv-app (gastos)

## Qué es este proyecto
Aplicación web desarrollada con Next.js 14 (App Router) para la gestión de gastos.
El frontend y backend viven en el mismo proyecto mediante rutas API.
La aplicación utiliza autenticación con next-auth y se integra con Google Sheets
/u otros servicios de Google mediante la librería googleapis.

## Estado del snapshot
Este snapshot representa el estado del entorno DEV.
No corresponde a producción y puede diferir funcionalmente de PROD.

## Stack técnico
- Framework: Next.js 14 (React 18)
- Arquitectura: App Router (`app/`)
- Autenticación: next-auth con middleware global
- Integraciones: Google APIs (lib/sheetsService.js)
- Styling: Tailwind CSS
- Scripts batch: carpeta `scripts/`
- Assets públicos: carpeta `public/`

## Objetivo del análisis
- Analizar estructura y arquitectura del proyecto
- Evaluar calidad y organización del código
- Proponer mejoras de:
  - mantenibilidad
  - claridad
  - performance
- Generar prompts claros y accionables para ejecución posterior
  mediante Claude Code sobre el entorno DEV real

## Alcance
- El análisis se centra en:
  - app/
  - lib/
  - scripts/
  - middleware
- No analizar infraestructura de build o deploy
- No evaluar pipelines CI/CD

## Restricciones
- No introducir nuevas dependencias sin justificación
- No modificar flujos de autenticación existentes
- No asumir comportamiento productivo
- No ejecutar código ni aplicar cambios directos sobre este snapshot

## Rol esperado del asistente
- Actuar como arquitecto / reviewer
- Analizar exclusivamente el snapshot entregado
- Producir instrucciones claras para un agente ejecutor (Claude Code)
