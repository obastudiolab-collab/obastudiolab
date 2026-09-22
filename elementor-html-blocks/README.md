# Bloques HTML de Elementor - codigo fuente actual de la web

Esta carpeta contiene el codigo real que esta (o debe estar) pegado en los widgets "HTML" de Elementor para cada pagina del sitio. Es un enfoque distinto al de la carpeta `elementor/` (plantillas JSON), que se probo primero y no dio buen resultado con el diseno a pantalla completa.

## Archivos

| Archivo | Pagina en WordPress |
|---|---|
| `pagina-inicio.html` | Home |
| `pagina-restaurante.html` | Restaurante / Cuaderno Dos |

## Imagenes

**Importante — como funcionan ahora las URLs de imagen:** los bloques HTML de esta carpeta ya NO llevan placeholders `{{URL_...}}`. Llevan escrita directamente la URL final tal cual la sirve la Mediateca de WordPress:

```
https://obarestaurante.es/wp-content/uploads/<nombre-del-archivo>
```

(confirmado con un ejemplo real: `https://obarestaurante.es/wp-content/uploads/oba-fondo-principal.jpg`). Esto solo funciona si se cumplen dos condiciones al subir las imagenes:

1. **La Mediateca no debe organizar los archivos en subcarpetas de mes/año.** Por defecto WordPress SÍ lo hace (`/wp-content/uploads/2026/09/archivo.jpg`), lo que rompería todas las URLs de este HTML. Hay que desactivar esa opción en **Ajustes → Multimedia → "Organizar mis archivos subidos en carpetas basadas en mes y año"** ANTES de subir nada.
2. **Cada archivo debe subirse una sola vez y conservar su nombre exacto.** Si ya existe un archivo con ese nombre en la Mediateca, WordPress renombra el nuevo (`archivo-1.jpg`) y la URL ya no coincidiría con la escrita en el HTML.

Todas las imagenes que usa la web (35 archivos) están recopiladas, ya en una sola carpeta plana y con el nombre final, en [`wp-uploads/`](../wp-uploads) (en la raiz del repo) — es la carpeta que hay que subir entera a la Mediateca. No hace falta copiar ninguna URL a mano: si el nombre coincide, el enlace ya escrito en el HTML funciona solo.

Las imagenes usadas en Home concretamente son:

| Archivo en `wp-uploads/` | Se usa en |
|---|---|
| `oba-logo.png` | Home (logo header) |
| `oba-premios.png` | Home (premios al hover del logo) |
| `oba-fondo-principal.jpg` | Home (fondo por defecto) |
| `oba-restaurante.jpg` | Home (fondo hover RESTAURANTE) |
| `oba-entorno.jpg` | Home (fondo hover ENTORNO) |
| `oba-nosotros.jpg` | Home (fondo hover NOSOTROS) |

El resto de archivos de `wp-uploads/` son para las páginas siguientes que se vayan generando (Restaurante, Entorno, Menú, Parajes, Huerto, Raw Season, Pack Noche, Maridajes...); no hace falta subirlos por partes, se puede subir la carpeta entera de una vez.

Los favicons (`imagenes/favicon/...`) NO van en `wp-uploads/` ni llevan URL en el HTML: en WordPress se configuran aparte, en **Apariencia → Personalizar → Identidad del sitio → Icono del sitio**.

## Enlaces internos

Los enlaces entre páginas (RESTAURANTE, ENTORNO, NOSOTROS, CONTACTO...) ya están escritos con la ruta final de WordPress (p. ej. `/restaurante/`, `/nosotros/#contacto`), no con `.html`. Para que funcionen, cada página de WordPress debe tener el slug exacto de esta tabla:

| Página | Slug en WordPress |
|---|---|
| Home | *(página de inicio)* → `/` |
| Restaurante | `restaurante` |
| Entorno | `entorno` |
| Nosotros | `nosotros` |
| Menú (Cuaderno Dos) | `menu` |
| Huerto | `huerto` |
| Parajes | `parajes` |
| Raw Season | `rawseason` |
| Eventos Especiales | `eventos` |
| Pack Noche | `pack-noche` |
| Maridaje Natura | `maridaje-natura` |
| Maridaje Matices Olvidados | `maridaje-matices-olvidados` |
| Aviso Legal | `aviso-legal` |
| Política de Privacidad | `politica-privacidad` |
| Política de Cookies | `politica-cookies` |
| Tienda | `tienda` |

