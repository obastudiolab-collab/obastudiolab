# SEO en WordPress — qué poner en cada página

**Publicados en Elementor el 25/09/2026** (las 16 páginas). Los bloques de Elementor llevan H1, datos estructurados (JSON-LD), enlaces internos sin redirección y carga diferida de imágenes.
Lo que **no** puede ir dentro de un widget HTML (título, meta description, imagen para redes, canonical) se configura en el plugin de SEO de WordPress, página por página, con estos valores.

## Título, descripción e imagen para redes (aplicado en Rank Math el 25/09/2026)

| URL | Título SEO | Meta description | Imagen para redes (Mediateca) |
|---|---|---|---|
| `/` | oba- · Restaurante Estrella Michelin en Albacete, Castilla-La Mancha | oba-, Estrella Michelin y Estrella Verde en Casas-Ibáñez (Albacete, Castilla-La Mancha). Cocina de raíz manchega de Javier Sanz y Juan Sahuquillo. (146 car.) | `oba-restaurante.jpg` |
| `/restaurante` | Restaurante oba- · Menú degustación Estrella Michelin en Albacete | Cuaderno Dos, el menú degustación con Estrella Michelin de oba- en Casas-Ibáñez (Albacete): la memoria gastronómica de la Manchuela y de Castilla-La Mancha. (156 car.) | `oba-galeria-restaurante.jpg` |
| `/menu` | Cuaderno Dos · Menú degustación de oba- en Albacete | Cuaderno Dos, el menú degustación de oba-: 8 parajes de la Manchuela reinterpretados a partir de Las 1000 recetas de la cocina de Albacete, de Carmina Useros. (158 car.) | `oba-restaurante.jpg` |
| `/tienda` | Tienda · Bonos regalo del restaurante oba- | Bonos regalo digitales de oba-, restaurante con Estrella Michelin en Casas-Ibáñez, Albacete. Cuaderno Dos, Cuaderno Medio y experiencias con alojamiento. (153 car.) | `oba-fondo-principal.jpg` |
| `/entorno` | Entorno · La Manchuela que inspira la cocina de oba- | Los parajes, ríos y huertos de la Manchuela que inspiran cada plato de oba-, restaurante con Estrella Michelin en Casas-Ibáñez, Albacete. (137 car.) | `oba-entorno.jpg` |
| `/nosotros` | Nosotros · Javier Sanz y Juan Sahuquillo, chefs de oba- | Javier Sanz y Juan Sahuquillo, los chefs de oba-: una cocina con raíz nacida en Casas-Ibáñez (Albacete) y en Cañitas Maite, el negocio familiar que los vio crecer. (163 car.) | `oba-nosotros.jpg` |
| `/rawseason` | Raw Season · Cenas de temporada en oba-, Casas-Ibáñez | Raw Season: cuatro cenas únicas, una por estación, en oba-, restaurante con Estrella Michelin en Casas-Ibáñez, Albacete. (120 car.) | `oba-rawseason-flores.jpg` |
| `/pack-noche` | Pack Noche · Cena y alojamiento en Casas-Ibáñez · oba- | Pack Noche de oba-: cena Cuaderno Medio y alojamiento en Cañitas Maite Gastronómico, con desayuno incluido, en Casas-Ibáñez, Albacete. (134 car.) | `oba-pack-noche.jpg` |
| `/eventos` | Eventos especiales · Oba x Ima y Oba 360 · oba- | Oba x Ima y Oba 360 Experiencia: eventos especiales y experiencias únicas del restaurante oba- en Casas-Ibáñez, Albacete. (121 car.) | `oba-galeria-restaurante.jpg` |
| `/huerto` | Huerto · El huerto de oba- en el valle del Júcar | El huerto de oba- en el valle del Júcar, cerca de Jorquera: el origen de la cocina del restaurante con Estrella Michelin de Casas-Ibáñez, Albacete. (147 car.) | `oba-huerto.jpg` |
| `/parajes` | Qué ver en la Manchuela: Alcalá del Júcar y sus parajes · oba- | Qué ver en la Manchuela: Alcalá del Júcar, la Cueva de los Ángeles, Jorquera o Las Chorreras, los parajes que inspiran la cocina de oba- en Casas-Ibáñez. (153 car.) | `oba-paraje-foto-cueva-de-los-angeles.webp` |
| `/maridaje-natura` | Maridaje Natura · Bebidas de fermentación salvaje · oba- | Natura, el maridaje no/lo de oba-: bebidas fermentadas con levaduras salvajes que acompañan el menú del restaurante en Casas-Ibáñez. (132 car.) | `oba-maridaje-natura.webp` |
| `/maridaje-matices-olvidados` | Maridaje Matices Olvidados · Vinos de variedades ancestrales · oba- | Matices Olvidados, el maridaje de vinos de variedades ancestrales españolas que propone oba-, restaurante con Estrella Michelin en Casas-Ibáñez. (144 car.) | `oba-maridaje-matices-olvidados.webp` |
| `/aviso-legal` | oba- · Aviso Legal | Aviso legal de oba-: datos identificativos del titular del sitio web, condiciones de uso y propiedad intelectual del restaurante en Casas-Ibáñez, Albacete. (155 car.) | `oba-fondo-principal.jpg` |
| `/politica-privacidad` | oba- · Política de Privacidad | Política de privacidad de oba-: qué datos personales tratamos, con qué finalidad y cómo puedes ejercer tus derechos de acceso, rectificación y supresión. (153 car.) | `oba-fondo-principal.jpg` |
| `/cookies` | oba- · Política de Cookies | Política de cookies de oba-: qué cookies y almacenamiento local utilizamos, con qué finalidad y cómo puedes gestionarlas o eliminarlas. (135 car.) | `oba-fondo-principal.jpg` |

