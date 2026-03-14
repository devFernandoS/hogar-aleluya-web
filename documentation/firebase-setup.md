# Firebase Setup & CI/CD Documentation

## Proyecto

Este repositorio utiliza **Firebase Hosting** para desplegar el frontend estático y **GitHub Actions** para automatizar el despliegue (CI/CD).

Tecnologías principales:

* Firebase Hosting
* Firebase CLI
* GitHub Actions
* Node.js (solo para el pipeline de build si se agrega en el futuro)

---

# 1. Proyecto de Firebase

Proyecto utilizado para pruebas:

```
Project ID: hogar-aleluya-test
Hosting Site: hogar-aleluya-test
```

Este proyecto se usa como **entorno de pruebas (staging/test)**.

En el futuro se puede crear otro proyecto:

```
hogar-aleluya-prod
```

para producción.

---

# 2. Inicialización del proyecto

Inicialización realizada con:

```
firebase init hosting
```

Configuración elegida:

```
public directory: site
single page app: No
github actions: Yes
```

Archivos generados:

```
firebase.json
.firebaserc
.github/workflows/firebase-hosting-merge.yml
.github/workflows/firebase-hosting-pull-request.yml
```

---

# 3. Configuración de Firebase CLI

Instalación global:

```
npm install -g firebase-tools
```

Login:

```
firebase login
```

Asociar proyecto:

```
firebase use --add
```

Proyecto seleccionado:

```
hogar-aleluya-test
```

---

# 4. Archivo `.firebaserc`

Este archivo define el proyecto Firebase asociado.

Ejemplo:

```json
{
  "projects": {
    "default": "hogar-aleluya-test"
  }
}
```

Esto permite ejecutar:

```
firebase deploy
```

sin especificar el proyecto manualmente.

---

# 5. Configuración de Hosting

Archivo:

```
firebase.json
```

Configuración actual:

```json
{
  "hosting": {
    "public": "site",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

Directorio publicado:

```
site/
```

Este contiene:

```
site/
 ├ index.html
 ├ css/
 ├ js/
 └ img/
```

---

# 6. Integración con GitHub

Repositorio conectado:

```
devFernandoS/hogar-aleluya-web
```

Durante la inicialización se creó automáticamente un **Service Account** para el deploy automático.

Cuenta creada:

```
github-action-1181240257
```

Permiso:

```
Firebase Hosting Admin
```

---

# 7. GitHub Secrets

Se creó automáticamente el siguiente secret en GitHub:

```
FIREBASE_SERVICE_ACCOUNT_HOGAR_ALELUYA_TEST
```

Ubicación:

```
GitHub
→ Settings
→ Secrets and Variables
→ Actions
```

Este secret contiene el **JSON del Service Account** necesario para autenticar el deploy desde GitHub.

---

# 8. GitHub Token

Los workflows también utilizan:

```
secrets.GITHUB_TOKEN
```

Este token es generado automáticamente por GitHub en cada ejecución y permite:

* comentar en Pull Requests
* generar preview deployments
* interactuar con el repositorio

No es necesario configurarlo manualmente.

---

# 9. CI/CD Pipeline

Los workflows se encuentran en:

```
.github/workflows/
```

Archivos generados:

```
firebase-hosting-merge.yml
firebase-hosting-pull-request.yml
```

Flujo de despliegue:

```
Push a main
     ↓
GitHub Actions
     ↓
Build (si existe)
     ↓
Deploy automático
     ↓
Firebase Hosting
```

---

# 10. Deploy manual

También es posible hacer deploy manual:

```
firebase deploy
```

Esto publica el contenido de:

```
site/
```

en Firebase Hosting.

---

# 11. URL del sitio

Después del deploy el sitio queda disponible en:

```
https://hogar-aleluya-test.web.app
```

y

```
https://hogar-aleluya-test.firebaseapp.com
```

---

# 12. Buenas prácticas

Archivos que **no deben subirse al repositorio**:

```
node_modules/
dist/
.env
```

Archivo `.gitignore` recomendado:

```
node_modules
dist
.env
.firebase
```

---

# 13. Futuras mejoras

Posibles mejoras a implementar:

* Entorno de **producción separado**
* Deploy por ramas:

  * `test` → Firebase Test
  * `main` → Firebase Production
* Build automático del frontend
* Integración con backend (Firebase Functions o API externa)

---

# 14. Comandos útiles

Login:

```
firebase login
```

Seleccionar proyecto:

```
firebase use
```

Deploy:

```
firebase deploy
```

Ver proyectos:

```
firebase projects:list
```
