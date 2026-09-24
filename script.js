const header = document.getElementById('siteHeader');
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('mainNav');
const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id]')];

toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
});

navLinks.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const updatePage = () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
  let current = 'accueil';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
};

window.addEventListener('scroll', updatePage, { passive: true });
updatePage();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
document.getElementById('year').textContent = new Date().getFullYear();