Las páginas legales pueden quedarse indexadas; no aportan tráfico pero tampoco molestan.

**30/09/2026 — /huerto:** compartía el logo porque Rank Math guardaba el ID de un adjunto borrado (2924). Reseleccionada `oba-huerto.jpg` (ID 3085) en Rank Math → Social. **Si se borra y se vuelve a subir una imagen, hay que volver a elegirla en Rank Math**: la URL puede seguir igual, pero el ID cambia.

## Páginas antiguas: redirecciones 301

**Hecho el 25/09/2026.** Estas páginas del WordPress anterior están en borrador, excluidas del sitemap (Rank Math → Mapa del sitio → Excluir entradas: `336,334,2260,340,2309,1249,2855,2565,599,2777`) y con redirección 301 en **Rank Math → Redirecciones**:

| URL antigua | Redirigir (301) a |
|---|---|
| `/carta` | `/menu` |
| `/bodega` | `/restaurante` |
| `/reservar` | `/restaurante` |
| `/contacto` | `/nosotros` |
| `/como-llegar` | `/nosotros` |
| `/oba-restaurante` | `/` |
| `/regala-oba` | `/tienda` |
| `/privacidad` | `/politica-privacidad` |
| `/prueba-main-page` | `/` |

`/carminauseros` se mantiene publicada a propósito (PDF del libro de Carmina Useros al que se llega por QR en el restaurante), pero con `noindex` y fuera del sitemap (ID 2777).

## robots.txt y sitemap

- `robots.txt` lo genera Rank Math (su editor está bloqueado por la protección de archivos del hosting); el del repo es copia de referencia y ya es correcto.
- `sitemap.xml` (raíz del repo) es la lista de referencia: el sitemap real (`/sitemap_index.xml`, generado por Rank Math) debe contener estas 16 URLs y ninguna más. Una vez retiradas las páginas antiguas, enviar el sitemap en Google Search Console.
- La página de cookies en producción es `/cookies` (no `/politica-cookies`, que daba 404): los bloques ya enlazan ahí.

## Search Console

- 25/09/2026: enviado `sitemap_index.xml` en la propiedad `https://obarestaurante.es/` y solicitada la indexación de la home.
- Pack Noche tenía una errata publicada (`position: absol;` en `.oba-reveal-logo`), corregida al publicar el bloque nuevo.

## Google Analytics (consentimiento previo)

