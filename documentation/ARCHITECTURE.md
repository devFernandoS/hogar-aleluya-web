# Arquitectura Técnica - Hogar Aleluya

Este documento describe la arquitectura del sistema, las decisiones tecnológicas clave y el flujo de datos, con un enfoque en la sostenibilidad económica para una ONG.

## 📊 Arquitectura General

La solución combina lo mejor de dos mundos: un frontend estático robusto y gratuito, y un backend serverless, también gratuito, para manejar la lógica dinámica como el envío de correos.

```
┌─────────────────────┐      ┌─────────────────────┐      ┌─────────────────────┐
│  Frontend Estático  │      │  Backend API        │      │  Servicio de Email  │
│ (Firebase Hosting)  │      │  (Vercel Functions) │      │  (Resend)           │
└──────────┬──────────┘      └──────────┬──────────┘      └──────────┬──────────┘
           │                           │                           │
           └─────(1) HTTP Request──────>                           │
                                         └─────(2) API Call───────>
                                                                     └─────(3) Envío SMTP──> Email Admin
```

1.  **Petición del Frontend**: El usuario llena un formulario en el sitio web (alojado en Firebase Hosting). El código JavaScript del navegador envía una petición `POST` a un endpoint de la API alojada en Vercel.
2.  **Lógica del Backend**: La función serverless en Vercel recibe la petición, valida los datos y utiliza la API de Resend para construir y enviar el correo electrónico.
3.  **Envío del Email**: Resend procesa la petición y se encarga de la entrega final del correo al destinatario (el administrador del Hogar Aleluya).

---

## 💡 ¿Por qué esta arquitectura? (Vercel vs. Firebase Functions)

La decisión principal fue **evitar costos recurrentes**.

### El Problema con Firebase Functions
- **Requiere un Plan de Pago (Blaze)**: Para usar Functions en un entorno de producción que interactúa con servicios externos, Firebase exige actualizar al plan "Blaze", que funciona bajo un modelo de "pago por uso".
- **Barrera de Entrada**: Este requisito implica asociar una tarjeta de crédito y, aunque el costo puede ser mínimo, representa una barrera y un riesgo financiero para una ONG sin un presupuesto fijo para tecnología.

### La Solución con Vercel
- **Capa Gratuita Generosa**: Vercel ofrece un plan gratuito robusto que incluye funciones serverless, 100GB de ancho de banda y 100 GB-hora de ejecución de funciones por mes.
- **Sin Tarjeta de Crédito**: No se requiere información de pago para acceder a estas funcionalidades.
- **Ideal para Cargas de Trabajo Ligeras**: El envío de correos desde un formulario de contacto es una tarea de bajo consumo, que se ajusta perfectamente a los límites del plan gratuito de Vercel.

### Comparativa de Costos

| Característica        | Firebase Functions (Plan Blaze) | Vercel Functions (Plan Gratuito) |
| --------------------- | ------------------------------- | -------------------------------- |
| **Costo Base**        | Mínimo $0.01/mes (requiere pago) | **$0/mes**                       |
| **Invocaciones**      | Se cobran por millón            | Incluidas en el plan gratuito    |
| **Tarjeta de Crédito**| Requerida                       | **No requerida**                 |
| **Viabilidad para ONG**| Baja (riesgo financiero)        | **Alta (sin costo)**             |

**Conclusión**: La combinación de **Firebase Hosting** (para el frontend) y **Vercel Functions** (para el backend) nos da una solución 100% gratuita, escalable y fácil de mantener.

---

## 🛠️ Stack Tecnológico

### Frontend
- **Alojamiento**: Firebase Hosting.
- **Lenguajes**: HTML5, CSS3, JavaScript (ES6+).
- **Librerías**: Ninguna dependencia de framework principal para mantener la simplicidad.

### Backend (API de Email)
- **Plataforma**: Vercel Serverless Functions.
- **Lenguaje**: Node.js.
- **Dependencias Clave**:
    - `resend`: para interactuar con la API de Resend.

### Servicio de Email
- **Proveedor**: [Resend](https://resend.com/).
- **Plan**: Gratuito (hasta 3,000 correos al mes).
- **Ventajas**: API sencilla, excelente documentación y un nivel gratuito suficiente para las necesidades del proyecto.

---

## 📁 Estructura del Proyecto y Flujo de Datos

### Estructura Clave
```
/
├── api/
│   └── send-email.js      # Función Serverless para Vercel
├── src/
│   ├── js/
│   │   └── formHandler.js # Lógica del formulario que llama a la API
│   └── ...                # Resto de archivos estáticos (HTML, CSS)
├── vercel.json            # Configuración de Vercel (CORS, reescrituras)
└── firebase.json          # Configuración de Firebase Hosting
```

### Flujo de Envío de Email

1.  **`formHandler.js`**:
    - Captura el evento `submit` del formulario.
    - Previene el comportamiento por defecto.
    - Recolecta los datos del formulario.
    - Realiza una llamada `fetch` al endpoint de la API en Vercel (ej: `https://hogar-aleluya-v2.vercel.app/api/send-email`).

2.  **`api/send-email.js` (Vercel)**:
    - Se ejecuta cuando Vercel recibe la petición `POST`.
    - Extrae y valida los datos (`nombre`, `email`, `mensaje`) del cuerpo de la petición.
    - Importa y configura el cliente de `Resend` con la `RESEND_API_KEY` (almacenada como variable de entorno en Vercel).
    - Llama a `resend.emails.send()` con los detalles del correo.
    - Devuelve una respuesta JSON al frontend (`{ success: true }` o un error).

3.  **Frontend (de nuevo)**:
    - Recibe la respuesta de la API.
    - Muestra un mensaje de éxito o error al usuario.

---

## 🔐 Variables de Entorno

La seguridad y la configuración se gestionan mediante variables de entorno, separadas para el frontend y el backend.

### Build del Frontend (`.env`)
Estas variables son "públicas" y se inyectan durante el proceso de construcción para configurar Firebase en el cliente.
```
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
...
```

### Backend en Vercel (Panel de Configuración)
Estas variables son "secretas" y solo son accesibles por la función serverless en el entorno de Vercel.
```
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_TO=correo@destinatario.com
EMAIL_FROM=noreply@tudominio.com
```

Este enfoque garantiza que las claves de API sensibles nunca se expongan en el código del lado del cliente.
