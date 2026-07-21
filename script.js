// ============================================================
// MOTOR DE TRADUCCIÓN ES/EN — compartido por todos los bloques y todas las páginas
// Añade data-i18n="clave" a cualquier texto nuevo y su traducción aquí abajo.
// ============================================================
window.OBA_TRANSLATIONS = window.OBA_TRANSLATIONS || {
  es: {
    menu_reserva: "RESERVA", menu_contacto: "CONTACTO", menu_tienda: "TIENDA",
    nav_restaurante: "RESTAURANTE", nav_entorno: "ENTORNO", nav_nosotros: "NOSOTROS",
    btn_reservar: "RESERVAR",
    aria_menu: "Abrir menú", aria_lang: "Seleccionar idioma"
  },
  en: {
    menu_reserva: "BOOK", menu_contacto: "CONTACT", menu_tienda: "SHOP",
    nav_restaurante: "RESTAURANT", nav_entorno: "SURROUNDINGS", nav_nosotros: "ABOUT US",
    btn_reservar: "BOOK NOW",
    aria_menu: "Open menu", aria_lang: "Select language"
  }
};

function obaApplyLang(lang) {
  const dict = window.OBA_TRANSLATIONS[lang];
  if (!dict) return;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(';').forEach((pair) => {
      const [attr, key] = pair.split(':').map(s => s.trim());
      if (attr && dict[key] !== undefined) el.setAttribute(attr, dict[key]);
    });
  });
  document.querySelectorAll('.oba-lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  document.documentElement.lang = lang;
  try { localStorage.setItem('oba_lang', lang); } catch (e) {}
}

function obaInit() {
  console.log('[oba] script cargado correctamente');
  let saved = 'es';
  try { saved = localStorage.getItem('oba_lang') || 'es'; } catch (e) {}
  obaApplyLang(saved);

  document.querySelectorAll('.oba-lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => obaApplyLang(btn.dataset.lang));
  });

  var menuBtn = document.querySelector('.oba-page .oba-menu-btn');
  var inlineMenu = document.querySelector('.oba-page #oba-inline-menu');
  if (menuBtn && inlineMenu) {
    menuBtn.addEventListener('click', function () {
      var isOpen = inlineMenu.classList.toggle('open');
      menuBtn.classList.toggle('active', isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });
  } else {
    console.warn('[oba] no se encontró el botón de menú o #oba-inline-menu');
  }

  var links = document.querySelectorAll('.oba-page .oba-hero-link');
  var layers = document.querySelectorAll('.oba-page .oba-bg-layer');
  function showBg(targetId) {
    layers.forEach(function (layer) { layer.classList.remove('active'); });
    var target = document.getElementById(targetId);
    if (target) target.classList.add('active');
  }
  links.forEach(function (link) {
    var targetId = link.dataset.bg;
    link.addEventListener('mouseenter', function () { showBg(targetId); });
    link.addEventListener('focus', function () { showBg(targetId); });
  });
  if (!links.length) console.warn('[oba] no se encontraron .oba-hero-link');
}

// Ejecuta ya si el DOM ya está listo (por si el script se carga tarde dentro de Elementor),
// o espera a DOMContentLoaded si no.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', obaInit);
} else {
  obaInit();
}
