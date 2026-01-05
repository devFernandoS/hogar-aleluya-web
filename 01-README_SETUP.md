# Guía de Setup - Hogar Aleluya

## 🚀 Configuración Inicial

### 1. Instalar Dependencias

```bash
cd site
npm install
```

### 2. Configurar Variables de Entorno

1. Copiar `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Editar `.env` y agregar tus credenciales:
   - Credenciales de Firebase (desde Firebase Console)
   - API key de Resend (desde https://resend.com/api-keys)
   - Emails de configuración

### 3. Obtener Credenciales

#### Firebase
1. Ir a Firebase Console: https://console.firebase.google.com
2. Seleccionar proyecto
3. Configuración del proyecto > General
4. Copiar las credenciales a `.env`

#### Resend (Email Service)
1. Crear cuenta: https://resend.com/signup
2. Ir a API Keys: https://resend.com/api-keys
3. Crear nueva API key
4. Copiar a `.env` como `RESEND_API_KEY`
5. Verificar dominio (opcional, para usar tu dominio en EMAIL_FROM)

### 4. Build del Proyecto

```bash
# Desarrollo
npm run build:dev

# Producción
npm run build:prod
```

El resultado se genera en `dist/`

### 5. Probar Localmente

```bash
# Build y servir con Firebase
npm run dev

# O servir dist/ directamente
firebase serve
```

---

## 📧 Configuración del Backend de Email

### Opción 1: Vercel (Recomendado)

1. **Crear cuenta en Vercel**: https://vercel.com/signup
2. **Conectar repositorio GitHub**
3. **Configurar variables de entorno** en Vercel:
   - `RESEND_API_KEY`
   - `EMAIL_TO`
   - `EMAIL_FROM`
4. **Deploy automático** en cada push

### Opción 2: Netlify Functions

1. **Crear cuenta en Netlify**: https://netlify.com
2. **Conectar repositorio**
3. **Configurar variables de entorno**
4. **Deploy**

### Opción 3: Railway/Render

1. **Crear cuenta**
2. **Conectar repositorio**
3. **Configurar variables de entorno**
4. **Deploy**

---

## 🔐 GitHub Secrets (Para CI/CD)

Configurar en: Repository → Settings → Secrets and variables → Actions

### Secrets Necesarios:

```
FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN
FIREBASE_DATABASE_URL
FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID
FIREBASE_MEASUREMENT_ID
FIREBASE_SERVICE_ACCOUNT (JSON completo)
```

### Obtener Firebase Service Account:

```bash
# Opción 1: Usar token
firebase login:ci
# Copiar el token generado

# Opción 2: Service Account JSON
# Firebase Console > Project Settings > Service Accounts
# Generar nueva clave privada
# Subir el JSON completo como secret (codificado en base64)
```

---

## 📁 Estructura del Proyecto

```
site/
├── src/                    # Código fuente
│   ├── html/              # Archivos HTML
│   ├── css/               # Estilos
│   ├── js/                # JavaScript
│   │   ├── config/        # Configuración
│   │   └── formHandler.js # Manejo de formulario
│   └── img/               # Imágenes
├── api/                   # Backend API (email)
│   ├── send-email.js      # Serverless function
│   └── package.json
├── scripts/               # Scripts de build
│   ├── build.js
│   └── clean.js
├── dist/                  # Build output (generado)
├── .github/workflows/     # CI/CD
├── package.json           # Dependencias frontend
├── .env.example          # Template de variables
└── firebase.json          # Config Firebase Hosting
```

---

## 🔄 Workflow de Desarrollo

### Desarrollo Local

1. Editar archivos en `src/`
2. `npm run build:dev` (desarrollo)
3. `firebase serve` (probar localmente)

### Deploy

1. Hacer cambios en `src/`
2. Commit y push a GitHub
3. GitHub Actions hace build automáticamente
4. Deploy a Firebase Hosting

---

## 📝 Notas Importantes

- ✅ `dist/` está en `.gitignore` (se genera en build)
- ✅ `.env` está en `.gitignore` (no commiteas credenciales)
- ✅ `src/js/config/firebase.config.template.js` se procesa en build
- ✅ El backend de email se despliega por separado (Vercel/Netlify)

---

## 🆘 Troubleshooting

### Error: "Variables de entorno faltantes"
- Verificar que `.env` existe y tiene todas las variables
- Para producción, verificar GitHub Secrets o variables de Vercel

### Error: "Email no se envía"
- Verificar que `RESEND_API_KEY` es correcta
- Verificar que `EMAIL_FROM` está verificado en Resend
- Revisar logs del servidor (Vercel/Netlify)

### Error: "Build falla"
- Verificar que `src/` existe con los archivos
- Verificar Node.js >= 16
- Ejecutar `npm install` nuevamente

---

**¿Necesitas ayuda?** Revisa la documentación completa en `ANALISIS_DEFINITIVO_NODE_EMAIL.md`

