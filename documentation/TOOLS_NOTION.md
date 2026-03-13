# MCP Notion: Múltiples Workspaces en Modo Desarrollo

## Resumen

Guía para configurar **múltiples workspaces de Notion** con MCP en Cursor, cuando necesitas acceso tanto al workspace de **Diseño** como al de **Analisis-hogar aleluya**.

---

## Estado Actual Detectado

- **Configuración en** `~/.cursor/mcp.json` (global)
- **Servidor activo:** Solo `notion-diseño-web` (URL: `https://mcp.notion.com/mcp`)
- **Workspace accesible:** El de diseño (Inicio, Prototipo, Donar, Nosotros, Secciones, etc.)
- **Workspace "Analisis-hogar aleluya":** No accesible con la configuración actual

---

## ¿Por qué solo aparece el de diseño?

El MCP de Notion usa **OAuth** y cada conexión está ligada a **un solo workspace**. Si agregaste 2 MCPs pero solo quedó uno, puede deberse a:

1. **Prioridad de configuración:** Cursor combina `~/.cursor/mcp.json` (global) y `.cursor/mcp.json` (proyecto). Si un servidor tiene el mismo nombre en ambos, gana el del proyecto.
2. **Solo una entrada guardada:** En el archivo global actual solo existe `notion-diseño-web`.
3. **OAuth compartido:** Si ambas instancias usan la misma URL sin nombres distintos, Cursor puede tratarlas como una sola y conservar solo la última sesión OAuth.

---

## Cómo configurar múltiples workspaces

### 1. Dos entradas distintas en `mcp.json`

Debes declarar **dos servidores con nombres diferentes** pero la **misma URL**:

```json
{
  "mcpServers": {
    "notion-diseño-web": {
      "url": "https://mcp.notion.com/mcp"
    },
    "notion-analisis-hogar-aleluya": {
      "url": "https://mcp.notion.com/mcp"
    }
  }
}
```

### 2. Dónde guardar la configuración

| Ubicación | Archivo | Alcance |
|-----------|---------|---------|
| **Global** | `~/.cursor/mcp.json` | Todos tus proyectos |
| **Proyecto** | `.cursor/mcp.json` (en la raíz del repo) | Solo este proyecto (ideal para Cloud Agents) |

Para desarrollo local: cualquiera sirve. Para que Cloud Agents y el equipo lo usen: mejor `.cursor/mcp.json` en el proyecto.

### 3. Autenticación OAuth por servidor

Después de agregar las dos entradas:

1. Reinicia Cursor.
2. Abre **Settings** (Ctrl + Shift + J) → **Tools & MCP**.
3. Deberías ver ambos servidores: `notion-diseño-web` y `notion-analisis-hogar-aleluya`.
4. Autentica **cada uno por separado**. En el flujo OAuth de Notion podrás elegir el workspace:
   - En uno: selecciona el workspace de **Diseño**.
   - En el otro: selecciona el workspace **Analisis-hogar aleluya**.

### 4. Nombres de las herramientas en Cursor

Con dos servidores, las herramientas se mostrarán con prefijos como:

- `notion-diseño-web/notion-search`
- `notion-analisis-hogar-aleluya/notion-search`

Así puedes usar cada workspace por separado.

---

## Pasos concretos para este proyecto

1. Crear `.cursor/mcp.json` en la raíz del proyecto (si quieres configuración por proyecto):

   ```
   Hogar Aleluya V2.0/
   └── .cursor/
       └── mcp.json
   ```

2. Contenido de `mcp.json`:

   ```json
   {
     "mcpServers": {
       "notion-diseño-web": {
         "url": "https://mcp.notion.com/mcp"
       },
       "notion-analisis-hogar-aleluya": {
         "url": "https://mcp.notion.com/mcp"
       }
     }
   }
   ```

3. Reiniciar Cursor.
4. Ir a **Settings → Tools & MCP** y verificar que aparezcan ambos.
5. Completar OAuth en ambos (eligiendo el workspace correcto en cada uno).

---

## Solución de problemas

### No aparece el segundo servidor

- Revisa que los nombres sean diferentes (`notion-diseño-web` vs `notion-analisis-hogar-aleluya`).
- Comprueba la sintaxis JSON (comas, llaves).
- Reinicia Cursor tras guardar cambios.

### OAuth no pide elegir workspace

- Notion puede recordar la última conexión. Desconecta en **Notion → Settings → Connections** y vuelve a conectar.
- Borra la conexión anterior antes de autenticar el segundo servidor.

### Cloud Agents solo usan el workspace del proyecto

- Usa `.cursor/mcp.json` dentro del proyecto, no solo en `~/.cursor/mcp.json`.
- Los Cloud Agents leen la configuración del proyecto.

---

## Notas técnicas

- El MCP de Notion usa OAuth; el `workspace_id` forma parte de la respuesta del token.
- Cada servidor con nombre distinto mantiene su propia sesión OAuth.
- Si "Analisis-hogar aleluya" está en otra cuenta de Notion, necesitarás configurar el MCP con esa cuenta (por ejemplo, usando otro perfil de Cursor o credenciales separadas).

---

## Referencias

- [Cursor: MCP integrations](https://cursor.com/help/customization/mcp)
- [Notion: Connecting to Notion MCP](https://developers.notion.com/docs/get-started-with-mcp)
- [Notion OAuth: workspace_id en token](https://developers.notion.com/changelog/oauth-token-response-now-includes-more-info-about-the-workspace)
