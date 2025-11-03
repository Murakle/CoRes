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

// Language switcher - runs immediately when DOM is ready
(function initLanguage() {
  // Wait for translations to load
  if (typeof translations === 'undefined') {
    // Retry after a short delay if translations.js hasn't loaded yet
    setTimeout(initLanguage, 50);
    return;
  }
  
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };
  
  const writeLang = (lang) => {
    try { localStorage.setItem('preferredLang', lang); } catch (_) {}
    document.cookie = `preferredLang=${lang}; path=/; max-age=${60*60*24*365}`;
  };

  const readLang = () => {
    let lang;
    try { lang = localStorage.getItem('preferredLang'); } catch (_) { lang = null; }
    if (!lang) {
      const m = document.cookie.match(/(?:^|; )preferredLang=([^;]+)/);
      if (m) lang = decodeURIComponent(m[1]);
    }
    return lang || 'en';
  };

  const setLanguage = (lang, skipSave) => {
    const t = translations[lang];
    if (!t) return;
    
    document.documentElement.lang = lang;
    // Only persist when explicitly changing language (not on initial load)
    if (!skipSave) writeLang(lang);
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = getNestedValue(t, key);
      if (text !== undefined) {
        el.innerHTML = text;
      }
    });
    
    // Update button active states - clear all first
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      }
    });
  };
  
  // Helper to apply the saved language without overwriting it
  const applySavedLanguage = () => {
    const savedLang = readLang();
    setLanguage(savedLang, true);
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-lang') === savedLang) btn.classList.add('active');
    });
  };

  // Apply immediately on load
  applySavedLanguage();
  // Re-apply on pageshow (handles bfcache/back-forward and some mobile behaviors)
  window.addEventListener('pageshow', applySavedLanguage);
  
  // Set up click handlers for language buttons - these WILL save to localStorage
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang, false); // false = save to localStorage
    });
  });
})();


