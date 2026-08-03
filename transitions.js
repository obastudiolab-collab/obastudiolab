// ============================================================
// TRANSICIÓN DE PÁGINA — fundido minimalista al entrar y al salir.
// Compartido por todas las páginas del sitio (Home y páginas interiores).
// ============================================================
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function isInternalNavLink(a) {
    if (!a) return false;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#') return false;
    if (a.target === '_blank' || a.hasAttribute('download')) return false;
    if (/^([a-z]+:)?\/\//i.test(href)) return false;
    if (href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return false;
    return true;
  }

  ready(function () {
    var page = document.querySelector('.oba-page');
    if (!page) return;

    // Doble rAF: fuerza a que el navegador pinte el opacity:0 inicial
    // antes de animar a 1, para que el fundido de entrada se vea siempre.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        page.classList.add('oba-page-visible');
      });
    });

    window.addEventListener('pageshow', function (e) {
      if (e.persisted) {
        page.classList.remove('oba-page-exit');
        page.classList.add('oba-page-visible');
      }
    });

    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest('a');
      if (!isInternalNavLink(a)) return;

      e.preventDefault();
      page.classList.remove('oba-page-visible');
      page.classList.add('oba-page-exit');
      setTimeout(function () {
        window.location.href = a.href;
      }, 380);
    });
  });
})();
