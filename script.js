// Tema claro/oscuro con persistencia
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') root.setAttribute('data-theme','light');

themeBtn?.addEventListener('click', () => {
  const now = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  if(now === 'light') root.setAttribute('data-theme','light'); else root.removeAttribute('data-theme');
  localStorage.setItem('theme', now);
});

// Menú responsive
const hamb = document.getElementById('hamb');
const menu = document.getElementById('menu');
hamb?.addEventListener('click', () => menu.classList.toggle('open'));

// Fade-in al hacer scroll + animación de barras de habilidades
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('in');
      if(e.target.id === 'habilidades'){
        document.querySelectorAll('#habilidades .bar > span').forEach(span => {
          const w = span.getAttribute('data-width');
          span.style.width = w;
        });
      }
    }
  })
}, { threshold: .16 });

document.querySelectorAll('.fade').forEach(el => io.observe(el));

// Form demo (simulado)
const form = document.getElementById('contactForm');
form?.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const fd = new FormData(form);
  const nombre = fd.get('nombre');
  form.reset();
  alert(`¡Gracias ${nombre}! Tu mensaje ha sido registrado (demo).`);
});

// Accesibilidad: cerrar menú al navegar con los enlaces
Array.from(document.querySelectorAll('#menu a')).forEach(a =>
  a.addEventListener('click', () => menu.classList.remove('open'))
);
