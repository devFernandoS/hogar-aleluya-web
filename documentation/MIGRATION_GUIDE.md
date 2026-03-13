# Guía de Migración - Hogar Aleluya

## 📋 Pasos para Migrar el Proyecto Actual

### Paso 1: Preparar Estructura (10 minutos)

1. **Crear carpeta `src/`** y mover archivos:

```bash
# En la raíz de Hogar-Aleluya
mkdir src
mkdir src/html src/css src/js src/img

# Mover archivos existentes
move *.html src/html/
move css/* src/css/
move js/* src/js/
move img/* src/img/
```

**O manualmente desde el explorador:**
- Crear carpeta `src/`
- Crear subcarpetas: `html/`, `css/`, `js/`, `img/`
- Mover todos los `.html` a `src/html/`
- Mover contenido de `css/` a `src/css/`
- Mover contenido de `js/` a `src/js/`
- Mover contenido de `img/` a `src/img/`

### Paso 2: Actualizar Rutas en HTML (30 minutos)

Los archivos HTML ahora están en `src/html/`, pero las rutas deben apuntar a donde estarán en `dist/`.

**Antes:**
```html
<link rel="stylesheet" href="./css/style-master.css" />
<script src="js/mail.js"></script>
```

**Después (se mantiene igual, el build las copia):**
```html
<link rel="stylesheet" href="./css/style-master.css" />
<script src="js/mail.js"></script>
```

**IMPORTANTE**: Las rutas relativas se mantienen iguales porque el build copia la estructura.

### Paso 3: Actualizar mail.js (15 minutos)

1. **Eliminar credenciales hardcodeadas** de `src/js/mail.js`
2. **Crear nuevo archivo** `src/js/config/firebase.config.js` que importa la configuración:

```javascript
// src/js/config/firebase.config.js (se crea automáticamente en build)
import firebaseConfig from './firebase.config.template.js';

// Si aún necesitas Firebase para otras cosas
// firebase.initializeApp(firebaseConfig);
```

3. **Actualizar** `src/js/mail.js` para usar la nueva estructura:

```javascript
// src/js/mail.js
// Ya no necesita credenciales, las obtiene del template procesado
import firebaseConfig from './config/firebase.config.js';

// Si necesitas Firebase para otras funcionalidades
// firebase.initializeApp(firebaseConfig);

// Las funciones de email ahora están en formHandler.js
// Este archivo puede eliminarse o simplificarse según necesites
```

### Paso 4: Actualizar scriptValidarContacto.js (20 minutos)

**Modificar** `src/js/scriptValidarContacto.js`:

1. **Agregar** al inicio del archivo (después de `$(document).ready`):

```javascript
// Cargar formHandler.js (asegúrate de incluirlo en el HTML)
// El formHandler.js ya tiene la función submitContactForm
```

2. **Modificar** la llamada a `saveComunications`:

**Antes:**
```javascript
saveComunications(name, nickname, asunto, emailid, msgContent);
```

**Después:**
```javascript
// Usar la nueva función de formHandler.js
if (typeof window.submitContactForm !== 'undefined') {
  const result = await window.submitContactForm({
    nombre: name,
    apellido: nickname,
    email: emailid,
    asunto: asunto,
    mensaje: msgContent
  });
  
  if (!result.success) {
    alert('Error: ' + result.message);
    return;
  }
} else {
  // Fallback si formHandler no está cargado
  console.error('formHandler.js no está cargado');
}
```

### Paso 5: Actualizar HTML (contacto.html) (10 minutos)

**En** `src/html/contacto.html`, **agregar** antes del cierre de `</body>`:

```html
<!-- Antes de los otros scripts -->
<script src="js/formHandler.js"></script>
<script src="js/config/firebase.config.js"></script>
<script src="js/mail.js"></script>
<script src="js/scriptValidarContacto.js"></script>
```

### Paso 6: Configurar Variables de Entorno (15 minutos)

1. **Copiar** `.env.example` a `.env`
2. **Agregar** tus credenciales reales (las que están en `js/mail.js` actualmente)
3. **NO commitees** `.env` (ya está en `.gitignore`)

### Paso 7: Instalar Dependencias (5 minutos)

```bash
cd Hogar-Aleluya
npm install
```

### Paso 8: Probar Build Local (10 minutos)

```bash
# Probar build en desarrollo
npm run build:dev

# Verificar que dist/ se creó correctamente
# Verificar estructura de carpetas

# Probar localmente
firebase serve
# o
npm run dev
```

### Paso 9: Configurar Resend (10 minutos)

