# Preguntas Frecuentes - Hogar Aleluya

## Migración completada

La página de Preguntas Frecuentes ha sido migrada a `site/src/preguntas-frecuentes.html` con contenido real extraído del workspace de Notion (Diseño - Prototipo de Baja Fidelidad - Hogar Aleluya).

## Fuentes de información

- **Notion:** Donar, Voluntarios, Inicio, Nosotros, Actividades, Observaciones y Sugerencias Generales
- **Eventos:** información de eventos del sitio (Feria del Usado, Día del Niño, Pinta Niño, Teatrarte, Bingo)

## Categorías y preguntas

### Sobre el Hogar
- ¿Cuál es el propósito del Hogar Aleluya?
- ¿Cuántos niños concurren al establecimiento?
- ¿En qué horario asisten los niños?
- ¿Cuál es la función pedagógica del Hogar?
- ¿Reciben subsidios del Estado?

### Donaciones
- ¿Cómo hago para convertirme en un donante mensual?
- ¿A qué se destinan los fondos?
- ¿Qué hacen con las donaciones que no necesitan?
- ¿Qué medios de pago puedo utilizar?
- ¿Qué tipo de donaciones puedo realizar?
- ¿Cuentan con donantes recurrentes?

### Eventos
- ¿Qué eventos realizan?
- ¿Cómo puedo participar en los eventos?
- ¿Qué es el Roperito Comunitario?

### Voluntariado
- ¿Qué talleres ofrecen?
- ¿Cómo me postulo como voluntario?
- ¿Cómo puedo saber que la organización es confiable?
- ¿Qué pasa con mis datos personales?

## Archivos creados/modificados

| Archivo | Descripción |
|---------|-------------|
| `site/src/preguntas-frecuentes.html` | Página HTML principal |
| `site/src/css/styles-preguntas-frecuentes.css` | Estilos de la página FAQ |
| `site/src/js/preguntas-frecuentes.js` | Script acordeón y cambio de categorías |

## Notas para actualización

1. **Imagen de cabecera:** La página usa `./img/eventos/fondo-eventos.png`. Si se desea una imagen específica para FAQ, crear `site/src/img/preguntas-frecuentes/` y actualizar la ruta.

2. **Preguntas futuras:** Para agregar o modificar preguntas, editar directamente el HTML manteniendo la estructura:
   ```html
   <div class="contenedor-pregunta">
       <p class="pregunta"><i class="fa-solid fa-chevron-right fa-icon-toggle"></i>Pregunta aquí</p>
       <div class="respuesta-contenedor">
           <p class="respuesta">Respuesta aquí</p>
       </div>
   </div>
   ```

3. **Diferencias con Preguntas frecuentes.docx:** El documento Word original no pudo leerse directamente. El contenido fue reconstruido desde Notion. Si el .docx contiene preguntas adicionales, conviene revisarlas manualmente e incorporarlas.
