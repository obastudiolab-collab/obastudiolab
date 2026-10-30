#!/usr/bin/env python3
"""
build-seo.py — SEO "invisible" de los bloques en español + versión en inglés.

Qué hace (se puede ejecutar tantas veces como se quiera: es idempotente):

  1. En los bloques en español (pagina-*.html, se reescriben en su sitio):
     - Fotos que eran fondos CSS (background-image) -> <img> reales con texto
       alternativo, para que Google Imágenes las indexe. Se ven igual.
     - Textos alternativos descriptivos en todas las fotos (mapa ALT de abajo).
     - Selector ES / EN convertido en enlaces a la página equivalente del otro
       idioma (antes traducía en el navegador y Google no veía el inglés).
     - Datos estructurados adicionales (bloque <!-- seo-extra -->): menú con
       precios, bonos regalo, lugares de la Manchuela, reserva...
  2. Genera en en/pagina-*.html la versión inglesa de cada página, con el texto
     ya escrito en inglés (sacado del diccionario OBA_TRANSLATIONS de cada
     bloque), enlaces internos a /en/..., JSON-LD traducido y lang = en.
  3. Genera en/hreflang-map.json (pares ES <-> EN) y wpcode-hreflang.php
     (fragmento para WPCode que imprime las etiquetas hreflang en <head>).

Si se cambia un texto: editar el bloque español y su diccionario (es + en) y
volver a ejecutar  python3 build-seo.py  -> luego pegar ambos bloques en
Elementor. Las páginas legales no tienen versión inglesa.
"""
import html
import json
import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
OUT_EN = HERE / 'en'
SITE = 'https://obarestaurante.es'
UP = SITE + '/wp-content/uploads/'
# Reservas: página propia con el widget de TheFork (antes se enlazaba a thefork.es)
RESERVE = {'es': SITE + '/reservar', 'en': SITE + '/en/book'}

# clave de archivo -> (ruta ES, ruta EN, nombre EN para migas de pan)
PAGES = {
    'inicio':                     ('/', '/en', 'oba-'),
    'restaurante':                ('/restaurante', '/en/restaurant', 'Restaurant'),
    'menu':                       ('/menu', '/en/tasting-menu', 'Tasting menu'),
    'entorno':                    ('/entorno', '/en/surroundings', 'Surroundings'),
    'nosotros':                   ('/nosotros', '/en/about-us', 'About us'),
    'huerto':                     ('/huerto', '/en/kitchen-garden', 'Kitchen garden'),
    'parajes':                    ('/parajes', '/en/manchuela', 'La Manchuela'),
    'rawseason':                  ('/rawseason', '/en/raw-season', 'Raw Season'),
    'pack-noche':                 ('/pack-noche', '/en/dinner-and-stay', 'Dinner & stay'),
    'eventos':                    ('/eventos', '/en/events', 'Special events'),
    'maridaje-natura':            ('/maridaje-natura', '/en/natura-pairing', 'Natura pairing'),
    'maridaje-matices-olvidados': ('/maridaje-matices-olvidados', '/en/matices-olvidados-pairing', 'Matices Olvidados pairing'),
    'tienda':                     ('/tienda', '/en/gift-vouchers', 'Gift vouchers'),
    'reservar':                   ('/reservar', '/en/book', 'Book a table'),
}
ES2EN = {es: en for es, en, _ in PAGES.values()}

