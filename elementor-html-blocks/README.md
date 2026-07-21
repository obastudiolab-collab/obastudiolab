# Bloques HTML de Elementor - codigo fuente actual de la web

Esta carpeta contiene el codigo real que esta (o debe estar) pegado en los widgets "HTML" de Elementor para cada pagina del sitio. Es un enfoque distinto al de la carpeta `elementor/` (plantillas JSON), que se probo primero y no dio buen resultado con el diseno a pantalla completa.

## Archivos

| Archivo | Pagina en WordPress |
|---|---|
| `pagina-inicio.html` | Home |
| `pagina-restaurante.html` | Restaurante / Cuaderno Dos |

## Imagenes

Todas las fotos y logos del sitio viven en `imagenes/` (en la raiz del repo), ya con el nombre con el que deben quedar en la Mediateca de WordPress:

| Archivo en `imagenes/` | Se usa en | Placeholder que reemplaza |
|---|---|---|
| `oba-logo.png` | Home | `{{URL_LOGO}}` |
| `oba-premios.png` | Home | `{{URL_PREMIOS}}` |
| `oba-restaurante.jpg` | Home (fondo hover) | `{{URL_IMAGEN_RESTAURANTE}}` |
| `oba-entorno.jpg` | Home (fondo hover) | `{{URL_IMAGEN_ENTORNO}}` |
| `oba-nosotros.jpg` | Home (fondo hover) | `{{URL_IMAGEN_NOSOTROS}}` |
| `oba-logo-dark.png` | Restaurante | `{{URL_LOGO_DARK}}` |
| `oba-galeria-restaurante.jpg` | Restaurante | `{{URL_GALLERY_RESTAURANTE}}` |

Nota: mientras no se suben a WordPress, `pagina-inicio.html` y `pagina-restaurante.html` apuntan directamente a `../imagenes/...` para poder previsualizarlas en el navegador. Hay que volver a dejarlas como placeholders `{{URL_...}}` (o pegar la URL real de la Mediateca) antes de pegar el bloque en Elementor, porque esa ruta relativa no existe en WordPress.

## Como usarlos

Paso uno: sube las 7 imagenes de `imagenes/` a la Mediateca de WordPress (conservan su nombre, asi es facil identificarlas) y copia la URL de cada una.

Paso dos: abre el archivo y sustituye las rutas `../imagenes/...` (o los placeholders `{{URL_...}}` si ya los restauraste) por esas URLs reales, segun la tabla de arriba.

Paso tres: copia todo el contenido del archivo en un unico widget "HTML" de Elementor, en esa pagina.

Paso cuatro: la pagina debe estar configurada como "Elementor Canvas" (Configuracion de la pagina, Diseno de pagina), y la seccion o columna que contenga el widget no debe tener ningun Motion Effect ni Hover Animation activado, porque rompe el `position: fixed`.

## Notas tecnicas importantes

Todas las clases CSS llevan el prefijo `oba-` a proposito, para evitar colisiones con clases del tema activo (por ejemplo, Hello Elementor usa su propia `.site-header` con `max-width`, que chocaba con la nuestra).

Cada pagina incluye su propia copia del motor de traduccion ES/EN (diccionario `OBA_TRANSLATIONS` mas la funcion `obaApplyLang`). Guarda el idioma elegido en `localStorage`, asi que se mantiene al navegar entre paginas.

Para anadir texto nuevo en cualquier pagina: marcalo con `data-i18n="clave"` (o `data-i18n-attr="atributo:clave"` para atributos como `aria-label`) y anade esa clave con su texto ES/EN en el diccionario `OBA_TRANSLATIONS` de esa misma pagina.

Durante el desarrollo se usaron versiones con las imagenes embebidas en base64, solo para pruebas visuales rapidas sin depender de la Mediateca. Esas versiones no se han subido al repo por su peso; estos archivos con placeholders son la version limpia recomendada para produccion.

El enlace del boton RESTAURANTE en `pagina-inicio.html` apunta a `restaurante.html` (herencia del proyecto estatico original). Hay que actualizarlo a la URL real de la pagina de WordPress en cuanto este publicada.
