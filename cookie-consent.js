// ============================================================
// AVISO DE COOKIES — banner mínimo, compartido por todo el sitio.
// Guarda la decisión en localStorage y solo carga Google Analytics
// cuando el usuario ha pulsado "Aceptar" (nunca antes, y nunca si
// rechaza), tal y como se describe en la Política de Cookies.
// ============================================================
(function () {
  var KEY = 'oba_cookie_consent';

  // Sustituir por el ID de medición real de Google Analytics (GA4)
  // cuando esté disponible, con el formato "G-XXXXXXXXXX".
  var GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

  function getConsent() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setConsent(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
  }

  function loadAnalytics() {
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.indexOf('XXXX') !== -1) return;
    if (window.__obaGaLoaded) return;
    window.__obaGaLoaded = true;

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(script);
  }

  function texts() {
    var lang = 'es';
    try { lang = (localStorage.getItem('oba_lang') || document.documentElement.lang || 'es').slice(0, 2); } catch (e) {}
    if (lang === 'en') {
      return {
        text: 'We use our own technical cookies to remember your language and keep the site working properly, and — only if you accept — Google Analytics to measure site usage. You can accept, reject non-essential cookies, or read more in our ',
        link: 'Cookie Policy',
        accept: 'Accept',
        reject: 'Reject non-essential'
      };
    }
    return {
      text: 'Usamos cookies propias y técnicas para recordar tu idioma y que la web funcione correctamente y, solo si las aceptas, Google Analytics para medir el uso del sitio. Puedes aceptarlas, rechazar las no esenciales o leer más en nuestra ',
      link: 'Política de Cookies',
      accept: 'Aceptar',
      reject: 'Rechazar no esenciales'
    };
  }

  function buildBanner() {
    var t = texts();
    var wrap = document.createElement('div');
    wrap.className = 'oba-cookie-banner';
    wrap.setAttribute('role', 'region');
    wrap.setAttribute('aria-label', 'Aviso de cookies');
    wrap.innerHTML =
      '<p class="oba-cookie-text">' + t.text + '<a href="politica-cookies.html">' + t.link + '</a>.</p>' +
      '<div class="oba-cookie-actions">' +
        '<button type="button" class="oba-cookie-btn oba-cookie-btn--ghost" data-action="reject">' + t.reject + '</button>' +
        '<button type="button" class="oba-cookie-btn" data-action="accept">' + t.accept + '</button>' +
      '</div>';
    document.body.appendChild(wrap);
    wrap.querySelector('[data-action="accept"]').addEventListener('click', function () {
      setConsent('accepted');
      loadAnalytics();
      wrap.remove();
    });
    wrap.querySelector('[data-action="reject"]').addEventListener('click', function () {
      setConsent('rejected');
      wrap.remove();
    });
  }

  function init() {
    var consent = getConsent();
    if (!consent) {
      buildBanner();
    } else if (consent === 'accepted') {
      loadAnalytics();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
