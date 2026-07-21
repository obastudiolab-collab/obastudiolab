# Bloques HTML de Elementor - codigo fuente actual de la web

Esta carpeta contiene el codigo real que esta (o debe estar) pegado en los widgets "HTML" de Elementor para cada pagina del sitio. Es un enfoque distinto al de la carpeta `elementor/` (plantillas JSON), que se probo primero y no dio buen resultado con el diseno a pantalla completa.

## Archivos

| Archivo | Pagina en WordPress |
|---|---|
| `pagina-inicio.html` | Home |
| `pagina-restaurante.html` | Restaurante / Cuaderno Dos |

## Como usarlos

Paso uno: sube las imagenes correspondientes a la Mediateca de WordPress y copia la URL de cada una.

Paso dos: abre el archivo y sustituye los placeholders `{{URL_...}}` por esas URLs reales. En `pagina-inicio.html` son: `{{URL_LOGO}}`, `{{URL_PREMIOS}}`, `{{URL_IMAGEN_RESTAURANTE}}`, `{{URL_IMAGEN_ENTORNO}}`, `{{URL_IMAGEN_NOSOTROS}}`. En `pagina-restaurante.html` son: `{{URL_LOGO_DARK}}`, `{{URL_GALLERY_RESTAURANTE}}`.

Paso tres: copia todo el contenido del archivo en un unico widget "HTML" de Elementor, en esa pagina.

Paso cuatro: la pagina debe estar configurada como "Elementor Canvas" (Configuracion de la pagina, Diseno de pagina), y la seccion o columna que contenga el widget no debe tener ningun Motion Effect ni Hover Animation activado, porque rompe el `position: fixed`.

## Notas tecnicas importantes

Todas las clases CSS llevan el prefijo `oba-` a proposito, para evitar colisiones con clases del tema activo (por ejemplo, Hello Elementor usa su propia `.site-header` con `max-width`, que chocaba con la nuestra).

Cada pagina incluye su propia copia del motor de traduccion ES/EN (diccionario `OBA_TRANSLATIONS` mas la funcion `obaApplyLang`). Guarda el idioma elegido en `localStorage`, asi que se mantiene al navegar entre paginas.

Para anadir texto nuevo en cualquier pagina: marcalo con `data-i18n="clave"` (o `data-i18n-attr="atributo:clave"` para atributos como `aria-label`) y anade esa clave con su texto ES/EN en el diccionario `OBA_TRANSLATIONS` de esa misma pagina.

Durante el desarrollo se usaron versiones con las imagenes embebidas en base64, solo para pruebas visuales rapidas sin depender de la Mediateca. Esas versiones no se han subido al repo por su peso; estos archivos con placeholders son la version limpia recomendada para produccion.

El enlace del boton RESTAURANTE en `pagina-inicio.html` apunta a `restaurante.html` (herencia del proyecto estatico original). Hay que actualizarlo a la URL real de la pagina de WordPress en cuanto este publicada.