# Título SEO y meta description para Rank Math (no se ven en la página, solo en
# Google y al compartir). 'en' = páginas inglesas nuevas; 'es' = solo las
# españolas que cambian (el resto sigue con lo de SEO.md). Se exportan a
# en/rankmath-meta.json. Imagen para redes = la misma que su página española.
META = {
    'inicio': {
        'en': ('oba- · Michelin-starred restaurant near Valencia, Spain',
               'oba-, one Michelin Star and a Green Star in Casas-Ibáñez (Albacete), 1h30 from Valencia. Cooking rooted in La Mancha by chefs Javier Sanz and Juan Sahuquillo.'),
        'es': ('oba- · Restaurante Estrella Michelin en Albacete, Castilla-La Mancha',
               'oba-, Estrella Michelin y Estrella Verde en Casas-Ibáñez (Albacete), a 1h30 de Valencia y 2h de Alicante y Murcia. Cocina de Javier Sanz y Juan Sahuquillo.'),
    },
    'restaurante': {
        'en': ('oba- Restaurant · Michelin-starred tasting menu near Valencia',
               "Cuaderno Dos, oba-'s Michelin-starred tasting menu in Casas-Ibáñez: the landscapes and culinary memory of La Manchuela, an easy trip from Valencia."),
        'es': ('Restaurante oba- · Estrella Michelin en la Manchuela, Albacete',
               'Cuaderno Dos, el menú degustación con Estrella Michelin de oba- en Casas-Ibáñez (Albacete), a 1h30 de Valencia: la memoria gastronómica de la Manchuela.'),
    },
    'menu': {
        'en': ('Cuaderno Dos · Tasting menu at oba-, Michelin Star in Spain',
               "Cuaderno Dos (€195, 8 courses) and Cuaderno Medio (€155, 6 courses): oba-'s tasting menus, inspired by Carmina Useros' 1971 Albacete recipe book."),
        'es': ('Menú degustación Estrella Michelin en Albacete · oba-',
               'Cuaderno Dos (195 €, 8 parajes) y Cuaderno Medio (155 €, 6 parajes): los menús degustación de oba-, inspirados en el recetario de Albacete de Carmina Useros.'),
    },
    'entorno': {
        'en': ('Surroundings · La Manchuela, the landscape behind oba-',
               'The gorges, rivers and kitchen gardens of La Manchuela that inspire every dish at oba-, a Michelin-starred restaurant in Casas-Ibáñez, Albacete.'),
    },
    'nosotros': {
        'en': ('About us · Chefs Javier Sanz and Juan Sahuquillo · oba-',
               'Javier Sanz and Juan Sahuquillo, the chefs behind oba-: cooking with roots, born in Casas-Ibáñez (Albacete) and in Cañitas Maite, their family business.'),
        'es': ('Nosotros · Javier Sanz y Juan Sahuquillo, chefs de oba-',
               'Javier Sanz y Juan Sahuquillo, chefs de oba- (Estrella Michelin): una cocina con raíz nacida en Casas-Ibáñez (Albacete) y en Cañitas Maite, su casa familiar.'),
    },
    'huerto': {
        'en': ("Kitchen garden · oba-'s garden in the Júcar valley",
               "oba-'s kitchen garden in the Júcar valley, near Jorquera: where the cooking of this Michelin Green Star restaurant in Casas-Ibáñez begins."),
    },
    'parajes': {
        'en': ('Things to do in La Manchuela: Alcalá del Júcar & more · oba-',
               'Alcalá del Júcar, the Cabriel gorges, Jorquera and Las Chorreras: what to see around oba- in La Manchuela, a day trip from Valencia or Alicante.'),
        'es': ('Qué ver en la Manchuela: Alcalá del Júcar y alrededores · oba-',
               'Alcalá del Júcar, la Cueva de los Ángeles, Jorquera o Las Chorreras: qué ver en la Manchuela (Albacete), a 1h30 de Valencia, junto al restaurante oba-.'),
    },
    'rawseason': {
        'en': ('Raw Season · Seasonal dinners at oba-, Casas-Ibáñez',
               'Raw Season: four one-off dinners, one per season, at oba-, a Michelin-starred restaurant in Casas-Ibáñez, Albacete (Spain).'),
    },
    'pack-noche': {
        'en': ('Night Pack Offer: Michelin-star food getaway & hotel · oba-',
               'Cuaderno Medio dinner at oba- (Michelin Star) and a hotel night with breakfast in Casas-Ibáñez, Spain: 1h30 from Valencia, 2h from Alicante or Murcia.'),
        'es': ('Oferta Pack Noche · Escapada gastronómica con Estrella Michelin',
               'Cena Cuaderno Medio en oba- (Estrella Michelin) y noche de hotel con desayuno en Casas-Ibáñez: escapada a 1h30 de Valencia y 2h de Alicante o Murcia.'),
    },
    'eventos': {
        'en': ('Special events · Oba x Ima and Oba 360 · oba-',
               'Oba x Ima and Oba 360 Experience: special events and private dining at oba-, a Michelin-starred restaurant in Casas-Ibáñez, Spain.'),
    },
    'maridaje-natura': {
        'en': ('Natura pairing · Wild-fermented drinks · oba-',
               "Natura, oba-'s no/low-alcohol pairing: drinks fermented with wild yeasts to accompany the tasting menu at our Michelin-starred restaurant."),
    },
    'maridaje-matices-olvidados': {
        'en': ('Matices Olvidados · Forgotten Spanish grapes wine pairing',
               "Matices Olvidados: oba-'s wine pairing of ancestral, lesser-known Spanish grape varieties, made by small producers who preserve a unique heritage."),
    },
    'reservar': {
        'es': ('Reservar mesa · oba-, restaurante Estrella Michelin en Albacete',
               'Reserva en oba-, Estrella Michelin en Casas-Ibáñez (Albacete), a 1h30 de Valencia y 2h de Alicante y Murcia. Aparcamiento gratuito y hotel en el mismo edificio.'),
        'en': ('Book a table · oba-, Michelin-starred restaurant in Spain',
               'Book your table at oba-, Michelin Star and Green Star restaurant in Casas-Ibáñez (Albacete), 1h30 from Valencia: choose day, guests and time.'),
    },
    'tienda': {
        'en': ('Gift vouchers · Michelin-star restaurant experience · oba-',
               'Digital gift vouchers for oba-, a Michelin Star and Green Star restaurant in Casas-Ibáñez, Spain: Cuaderno Dos, Cuaderno Medio and dinner-and-stay packages.'),
        'es': ('Bonos regalo · Cena en restaurante Estrella Michelin · oba-',
               'Regala una cena en oba-, Estrella Michelin y Estrella Verde en Casas-Ibáñez (Albacete): bonos digitales de Cuaderno Dos, Cuaderno Medio y noche de hotel.'),
    },
}

