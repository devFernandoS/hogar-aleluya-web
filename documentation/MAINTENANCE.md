# Guía de Mantenibilidad - Hogar Aleluya

## 🎯 Objetivo Principal

Este documento tiene como objetivo principal **hacer el sistema mantenible y accesible para voluntarios**. Se busca modernizar el flujo de trabajo, automatizar el despliegue y asegurar que las funcionalidades clave, como el envío de correos, sean robustas y no generen costos.

---

## 📊 Antes y Después: Un Vistazo Rápido

### Sistema Anterior (Manual y Fragmentado)

-   **Despliegue**: Proceso 100% manual que requería acceso y conocimiento de la CLI de Firebase.
-   **Gestión de Código**: El repositorio en GitHub y el sitio en producción podían desincronizarse fácilmente.
-   **Funcionalidad de Email**: **No funcionaba**. Los mensajes se guardaban en una base de datos de Firebase, pero nunca se enviaba una notificación por correo al administrador.
-   **Curva de Aprendizaje**: Alta. Un nuevo voluntario necesitaba aprender sobre Git, Node.js y Firebase CLI, además de configurar todo manualmente.

### Sistema Actual (Automatizado e Integrado)

-   **Despliegue (CI/CD)**: **Totalmente automatizado**. Un `git push` a la rama `main` dispara un proceso (GitHub Actions) que construye, prueba y despliega el sitio en Firebase Hosting.
-   **Gestión de Código**: El código en `main` es la única fuente de verdad. Lo que está en el repositorio es lo que está en producción.
-   **Funcionalidad de Email**: **100% funcional y sin costo**. Utiliza una función serverless en Vercel y el servicio de Resend para enviar correos reales e inmediatos.
-   **Curva de Aprendizaje**: Baja. Un nuevo voluntario solo necesita conocimientos básicos de Git.

---

## 🛠️ Mejoras Clave de Mantenibilidad

### 1. CI/CD: El Corazón de la Automatización

El archivo `.github/workflows/deploy.yml` define el flujo de trabajo de integración y despliegue continuo.

**¿Cómo funciona?**
1.  Un desarrollador hace `git push` a la rama `main`.
2.  GitHub Actions detecta el cambio automáticamente.
3.  Ejecuta los pasos definidos:
    -   Configura el entorno de Node.js.
    -   Instala las dependencias (`npm install`).
    -   Construye el proyecto para producción (`npm run build:prod`).
    -   Despliega la carpeta `site/dist` a Firebase Hosting.

**Beneficio para voluntarios**: Ya no necesitan instalar Firebase CLI ni gestionar credenciales de despliegue. **Solo necesitan saber Git.**

### 2. Proceso de Build Estandarizado

Los comandos están definidos en `package.json` y son los mismos para todos.

-   `npm run build:dev`: Crea una versión de desarrollo en la carpeta `dist/`.
-   `npm run build:prod`: Crea una versión de producción, optimizada y lista para desplegar.
-   `npm run dev`: Construye y levanta un servidor local para pruebas en `http://localhost:8080`.

**Beneficio**: Consistencia. El proyecto se construye de la misma manera en el ordenador de un voluntario y en el entorno de CI/CD.

### 3. Gestión Segura de Credenciales

-   **No más claves en el código**: Todas las claves (Firebase, Resend) se gestionan con variables de entorno.
-   **`.env.example`**: Archivo de ejemplo que documenta qué variables se necesitan para el desarrollo local.
-   **GitHub Secrets**: Las claves para el despliegue y la build de producción se almacenan de forma segura en la configuración del repositorio de GitHub.

**Beneficio**: Seguridad y facilidad de configuración. Un nuevo voluntario solo necesita copiar `.env.example` a `.env` y rellenarlo.

### 4. Sistema de Email Funcional y Gratuito

La arquitectura desacoplada (frontend en Firebase, backend en Vercel) resolvió el problema del envío de correos sin generar costos.

**Flujo**:
1.  El usuario envía el formulario.
2.  El frontend (JavaScript) llama a una API en Vercel.
3.  La API en Vercel (Node.js) usa la API de Resend para enviar el correo.
4.  El administrador recibe el correo instantáneamente.

**Beneficio**: El sistema cumple su función más crítica (la comunicación) de manera fiable y sin costo para la ONG.

---

## 👥 Guía para Nuevos Voluntarios

Tu proceso de trabajo es ahora mucho más simple.

### Configuración por Primera Vez
1.  **Clona el repositorio**: `git clone <url_del_repositorio>`
2.  **Instala dependencias**: `cd site && npm install`
3.  **Configura tu entorno**: Copia `env.template` a `.env` y pide las credenciales de desarrollo.
4.  **Lee la guía de desarrollo**: `documentation/DEVELOPMENT.md` tiene todo lo que necesitas para empezar.

### Tu Workflow Diario (Ej: Modificar texto en una página)
1.  **Abre el proyecto** en tu editor de código.
2.  **Localiza y edita el archivo** en `site/src/`. Por ejemplo, `site/src/index.html`.
3.  **Prueba tus cambios localmente**:
    ```bash
    npm run dev
    ```
    Abre `http://localhost:8080` en tu navegador y verifica que todo se ve bien.
4.  **Confirma tus cambios con Git**:
    ```bash
    git add .
    git commit -m "feat: Actualizado el texto de bienvenida en la página principal"
    git push origin main
    ```
5.  **¡Listo!** GitHub Actions se encargará del resto. En unos minutos, tus cambios estarán en producción.

---

## 🎯 Métricas de Mantenibilidad

| Métrica                      | Antes                                 | Ahora                                   |
| ---------------------------- | ------------------------------------- | --------------------------------------- |
| **Tiempo de Despliegue**     | 10-15 min (manual, propenso a error)  | **2-3 min (automático, fiable)**        |
| **Conocimiento Requerido**   | Alto (Git, Node, Firebase CLI)        | **Bajo (Git básico)**                   |
| **Funcionalidad de Email**   | Nula (solo guardaba en base de datos) | **Completa (envío real e inmediato)**   |
| **Documentación**            | Limitada y dispersa                   | **Centralizada y completa**             |

El sistema ha pasado de ser una carga técnica a ser un activo fácil de gestionar que cualquier voluntario con conocimientos básicos de desarrollo web puede mantener.
