# Plantillas Elementor — Web oba-

**Todo va incluido dentro de las plantillas** (estilos y efectos ya embebidos).
No hay que pegar CSS ni tocar código.

---

## Instalación (3 pasos)

### 1. Importar las plantillas
En WordPress: **Plantillas → Plantillas guardadas → Importar plantillas**
Sube `plantilla-home.json` y `plantilla-restaurante.json`.

### 2. Crear las páginas
- Crea una página "Inicio", edítala con Elementor, abre la Biblioteca (icono de carpeta) → pestaña **Mis plantillas** → inserta **oba- Home**.
- Repite con una página "Restaurante" e inserta **oba- Restaurante**.

### 3. Poner las fotos (con clics, sin código)
Sube antes las fotos de la carpeta `imagenes/` a la Mediateca.

- **Home:** verás 3 recuadros de imagen con borde azul punteado (Restaurante / Entorno / Nosotros). Haz clic en cada uno y elige su foto. En la web publicada esos recuadros son invisibles: sus fotos se usan como fondos del efecto hover.
- **Restaurante:** clic en el recuadro de imagen de la izquierda y elige `gallery-restaurante-3.jpg`.

¡Listo! Publica las páginas.

---

## Consejos

- En cada página: Configuración (engranaje abajo-izquierda) → Diseño de página → **Elementor a pantalla completa** (así no aparece la cabecera del tema en la Home).
- Los widgets grises que dicen "⚙️ Widget técnico — no borrar" contienen los estilos y el efecto de fondos. No se ven en la web publicada. **No los borres.**
- Todos los textos y botones se editan con clic, como cualquier elemento de Elementor.
- El efecto de cambio de fondo reconoce los títulos por su texto (RESTAURANTE / ENTORNO / NOSOTROS). Si cambias esos textos, avísanos para ajustar el efecto.
- Botón RESERVAR: ponle el enlace de tu sistema de reservas (CoverManager, TheFork…).
- Fuente **Archivo**: Elementor → Configuración del sitio → Tipografía global → elegir "Archivo" (Google Fonts).

## Contenido del paquete

| Archivo | Qué es |
|---|---|
| `plantilla-home.json` | Página principal (con efecto de fondos al pasar el cursor) |
| `plantilla-restaurante.json` | Página Restaurante / Cuaderno Dos |
| `imagenes/` | Fotos y logos optimizados listos para subir a la Mediateca |
| `css-personalizado.css` | (Opcional) Solo por si se prefiere gestionar los estilos aparte |
