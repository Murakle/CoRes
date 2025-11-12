// Donation modal and form handling
(function() {
  const modal = document.getElementById('donationModal');
  const form = document.getElementById('donationForm');
  const closeBtn = document.querySelector('.modal-close');
  const cancelBtn = form?.querySelector('.button.ghost');
  const donationSummary = document.getElementById('donationSummary');
  const nameInput = document.getElementById('donorName');
  const emailInput = document.getElementById('donorEmail');
  const commentInput = document.getElementById('donorComment');
  
  let currentDonation = null;

  // Currency helpers
  const USD_TO_IDR = 20000;
  const getCurrentCurrency = () => {
    // Force IDR for all languages
    return 'IDR';
  };
  const formatAmount = (amount, currency) => {
    const num = Number(amount) || 0;
    if (currency === 'USD') {
      return `$${num}`;
    }
    return `IDR ${num.toLocaleString('en-US')}`;
  };
  const updateDonationOptionsCurrency = () => {
    const currency = getCurrentCurrency();
    document.querySelectorAll('.donation-card').forEach(card => {
      const amountUsdAttr = card.getAttribute('data-amount-usd');
      const baseUsd = amountUsdAttr ? Number(amountUsdAttr) : Number(card.getAttribute('data-amount')) || 0;
      if (!amountUsdAttr) {
        // Persist original USD amount for future toggles
        card.setAttribute('data-amount-usd', String(baseUsd));
      }
      const amountForCurrency = currency === 'USD' ? baseUsd : baseUsd * USD_TO_IDR;
      card.setAttribute('data-amount', String(amountForCurrency));
      const priceEl = card.querySelector('.donation-price');
      if (priceEl) {
        priceEl.textContent = currency === 'USD'
          ? `$${baseUsd}`
          : `IDR ${ (baseUsd * USD_TO_IDR).toLocaleString('en-US') }`;
      }
    });
    // If modal is open, refresh summary with correct currency formatting
    if (modal?.classList.contains('active') && currentDonation?.amount && donationSummary) {
      const currencyNow = getCurrentCurrency();
      const typeText = currentDonation?.type === 'adopt' 
        ? (document.querySelector('[data-i18n="support.adopt.title"]')?.textContent || 'Adopt a Coral')
        : (document.querySelector('[data-i18n="support.home.title"]')?.textContent || 'Build a Home');
      donationSummary.textContent = `${typeText} — ${formatAmount(currentDonation.amount, currencyNow)}`;
    }
  };

  // Update placeholders when language changes
  const updatePlaceholders = () => {
    if (typeof translations === 'undefined') return;
    const lang = document.documentElement.lang || 'en';
    const t = translations[lang]?.support?.modal;
    if (!t) return;
    
    if (nameInput) {
      const placeholder = nameInput.getAttribute('data-i18n-placeholder');
      if (placeholder) {
        const keys = placeholder.split('.');
        const text = keys.reduce((obj, key) => obj?.[key], translations[lang]);
        if (text) nameInput.placeholder = text;
      }
    }
    
    if (emailInput) {
      const placeholder = emailInput.getAttribute('data-i18n-placeholder');
      if (placeholder) {
        const keys = placeholder.split('.');
        const text = keys.reduce((obj, key) => obj?.[key], translations[lang]);
        if (text) emailInput.placeholder = text;
      }
    }
    
    if (commentInput) {
      const placeholder = commentInput.getAttribute('data-i18n-placeholder');
      if (placeholder) {
        const keys = placeholder.split('.');
        const text = keys.reduce((obj, key) => obj?.[key], translations[lang]);
        if (text) commentInput.placeholder = text;
      }
    }
  };

  // Update placeholders on language change
  const observer = new MutationObserver(() => {
    if (document.documentElement.lang) updatePlaceholders();
    // Update currency/amount display when language changes
    setTimeout(updateDonationOptionsCurrency, 0);
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  
  // Initial placeholder update
  setTimeout(updatePlaceholders, 100);
  // Initial currency/amount update
  setTimeout(updateDonationOptionsCurrency, 120);

  // Open modal when donation button is clicked
  document.querySelectorAll('.donation-card .button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.donation-card');
      const type = card.getAttribute('data-donation-type');
      const amount = card.getAttribute('data-amount');
      
      currentDonation = { type, amount };
      
      // Update summary
      if (donationSummary) {
        const currency = getCurrentCurrency();
        const typeText = type === 'adopt' 
          ? (document.querySelector('[data-i18n="support.adopt.title"]')?.textContent || 'Adopt a Coral')
          : (document.querySelector('[data-i18n="support.home.title"]')?.textContent || 'Build a Home');
        donationSummary.textContent = `${typeText} — ${formatAmount(amount, currency)}`;
      }
      
      // Show modal
      if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal
  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      form?.reset();
      currentDonation = null;
    }
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  
  // Close on overlay click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeModal();
    }
  });

  // Handle form submission (create invoice via Vercel backend, then redirect)
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const donationData = {
        id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()),
        type: currentDonation?.type,
        amount: currentDonation?.amount,
        name: (formData.get('name') || '').toString(),
        email: (formData.get('email') || '').toString(),
        comment: (formData.get('comment') || '').toString(),
        payment: (formData.get('payment') || 'xendit').toString()
      };

      if (!donationData.type || !donationData.amount) {
        alert('Please select a donation option.');
        return;
      }

      if (donationData.payment !== 'xendit') {
        alert('Please choose Xendit as the payment method.');
        return;
      }

      // Create invoice via Vercel backend and redirect to returned URL
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn?.textContent;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
      }

      const endpoint = 'https://coralhero-payment-test.vercel.app/api/donation';
      const currency = getCurrentCurrency();
      const successUrl = `${window.location.origin}/success.html?type=${encodeURIComponent(donationData.type)}&amount=${encodeURIComponent(String(donationData.amount))}`;
      const cancelUrl = `${window.location.origin}/error.html?type=${encodeURIComponent(donationData.type)}`;

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: donationData.name,
          email: donationData.email,
          comment: donationData.comment,
          amount: Number(donationData.amount),
          currency,
          success_url: successUrl,
          cancel_url: cancelUrl
        })
      })
      .then(async (resp) => {
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok || !data?.url) {
          throw new Error(data?.error || 'Payment initialization failed');
        }
        window.location.href = data.url;
      })
      .catch((err) => {
        alert(err?.message || 'Payment initialization failed.');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      });
    });
  }
})();

