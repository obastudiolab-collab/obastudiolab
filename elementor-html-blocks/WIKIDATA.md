# Wikidata — entrada de oba- (lista para crear)

Wikidata es la base de datos abierta que usan Google, ChatGPT, Gemini y otros asistentes como fuente de "hechos". oba- no tiene entrada todavía (comprobado el 25/09/2026). La tiene que crear una persona del equipo con su propia cuenta de Wikidata.

## 1. Crear la cuenta y el elemento

1. Crear cuenta en https://www.wikidata.org (arriba a la derecha, "Crear una cuenta").
2. Ir a https://www.wikidata.org/wiki/Special:NewItem y rellenar:

| Campo | Valor |
|---|---|
| Idioma | es |
| Etiqueta | oba- |
| Descripción | restaurante en Casas-Ibáñez (Albacete, España) |
| Alias | Restaurante oba- \| OBA- \| Oba |

3. Guardar. Después, en la página del elemento creado, añadir la etiqueta y la descripción en inglés ("oba-" / "restaurant in Casas-Ibáñez, Spain") desde "Todos los idiomas / editar".

## 2. Declaraciones (botón "+ añadir declaración")

Escribir el número de la propiedad (P…) en el buscador y elegir el valor indicado.

| Propiedad | Valor | Notas |
|---|---|---|
| **P31** instancia de | **Q11707** restaurante | |
| **P17** país | **Q29** España | |
| **P131** localizado en la entidad territorial administrativa | **Q575715** Casas-Ibáñez | |
| **P625** coordenadas | 39.2873379, -1.4694749 | Las mismas que Google Maps y la web |
| **P6375** dirección postal | Calle Tomás Pérez Úbeda, 6, 02200 Casas-Ibáñez (idioma: es) | |
| **P281** código postal | 02200 | |
| **P856** sitio web oficial | https://obarestaurante.es/ | |
| **P1329** número de teléfono | +34 604 962 117 | |
| **P2012** cocina | **Q622512** gastronomía de España | |
| **P166** premio recibido | **Q20824563** estrella Michelin | Referencia obligatoria (ver abajo) |
| **P166** premio recibido | **Q104135919** Estrella Verde Michelin | Referencia obligatoria (ver abajo) |
| **P4160** ID de Michelin Restaurants | `castilla-la-mancha/casas-ibanez/restaurant/oba` | Verificado: abre la ficha de oba- en guide.michelin.com |

## 3. Referencias (importante)

En cada declaración de **P166** (premios), pulsar "+ añadir referencia" y poner:

- **P854** URL de la referencia: `https://guide.michelin.com/es/es/castilla-la-mancha/casas-ibanez/restaurante/oba`
- **P813** fecha de consulta: la fecha del día

Se recomienda añadir la misma referencia a P625, P6375 y P856. Sin referencias, otros editores pueden borrar los datos.

## 4. Enlazar el elemento desde la web (opcional, lo hace Claude)

Cuando exista el elemento (número Q…), añadir su URL `https://www.wikidata.org/wiki/Q…` al `sameAs` de la ficha del restaurante en el bloque de la home. Así Google une la web, Maps, Michelin y Wikidata como la misma entidad.

## Chefs (más adelante)

Crear elementos para Javier Sanz y Juan Sahuquillo solo si hay fuentes de prensa que hablen de ellos con nombre propio (p. ej. el artículo de El Español enlazado en /nosotros). Si se crean: P31 = Q5 (ser humano), P106 ocupación = Q3499072 (chef), y en oba- añadir P112 fundado por → los dos elementos.
