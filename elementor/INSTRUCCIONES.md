# Plantillas Elementor — Web oba-

Archivos incluidos:

| Archivo | Qué es |
|---|---|
| `plantilla-home.json` | Página principal (hero con fondos que cambian al hover) |
| `plantilla-restaurante.json` | Página Restaurante / Cuaderno Dos |
| `css-personalizado.css` | Estilos custom (subrayados, botón blur, colores) |

---

## Paso 1 — Requisitos previos

1. WordPress con **Elementor** instalado (el plugin gratuito basta para importar; algunos ajustes finos son más cómodos con Pro).
2. Fuente **Archivo**: en Elementor > Configuración del sitio > Tipografía global, elige "Archivo" (está en Google Fonts, Elementor la carga solo).

## Paso 2 — Subir las imágenes a la Mediateca

Sube estos archivos (están en la raíz del proyecto / repositorio):

- `restaurante.jpg` (fondo home – Restaurante)
- `entorno.jpg` (fondo home – Entorno)
- `nosotros.jpg` (fondo home – Nosotros)
- `gallery-restaurante-3.jpg` (foto vertical página Restaurante)
- `logo.png` (logo blanco) y `logo-dark.png` (logo negro)
- `premios.png` (logos de premios)

Tras subirlas, copia la **URL** de cada una (Mediateca > clic en la imagen > "Copiar URL al portapapeles").

## Paso 3 — Importar las plantillas

1. WordPress admin > **Plantillas > Plantillas guardadas > Importar plantillas**.
2. Sube `plantilla-home.json` y `plantilla-restaurante.json`.
3. Crea una página nueva ("Inicio"), edítala con Elementor, y desde el icono de carpeta (Biblioteca) > pestaña "Mis plantillas" inserta **oba- Home**.
4. Repite con otra página ("Restaurante") e inserta **oba- Restaurante**.

## Paso 4 — Conectar las imágenes

**Home:** edita el widget HTML (el primero de la página) y reemplaza:
- `URL_FOTO_RESTAURANTE` → URL de restaurante.jpg
- `URL_FOTO_ENTORNO` → URL de entorno.jpg
- `URL_FOTO_NOSOTROS` → URL de nosotros.jpg

**Restaurante:** haz clic en el widget de imagen vacío de la columna izquierda y elige `gallery-restaurante-3.jpg`.

## Paso 5 — Pegar el CSS personalizado

Copia todo el contenido de `css-personalizado.css` y pégalo en **una** de estas rutas:

- Con Elementor Pro: Elementor > Configuración del sitio > CSS personalizado.
- Sin Pro: Apariencia > Personalizar > **CSS adicional**.

## Paso 6 — Ajustes finales

- En la página de Inicio: Configuración de página (engranaje abajo-izquierda) > Diseño de página > **Elementor a pantalla completa** (para que no salga la cabecera del tema).
- Enlaza los títulos: RESTAURANTE ya apunta a `/restaurante`; ajusta ENTORNO y NOSOTROS cuando existan esas páginas.
- El botón RESERVAR: ponle la URL de tu sistema de reservas (CoverManager, TheFork, etc.).
- Logo, selector ES/EN y menú: se recomienda montarlos con el header del tema o con Elementor Pro (Theme Builder > Header). Si lo quieres, se puede preparar también como plantilla.

## Notas

- El efecto "cambio de fondo al pasar el cursor" funciona con el script incluido en el widget HTML de la home: identifica los títulos por su texto (RESTAURANTE / ENTORNO / NOSOTROS). Si traduces o cambias esos textos, actualiza también el `map` del script.
- Los fondos usan `position: fixed`, así que la sección hero debe ser la única sección de esa página.
