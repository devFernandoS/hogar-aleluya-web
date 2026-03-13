# Hogar Aleluya - Nuevo Sitio

## ⚠️ IMPORTANTE

Este es el **nuevo proyecto** que se está desarrollando desde cero.

La carpeta `../Hogar-Aleluya/` contiene el **sitio actual en producción** y NO debe modificarse (solo como referencia).

---

## 🎯 Objetivos del Proyecto

Este proyecto moderniza el sitio de Hogar Aleluya con:

- ✅ **CI/CD Automatizado**: Deploy automático con GitHub Actions
- ✅ **Email Funcional**: Envío real de emails (no solo guarda en BD)
- ✅ **Mantenible**: Fácil para voluntarios y nuevos colaboradores
- ✅ **Documentado**: Guías completas y procesos claros

---

## 🚀 Inicio Rápido

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variables de Entorno

1. Copiar `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Editar `.env` y agregar tus credenciales

### 3. Build

```bash
# Desarrollo
npm run build:dev

# Producción
npm run build:prod
```

### 4. Probar Localmente

```bash
npm run dev
```

---

## 📁 Estructura

```
site/
├── src/              # Código fuente
│   ├── html/        # Archivos HTML (copiar desde ../Hogar-Aleluya/ cuando esté listo)
│   ├── css/         # Estilos
│   ├── js/          # JavaScript
│   └── img/         # Imágenes
├── api/             # Backend email (Vercel Functions)
├── scripts/         # Scripts de build
├── dist/            # Build output (generado)
└── ...
```

---

## 📚 Documentación Completa

- **Setup**: Ver `../README_SETUP.md`
- **Migración**: Ver `../GUIA_MIGRACION.md`
- **Análisis Técnico**: Ver `../ANALISIS_DEFINITIVO_NODE_EMAIL.md`
- **Mantenibilidad**: Ver `../OBJETIVOS_MANTENIBILIDAD.md`

---

## 🔄 Workflow para Voluntarios

### Hacer Cambios

1. Editar código en `src/`
2. Probar: `npm run build:dev`
3. Commit: `git commit -m "descripción"`
4. Push: `git push`
5. ✅ Deploy automático a Firebase

**No requiere comandos manuales de Firebase** - Todo es automático.

---

## 📧 Sistema de Email

El formulario de contacto ahora **envía emails realmente** (no solo guarda en BD):

- ✅ Email recibido inmediatamente por administradores
- ✅ Servicio gratuito (Resend - 3,000 emails/mes)
- ✅ Backend serverless (Vercel)
- ✅ Sin dependencia de PHP

---

**Nota**: Este proyecto está en desarrollo. El sitio actual sigue en `../Hogar-Aleluya/`

