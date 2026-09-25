# SEO en WordPress — qué poner en cada página

**Publicados en Elementor el 25/09/2026** (las 16 páginas). Los bloques de Elementor llevan H1, datos estructurados (JSON-LD), enlaces internos sin redirección y carga diferida de imágenes.
Lo que **no** puede ir dentro de un widget HTML (título, meta description, imagen para redes, canonical) se configura en el plugin de SEO de WordPress, página por página, con estos valores.

## Título, descripción e imagen para redes (aplicado en Rank Math el 25/09/2026)

| URL | Título SEO | Meta description | Imagen para redes (Mediateca) |
|---|---|---|---|
| `/` | oba- · Restaurante con Estrella Michelin en Casas-Ibáñez, Albacete | oba-, restaurante con Estrella Michelin y Estrella Verde de Javier Sanz y Juan Sahuquillo en Casas-Ibáñez (Albacete). Cocina de raíz manchega. (145 car.) | `oba-restaurante.jpg` |
| `/restaurante` | Restaurante oba- · Menú degustación en Casas-Ibáñez, Albacete | Cuaderno Dos, el menú degustación de oba- en Casas-Ibáñez (Albacete): un viaje por los parajes y la memoria gastronómica de la Manchuela, con una Estrella Michelin. (164 car.) | `oba-galeria-restaurante.jpg` |
| `/menu` | Cuaderno Dos · Menú degustación de oba- en Albacete | Cuaderno Dos, el menú degustación de oba-: 8 parajes de la Manchuela reinterpretados a partir de Las 1000 recetas de la cocina de Albacete, de Carmina Useros. (158 car.) | `oba-restaurante.jpg` |
| `/tienda` | Tienda · Bonos regalo del restaurante oba- | Bonos regalo digitales de oba-, restaurante con Estrella Michelin en Casas-Ibáñez, Albacete. Cuaderno Dos, Cuaderno Medio y experiencias con alojamiento. (153 car.) | `oba-fondo-principal.jpg` |
| `/entorno` | Entorno · La Manchuela que inspira la cocina de oba- | Los parajes, ríos y huertos de la Manchuela que inspiran cada plato de oba-, restaurante con Estrella Michelin en Casas-Ibáñez, Albacete. (137 car.) | `oba-entorno.jpg` |
| `/nosotros` | Nosotros · Javier Sanz y Juan Sahuquillo, chefs de oba- | Javier Sanz y Juan Sahuquillo, los chefs de oba-: una cocina con raíz nacida en Casas-Ibáñez (Albacete) y en Cañitas Maite, el negocio familiar que los vio crecer. (163 car.) | `oba-nosotros.jpg` |
| `/rawseason` | Raw Season · Cenas de temporada en oba-, Casas-Ibáñez | Raw Season: cuatro cenas únicas, una por estación, en oba-, restaurante con Estrella Michelin en Casas-Ibáñez, Albacete. (120 car.) | `oba-rawseason-flores.jpg` |
| `/pack-noche` | Pack Noche · Cena y alojamiento en Casas-Ibáñez · oba- | Pack Noche de oba-: cena Cuaderno Medio y alojamiento en Cañitas Maite Gastronómico, con desayuno incluido, en Casas-Ibáñez, Albacete. (134 car.) | `oba-pack-noche.jpg` |
| `/eventos` | Eventos especiales · Oba x Ima y Oba 360 · oba- | Oba x Ima y Oba 360 Experiencia: eventos especiales y experiencias únicas del restaurante oba- en Casas-Ibáñez, Albacete. (121 car.) | `oba-galeria-restaurante.jpg` |
| `/huerto` | Huerto · El huerto de oba- en el valle del Júcar | El huerto de oba- en el valle del Júcar, cerca de Jorquera: el origen de la cocina del restaurante con Estrella Michelin de Casas-Ibáñez, Albacete. (147 car.) | `oba-huerto.jpg` |
| `/parajes` | Parajes de la Manchuela cerca de Casas-Ibáñez · oba- | Descubre los parajes naturales de la Manchuela alrededor de Casas-Ibáñez: Alcalá del Júcar, la Cueva de los Ángeles, Jorquera y más, cerca de oba-. (147 car.) | `oba-paraje-foto-cueva-de-los-angeles.webp` |
| `/maridaje-natura` | Maridaje Natura · Bebidas de fermentación salvaje · oba- | Natura, el maridaje no/lo de oba-: bebidas fermentadas con levaduras salvajes que acompañan el menú del restaurante en Casas-Ibáñez. (132 car.) | `oba-maridaje-natura.webp` |
| `/maridaje-matices-olvidados` | Maridaje Matices Olvidados · Vinos de variedades ancestrales · oba- | Matices Olvidados, el maridaje de vinos de variedades ancestrales españolas que propone oba-, restaurante con Estrella Michelin en Casas-Ibáñez. (144 car.) | `oba-maridaje-matices-olvidados.webp` |
| `/aviso-legal` | oba- · Aviso Legal | Aviso legal de oba-: datos identificativos del titular del sitio web, condiciones de uso y propiedad intelectual del restaurante en Casas-Ibáñez, Albacete. (155 car.) | `oba-fondo-principal.jpg` |
| `/politica-privacidad` | oba- · Política de Privacidad | Política de privacidad de oba-: qué datos personales tratamos, con qué finalidad y cómo puedes ejercer tus derechos de acceso, rectificación y supresión. (153 car.) | `oba-fondo-principal.jpg` |
| `/cookies` | oba- · Política de Cookies | Política de cookies de oba-: qué cookies y almacenamiento local utilizamos, con qué finalidad y cómo puedes gestionarlas o eliminarlas. (135 car.) | `oba-fondo-principal.jpg` |

Las páginas legales pueden quedarse indexadas; no aportan tráfico pero tampoco molestan.

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