# Texto alternativo por archivo de imagen: (español, inglés)
ALT = {
    'oba-logo.png': ('oba-', 'oba-'),
    'oba-logo-dark.png': ('oba-', 'oba-'),
    'oba-chefs.jpg': ('Los chefs Javier Sanz y Juan Sahuquillo, de oba-, sentados entre la vegetación',
                      'Chefs Javier Sanz and Juan Sahuquillo of oba-, sitting among the greenery'),
    'oba-restaurante-plato.jpg': ('Pase de verduras con flor de calabacín y pimiento sobre plato blanco, menú degustación de oba-',
                                  'Vegetable course with courgette flower and pepper on a white plate, oba- tasting menu'),
    'oba-premios.png': ('Estrella Michelin y Estrella Verde Michelin', 'Michelin Star and Green Michelin Star'),
    'oba-fondo-principal.jpg': ('Comedor de oba- con paredes de madera y lámparas colgantes, restaurante con Estrella Michelin en Casas-Ibáñez (Albacete)',
                                'Dining room at oba-, with wooden walls and pendant lamps: Michelin-starred restaurant in Casas-Ibáñez, Albacete'),
    'oba-restaurante.jpg': ('Bocados del menú degustación de oba- servidos sobre madera y piel de oveja',
                            'Snacks from the oba- tasting menu served on wood and sheepskin'),
    'oba-entorno.jpg': ('Río entre carrizos en la Manchuela, el paisaje que inspira la cocina de oba-',
                        'River among the reeds in La Manchuela, the landscape that inspires oba-'),
    'oba-nosotros.jpg': ('El nombre oba- grabado en una pared de piedra de la Manchuela',
                         'The oba- name carved into a stone wall in La Manchuela'),
    'oba-galeria-restaurante.jpg': ('Plato de oba- con huevas sobre piedra y hoja verde, menú degustación Cuaderno Dos',
                                    'oba- dish with roe on stone and a green leaf, Cuaderno Dos tasting menu'),
    'oba-huerto.jpg': ('Huerto de oba- en el valle del Júcar, cerca de Jorquera',
                       "oba-'s kitchen garden in the Júcar valley, near Jorquera"),
    'DJI_0750.jpg': ('Vista aérea del huerto de oba- en el valle del Júcar',
                     "Aerial view of oba-'s kitchen garden in the Júcar valley"),
    'DSC_9598.jpg': ('Riego del huerto de oba- bajo los cortados del Júcar',
                     "Watering oba-'s kitchen garden below the Júcar cliffs"),
    'DSC_9626.jpg': ('Cultivos y hierbas en flor del huerto de oba-',
                     "Crops and flowering herbs in oba-'s kitchen garden"),
    'oba-pack-noche.jpg': ('Plato de oba- servido entre hojas verdes con una copa de vino: cena y alojamiento en Casas-Ibáñez',
                           'oba- dish served in green leaves with a glass of wine: dinner and stay in Casas-Ibáñez'),
    'oba-rawseason-caza.jpg': ('Bocados de la cena Raw Season Caza servidos en cuencos de madera',
                               'Bites from the Raw Season game dinner served in wooden bowls'),
    'oba-rawseason-flores.jpg': ('Bocado cubierto de pétalos de la cena Raw Season Flores',
                                 'Petal-topped bite from the Raw Season flowers dinner'),
    'oba-rawseason-fluvial.jpg': ('Crujientes de la cena Raw Season Fluvial, dedicada al pescado de río',
                                  'Crisps from the Raw Season river dinner, devoted to freshwater fish'),
    'oba-rawseason-vegetal.jpg': ('Guisantes sobre hoja verde en la cena Raw Season Vegetal',
                                  'Peas on a green leaf at the Raw Season vegetable dinner'),
    'oba-paraje-foto-alcala-del-jucar.webp': ('Alcalá del Júcar, en la Manchuela (Albacete)', 'Alcalá del Júcar, in La Manchuela (Albacete)'),
    'oba-paraje-foto-cueva-de-los-angeles.webp': ('Cueva de los Ángeles, en Villamalea', 'Cueva de los Ángeles cave, in Villamalea'),
    'oba-paraje-foto-la-terrera.webp': ('La Terrera, a orillas del río Cabriel', 'La Terrera, on the banks of the Cabriel river'),
    'oba-paraje-foto-ruta-del-molinar.webp': ('Ruta del Molinar, en la Manchuela', 'Ruta del Molinar trail, in La Manchuela'),
    'oba-paraje-foto-las-chorreras.webp': ('Cascadas de Las Chorreras del Cabriel, en Enguídanos', 'Las Chorreras waterfalls on the Cabriel, in Enguídanos'),
    'oba-paraje-foto-jorquera.webp': ('Jorquera, sobre un meandro del Júcar', 'Jorquera, above a bend of the Júcar river'),
    'oba-paraje-foto-tranco-del-lobo.webp': ('Tranco del Lobo, en Casas de Ves', 'Tranco del Lobo, in Casas de Ves'),
    'oba-paraje-09.png': ('Ilustración del menú Cuaderno Dos de oba-', "Illustration of oba-'s Cuaderno Dos menu"),
    'oba-maridaje-natura.webp': ('Ilustración del maridaje Natura de oba-', "Illustration of oba-'s Natura pairing"),
    'oba-maridaje-matices-olvidados.webp': ('Ilustración del maridaje Matices Olvidados de oba-', "Illustration of oba-'s Matices Olvidados wine pairing"),
}
for _slug, _name in [('huerta', 'Huerta'), ('pinar', 'Pinar'), ('afluente', 'Afluente'), ('corral', 'Corral'),
                     ('acantilado', 'Acantilado'), ('montebajo', 'Monte Bajo'), ('llanura', 'Llanura'), ('ribera', 'Ribera')]:
    ALT[f'oba-paraje-{_slug}.webp'] = (f'Ilustración del paraje {_name}, menú Cuaderno Dos de oba-',
                                       f"Illustration of the {_name} landscape, oba-'s Cuaderno Dos menu")

