// ============================================================
// MOTOR DE TRADUCCIÓN ES/EN — igual que en el resto de páginas del sitio
// ============================================================
window.OBA_TRANSLATIONS = window.OBA_TRANSLATIONS || {
  es: {
    menu_reserva: "RESERVA", menu_contacto: "CONTACTO", menu_tienda: "TIENDA",
    aria_menu: "Abrir menú", aria_lang: "Seleccionar idioma",
    kicker: "00 — CUADERNO DOS",
    p1: "Hoy lugares, historias y personas que merecen ser contadas (y recordadas).",
    p2: "En este nuevo Cuaderno nuestra inspiración parte de nuestra tradición más arraigada, de nuestro entorno más cercano y de nuestras historias más personales.",
    p3: "Un libro llamado \u201cLas 1000 recetas de la cocina de Albacete\u201d escrito en 1971 por Carmina Useros, ha compuesto este menú, donde todo el conjunto de platos y elaboraciones nacen de estas recetas rescatadas de nuestro antiguo recetario local. Aquí nuestro agradecimiento querida Carmina.",
    btn_menu_actual: "MENÚ ACTUAL",
    btn_reservar_2: "RESERVAR",
    h2_fermentos: "PROGRAMA DE FERMENTOS",
    p_fermentos_1: "Nuestra carta cambia constantemente y combina técnicas de fermentación propias con productores locales de temporada, en línea con los sabores de nuestra cocina.",
    p_fermentos_2: "Escríbenos a hola@oba-restaurante.com para recibir la carta más reciente.",
    btn_ver_carta: "VER CARTA",
    h2_eventos: "EVENTOS PRIVADOS",
    p_eventos: "Nuestra barra está disponible para cenas privadas, ofreciendo el uso exclusivo del espacio por una noche. Solicitamos un mínimo de dos meses de antelación para asegurar la fecha.",
    btn_consulta: "HACER UNA CONSULTA"
  },
  en: {
    menu_reserva: "BOOK", menu_contacto: "CONTACT", menu_tienda: "SHOP",
    aria_menu: "Open menu", aria_lang: "Select language",
    kicker: "00 — NOTEBOOK TWO",
    p1: "Today, places, stories and people that deserve to be told (and remembered).",
    p2: "In this new Notebook our inspiration comes from our deepest-rooted tradition, our closest surroundings and our most personal stories.",
    p3: "A book called \u201cThe 1000 recipes of Albacete cuisine\u201d written in 1971 by Carmina Useros, has shaped this menu, where every dish and preparation is born from these recipes rescued from our old local cookbook. Our gratitude, dear Carmina.",
    btn_menu_actual: "CURRENT MENU",
    btn_reservar_2: "BOOK NOW",
    h2_fermentos: "FERMENTS PROGRAM",
    p_fermentos_1: "Our menu changes constantly and combines our own fermentation techniques with local seasonal producers, in line with the flavors of our cuisine.",
    p_fermentos_2: "Write to us at hola@oba-restaurante.com to receive the latest menu.",
    btn_ver_carta: "SEE MENU",
    h2_eventos: "PRIVATE EVENTS",
    p_eventos: "Our bar is available for private dinners, offering exclusive use of the space for a night. We ask for a minimum of two months notice to secure the date.",
    btn_consulta: "MAKE AN ENQUIRY"
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
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', obaInit);
} else {
  obaInit();
}
