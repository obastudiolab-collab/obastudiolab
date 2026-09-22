// ============================================================
// TIENDA — catálogo real de regalaoba.myshopify.com, embebido en la
// propia web. El checkout final se resuelve en Shopify (plan Basic
// no permite checkout propio), pero navegar, elegir y montar la
// cesta ocurre entera en obarestaurante.es.
// ============================================================

var OBA_SHOP_DOMAIN = 'https://regalaoba.myshopify.com';
var OBA_CART_KEY = 'oba_cart_v1';

var OBA_PRODUCTS = [
  {
    handle: 'bono-regalo-oba-cuaderno-dos',
    category: 'bono',
    image: 'https://cdn.shopify.com/s/files/1/1034/7354/5563/files/oba-052_90b3d6bb-b617-4843-ac9f-334e06c158cd.jpg?v=1788768734',
    es: {
      title: 'Bono Regalo · Cuaderno Dos',
      desc: 'Menú Cuaderno Dos, 8 parajes de nuestra cocina con Estrella Michelin y Estrella Verde.',
      long: 'Bono regalo digital para descubrir el menú Cuaderno Dos de OBA-, restaurante con Estrella Michelin y Estrella Verde de Javier Sanz y Juan Sahuquillo en Casas-Ibáñez (Albacete).\n\n8 parajes de nuestro entorno contados a través de otros tantos platos, en una experiencia gastronómica única inspirada en la tierra y las tradiciones de nuestro pueblo.\n\nCómo funciona: recibirás un PDF por email nada más completar la compra, con el detalle del bono y los pasos para canjearlo. Para reservar mesa bastará con el número de pedido o el nombre del comprador. El bono es válido durante 6 meses desde la fecha de compra.'
    },
    en: {
      title: 'Gift Voucher · Cuaderno Dos',
      desc: 'The Cuaderno Dos menu, 8 courses from our Michelin Star & Green Star kitchen.',
      long: "Digital gift voucher for the Cuaderno Dos menu at OBA-, the Michelin Star & Green Star restaurant by Javier Sanz and Juan Sahuquillo in Casas-Ibáñez (Albacete).\n\n8 landscapes from our surroundings told through as many dishes, in a one-of-a-kind experience inspired by the land and traditions of our village.\n\nHow it works: you'll receive a PDF by email right after purchase, with your voucher details and how to redeem it. To book a table, just the order number or the buyer's name is needed. The voucher is valid for 6 months from the purchase date."
    },
    variants: [
      { id: '53969646977371', n: 1, price: 195 },
      { id: '53969647010139', n: 2, price: 390 },
      { id: '53969647042907', n: 3, price: 585 },
      { id: '53969647075675', n: 4, price: 780 },
    ],
  },
  {
    handle: 'bono-regalo-oba-cuaderno-dos-con-maridaje',
    category: 'bono',
    image: 'https://cdn.shopify.com/s/files/1/1034/7354/5563/files/oba-141_bcc88d7f-0c47-4f11-81af-111ac1198597.jpg?v=1788768751',
    es: {
      title: 'Bono Regalo · Cuaderno Dos con Maridaje',
      desc: 'El menú Cuaderno Dos completo con maridaje a elegir.',
      long: 'Bono regalo digital para descubrir el menú Cuaderno Dos de OBA-, restaurante con Estrella Michelin y Estrella Verde en Casas-Ibáñez (Albacete), con maridaje incluido.\n\n8 parajes de nuestro entorno contados a través de otros tantos platos, acompañados de un maridaje a elegir entre Natura (fermentados) o el vínico Matices Olvidados.\n\nCómo funciona: recibirás un PDF por email nada más completar la compra, con el detalle del bono y los pasos para canjearlo. Para reservar mesa bastará con el número de pedido o el nombre del comprador. El bono es válido durante 6 meses desde la fecha de compra.'
    },
    en: {
      title: 'Gift Voucher · Cuaderno Dos with Pairing',
      desc: 'The full Cuaderno Dos menu with your choice of pairing.',
      long: "Digital gift voucher for the Cuaderno Dos menu at OBA-, the Michelin Star & Green Star restaurant in Casas-Ibáñez (Albacete), pairing included.\n\n8 landscapes from our surroundings told through as many dishes, paired with your choice of Natura (fermented drinks) or the wine-based Matices Olvidados.\n\nHow it works: you'll receive a PDF by email right after purchase, with your voucher details and how to redeem it. To book a table, just the order number or the buyer's name is needed. The voucher is valid for 6 months from the purchase date."
    },
    variants: [
      { id: '53969649140059', n: 1, price: 305 },
      { id: '53969649172827', n: 2, price: 610 },
      { id: '53969649205595', n: 3, price: 915 },
      { id: '53969649238363', n: 4, price: 1220 },
    ],
  },
  {
    handle: 'bono-regalo-oba-cuaderno-medio',
    category: 'bono',
    image: 'https://cdn.shopify.com/s/files/1/1034/7354/5563/files/oba-273_135b42bd-de2d-4948-98a3-863eb647ea92.jpg?v=1788768728',
    es: {
      title: 'Bono Regalo · Cuaderno Medio',
      desc: 'Menú Cuaderno Medio, 6 parajes de nuestra cocina.',
      long: 'Bono regalo digital para vivir la experiencia gastronómica de OBA-, restaurante con Estrella Michelin y Estrella Verde en Casas-Ibáñez (Albacete).\n\nEl Cuaderno Medio recorre 6 parajes de nuestro entorno a través de otros tantos platos, contados como si fueran páginas de un cuaderno inspirado en la tierra y las tradiciones de nuestro pueblo.\n\nCómo funciona: recibirás un PDF por email nada más completar la compra, con el detalle del bono y los pasos para canjearlo. Para reservar mesa bastará con el número de pedido o el nombre del comprador. El bono es válido durante 6 meses desde la fecha de compra.'
    },
    en: {
      title: 'Gift Voucher · Cuaderno Medio',
      desc: 'The Cuaderno Medio menu, 6 courses of our cuisine.',
      long: "Digital gift voucher to experience OBA-, the Michelin Star & Green Star restaurant in Casas-Ibáñez (Albacete).\n\nThe Cuaderno Medio menu travels through 6 landscapes from our surroundings through as many dishes, told like pages of a notebook inspired by the land and traditions of our village.\n\nHow it works: you'll receive a PDF by email right after purchase, with your voucher details and how to redeem it. To book a table, just the order number or the buyer's name is needed. The voucher is valid for 6 months from the purchase date."
    },
    variants: [
      { id: '53969639571803', n: 1, price: 155 },
      { id: '53969639604571', n: 2, price: 310 },
      { id: '53969639637339', n: 3, price: 465 },
      { id: '53969639670107', n: 4, price: 620 },
    ],
  },
  {
    handle: 'bono-regalo-oba-cuaderno-medio-con-maridaje',
    category: 'bono',
    image: 'https://cdn.shopify.com/s/files/1/1034/7354/5563/files/oba-144_ebfdf4e9-6225-4d86-9eca-8537123606d5.jpg?v=1788768744',
    es: {
      title: 'Bono Regalo · Cuaderno Medio con Maridaje',
      desc: 'El menú Cuaderno Medio con maridaje a elegir.',
      long: 'Bono regalo digital para vivir la experiencia gastronómica de OBA-, restaurante con Estrella Michelin y Estrella Verde en Casas-Ibáñez (Albacete), con maridaje incluido.\n\nEl Cuaderno Medio recorre 6 parajes de nuestro entorno a través de otros tantos platos, acompañado de un maridaje a elegir entre Natura (fermentados) o el vínico Matices Olvidados.\n\nCómo funciona: recibirás un PDF por email nada más completar la compra, con el detalle del bono y los pasos para canjearlo. Para reservar mesa bastará con el número de pedido o el nombre del comprador. El bono es válido durante 6 meses desde la fecha de compra.'
    },
    en: {
      title: 'Gift Voucher · Cuaderno Medio with Pairing',
      desc: 'The Cuaderno Medio menu with your choice of pairing.',
      long: "Digital gift voucher to experience OBA-, the Michelin Star & Green Star restaurant in Casas-Ibáñez (Albacete), pairing included.\n\nThe Cuaderno Medio menu travels through 6 landscapes from our surroundings, paired with your choice of Natura (fermented drinks) or the wine-based Matices Olvidados.\n\nHow it works: you'll receive a PDF by email right after purchase, with your voucher details and how to redeem it. To book a table, just the order number or the buyer's name is needed. The voucher is valid for 6 months from the purchase date."
    },
    variants: [
      { id: '53969648714075', n: 1, price: 235 },
      { id: '53969648746843', n: 2, price: 470 },
      { id: '53969648779611', n: 3, price: 705 },
      { id: '53969648812379', n: 4, price: 940 },
    ],
  },
  {
    handle: 'experiencia-oba-hotel-cuaderno-dos',
    category: 'experiencia',
    image: 'https://cdn.shopify.com/s/files/1/1034/7354/5563/files/oba-049_f16b36ff-afbf-4321-ba7c-9fc4c47da072.jpg?v=1788768767',
    es: {
      title: 'Experiencia OBA- + Hotel · Cuaderno Dos',
      desc: 'Cena Cuaderno Dos y noche de alojamiento en Cañitas Maite Gastronómico, con desayuno.',
      long: 'Bono regalo digital que combina una cena con el menú Cuaderno Dos de OBA- —restaurante con Estrella Michelin y Estrella Verde en Casas-Ibáñez (Albacete)— con una noche de alojamiento en el Hotel Cañitas Maite.\n\n8 parajes de nuestro entorno contados a través de otros tantos platos, con maridaje a elegir entre Natura (fermentados) o el vínico Matices Olvidados, más una habitación en el hotel con desayuno incluido.\n\nCómo funciona: recibirás un PDF por email nada más completar la compra, con el detalle del bono y los pasos para canjearlo. Para reservar bastará con el número de pedido o el nombre del comprador. El bono es válido durante 6 meses desde la fecha de compra.'
    },
    en: {
      title: 'OBA- Experience + Hotel · Cuaderno Dos',
      desc: 'Cuaderno Dos dinner and an overnight stay at Cañitas Maite Gastronómico, breakfast included.',
      long: "Digital gift voucher combining a Cuaderno Dos dinner at OBA- —the Michelin Star & Green Star restaurant in Casas-Ibáñez (Albacete)— with an overnight stay at Hotel Cañitas Maite.\n\n8 landscapes from our surroundings through as many dishes, with your choice of Natura (fermented drinks) or the wine-based Matices Olvidados pairing, plus a hotel room with breakfast included.\n\nHow it works: you'll receive a PDF by email right after purchase, with your voucher details and how to redeem it. To book, just the order number or the buyer's name is needed. The voucher is valid for 6 months from the purchase date."
    },
    variants: [
      { id: '53969654219099', n: 1, price: 405 },
      { id: '53969654251867', n: 2, price: 725 },
    ],
  },
  {
    handle: 'experiencia-oba-hotel-cuaderno-medio',
    category: 'experiencia',
    image: 'https://cdn.shopify.com/s/files/1/1034/7354/5563/files/oba-047_39505755-8b87-47a7-bee4-9eaa09d6bdd0.jpg?v=1788768758',
    es: {
      title: 'Experiencia OBA- + Hotel · Cuaderno Medio',
      desc: 'Cena Cuaderno Medio y noche de alojamiento en Cañitas Maite Gastronómico, con desayuno.',
      long: 'Bono regalo digital que combina una cena en OBA- —restaurante con Estrella Michelin y Estrella Verde en Casas-Ibáñez (Albacete)— con una noche de alojamiento en el Hotel Cañitas Maite.\n\nIncluye el menú Cuaderno Medio (6 parajes) con maridaje a elegir entre Natura (fermentados) o el vínico Matices Olvidados, más una habitación en el hotel con desayuno incluido.\n\nCómo funciona: recibirás un PDF por email nada más completar la compra, con el detalle del bono y los pasos para canjearlo. Para reservar bastará con el número de pedido o el nombre del comprador. El bono es válido durante 6 meses desde la fecha de compra.'
    },
    en: {
      title: 'OBA- Experience + Hotel · Cuaderno Medio',
      desc: 'Cuaderno Medio dinner and an overnight stay at Cañitas Maite Gastronómico, breakfast included.',
      long: "Digital gift voucher combining a dinner at OBA- —the Michelin Star & Green Star restaurant in Casas-Ibáñez (Albacete)— with an overnight stay at Hotel Cañitas Maite.\n\nIncludes the Cuaderno Medio menu (6 landscapes) with your choice of Natura (fermented drinks) or the wine-based Matices Olvidados pairing, plus a hotel room with breakfast included.\n\nHow it works: you'll receive a PDF by email right after purchase, with your voucher details and how to redeem it. To book, just the order number or the buyer's name is needed. The voucher is valid for 6 months from the purchase date."
    },
    variants: [
      { id: '53969652973915', n: 1, price: 335 },
      { id: '53969653006683', n: 2, price: 585 },
    ],
  },
  {
    handle: 'experiencia-total-oba-2-noches-y-3-restaurantes',
    category: 'experiencia',
    image: 'https://cdn.shopify.com/s/files/1/1034/7354/5563/files/oba-083_3ee893da-6e5a-4334-a3c8-fa5dea33b537.jpg?v=1788768775',
    es: {
      title: 'Experiencia Total OBA- · 2 Noches y 3 Restaurantes',
      desc: 'Dos noches en Casas-Ibáñez recorriendo nuestros tres espacios gastronómicos, alojamiento incluido.',
      long: 'El bono regalo digital más completo de OBA-: una inmersión de dos noches en Casas-Ibáñez (Albacete) que recorre los tres espacios gastronómicos del grupo, con alojamiento en el Hotel Cañitas Maite.\n\nIncluye el menú degustación Cuaderno Dos en OBA- con maridaje a elegir entre Natura o Matices Olvidados; una cena informal en La Taberñita con burgers o pizzas de masa madre y bebida; una comida o cena con menú degustación a elegir en Cañitas Maite (Pura Barra o Hits) con bebida incluida; y 2 noches de alojamiento en habitación doble con desayuno buffet libre (fines de semana).\n\nCómo funciona: recibirás un PDF por email nada más completar la compra, con el detalle del bono y los pasos para canjearlo. Para reservar bastará con el número de pedido o el nombre del comprador. El bono es válido durante 6 meses desde la fecha de compra.'
    },
    en: {
      title: 'OBA- Total Experience · 2 Nights & 3 Restaurants',
      desc: 'Two nights in Casas-Ibáñez exploring our three restaurants, accommodation included.',
      long: "OBA-'s most complete digital gift voucher: a two-night immersion in Casas-Ibáñez (Albacete) through the group's three restaurants, staying at Hotel Cañitas Maite.\n\nIncludes the Cuaderno Dos tasting menu at OBA- with your choice of Natura or Matices Olvidados pairing; a casual dinner at La Taberñita with burgers or sourdough pizzas and a drink; a meal with a tasting menu of your choice at Cañitas Maite (Pura Barra or Hits) with a drink included; and 2 nights in a double room with a free breakfast buffet (weekends).\n\nHow it works: you'll receive a PDF by email right after purchase, with your voucher details and how to redeem it. To book, just the order number or the buyer's name is needed. The voucher is valid for 6 months from the purchase date."
    },
    variants: [
      { id: '53969654907227', n: 1, price: 580 },
      { id: '53969654939995', n: 2, price: 995 },
    ],
  },
];