# Fondos CSS que pasan a ser <img>: clase del elemento -> tipo de conversión.
# (Los fondos del pie de página .oba-reveal-bg se quedan igual: son las mismas
# 4 fotos de la portada repetidas en todas las páginas.)
BG_SECTION_CLASSES = ('oba-huerto-hero', 'oba-rs-hero', 'oba-rs-card')

# Cadenas de los JSON-LD existentes y su traducción
JSONLD_EN = {
    'Restaurante oba-': 'oba- Restaurant',
    'Restaurante con una Estrella Michelin y una Estrella Verde de Javier Sanz y Juan Sahuquillo en Casas-Ibáñez, Albacete. Cocina de raíz manchega a través del menú degustación Cuaderno Dos.':
        'Restaurant with one Michelin Star and a Green Michelin Star by chefs Javier Sanz and Juan Sahuquillo in Casas-Ibáñez, Albacete (Spain). Cooking rooted in La Mancha, told through the Cuaderno Dos tasting menu.',
    'Cocina de autor': 'Signature cuisine',
    'Cocina manchega': 'La Mancha cuisine',
    'Cocina creativa': 'Creative cuisine',
    'Estrella Michelin — Guía MICHELIN': 'Michelin Star — MICHELIN Guide',
    'Estrella Verde Michelin — Guía MICHELIN': 'Green Michelin Star — MICHELIN Guide',
    'Chef y cofundador de oba-, restaurante con Estrella Michelin y Estrella Verde en Casas-Ibáñez (Albacete, Castilla-La Mancha).':
        'Chef and co-founder of oba-, the Michelin Star and Green Star restaurant in Casas-Ibáñez (Albacete, Castilla-La Mancha, Spain).',
}
JSONLD_KEEP = {'oba-', 'Chef', 'Javier Sanz', 'Javi Sanz', 'Juan Sahuquillo', 'Casas-Ibáñez', 'Albacete', 'ES', '02200',
               'Calle Tomás Pérez Úbeda, 6', 'Casas-Ibáñez, Albacete', '€€€€', '13:00', '17:00', '20:00', '23:30',
               'Thursday', 'Friday', 'Saturday', 'Sunday', 'info.restauranteoba@gmail.com', '+34604962117'}

# Textos sin clave de traducción
PLAIN_EN = {
    '>Aviso Legal<': '>Legal notice<',
    '>Privacidad<': '>Privacy<',
    'aria-label="Maridajes"': 'aria-label="Pairings"',
    'aria-label="Cerrar"': 'aria-label="Close"',
    'aria-label="Cesta"': 'aria-label="Basket"',
    "wrap.setAttribute('aria-label', 'Aviso de cookies');": "wrap.setAttribute('aria-label', 'Cookie notice');",
    'widget.thefork.com/es/': 'widget.thefork.com/en/',
}

EXTRA_CSS = """
/* seo-build: selector de idioma con enlaces y fotos como <img> */
.oba-page a.oba-lang-btn { text-decoration: none !important; display: inline-block; }
.oba-page .oba-has-bg-img { isolation: isolate; }
.oba-page img.oba-bg-img {
  position: absolute !important; inset: 0; z-index: -1;
  width: 100% !important; height: 100% !important; max-width: none !important;
  margin: 0 !important; object-fit: cover; object-position: center;
}
.oba-page img.oba-bg-layer { width: 100% !important; height: 100% !important; max-width: none !important; object-fit: cover; object-position: center; }
/* /seo-build */
"""

EN_HEADER = """<!-- ================================================================
  ENGLISH VERSION — generado por build-seo.py a partir de ../pagina-{key}.html
  NO editar a mano: cambiar el bloque español (y su diccionario) y volver a
  ejecutar  python3 build-seo.py
  Página WordPress: {en_url}  (Elementor Canvas, un único widget HTML)
================================================================ -->"""


# ---------------------------------------------------------------------------
def js_eval(expr):
    """Evalúa un literal JS (objeto/array) con node y lo devuelve como Python."""
    out = subprocess.run(
        ['node', '-e', 'process.stdout.write(JSON.stringify(eval("("+require("fs").readFileSync(0,"utf8")+")")))'],
        input=expr, capture_output=True, text=True, check=True).stdout
    return json.loads(out)


def get_dict(s):
    m = re.search(r'window\.OBA_TRANSLATIONS\s*=\s*window\.OBA_TRANSLATIONS\s*\|\|\s*(\{.*?\n\});', s, re.S)
    return js_eval(m.group(1)) if m else {'es': {}, 'en': {}}


def menu_option(d, key):
    """'CUADERNO DOS · 8 PARAJES · 195€' -> ('8', '195'). Falla si el texto de la carta cambia de forma."""
    m = re.search(r'(\d+)\s*PARAJES\s*·\s*(\d+(?:[.,]\d+)?)\s*€', d['es'].get(key, ''))
    if not m:
        sys.exit(f'menu: no encuentro nº de parajes y precio en {key} = {d["es"].get(key)!r}')
    return m.group(1), m.group(2).replace(',', '.')


def to_en_path(path):
    """'/nosotros#contacto' -> '/en/about-us#contacto'. None si no tiene versión inglesa."""
    base, sep, frag = path.partition('#')
    base = base.rstrip('/') or '/'
    if base in ES2EN:
        return ES2EN[base] + (sep + frag if sep else '')
    return None


