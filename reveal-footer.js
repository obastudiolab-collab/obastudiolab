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
  });
})();