El enlace a RESERVA (TheFork) es externo y no cambia. TIENDA ya NO es un enlace externo a `regalaoba.myshopify.com`: ahora apunta a `/tienda/`, la página de catálogo propia descrita más abajo.

## Como usarlos

Paso uno: desactiva en **Ajustes → Multimedia** la organizacion de archivos en carpetas de mes/ano (ver seccion "Imagenes" arriba) — solo hace falta hacerlo una vez.

Paso dos: sube TODOS los archivos de `wp-uploads/` a la Mediateca de WordPress, conservando su nombre exacto.

Paso tres: copia todo el contenido del archivo de esta pagina en un unico widget "HTML" de Elementor. Las imagenes ya cargan solas, no hace falta tocar ninguna URL.

Paso cuatro: la pagina debe estar configurada como "Elementor Canvas" (Configuracion de la pagina, Diseno de pagina), y la seccion o columna que contenga el widget no debe tener ningun Motion Effect ni Hover Animation activado, porque rompe el `position: fixed`.

## Notas tecnicas importantes

Todas las clases CSS llevan el prefijo `oba-` a proposito, para evitar colisiones con clases del tema activo (por ejemplo, Hello Elementor usa su propia `.site-header` con `max-width`, que chocaba con la nuestra).

Cada pagina incluye su propia copia del motor de traduccion ES/EN (diccionario `OBA_TRANSLATIONS` mas la funcion `obaApplyLang`). Guarda el idioma elegido en `localStorage`, asi que se mantiene al navegar entre paginas.

Para anadir texto nuevo en cualquier pagina: marcalo con `data-i18n="clave"` (o `data-i18n-attr="atributo:clave"` para atributos como `aria-label`) y anade esa clave con su texto ES/EN en el diccionario `OBA_TRANSLATIONS` de esa misma pagina.

Durante el desarrollo se usaron versiones con las imagenes embebidas en base64, solo para pruebas visuales rapidas sin depender de la Mediateca. Esas versiones no se han subido al repo por su peso; estos archivos con URLs de Mediateca ya escritas son la version limpia recomendada para produccion.

Cada pagina incluye tambien su propia copia del aviso de cookies (banner Aceptar/Rechazar) y el enganche a Google Analytics: por ahora usa un ID de marcador de posicion (`G-XXXXXXXXXX`) que no carga nada real. En cuanto tengais el ID de medicion real de Google Analytics, hay que cambiarlo en la constante `GA_MEASUREMENT_ID` de **cada** archivo de esta carpeta (no hay un sitio unico donde cambiarlo, porque cada pagina es un widget independiente).

## Tienda (`pagina-tienda.html`)

Esta pagina es distinta al resto: en vez de contenido estatico, monta el catalogo real de `regalaoba.myshopify.com` (plan Basic, sin checkout propio) directamente dentro de la web, con una cesta lateral propia. Notas importantes:

- Las fotos de producto se cargan del CDN de Shopify (`cdn.shopify.com/...`), no de la Mediateca — no hace falta subir nada a `wp-uploads/` para esta pagina.
- El catalogo (titulo, foto, precio, id de variante) esta escrito a mano en el array `OBA_PRODUCTS` dentro del `<script>` de `pagina-tienda.html`. Si se anade, retira o cambia de precio un producto en Shopify, hay que actualizar ese array a mano (y tambien `tienda.js` en la raiz del repo, que es la version usada por la web estatica de pruebas) — no se sincroniza solo.
- "FINALIZAR COMPRA" no usa la Storefront API (no hay token configurado): arma la URL "carrito permalink" de Shopify (`regalaoba.myshopify.com/cart/<variante>:<cantidad>,...`) y redirige ahi directamente al checkout real, con la cesta ya cargada. Si en el futuro se quiere que el catalogo se sincronice solo con Shopify (sin tocar este archivo a mano cada vez), hace falta crear una app personalizada en Shopify con acceso a la Storefront API y pasar a usar esa API en vez del array fijo.