def to_en_url(url):
    if not url.startswith(SITE):
        return url
    p = to_en_path(url[len(SITE):] or '/')
    return SITE + p if p else url


# ---------------------------------------------------------------------------
# Transformaciones comunes (ES y EN)
def lang_switch(s, key, lang):
    es_path, en_path, _ = PAGES[key]

    def a(code):
        href = es_path if code == 'es' else en_path
        active = ' active' if code == lang else ''
        cur = ' aria-current="page"' if code == lang else ''
        return f'<a class="oba-lang-btn{active}" data-lang="{code}" href="{href}" hreflang="{code}" lang="{code}"{cur}>{code.upper()}</a>'

    pat = re.compile(r'<(?:button type="button"|a) class="oba-lang-btn[^"]*" data-lang="(es|en)"[^>]*>(?:ES|EN)</(?:button|a)>')
    s, n = pat.subn(lambda m: a(m.group(1)), s)
    assert n == 2, f'{key}: selector de idioma no encontrado ({n})'
    return s


def add_css(s):
    s = re.sub(r'\n/\* seo-build:.*?/\* /seo-build \*/\n', '', s, flags=re.S)
    return s.replace('</style>', EXTRA_CSS + '</style>', 1)


def bg_to_img(s, lang):
    idx = 0 if lang == 'es' else 1

    def alt_for(url):
        name = url.rsplit('/', 1)[-1]
        if name not in ALT:
            sys.exit(f'Falta texto alternativo para {name}')
        return html.escape(ALT[name][idx], quote=True)

    # Capas de la portada: <div class="oba-bg-layer..." id=".." style="background-image:url('..')"></div>
    def layer(m):
        cls, id_, url = m.group(1), m.group(2), m.group(3)
        return f'<img class="{cls}" id="{id_}" src="{url}" alt="{alt_for(url)}">'
    s = re.sub(r'<div class="(oba-bg-layer[^"]*)" id="([^"]+)" style="background-image:url\(\'([^\']+)\'\);"></div>', layer, s)

    # Secciones / tarjetas con foto de fondo
    def section(m):
        tag, cls, url = m.group(1), m.group(2), m.group(3)
        indent = re.search(r'\n([ \t]*)$', s[:m.start()])
        pad = (indent.group(1) if indent else '') + '  '
        lazy = ' loading="lazy"' if 'oba-rs-card' in cls else ''
        return (f'<{tag} class="{cls} oba-has-bg-img">\n'
                f'{pad}<img class="oba-bg-img" src="{url}" alt="{alt_for(url)}"{lazy}>')
    cls_alt = '|'.join(BG_SECTION_CLASSES)
    s = re.sub(rf'<(section|article|div) class="((?:{cls_alt})[^"]*)" style="background-image:url\(\'([^\']+)\'\);">', section, s)
    return s


def set_alts(s, lang):
    idx = 0 if lang == 'es' else 1

    def fix(m):
        tag = m.group(0)
        src = re.search(r'src="([^"]+)"', tag)
        name = src.group(1).rsplit('/', 1)[-1] if src else None
        if name in ALT:
            new = html.escape(ALT[name][idx], quote=True)
            # el logo de la portada mantiene su texto propio
            if name == 'oba-logo.png' and 'alt="oba- restaurante"' in tag:
                new = 'oba- restaurante' if lang == 'es' else 'oba- restaurant'
            tag = re.sub(r'alt="[^"]*"', f'alt="{new}"', tag)
        return tag
    return re.sub(r'<img\b[^>]*>', fix, s)


def page_lang_js(s, lang):
    # idioma fijo de la página (antes se leía de localStorage y se traducía en el navegador)
    s = re.sub(r"window\.OBA_PAGE_LANG = '(es|en)';\n", '', s)
    s = s.replace('window.OBA_TRANSLATIONS = window.OBA_TRANSLATIONS ||',
                  f"window.OBA_PAGE_LANG = '{lang}';\nwindow.OBA_TRANSLATIONS = window.OBA_TRANSLATIONS ||", 1)
    s = s.replace("try { saved = localStorage.getItem('oba_lang') || 'es'; } catch (e) {}",
                  "saved = window.OBA_PAGE_LANG || 'es';")
    s = s.replace("(localStorage.getItem('oba_lang') || document.documentElement.lang || 'es')",
                  "(window.OBA_PAGE_LANG || document.documentElement.lang || 'es')")
    s = s.replace("try { return localStorage.getItem('oba_lang') || 'es'; } catch (e) { return 'es'; }",
                  "return window.OBA_PAGE_LANG || 'es';")
    return s


# ---------------------------------------------------------------------------
# Datos estructurados adicionales
def page_url(key, lang):
    es, en, _ = PAGES[key]
    return SITE + (es if lang == 'es' else en)