- 25/09/2026: Site Kit ya **no** inserta el código de Analytics (Site Kit → Ajustes → Analytics → "Coloca el código de Google Analytics" desactivado). Los informes de Site Kit/Analytics siguen funcionando.
- Los 16 bloques llevan el ID real `G-4M7QS4D472` y cargan Analytics **solo** tras pulsar "Aceptar" en el banner de cookies. Si se rechaza o se ignora, no se carga nada.
- No se carga para usuarios con sesión iniciada en WordPress (clase `logged-in` en `<body>`), igual que hacía Site Kit.
- No volver a activar el código en Site Kit: se cargaría antes del consentimiento y se duplicarían las visitas.

## Ficha del restaurante (JSON-LD de la home) sincronizada con Google Maps

- 25/09/2026: añadidos `geo` (39.2873379, -1.4694749), `hasMap` (https://www.google.com/maps?cid=10886303023832780323) y horario (jueves a domingo, 13:00–17:00 y 20:00–23:30), copiados de la ficha pública de Google.
- **Si cambia el horario, hay que actualizarlo en Google Business Profile y en el bloque de la home a la vez.**

## Google Business Profile — pendiente (sin acceso todavía)

1. Enlace "Carta": cambiar `obarestaurante.es/carta` → `https://obarestaurante.es/menu`.
2. Añadir descripción del negocio (máx. 750 caracteres).
3. Categorías secundarias (p. ej. "Restaurante español", "Restaurante de cocina moderna").
4. Productos: Cuaderno Dos (`/menu`), Pack Noche (`/pack-noche`), Bonos regalo (`/tienda`).
5. Publicar Novedades cada 2–3 semanas con enlace a la web.
6. Revisar que "Para llevar" y "A domicilio" figuren como no disponibles.
7. No cambiar el nombre ("OBA-").

## Visibilidad en IA y Bing (25/09/2026)

- Rastreadores de IA comprobados con acceso (200): bingbot, OAI-SearchBot, GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended. No bloquearlos en Wordfence ni en robots.txt.
- `llms.txt` activo (Rank Math → Ajustes generales → Editar llms.txt): lista automática de páginas desactivada; resumen y "Contenido adicional" escritos a mano con datos clave y las 12 páginas principales. **Si cambia el horario, el teléfono o una página, actualizarlo también ahí.**
- Bing Webmaster Tools: propiedad importada desde Search Console (cuenta marketingcanitasmaite@gmail.com); sitemap `sitemap_index.xml` leído sin errores.
- IndexNow (Rank Math → Indexado instantáneo): activo; enviadas las 16 URLs.
- Wikidata: elemento **Q141556014** creado y enlazado desde el `sameAs` de la home. Ver [WIKIDATA.md](WIKIDATA.md).

## Caché de página (W3 Total Cache) — activada el 25/09/2026

- Rendimiento → Ajustes generales → Caché de página: **activada**, motor Disk: Enhanced. Minificación, caché de BD y de objetos siguen desactivadas a propósito (la minificación puede romper los scripts de los widgets HTML de Elementor).
- Tiempo de respuesta (TTFB) medido desde fuera: **~0,55 s → ~0,25 s** en las 16 páginas (el mínimo de este hosting para un archivo estático es ~0,16 s).
- Excluidos de la caché ("Nunca cachear las siguientes páginas"): `sitemap(_index)?\.xml`, `[a-z0-9_-]+-sitemap([0-9]+)?\.xml`, `main-sitemap\.xsl`, `llms\.txt` (además de los de serie). Comprobado: responden "Requested URI is rejected".
- No se cachea para usuarios conectados, ni páginas 404, ni URLs con parámetros. La caché de una página se vacía sola al actualizarla en Elementor; para vaciar todo: barra superior → Rendimiento → "Borrar todas las cachés".
- Probado tras activarla: títulos/descripciones/canonical/JSON-LD intactos, redirecciones 301, 404, `noindex` de /carminauseros, banner de cookies (aceptar/rechazar), Analytics solo con consentimiento, idioma ES/EN, menú, efecto de fondos de la home, tienda (añadir a la cesta) y vista móvil.

## Versión en inglés y SEO invisible — publicado el 30/09/2026

Generado con `build-seo.py` (ver README.md). Publicado vía API de WordPress (widget HTML de Elementor de cada página).

- **13 páginas inglesas** (IDs 3195–3207), hijas de `/en` (EN · Home, ID 3195). Mismo diseño, texto en inglés escrito en la página. Títulos/descripciones en Rank Math según `en/rankmath-meta.json`; imagen para redes = la de su página española. Incluidas en `page-sitemap.xml`.
- La portada inglesa es **`/en`** (sin barra final; `/en/` redirige con 301).
- **13 páginas españolas** actualizadas: fotos de fondo → `<img>` indexables (portada, Huerto, Pack Noche, Eventos, Raw Season), textos alternativos descriptivos, botón ES/EN como enlace a la otra versión, datos estructurados extra (Menú: menús con precio y platos · Tienda: 7 bonos como productos · Parajes: 7 lugares turísticos · Portada: acción de reserva).
- **Rank Math, descripciones españolas nuevas** (enfoque costa/escapada): portada ("a 1h30 de Valencia") y Pack Noche (título "Escapada gastronómica con Estrella Michelin · Pack Noche oba-").
- **llms.txt**: añadidas las secciones "Cómo llegar" (Valencia 117 km/1h30, Alicante 168 km/2h, AVE Madrid–Requena-Utiel 1h30) e "In English".
- Caché vaciada, IndexNow: 26 URLs enviadas. Comprobado sin sesión: 26 páginas 200, idioma, título, canonical e imagen para redes correctos.
- **hreflang (WPCode, fragmento ID 3248 "SEO · hreflang ES/EN + idioma de las páginas /en", activo)**: etiquetas es / en / x-default en cada par, `<html lang="en">` y `og:locale en_GB` en las páginas inglesas. Wordfence bloqueaba el guardado (falso positivo por contener PHP): el administrador lo permitió el 30/09/2026 con "Allowlist This Action". Si se añade una página traducida: regenerar con `build-seo.py` y pegar de nuevo el contenido de `wpcode-hreflang.php` (sin la línea `<?php`).
- **Más adelante (aprobación de los chefs)**: bloque "Información práctica" en el pie y desplegable "Antes de venir" (FAQ) en Restaurante.

## Si cambia X, tocar en Y (checklist de mantenimiento)

Regla general: **editar el bloque español del repositorio** (`pagina-*.html`), ejecutar `python3 build-seo.py` (regenera las 13 páginas inglesas de `en/`, que **nunca se editan a mano**) y antes de pegar en Elementor ejecutar `python3 build-seo.py --check`: compara lo publicado con la última versión de git y avisa si alguien cambió una página directamente en WordPress (en ese caso, traer primero ese cambio al bloque, o se perdería). Después de pegar: vaciar caché (Rendimiento → Borrar todas las cachés) y hacer commit.

| Si cambia… | Dónde hay que cambiarlo |
|---|---|
| **Horario** | Google Business Profile · `pagina-inicio.html` (JSON-LD `openingHoursSpecification`) · llms.txt (Rank Math → Editar llms.txt: "Datos clave", "Cómo llegar" e "In English") · este SEO.md · en `build-seo.py` la lista `JSONLD_KEEP` (horas) para que no salga aviso |
| **Teléfono** | Google Business Profile · `pagina-inicio.html` (JSON-LD) · `pagina-nosotros.html` · `pagina-aviso-legal.html` · llms.txt · Wikidata (P1329) · `JSONLD_KEEP` en `build-seo.py` |
| **Email** (info.restauranteoba@gmail.com) | `pagina-inicio.html` (JSON-LD) · `pagina-nosotros.html` · `pagina-restaurante.html` (botón eventos privados) · `pagina-aviso-legal.html` · `pagina-politica-privacidad.html` · llms.txt · `JSONLD_KEEP` |
| **Dirección** | Google Business Profile · `pagina-inicio.html` (JSON-LD) · `pagina-aviso-legal.html` · `pagina-politica-privacidad.html` · llms.txt · Wikidata (P6375) |
| **Precio o nº de pases de un menú** | `pagina-menu.html`: claves `menu_opt_dos` / `menu_opt_medio` del diccionario (es **y** en). Los datos para Google (JSON-LD del menú) salen de ahí solos al regenerar. `build-seo.py` avisa si la descripción de Google (`META['menu']`, y Rank Math de `/en/tasting-menu`) no menciona el precio nuevo. También llms.txt ("In English") |
| **Precio o producto de un bono** | Shopify (regalaoba.myshopify.com) · array `OBA_PRODUCTS` de `pagina-tienda.html` · `tienda.js` (raíz del repo, web estática de pruebas). Los datos para Google de la tienda salen del array al regenerar |
| **Reservas (TheFork)** | Desde el 20/10/2026 todos los botones de reserva llevan a la página propia `/reservar` (ID 599; inglés `/en/book`, ID 3254), que lleva dentro el widget de TheFork: `https://widget.thefork.com/es/a232639e-a80f-4cd3-8ece-2396f92f33e1` (UID del restaurante; la inglesa usa `/en/`). Si cambia el widget: solo `pagina-reservar.html` (y regenerar). El perfil de TheFork sigue en el JSON-LD `sameAs` de `pagina-inicio.html` |
| **ID de Google Analytics** | Constante `GA_MEASUREMENT_ID` de los 16 bloques españoles (las inglesas se regeneran). No activarlo en Site Kit |
| **Texto del aviso de cookies** | Función `texts()` del script de cookies en los 16 bloques españoles (es y en) · página `/cookies` |
| **Una foto** (mismo uso, otra imagen) | Subir a la Mediateca **con el nombre exacto** que ya usa el bloque (README.md → Imágenes). Si es un archivo nuevo: añadir su texto alternativo es/en al diccionario `ALT` de `build-seo.py`. Si se borra y se vuelve a subir la imagen para redes de una página, volver a elegirla en Rank Math (el ID cambia) |
| **Un texto de una página** | El bloque español: el texto en el HTML **y** su clave en el diccionario `OBA_TRANSLATIONS` (es y en) |
| **Página nueva con versión inglesa** | Bloque español con selector de idioma y diccionario · `PAGES`, `META` (y `ALT` si tiene fotos nuevas) en `build-seo.py` · crear en WordPress la española y la inglesa (hija de `/en`, Elementor Canvas, un widget HTML) · Rank Math (título, descripción, imagen) · pegar de nuevo `wpcode-hreflang.php` en WPCode (fragmento 3248) · llms.txt · IndexNow |
| **Página nueva solo en español** | Que su botón EN apunte a `/en` (portada inglesa) · Rank Math · llms.txt · IndexNow |

## Cambios de contenido — publicados el 20/10/2026

- **Portada:** NOSOTROS muestra la foto de Javier Sanz y Juan Sahuquillo (`oba-chefs.jpg`, ID 3251), también en el fondo del pie de todas las páginas (antes `oba-nosotros.jpg`, que sigue siendo la imagen para redes de /nosotros).
- **Restaurante:** foto nueva `oba-restaurante-plato.jpg` (ID 3252); fuera el botón "Regala oba-" de Cuaderno Dos y la pestaña Contrastes de Maridajes; apartado **Especiales oculto** (queda comentado en `pagina-restaurante.html`, se recupera quitando el comentario); "Pack Noche" → **Oferta Pack Noche**; nuevo apartado final **Regala oba-** con botón a /tienda.
- **Reservas dentro de la web:** página nueva `/reservar` + `/en/book` con el widget de TheFork. Se borró la redirección 301 `/reservar` → `/restaurante` de Rank Math (tenía 298 visitas) y el ID 599 salió de la lista de excluidos del sitemap. JSON-LD (`acceptsReservations`, `ReserveAction`) apunta a /reservar. llms.txt actualizado.
- **Parajes** y apartado Parajes de **Entorno:** quitado el botón RESERVAR.
- **Pack Noche:** renombrado a "Oferta Pack Noche" (página y Rank Math). **Pendiente:** precio original tachado delante de los 215 € cuando se tenga.
- **Tienda:** bono Cuaderno Dos con foto `oba-galeria-restaurante.jpg` (solo en la web; en Shopify sigue la anterior).
- WPCode (fragmento 3248) actualizado con el par /reservar ↔ /en/book; caché vaciada; IndexNow: 14 URLs.