function obaLang() {
  try { return localStorage.getItem('oba_lang') || 'es'; } catch (e) { return 'es'; }
}

function obaComensalLabel(n, lang) {
  if (lang === 'en') return n + (n > 1 ? ' Guests' : ' Guest');
  return n + (n > 1 ? ' Comensales' : ' Comensal');
}

function obaFormatPrice(v) {
  return v.toLocaleString('es-ES') + '€';
}

function obaLoadCart() {
  try {
    var raw = localStorage.getItem(OBA_CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function obaSaveCart(cart) {
  try { localStorage.setItem(OBA_CART_KEY, JSON.stringify(cart)); } catch (e) {}
}

function obaFindProductByVariant(variantId) {
  for (var i = 0; i < OBA_PRODUCTS.length; i++) {
    var p = OBA_PRODUCTS[i];
    for (var j = 0; j < p.variants.length; j++) {
      if (p.variants[j].id === variantId) return { product: p, variant: p.variants[j] };
    }
  }
  return null;
}

function obaBuildProductCard(p, lang) {
    var t = p[lang] || p.es;
    var minPrice = p.variants[0].price;
    var card = document.createElement('article');
    card.className = 'oba-tienda-card';

    var media = document.createElement('div');
    media.className = 'oba-tienda-card-media';
    var img = document.createElement('img');
    img.src = p.image;
    img.alt = t.title;
    img.loading = 'lazy';
    media.appendChild(img);
    card.appendChild(media);

    var body = document.createElement('div');
    body.className = 'oba-tienda-card-body';

    var title = document.createElement('h3');
    title.className = 'oba-tienda-card-title';
    title.textContent = t.title;
    body.appendChild(title);

    var desc = document.createElement('p');
    desc.className = 'oba-tienda-card-desc';
    desc.textContent = t.desc;
    body.appendChild(desc);

    if (t.long) {
      var more = document.createElement('div');
      more.className = 'oba-tienda-card-more';
      t.long.split('\n\n').forEach(function (para) {
        var p2 = document.createElement('p');
        p2.textContent = para;
        more.appendChild(p2);
      });
      body.appendChild(more);

      var moreBtn = document.createElement('button');
      moreBtn.type = 'button';
      moreBtn.className = 'oba-tienda-more-btn';
      var moreLabel = '+ INFO';
      var lessLabel = '- INFO';
      moreBtn.textContent = moreLabel;
      moreBtn.setAttribute('aria-expanded', 'false');
      moreBtn.addEventListener('click', function () {
        var open = card.classList.toggle('is-expanded');
        moreBtn.textContent = open ? lessLabel : moreLabel;
        moreBtn.setAttribute('aria-expanded', String(open));
      });
      body.appendChild(moreBtn);
    }

    var price = document.createElement('p');
    price.className = 'oba-tienda-card-price';
    var descLabel = lang === 'en' ? 'From ' : 'Desde ';
    price.innerHTML = descLabel + '<strong>' + obaFormatPrice(minPrice) + '</strong>';
    body.appendChild(price);

    var row = document.createElement('div');
    row.className = 'oba-tienda-card-row';

    var select = document.createElement('select');
    select.className = 'oba-tienda-select';
    select.setAttribute('aria-label', lang === 'en' ? 'Guests' : 'Comensales');
    p.variants.forEach(function (v) {
      var opt = document.createElement('option');
      opt.value = v.id;
      opt.textContent = obaComensalLabel(v.n, lang) + ' — ' + obaFormatPrice(v.price);
      select.appendChild(opt);
    });
    row.appendChild(select);

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'oba-tienda-add';
    var addLabel = lang === 'en' ? 'ADD' : 'AÑADIR';
    btn.textContent = addLabel;
    btn.addEventListener('click', function () {
      var variantId = select.value;
      var found = obaFindProductByVariant(variantId);
      if (!found) return;
      obaAddToCart(found.product, found.variant);
      var addedLabel = lang === 'en' ? 'ADDED' : 'AÑADIDO';
      btn.textContent = addedLabel;
      btn.classList.add('is-added');
      setTimeout(function () {
        btn.textContent = addLabel;
        btn.classList.remove('is-added');
      }, 1100);
    });
    row.appendChild(btn);

    body.appendChild(row);
    card.appendChild(body);
    return card;
}

function obaRenderProducts() {
  var lang = obaLang();
  var groups = { bono: [], experiencia: [] };
  OBA_PRODUCTS.forEach(function (p) {
    if (groups[p.category]) groups[p.category].push(p);
  });
  ['bono', 'experiencia'].forEach(function (cat) {
    var grid = document.getElementById('oba-tienda-grid-' + cat);
    if (!grid) return;
    grid.innerHTML = '';
    groups[cat]
      .slice()
      .sort(function (a, b) { return a.variants[0].price - b.variants[0].price; })
      .forEach(function (p) { grid.appendChild(obaBuildProductCard(p, lang)); });
  });
}

function obaAddToCart(product, variant) {
  var cart = obaLoadCart();
  var existing = cart.find(function (l) { return l.variantId === variant.id; });
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      variantId: variant.id,
      handle: product.handle,
      image: product.image,
      n: variant.n,
      price: variant.price,
      qty: 1,
    });
  }
  obaSaveCart(cart);
  obaRenderCart();
  obaOpenCart();
}