def extra_jsonld(key, lang, s, d):
    t = d[lang]
    url = page_url(key, lang)
    nodes = []
    if key == 'inicio':
        nodes.append({
            '@type': 'Restaurant', '@id': SITE + '/#restaurant',
            'potentialAction': {'@type': 'ReserveAction',
                                'target': {'@type': 'EntryPoint', 'urlTemplate': RESERVE[lang]},
                                'result': {'@type': 'FoodEstablishmentReservation', 'name': 'Reserva en oba-' if lang == 'es' else 'Table at oba-'}},
        })
    elif key == 'menu':
        sections = []
        for i in range(1, 9):
            head = t.get(f'menu_h_{i:02d}')
            if not head:
                continue
            name = head.split('. ', 1)[-1]
            slug = name.lower().replace(' ', '')
            items = [t[k] for k in sorted((k for k in t if re.fullmatch(rf'menu_{slug}_\d+', k)), key=lambda k: int(k.rsplit('_', 1)[1]))]
            sec = {'@type': 'MenuSection', 'name': name}
            if items:
                sec['hasMenuItem'] = [{'@type': 'MenuItem', 'name': it} for it in items]
            elif t.get(f'menu_{slug}_note'):
                sec['description'] = t[f'menu_{slug}_note']
            sections.append(sec)
        # precio y nº de pases salen de los botones de la carta (menu_opt_dos / menu_opt_medio)
        n_dos, p_dos = menu_option(d, 'menu_opt_dos')
        n_medio, p_medio = menu_option(d, 'menu_opt_medio')
        dos = {'@type': 'Menu', '@id': url + '#cuaderno-dos', 'name': 'Cuaderno Dos',
               'description': t['menu_intro_summary'], 'inLanguage': lang,
               'offers': {'@type': 'Offer', 'price': p_dos, 'priceCurrency': 'EUR'},
               'hasMenuSection': sections}
        medio = {'@type': 'Menu', '@id': url + '#cuaderno-medio', 'name': 'Cuaderno Medio', 'inLanguage': lang,
                 'description': f'{n_medio} parajes del menú Cuaderno Dos' if lang == 'es' else f'{n_medio} courses from the Cuaderno Dos menu',
                 'offers': {'@type': 'Offer', 'price': p_medio, 'priceCurrency': 'EUR'}}
        nodes += [dos, medio, {'@type': 'Restaurant', '@id': SITE + '/#restaurant', 'hasMenu': [{'@id': dos['@id']}, {'@id': medio['@id']}]}]
    elif key == 'tienda':
        m = re.search(r'var OBA_PRODUCTS = (\[.*?\n\]);', s, re.S)
        products = js_eval(m.group(1))
        items = []
        for i, p in enumerate(products, 1):
            v = min(p['variants'], key=lambda v: v['n'])
            items.append({'@type': 'ListItem', 'position': i, 'item': {
                '@type': 'Product', 'name': p[lang]['title'], 'description': p[lang]['desc'],
                'image': p['image'], 'brand': {'@type': 'Brand', 'name': 'oba-'},
                'offers': {'@type': 'Offer', 'price': str(v['price']), 'priceCurrency': 'EUR',
                           'availability': 'https://schema.org/InStock', 'url': url}}})
        nodes.append({'@type': 'ItemList', 'name': 'Bonos regalo de oba-' if lang == 'es' else 'oba- gift vouchers',
                      'itemListElement': items})
    elif key == 'parajes':
        items = []
        for m in re.finditer(r'<img src="([^"]+)"[^>]*>\s*(?:</div>\s*)?(?:<(?:div|section)[^>]*>\s*)*<h2 data-i18n="(paraje(\d)_titulo)"', s):
            n = m.group(3)
            items.append({'@type': 'ListItem', 'position': len(items) + 1, 'item': {
                '@type': 'TouristAttraction', 'name': t[f'paraje{n}_titulo'],
                'description': t[f'paraje{n}_texto'], 'image': m.group(1),
                'containedInPlace': {'@type': 'Place', 'name': 'La Manchuela, Albacete'}}})
        if len(items) != 7:
            sys.exit(f'parajes: se esperaban 7 lugares, hay {len(items)}')
        nodes.append({'@type': 'ItemList', 'name': t['h1_seo'], 'itemListElement': items})
    # desplegable "Antes de venir" (claves faq_q_X / faq_a_X del diccionario): FAQPage
    faq = [k[len('faq_q_'):] for k in t if k.startswith('faq_q_') and t.get('faq_a_' + k[len('faq_q_'):])]
    if faq:
        nodes.append({'@type': 'FAQPage', '@id': url + '#antes-de-venir', 'inLanguage': lang,
                      'mainEntity': [{'@type': 'Question', 'name': t['faq_q_' + k].capitalize(),
                                      'acceptedAnswer': {'@type': 'Answer', 'text': t['faq_a_' + k]}} for k in faq]})
    if not nodes:
        return ''
    data = {'@context': 'https://schema.org', '@graph': nodes}
    return ('<!-- seo-extra (generado por build-seo.py) -->\n<script type="application/ld+json">\n'
            + json.dumps(data, ensure_ascii=False, indent=2) + '\n</script>\n<!-- /seo-extra -->\n')


def set_extra(s, extra):
    s = re.sub(r'<!-- seo-extra .*?<!-- /seo-extra -->\n', '', s, flags=re.S)
    if not extra:
        return s
    i = s.index('<style>')
    return s[:i] + extra + s[i:]


