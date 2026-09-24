const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

const syncHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.classList.toggle('active');
  mobileMenu.classList.toggle('open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.classList.remove('active');
  mobileMenu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
}));

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
  reveals.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min((index % 4) * 70, 210)}ms`;
    observer.observe(el);
  });
} else {
  reveals.forEach(el => el.classList.add('visible'));
}

const dialog = document.querySelector('#product-dialog');
const dialogImage = document.querySelector('#dialog-image');
const dialogTitle = document.querySelector('#dialog-title');
const dialogPrice = document.querySelector('#dialog-price');
const dialogInfo = document.querySelector('#dialog-info');

document.querySelectorAll('.product-card').forEach(card => {
  card.querySelector('.product-open').addEventListener('click', () => {
    dialogTitle.textContent = card.dataset.name;
    dialogPrice.textContent = card.dataset.price;
    dialogInfo.textContent = card.dataset.info;
    dialogImage.src = card.dataset.image;
    dialogImage.alt = `PRISHE ${card.dataset.name}`;
    dialog.showModal();
  });
});

const closeDialog = () => dialog.close();
dialog.querySelector('.dialog-close').addEventListener('click', closeDialog);
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDialog();
});
