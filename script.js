document.body.classList.add('js');

/* ============================================================
   MENU MOBILE
   ============================================================ */
const toggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.nav-mobile');

const closeMobileMenu = () => {
  if (!toggle || !mobileMenu) return;
  if (toggle.classList.contains('open')) {
    toggle.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
};

if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  window.addEventListener('resize', closeMobileMenu);
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMobileMenu();
  });
}

/* ============================================================
   REVEAL ON SCROLL — rivela gli elementi .fade-in
   (senza questo restano a opacity:0 = invisibili)
   ============================================================ */
const fadeEls = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  fadeEls.forEach(el => revealObserver.observe(el));
} else {
  // Fallback: nessun observer → mostra tutto subito
  fadeEls.forEach(el => el.classList.add('visible'));
}

/* ============================================================
   PAGINA MATERIE — sidebar + dettaglio
   ============================================================ */
const materiaItems = document.querySelectorAll('.materia-item');
const detailEl = document.getElementById('materia-detail');

if (materiaItems.length && detailEl) {
  const detailImg = detailEl.querySelector('.materia-detail-img img');
  const detailTitle = detailEl.querySelector('.materia-detail-title');
  const detailDesc = detailEl.querySelector('.materia-detail-desc');
  const detailLink = detailEl.querySelector('.materia-detail-link');

  const showMateria = item => {
    materiaItems.forEach(i => {
      i.classList.remove('active');
      i.setAttribute('aria-current', 'false');
    });
    item.classList.add('active');
    item.setAttribute('aria-current', 'true');

    const { title, desc, img } = item.dataset;
    const href = item.getAttribute('href');

    if (detailImg) {
      detailImg.src = img || '';
      detailImg.alt = title || '';
    }
    if (detailTitle) detailTitle.textContent = title || '';
    if (detailDesc) detailDesc.textContent = desc || '';
    if (detailLink) detailLink.href = href || '#';
  };

  materiaItems.forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();
      showMateria(item);
    });
  });

  // Inizializza con la prima materia
  showMateria(materiaItems[0]);
}