# ---------------------------------------------------------------------------
# Solo inglés
def translate_jsonld(obj, warn):
    if isinstance(obj, dict):
        out = {}
        if obj.get('@type') == 'ListItem' and isinstance(obj.get('item'), str):
            en_item = to_en_url(obj['item'])
            for _es, _en, _name in PAGES.values():
                if en_item == SITE + _en and _en != '/en':
                    obj = dict(obj, name=_name)
        for k, v in obj.items():
            if k in ('@id', '@type', '@context'):
                out[k] = v
            elif k in ('url', 'item', 'hasMenu', 'acceptsReservations') and isinstance(v, str):
                out[k] = to_en_url(v)
            elif k == 'inLanguage':
                out[k] = 'en'
            else:
                out[k] = translate_jsonld(v, warn)
        if out.get('@type') == 'WebSite':
            out['@id'] = SITE + '/en#website'
        return out
    if isinstance(obj, list):
        return [translate_jsonld(x, warn) for x in obj]
    if isinstance(obj, str):
        if obj in JSONLD_EN:
            return JSONLD_EN[obj]
        if (obj.startswith('http') or obj in JSONLD_KEEP or not re.search('[a-záéíóúñ]', obj)
                or obj in {n for _, _, n in PAGES.values()}):
            return obj
        warn.append(f'JSON-LD sin traducir: {obj}')
    return obj


