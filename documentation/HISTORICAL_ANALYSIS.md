# Archivo Histórico de Análisis y Planificación

Este documento consolida los análisis, propuestas y decisiones tomadas durante la fase de modernización del proyecto "Hogar Aleluya". Sirve como un registro cronológico de la evolución del plan.

---

## 1. Análisis Inicial del Proyecto (`ANALISIS_PROYECTO.md`)

-   **Estado**: El proyecto era un sitio web estático simple desplegado en Firebase Hosting.
-   **Tecnologías**: HTML5, CSS3, JavaScript vanilla y una versión antigua de jQuery y Firebase SDK.
-   **Problemas Identificados**:
    -   **Imágenes**: Pesadas, sin optimizar, sin lazy loading ni formatos modernos (WebP).
    -   **Responsive Design**: Incompleto, con valores fijos en píxeles que rompían la visualización en móviles.
    -   **Código**: Sin sistema de módulos (`package.json`), dependencias legacy, CSS fragmentado y código duplicado.
    -   **Performance**: Sin minificación de CSS/JS, múltiples peticiones de red.
    -   **Mantenibilidad**: Baja debido a la falta de estructura y documentación.
-   **Recomendación Inicial**: Iniciar una modernización gradual, priorizando la optimización de imágenes y el diseño responsive. Se plantearon tres posibles stacks: minimalista, moderno (recomendado) y basado en framework.

---

## 2. Propuesta Formal de Modernización (`ANALISIS_Y_PROPUESTA_MODERNIZACION.md`)

Este análisis profundizó en los problemas y estableció una hoja de ruta clara.

-   **Problema Crítico Encontrado**: **Credenciales de Firebase estaban hardcodeadas** directamente en el archivo `js/mail.js`, exponiéndolas públicamente en el repositorio de GitHub.
-   **Objetivos Clave de la Propuesta**:
    1.  **Seguridad**: Migrar las credenciales a variables de entorno y GitHub Secrets.
    2.  **CI/CD**: Implementar un pipeline con GitHub Actions para automatizar el despliegue.
    3.  **Modernización**: Actualizar el SDK de Firebase a la v9+ (modular).
    4.  **Optimización**: Crear un proceso de build para minificar y optimizar assets.
-   **Plan de Implementación**:
    -   **Fase 1 (Crítica)**: Crear una nueva estructura de proyecto (`src/`, `dist/`), migrar las credenciales y configurar los secrets en GitHub.
    -   **Fase 2**: Implementar el proceso de build y el workflow de CI/CD.
    -   **Fase 3 y 4**: Actualizar el SDK y aplicar optimizaciones de rendimiento.

---

## 3. Exploración de Alternativas (`OPCIONES_SIN_NODE.md`)

Se evaluó si era posible cumplir los objetivos sin introducir Node.js para el proceso de build, con el fin de mantener la simplicidad.

-   **Conclusión**: **Sí, era posible**, pero con desventajas.
    -   **CI/CD sin Node.js**: Se podía configurar un workflow simple en GitHub Actions que desplegara los archivos estáticos directamente.
    -   **Gestión de Credenciales sin Node.js**: Se podía usar un script de `sed` en bash dentro del workflow para reemplazar los placeholders de las credenciales.
    -   **Desventajas**: La optimización de assets (minificación, compresión de imágenes) tendría que ser manual o se perdería.
-   **Decisión**: Aunque era una opción viable para un enfoque minimalista, se decidió que los beneficios de un proceso de build con Node.js superaban la complejidad añadida.

---

## 4. Plan de Estructura y Ejecución (`ESTRUCTURA_NUEVA_PROYECTO.md` y `PLAN_CORRECTO.md`)

Inicialmente, hubo confusión sobre si modificar el proyecto existente o crear uno nuevo. Estos documentos solidificaron el enfoque correcto.

-   **Decisión Crítica**: **No modificar la carpeta existente `Hogar-Aleluya/`**. En su lugar, se crearía una nueva carpeta `site/` desde cero que contendría la nueva estructura del proyecto.
-   **Razón**: Esto mantendría el sitio en producción intacto y permitiría trabajar en la nueva versión de forma segura y aislada, usando el proyecto antiguo solo como referencia.
-   **Estructura Final Acordada**:
    ```
    /
    ├── Hogar-Aleluya/  # Proyecto antiguo, sin tocar
    └── site/           # Nuevo proyecto, donde se realiza todo el trabajo
        ├── src/
        ├── api/
        ├── dist/
        └── ...
    ```

---

## 5. Resúmenes de Progreso y Estado

-   `RESUMEN_EJECUTIVO.md`: Resumen inicial que destacaba el problema de las credenciales y el plan de acción general.
-   `RESUMEN_IMPLEMENTACION.md`: Documentaba los archivos que se crearon como parte de la nueva estructura (scripts, workflows, configuración).
-   `RESUMEN_FINAL.md`: Confirmaba que la nueva estructura en `site/` se había creado correctamente y que el proyecto antiguo `Hogar-Aleluya/` se mantenía como referencia.
-   `INSTRUCCIONES_RESTAURAR.md`: Guía para limpiar archivos generados por error en la carpeta `Hogar-Aleluya/`.
-   `CORRECCION_ESTRUCTURA_HTML.md`: Nota sobre un ajuste en el script de build para asegurar que los archivos HTML se copiaran a la raíz de `dist/` y no a `dist/html/`.

---

## 6. Meta-Análisis (`ANALISIS_DOCUMENTACION.md`)

Este documento sirvió para organizar y priorizar la gran cantidad de documentación generada, clasificando cada archivo `.md` por su nivel de importancia y su propósito, y trazando el flujo de decisiones que llevó al plan final.

Este archivo histórico demuestra un proceso de planificación metódico, donde los problemas fueron identificados, se propusieron soluciones, se evaluaron alternativas y se tomó una decisión informada y segura para la modernización del proyecto.
