// Basic parallax enhancement for iOS/Safari fallbacks (no heavy JS)
// Disable legacy parallax now that hero uses fixed height
(function () {
  const ua = navigator.userAgent || navigator.vendor || '';
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (isIOS) { document.documentElement.classList.add('ios'); }
})();

// Stable viewport height on mobile (avoid resizing on URL bar hide/show)
(function () {
  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  // Set once on load
  setVh();
  // Update only on orientation change (not on every resize to avoid jumps)
  window.addEventListener('orientationchange', () => {
    // Delay to let viewport settle
    setTimeout(setVh, 250);
  });
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

// No fixed-hero overlay needed anymore

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

// Language switcher
(function () {
  if (typeof translations === 'undefined') return;
  
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };
  
  const setLanguage = (lang) => {
    const t = translations[lang];
    if (!t) return;
    
    document.documentElement.lang = lang;
    localStorage.setItem('preferredLang', lang);
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = getNestedValue(t, key);
      if (text !== undefined) {
        el.innerHTML = text;
      }
    });
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  };
  
  const initLang = localStorage.getItem('preferredLang') || 'en';
  setLanguage(initLang);
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
})();


