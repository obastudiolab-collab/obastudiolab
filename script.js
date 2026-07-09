const links = document.querySelectorAll('.hero-link');
const layers = document.querySelectorAll('.bg-layer');

function showBg(targetId) {
  layers.forEach((layer) => layer.classList.remove('active'));
  document.getElementById(targetId).classList.add('active');
}

links.forEach((link) => {
  const targetId = link.dataset.bg;

  link.addEventListener('mouseenter', () => showBg(targetId));
  link.addEventListener('focus', () => showBg(targetId));
});

const langButtons = document.querySelectorAll('.lang-btn');

langButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    langButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    document.documentElement.lang = btn.dataset.lang;
  });
});

const menuBtn = document.querySelector('.menu-btn');
const inlineMenu = document.getElementById('inline-menu');

if (menuBtn && inlineMenu) {
  menuBtn.addEventListener('click', () => {
    const isOpen = inlineMenu.classList.toggle('open');
    menuBtn.classList.toggle('active', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });
}
