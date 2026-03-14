# Guía de Desarrollo - Hogar Aleluya

Esta guía contiene toda la información necesaria para configurar, construir, probar y desplegar el proyecto.

## 🚀 Configuración Inicial

### 1. Instalar Dependencias

Navega a la carpeta `site` y ejecuta:

```bash
cd site
npm install
```

### 2. Configurar Variables de Entorno

1.  Copia el archivo de ejemplo `.env.example` y renómbralo a `.env`:

    ```bash
    cp .env.example .env
    ```

2.  Abre el archivo `.env` y añade las credenciales necesarias. Consulta la sección "Obtención de Credenciales" para más detalles.

## 🛠️ Flujo de Trabajo y Comandos

### Desarrollo Local

Para el desarrollo local (probar diseño, lógica de JavaScript, etc.), **no necesitas Firebase**. Usamos un servidor de desarrollo simple que se encarga de todo.

El flujo de trabajo es el siguiente:

1.  **Edita el código**: Realiza tus cambios en los archivos dentro de la carpeta `site/src/`.
2.  **Levanta el servidor de desarrollo**:
    ```bash
    npm run dev
    ```
3.  **Abre el navegador**: Visita `http://localhost:8080` para ver tus cambios.

El comando `npm run dev` se encarga de construir el proyecto en modo desarrollo y levantar el servidor local.

### Comandos Principales

Aquí está la lista de los comandos más importantes definidos en `package.json`:

-   `npm run dev`:
    **Acción**: Construye el proyecto en modo desarrollo y levanta un servidor local en `http://localhost:8080`. Es el comando principal para trabajar en el día a día.

-   `npm run build:dev`:
    **Acción**: Solo construye el proyecto en modo desarrollo. El resultado se guarda en la carpeta `dist/`.

-   `npm run build:prod`:
    **Acción**: Construye el proyecto para producción. Aplica optimizaciones como la minificación de archivos. Este es el comando que usa el CI/CD antes de desplegar.

-   `npm run clean`:
    **Acción**: Elimina la carpeta `dist/` para asegurar una construcción limpia.

-   `npm run deploy`:
    **Acción**: Despliega el contenido de la carpeta `dist/` a Firebase Hosting. **Nota**: Este comando es para despliegues manuales. El flujo principal es a través de CI/CD.

### Estructura de Carpetas

```
site/
├── src/           # Código fuente (aquí editas)
│   ├── css/
│   ├── js/
│   ├── img/
│   └── *.html
├── dist/          # Código compilado (generado automáticamente)
└── ...
```

## 📧 Pruebas del Formulario de Contacto

El formulario de contacto envía un correo a través de una API desplegada en Vercel.

-   **Para probar en local**:
    1.  Asegúrate de que la API ya esté desplegada en Vercel.
    2.  En `src/js/formHandler.js`, ajusta la constante `API_ENDPOINT` para que apunte a la URL de tu API en Vercel (ej: `https://tu-proyecto.vercel.app/api/send-email`).
    3.  Al enviar el formulario desde tu entorno local (`localhost:8080`), se enviará un correo real.

-   **Para simulación (sin enviar correos)**:
    Si solo quieres probar el diseño del formulario, puedes comentar temporalmente el código que realiza el `fetch` a la API en `src/js/formHandler.js`.

## ☁️ Despliegue

El proyecto tiene dos partes que se despliegan de forma independiente: el **Frontend** y el **Backend** (la API de correo).

### Frontend (Firebase Hosting)

-   **Plataforma**: Firebase Hosting.
-   **Método Principal (Automático)**: El despliegue se realiza automáticamente a través de **GitHub Actions** cada vez que se hace un `push` a la rama `main`. El workflow (`.github/workflows/deploy.yml`) se encarga de construir el proyecto (`npm run build:prod`) y subirlo a Firebase.
-   **Método Manual**: Puedes desplegar manualmente ejecutando `npm run deploy`.

### Backend (Vercel)

-   **Plataforma**: Vercel (usando el plan gratuito).
-   **Método**: Vercel está conectado a tu repositorio de GitHub. Desplegará automáticamente cualquier cambio que detecte en la carpeta `api/` en cada `push`.
-   **Configuración en Vercel**: Debes configurar las siguientes variables de entorno en el panel de Vercel para que el envío de correos funcione:
    -   `RESEND_API_KEY`
    -   `EMAIL_TO`
    -   `EMAIL_FROM`

## 🔐 Gestión de Credenciales

### Obtención de Credenciales
-   **Firebase (para el frontend)**:
    1.  Ve a la [Consola de Firebase](https://console.firebase.google.com/).
    2.  En `Configuración del proyecto > General`, busca la configuración de tu aplicación web.
    3.  Copia estas credenciales en tu archivo `.env`.

-   **Resend (para el backend)**:
    1.  Crea una cuenta en [Resend](https://resend.com/signup).
    2.  Ve a la sección de **API Keys** y crea una nueva clave.
    3.  Copia esta clave. La usarás en las variables de entorno de Vercel.

### Secrets de GitHub (para CI/CD)
Para que el despliegue automático funcione, debes configurar los "secrets" en tu repositorio de GitHub (`Settings > Secrets and variables > Actions`). Estos secrets son las mismas variables de Firebase que tienes en tu `.env`, además de la cuenta de servicio de Firebase.

-   `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, etc.
-   `FIREBASE_SERVICE_ACCOUNT`: El contenido del JSON de la cuenta de servicio que puedes generar desde la consola de Firebase.

## 🆘 Solución de Problemas Comunes

-   **Error: "Variables de entorno faltantes"**
    -   **Local**: Verifica que el archivo `.env` exista en la carpeta `site/` y tenga todas las variables.
    -   **Producción**: Asegúrate de que los secrets estén bien configurados en GitHub Actions.

-   **Error: "El correo no se envía"**
    -   Revisa los logs de tu función en el panel de Vercel.
    -   Confirma que la `RESEND_API_KEY` y los correos `EMAIL_TO` y `EMAIL_FROM` estén correctamente configurados como variables de entorno en Vercel.
    -   Verifica que el dominio de `EMAIL_FROM` esté autorizado en Resend.

-   **Error: "La build falla"**
    -   Asegúrate de que la carpeta `src/` exista y tenga todos los archivos.
    -   Confirma que tienes Node.js v16 o superior.
    -   Intenta ejecutar `npm install` de nuevo.
