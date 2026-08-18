// ============================================================
// REVEAL FOOTER — cruce de fondos al pasar el ratón por los links,
// igual que en el hero de la Home. Compartido por las páginas interiores.
// ============================================================
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var links = document.querySelectorAll('.oba-reveal-link');
    var layers = document.querySelectorAll('.oba-reveal-bg');
    var nav = document.querySelector('.oba-reveal-nav');
    var DEFAULT_BG = 'rv-bg-default';
    if (!links.length || !layers.length) return;

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

    if (nav) {
      nav.addEventListener('mouseleave', function () { showBg(DEFAULT_BG); });
      nav.addEventListener('focusout', function (e) {
        if (!nav.contains(e.relatedTarget)) showBg(DEFAULT_BG);
      });
    }

    // En móvil no hay hover: las fotos van rotando solas cada ~2s
    var bgIds = Array.prototype.map.call(layers, function (layer) { return layer.id; });
    var mobileQuery = window.matchMedia('(max-width: 700px)');
    var carouselTimer = null;
    var carouselIndex = 0;
    function startCarousel() {
      if (carouselTimer || bgIds.length < 2) return;
      carouselIndex = bgIds.indexOf(DEFAULT_BG);
      if (carouselIndex < 0) carouselIndex = 0;
      carouselTimer = setInterval(function () {
        carouselIndex = (carouselIndex + 1) % bgIds.length;
        showBg(bgIds[carouselIndex]);
      }, 2000);
    }
    function stopCarousel() {
      if (carouselTimer) { clearInterval(carouselTimer); carouselTimer = null; }
      showBg(DEFAULT_BG);
    }
    mobileQuery.addEventListener('change', function (e) {
      if (e.matches) startCarousel(); else stopCarousel();
    });
    if (mobileQuery.matches) startCarousel();
  });
})();
