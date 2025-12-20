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
// Only one details section can be open per trip with smooth height animation
(function () {
  // Wrap content in each details element for smooth animation
  document.querySelectorAll('.trip details').forEach(details => {
    const summary = details.querySelector('summary');
    if (!summary) return;
    
    // Check if content is already wrapped
    if (details.querySelector('.details-content')) return;
    
    // Get all children except summary
    const contentNodes = Array.from(details.children).filter(child => child !== summary);
    if (contentNodes.length === 0) return;
    
    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'details-content';
    contentNodes.forEach(node => wrapper.appendChild(node));
    details.appendChild(wrapper);
  });
  
  // Handle toggle events with smooth height animation
  document.querySelectorAll('.trip details').forEach(details => {
    const summary = details.querySelector('summary');
    const content = details.querySelector('.details-content');
    if (!summary || !content) return;
    
    details.addEventListener('toggle', () => {
      const card = details.closest('.trip');
      if (!card) return;
      
      if (details.open) {
        // Measure actual height of content
        content.style.maxHeight = '';
        content.style.display = 'block';
        const height = content.scrollHeight;
        content.style.maxHeight = '0px';
        
        // Trigger reflow
        content.offsetHeight;
        
        // Set max-height for smooth animation
        requestAnimationFrame(() => {
          content.style.maxHeight = height + 'px';
          setTimeout(() => {
            content.style.display = '';
          }, 400);
        });
        
        // Close all other details in the same trip
        const allDetails = card.querySelectorAll('details');
        allDetails.forEach(otherDetails => {
          if (otherDetails !== details && otherDetails.open) {
            const otherContent = otherDetails.querySelector('.details-content');
            if (otherContent) {
              // Measure current height while still open
              const otherCurrentMaxHeight = otherContent.style.maxHeight;
              otherContent.style.maxHeight = '';
              otherContent.style.display = 'block';
              const otherHeight = otherContent.scrollHeight;
              
              // Set initial height for animation
              otherContent.style.maxHeight = otherHeight + 'px';
              
              // Trigger reflow to ensure the height is set
              otherContent.offsetHeight;
              
              // Start closing animation
              requestAnimationFrame(() => {
                otherContent.style.maxHeight = '0px';
                // Close the details element and clear styles after animation completes
                setTimeout(() => {
                  otherDetails.open = false;
                  otherContent.style.maxHeight = '';
                  otherContent.style.display = '';
                }, 400);
              });
            } else {
              otherDetails.open = false;
            }
          }
        });
        card.classList.add('details-open');
      } else {
        // Animate closing - measure current height first
        content.style.maxHeight = '';
        content.style.display = 'block';
        const currentHeight = content.scrollHeight;
        
        // Set initial height for animation
        content.style.maxHeight = currentHeight + 'px';
        
        // Trigger reflow to ensure the height is set
        content.offsetHeight;
        
        // Animate to 0
        requestAnimationFrame(() => {
          content.style.maxHeight = '0px';
          setTimeout(() => {
            content.style.maxHeight = '';
            content.style.display = '';
          }, 400);
        });
        
        // Check if any details are still open in this trip
        const anyOpen = Array.from(card.querySelectorAll('details')).some(d => d.open);
        if (!anyOpen) {
          card.classList.remove('details-open');
        }
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
    
    // Handle placeholder translations
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = getNestedValue(t, key);
      if (text !== undefined) {
        el.placeholder = text;
      }
    });
    
    // Handle SVG text elements with data-i18n-key
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
      const key = el.getAttribute('data-i18n-key');
      const text = getNestedValue(t, key);
      if (text !== undefined) {
        el.textContent = text;
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