function obaRemoveFromCart(variantId) {
  var cart = obaLoadCart().filter(function (l) { return l.variantId !== variantId; });
  obaSaveCart(cart);
  obaRenderCart();
}

function obaRenderCart() {
  var cart = obaLoadCart();
  var lang = obaLang();
  var itemsEl = document.getElementById('oba-cart-items');
  var countEl = document.getElementById('oba-cart-count');
  var subtotalEl = document.getElementById('oba-cart-subtotal-value');
  var checkoutBtn = document.getElementById('oba-cart-checkout');
  if (!itemsEl) return;

  var totalQty = cart.reduce(function (s, l) { return s + l.qty; }, 0);
  if (countEl) {
    countEl.textContent = String(totalQty);
    countEl.classList.toggle('visible', totalQty > 0);
  }

  itemsEl.innerHTML = '';
  if (cart.length === 0) {
    var empty = document.createElement('p');
    empty.className = 'oba-cart-empty';
    empty.textContent = lang === 'en' ? 'Your cart is empty.' : 'Tu cesta está vacía.';
    itemsEl.appendChild(empty);
  } else {
    cart.forEach(function (l) {
      var product = OBA_PRODUCTS.find(function (p) { return p.handle === l.handle; });
      var t = product ? (product[lang] || product.es) : { title: l.handle };
      var row = document.createElement('div');
      row.className = 'oba-cart-item';

      var img = document.createElement('img');
      img.src = l.image;
      img.alt = t.title;
      row.appendChild(img);

      var info = document.createElement('div');
      info.className = 'oba-cart-item-info';

      var title = document.createElement('p');
      title.className = 'oba-cart-item-title';
      title.textContent = t.title;
      info.appendChild(title);

      var variant = document.createElement('p');
      variant.className = 'oba-cart-item-variant';
      variant.textContent = obaComensalLabel(l.n, lang) + (l.qty > 1 ? ' × ' + l.qty : '');
      info.appendChild(variant);

      var bottomRow = document.createElement('div');
      bottomRow.className = 'oba-cart-item-row';

      var price = document.createElement('span');
      price.className = 'oba-cart-item-price';
      price.textContent = obaFormatPrice(l.price * l.qty);
      bottomRow.appendChild(price);

      var remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'oba-cart-item-remove';
      remove.textContent = lang === 'en' ? 'Remove' : 'Eliminar';
      remove.addEventListener('click', function () { obaRemoveFromCart(l.variantId); });
      bottomRow.appendChild(remove);

      info.appendChild(bottomRow);
      row.appendChild(info);
      itemsEl.appendChild(row);
    });
  }

  var subtotal = cart.reduce(function (s, l) { return s + l.price * l.qty; }, 0);
  if (subtotalEl) subtotalEl.textContent = obaFormatPrice(subtotal);
  if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;
}