def to_english(s, key, d):
    en = d['en']
    warn = []

    # textos con clave de traducción
    def repl(m):
        k = m.group(3)
        if k not in en:
            warn.append(f'sin traducción: {k}')
            return m.group(0)
        if '<' in m.group(4):
            warn.append(f'{k}: el elemento tenía HTML dentro, se sustituye por texto plano')
        return m.group(1) + html.escape(en[k], quote=False) + m.group(5)
    s = re.sub(r'(<([a-zA-Z0-9]+)\b[^>]*?\sdata-i18n="([^"]+)"[^>]*>)(.*?)(</\2\s*>)', repl, s, flags=re.S)

    # atributos traducibles
    def repl_attr(m):
        tag = m.group(0)
        for pair in m.group(1).split(';'):
            if ':' not in pair:
                continue
            attr, k = [x.strip() for x in pair.split(':', 1)]
            if k in en:
                tag = re.sub(rf'\s{attr}="[^"]*"', f' {attr}="{html.escape(en[k], quote=True)}"', tag)
        return tag
    s = re.sub(r'<[^>]*\sdata-i18n-attr="([^"]+)"[^>]*>', repl_attr, s)

    for a, b in PLAIN_EN.items():
        s = s.replace(a, b)

    # enlaces internos -> versión inglesa
    def repl_href(m):
        p = to_en_path(m.group(1))
        return f'href="{p}"' if p else m.group(0)
    s = re.sub(r'href="(/[^"]*)"(?! hreflang="es")', repl_href, s)

    # coordenadas: O (oeste) -> W
    s = re.sub(r'>([\d°\'",.\s\-N]+?)O(\s*<)', lambda m: '>' + m.group(1) + 'W' + m.group(2), s)

    # JSON-LD original (no el generado) traducido
    def repl_ld(m):
        data = json.loads(m.group(1))
        return '<script type="application/ld+json">\n' + json.dumps(translate_jsonld(data, warn), ensure_ascii=False, indent=2) + '\n</script>'
    parts = re.split(r'(<!-- seo-extra .*?<!-- /seo-extra -->\n)', s, flags=re.S)
    parts = [p if p.startswith('<!-- seo-extra') else
             re.sub(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', repl_ld, p, flags=re.S) for p in parts]
    s = ''.join(parts)

    # cabecera
    s = re.sub(r'\A<!-- =+.*?=+ -->', EN_HEADER.format(key=key, en_url=page_url(key, 'en')), s, count=1, flags=re.S)
    return s, warn


# ---------------------------------------------------------------------------
def main():
    OUT_EN.mkdir(exist_ok=True)
    total_warn = 0
    for key in PAGES:
        f = HERE / f'pagina-{key}.html'
        src = f.read_text(encoding='utf-8')
        d = get_dict(src)

        es = src
        es = lang_switch(es, key, 'es')
        es = add_css(es)
        es = bg_to_img(es, 'es')
        es = set_alts(es, 'es')
        es = page_lang_js(es, 'es')
        es = set_extra(es, extra_jsonld(key, 'es', es, d))
        if es != src:
            f.write_text(es, encoding='utf-8')

        en = src
        en = lang_switch(en, key, 'en')
        en = add_css(en)
        en = bg_to_img(en, 'en')
        en = set_alts(en, 'en')
        en = page_lang_js(en, 'en')
        en = set_extra(en, extra_jsonld(key, 'en', en, d))
        en, warn = to_english(en, key, d)
        (OUT_EN / f'pagina-{key}.html').write_text(en, encoding='utf-8')

        if key == 'menu':
            # la descripción de Google (Rank Math) menciona los precios: avisar si se quedan atrás
            prices = [menu_option(d, k)[1] for k in ('menu_opt_dos', 'menu_opt_medio')]
            for lang, (_, desc) in META['menu'].items():
                missing = [p for p in prices if p not in desc]
                if missing:
                    warn.append(f'META menu/{lang}: la descripción no menciona el precio actual {", ".join(missing)} € — actualízala aquí y en Rank Math')

        leftover = re.findall(r"background-image:url\('[^']*(?:DJI|DSC|rawseason|pack-noche|galeria)", es)
        print(f'{key:28} ES {"modificado" if es != src else "sin cambios"} | EN {PAGES[key][1]}'
              + (f' | fondos sin convertir: {len(leftover)}' if leftover else ''))
        for w in warn:
            print('   aviso:', w)
        total_warn += len(warn)

    meta_out = {}
    for key, langs in META.items():
        for lang, (title, desc) in langs.items():
            if (len(title) > 65 and key != 'inicio') or not 110 <= len(desc) <= 160:
                print(f'   aviso: {key}/{lang} título {len(title)} car., descripción {len(desc)} car.')
            meta_out[page_url(key, lang)] = {'title': title, 'description': desc}
    (OUT_EN / 'rankmath-meta.json').write_text(json.dumps(meta_out, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')

    pairs = {SITE + es: SITE + en for es, en, _ in PAGES.values()}
    (OUT_EN / 'hreflang-map.json').write_text(json.dumps(pairs, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    php_pairs = ',\n'.join(f"        '{es}' => '{en}'" for es, en, _ in PAGES.values())
    (HERE / 'wpcode-hreflang.php').write_text(WPCODE.replace('%PAIRS%', php_pairs), encoding='utf-8')
    print(f'\nhreflang: {len(pairs)} pares · avisos: {total_warn}')
    print('Antes de pegar los bloques en WordPress: python3 build-seo.py --check')


def check_live():
    """--check: compara lo publicado en WordPress con la última versión guardada
    en git (HEAD). Si una página no coincide, es que alguien la editó directamente
    en Elementor: hay que traer ese cambio al bloque antes de pegar uno nuevo
    encima, o se perdería. Solo lee la web; no escribe nada."""
    import time
    import urllib.request

    def norm(s):
        # atributos que WordPress añade por su cuenta a las imágenes, y espacios
        s = re.sub(r'\s(?:decoding="async"|loading="lazy"|fetchpriority="high")', '', s)
        return re.sub(r'\s+', ' ', s).strip()

    bust = int(time.time())  # con parámetros W3 Total Cache no sirve la copia en caché
    differ = []
    for key, (es_path, en_path, _) in PAGES.items():
        for path, rel in ((es_path, f'pagina-{key}.html'), (en_path, f'en/pagina-{key}.html')):
            ref = subprocess.run(['git', 'show', f'HEAD:./{rel}'], cwd=HERE, capture_output=True, text=True)
            source = 'git' if ref.returncode == 0 else 'archivo local (no está en git)'
            block = ref.stdout if ref.returncode == 0 else (HERE / rel).read_text(encoding='utf-8')
            req = urllib.request.Request(f'{SITE}{path}?nocache={bust}', headers={'User-Agent': 'Mozilla/5.0 build-seo-check'})
            try:
                live = urllib.request.urlopen(req, timeout=30).read().decode('utf-8')
            except Exception as e:
                print(f'{path:32} ERROR al descargar: {e}')
                differ.append(path)
                continue
            ok = norm(block) in norm(live)
            print(f'{path:32} {"coincide" if ok else "DISTINTO"}{"" if source == "git" else f"  ({source})"}')
            if not ok:
                differ.append(path)
    if differ:
        print(f'\n{len(differ)} página(s) publicadas no coinciden con git: alguien las cambió en WordPress.')
        print('Antes de pegar encima, copia ese cambio al bloque del repositorio (o pídeselo a Claude).')
        sys.exit(1)
    print('\nTodo lo publicado coincide con git: se pueden pegar los bloques nuevos sin perder nada.')


WPCODE = r"""<?php
/*
 * WPCode → Fragmento PHP · "Ejecutar en todas partes" (generado por build-seo.py)
 * - Etiquetas hreflang (es / en / x-default) en <head> de cada par de páginas.
 * - <html lang="en"> y og:locale en_GB en las páginas /en/...
 * Si se añade una página traducida: regenerar con build-seo.py y pegar de nuevo.
 */
if ( ! function_exists( 'oba_hreflang_pairs' ) ) {
    function oba_hreflang_pairs() {
        return array(
%PAIRS%
        );
    }
    function oba_current_path() {
        $path = wp_parse_url( $_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH );
        $path = '/' . trim( (string) $path, '/' );
        return $path;
    }
    function oba_is_english() {
        $p = oba_current_path();
        return $p === '/en' || strpos( $p, '/en/' ) === 0;
    }
    add_action( 'wp_head', function () {
        if ( is_404() ) { return; }
        $path  = oba_current_path();
        $pairs = oba_hreflang_pairs();
        if ( isset( $pairs[ $path ] ) ) {
            $es = $path;
        } else {
            $es = array_search( $path, $pairs, true );
            if ( false === $es ) { return; }
        }
        $site = 'https://obarestaurante.es';
        $es_url = $site . ( $es === '/' ? '/' : $es );
        $en_url = $site . $pairs[ $es ];
        echo '<link rel="alternate" hreflang="es" href="' . esc_url( $es_url ) . '" />' . "\n";
        echo '<link rel="alternate" hreflang="en" href="' . esc_url( $en_url ) . '" />' . "\n";
        echo '<link rel="alternate" hreflang="x-default" href="' . esc_url( $es_url ) . '" />' . "\n";
    }, 2 );
    add_filter( 'language_attributes', function ( $output ) {
        return oba_is_english() ? preg_replace( '/lang="[^"]*"/', 'lang="en"', $output ) : $output;
    } );
    add_filter( 'rank_math/opengraph/facebook/og_locale', function ( $locale ) {
        return oba_is_english() ? 'en_GB' : $locale;
    } );
}
"""

if __name__ == '__main__':
    if '--check' in sys.argv:
        check_live()
    else:
        main()
