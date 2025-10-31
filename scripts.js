// Basic parallax enhancement for iOS/Safari fallbacks (no heavy JS)
(function () {
  const ua = navigator.userAgent || navigator.vendor || '';
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (isIOS) { document.documentElement.classList.add('ios'); }
  const supportsFixed = window.CSS && CSS.supports && CSS.supports('background-attachment: fixed');
  const needFallback = isIOS || !supportsFixed;
  if (!needFallback) return;
  const heroes = document.querySelectorAll('.hero-parallax');
  heroes.forEach(h => { h.style.backgroundAttachment = 'scroll'; });
  const onScroll = () => {
    const y = window.scrollY;
    heroes.forEach(h => {
      h.style.backgroundPosition = `center ${Math.round(y * 0.3)}px`;
    });
  };
  document.addEventListener('scroll', onScroll, { passive: true });
})();

// Mobile hamburger menu toggle with ARIA updates
(function () {
  function initHeader(header) {
    const toggle = header.querySelector('.menu-toggle');
    const nav = header.querySelector('.nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
  document.querySelectorAll('.site-header').forEach(initHeader);
})();

// Reveal on scroll for media and gallery images
(function () {
  const elements = document.querySelectorAll('.media img, .gallery img, .card, .feature');
  elements.forEach(el => el.classList.add('reveal'));
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  elements.forEach(el => io.observe(el));
})();

// Smooth card reaction when details open/close
(function () {
  document.querySelectorAll('.trip details').forEach(details => {
    details.addEventListener('toggle', () => {
      const card = details.closest('.trip');
      if (!card) return;
      if (details.open) {
        card.classList.add('details-open');
      } else {
        card.classList.remove('details-open');
      }
    });
  });
})();