function obaOpenCart() {
  var overlay = document.getElementById('oba-cart-overlay');
  var drawer = document.getElementById('oba-cart-drawer');
  if (overlay) overlay.classList.add('open');
  if (drawer) drawer.classList.add('open');
}

function obaCloseCart() {
  var overlay = document.getElementById('oba-cart-overlay');
  var drawer = document.getElementById('oba-cart-drawer');
  if (overlay) overlay.classList.remove('open');
  if (drawer) drawer.classList.remove('open');
}

function obaBuildCheckoutUrl() {
  var cart = obaLoadCart();
  if (!cart.length) return null;
  var parts = cart.map(function (l) { return l.variantId + ':' + l.qty; });
  return OBA_SHOP_DOMAIN + '/cart/' + parts.join(',');
}

function obaInitTienda() {
  if (!document.getElementById('oba-tienda-grid-bono')) return;

  obaRenderProducts();
  obaRenderCart();

  var cartBtn = document.getElementById('oba-tienda-cart-btn');
  var closeBtn = document.getElementById('oba-cart-close');
  var overlay = document.getElementById('oba-cart-overlay');
  var checkoutBtn = document.getElementById('oba-cart-checkout');

  if (cartBtn) cartBtn.addEventListener('click', obaOpenCart);
  if (closeBtn) closeBtn.addEventListener('click', obaCloseCart);
  if (overlay) overlay.addEventListener('click', obaCloseCart);
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function () {
      var url = obaBuildCheckoutUrl();
      if (url) window.location.href = url;
    });
  }

  document.querySelectorAll('.oba-lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setTimeout(function () {
        obaRenderProducts();
        obaRenderCart();
      }, 0);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', obaInitTienda);
} else {
  obaInitTienda();
}