1. **Crear cuenta**: https://resend.com/signup
2. **Obtener API key**: https://resend.com/api-keys
3. **Agregar a `.env`**: `RESEND_API_KEY=tu_key_aqui`
4. **Configurar emails** en `.env`:
   - `EMAIL_TO=contacto@hogaraleluya.org.ar`
   - `EMAIL_FROM=Hogar Aleluya <noreply@hogaraleluya.org.ar>`

### Paso 10: Deploy Backend API (20 minutos)

#### Opción A: Vercel (Recomendado)

1. **Crear cuenta**: https://vercel.com/signup
2. **Importar proyecto** desde GitHub
3. **Configurar**:
   - Root Directory: `Hogar-Aleluya/api`
   - Build Command: (vacío o `npm install`)
   - Output Directory: (vacío)
4. **Agregar variables de entorno**:
   - `RESEND_API_KEY`
   - `EMAIL_TO`
   - `EMAIL_FROM`
5. **Deploy**

#### Opción B: Netlify Functions

Similar proceso con Netlify.

### Paso 11: Actualizar API Endpoint en Frontend (5 minutos)

**En** `src/js/formHandler.js`, verificar que `API_ENDPOINT` apunte a tu backend:

```javascript
// Para Vercel
const API_ENDPOINT = 'https://tu-proyecto.vercel.app/api/send-email';

// O usar variable de entorno
const API_ENDPOINT = window.API_ENDPOINT || '/api/send-email';
```

### Paso 12: Configurar GitHub Secrets (15 minutos)

En GitHub Repository → Settings → Secrets:

Agregar todos los secrets listados en `.env.example`:
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- ... (todas las variables de Firebase)
- `FIREBASE_SERVICE_ACCOUNT` (JSON completo)

### Paso 13: Probar Deploy Completo (30 minutos)

1. **Commit y push** a GitHub
2. **Verificar** que GitHub Actions se ejecuta
3. **Verificar** que el build es exitoso
4. **Verificar** que el deploy a Firebase funciona
5. **Probar** formulario de contacto en producción

---

## ⚠️ Checklist de Migración

- [ ] Estructura `src/` creada
- [ ] Archivos movidos a `src/`
- [ ] `mail.js` actualizado (sin credenciales)
- [ ] `scriptValidarContacto.js` actualizado
- [ ] `formHandler.js` agregado a HTML
- [ ] `.env` configurado con credenciales
- [ ] `npm install` ejecutado
- [ ] Build local probado exitosamente
- [ ] Resend configurado
- [ ] Backend API desplegado (Vercel/Netlify)
- [ ] API endpoint configurado en frontend
- [ ] GitHub Secrets configurados
- [ ] Deploy completo probado
- [ ] Formulario de contacto funciona en producción

---

## 🔄 Opción Alternativa: Migración Gradual

Si prefieres migrar gradualmente:

### Fase 1: Setup Base
- Solo crear estructura y build process
- Mantener código actual funcionando
- No cambiar nada del código existente aún

### Fase 2: Migrar Credenciales
- Mover credenciales a variables de entorno
- Actualizar build process
- Probar que funciona igual

### Fase 3: Migrar Email
- Implementar backend de email
- Actualizar formulario gradualmente
- Mantener Firebase Database como backup

### Fase 4: Limpiar
- Eliminar código antiguo
- Optimizar estructura

---

## 📝 Notas Importantes

1. **Backup**: Hacer backup completo antes de empezar
2. **Testing**: Probar cada paso antes de continuar
3. **Commits**: Hacer commits frecuentes por cada paso
4. **Branch**: Considerar trabajar en una rama separada (`feature/migration`)

---

## 🆘 Problemas Comunes

### "Build falla: src/ no existe"
- Verificar que moviste los archivos a `src/`
- Verificar estructura de carpetas

### "Rutas no funcionan"
- Verificar que las rutas en HTML son relativas (empiezan con `./`)
- El build mantiene la estructura de carpetas

### "Email no se envía"
- Verificar que `RESEND_API_KEY` es correcta
- Verificar que el backend está desplegado
- Verificar que `API_ENDPOINT` apunta al backend correcto
- Revisar logs del backend (Vercel/Netlify)

### "Firebase no funciona"
- Verificar que las variables de entorno están en `.env`
- Verificar que `firebase.config.js` se genera correctamente en build
- Verificar que el script de Firebase SDK se carga antes

---

**¿Necesitas ayuda?** Revisa `README_SETUP.md` y `ANALISIS_DEFINITIVO_NODE_EMAIL.md`

