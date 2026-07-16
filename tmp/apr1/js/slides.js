/* ========================================
   EdgeMarket — Slides Engine
   Navigation + Dynamic Content Rendering
   ======================================== */

(function () {
  'use strict';

  const TOTAL_SLIDES = SLIDES_DATA.length;
  let currentSlide = 0;

  // DOM refs
  const container = document.getElementById('slidesContainer');
  const progressFill = document.getElementById('progressFill');
  const slideCounter = document.getElementById('slideCounter');
  const indicators = document.getElementById('indicators');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const btnFullscreen = document.getElementById('btnFullscreen');

  // ---- Lucide Icon Map ----
  const ICONS = {
    mission: 'target',
    vision: 'eye',
    value: 'gem',
    manual: 'file-text',
    visibility: 'eye',
    data: 'bar-chart-3',
    scale: 'trending-up',
    reach: 'globe',
    revenue: 'wallet',
    dashboard: 'layout-dashboard',
    contract: 'file-check',
    whitelabel: 'tag',
    commission: 'banknote',
    support: 'handshake',
    ecosystem: 'link',
    catalog: 'book-open',
    booking: 'calendar-check',
    contracts: 'pen-line',
    payments: 'credit-card',
    analytics: 'activity',
    api: 'settings',
    multi: 'building-2',
    mobile: 'smartphone',
    lgpd: 'shield-check',
    encrypt: 'lock',
    sla: 'timer',
    audit: 'clipboard-list',
    mail: 'mail',
    phone: 'phone',
    globe: 'globe',
    linkedin: 'linkedin'
  };

  function icon(name) {
    const lucideName = ICONS[name] || 'circle';
    return `<i data-lucide="${lucideName}"></i>`;
  }

  // ---- Render Dynamic Content ----
  function renderContent() {
    const d = SLIDES_DATA;

    renderCards('quemSomosCards', d[1].items, 'icon', 'label', 'text');
    renderStats('mercadoStats', d[2].stats);
    setText('mercadoFootnote', d[2].footnote);
    renderCards('problemaCards', d[3].painPoints, 'icon', 'title', 'desc');
    setText('solucaoDesc', d[4].description);
    renderCheckList('solucaoHighlights', d[4].highlights);
    renderSteps('comoFuncionaSteps', d[5].steps);
    renderCards('fornecedoresCards', d[6].benefits, 'icon', 'title', 'text');
    renderCards('parceirosCards', d[7].benefits, 'icon', 'title', 'text');
    renderFeatures('featuresGrid', d[8].features);
    renderCustom('customGrid', d[9].customization);
    renderPricing('pricingGrid', d[10].plans);
    renderCards('segurancaCards', d[11].items, 'icon', 'title', 'desc');
    renderComparison('comparisonContainer', d[12].comparison);
    renderCTASteps('ctaSteps', d[13].steps);
    renderContact('contactGrid', d[14].contact);

    initLucide();
  }

  function initLucide() {
    if (window.lucide) lucide.createIcons();
  }

  // ---- Render Helpers ----
  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function renderCards(containerId, items, iconKey, titleKey, textKey) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = items.map(item => `
      <div class="card">
        <div class="card__icon">${icon(item[iconKey])}</div>
        <div class="card__title">${item[titleKey]}</div>
        <div class="card__text">${item[textKey]}</div>
      </div>
    `).join('');
  }

  function renderStats(containerId, stats) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = stats.map(s => `
      <div class="stat">
        <div class="stat__value">${s.value}</div>
        <div class="stat__label">${s.label}</div>
      </div>
    `).join('');
  }

  function renderCheckList(containerId, items) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = items.map(i => `<li>${i}</li>`).join('');
  }

  function renderSteps(containerId, steps) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = steps.map(s => `
      <div class="step">
        <div class="step__number">${s.number}</div>
        <div class="step__title">${s.title}</div>
        <div class="step__desc">${s.desc}</div>
      </div>
    `).join('');
  }

  function renderFeatures(containerId, features) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = features.map(f => `
      <div class="feature">
        <div class="feature__icon">${icon(f.icon)}</div>
        <div class="feature__title">${f.title}</div>
        <div class="feature__desc">${f.desc}</div>
      </div>
    `).join('');
  }

  function renderCustom(containerId, items) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = items.map(i => `
      <div class="custom-item">
        <div class="custom-item__label">${i.label}</div>
        <div class="custom-item__desc">${i.desc}</div>
      </div>
    `).join('');
  }

  function renderPricing(containerId, plans) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = plans.map(p => `
      <div class="plan ${p.highlight ? 'plan--highlight' : ''}">
        <div class="plan__name">${p.name}</div>
        <div class="plan__price">${p.price}<span class="plan__period">${p.period}</span></div>
        <ul class="plan__features">
          ${p.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  function renderComparison(containerId, comp) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = `
      <div class="comparison-col comparison-col--before">
        <div class="comparison-col__title">Antes</div>
        <ul>${comp.before.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>
      <div class="comparison-arrow"><i data-lucide="arrow-right"></i></div>
      <div class="comparison-col comparison-col--after">
        <div class="comparison-col__title">Depois</div>
        <ul>${comp.after.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>
    `;
  }

  function renderCTASteps(containerId, steps) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = steps.map(s => `
      <div class="cta-step">
        <div class="cta-step__number">${s.number}</div>
        <div class="cta-step__title">${s.title}</div>
        <div class="cta-step__desc">${s.desc}</div>
      </div>
    `).join('');
  }

  function renderContact(containerId, contact) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = `
      <div class="contact-item">
        <span class="contact-item__icon"><i data-lucide="mail"></i></span>
        <span class="contact-item__text">${contact.email}</span>
      </div>
      <div class="contact-item">
        <span class="contact-item__icon"><i data-lucide="phone"></i></span>
        <span class="contact-item__text">${contact.phone}</span>
      </div>
      <div class="contact-item">
        <span class="contact-item__icon"><i data-lucide="globe"></i></span>
        <span class="contact-item__text">${contact.website}</span>
      </div>
      <div class="contact-item">
        <span class="contact-item__icon"><i data-lucide="linkedin"></i></span>
        <span class="contact-item__text">${contact.linkedin}</span>
      </div>
    `;
  }

  // ---- Indicators ----
  function renderIndicators() {
    indicators.innerHTML = '';
    for (let i = 0; i < TOTAL_SLIDES; i++) {
      const dot = document.createElement('button');
      dot.className = 'indicator' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      indicators.appendChild(dot);
    }
  }

  // ---- Navigation ----
  let isTransitioning = false;

  function goToSlide(index) {
    if (index < 0 || index >= TOTAL_SLIDES || index === currentSlide || isTransitioning) return;
    isTransitioning = true;

    const slides = container.querySelectorAll('.slide');
    const oldSlide = slides[currentSlide];
    const newSlide = slides[index];
    const direction = index > currentSlide ? 1 : -1;

    oldSlide.style.cssText = '';
    newSlide.style.cssText = '';
    oldSlide.classList.remove('exit-left', 'active');
    newSlide.classList.remove('exit-left', 'active');

    newSlide.style.transition = 'none';
    newSlide.style.transform = direction > 0 ? 'translateX(40px)' : 'translateX(-40px)';
    newSlide.style.opacity = '0';
    newSlide.style.visibility = 'visible';

    void newSlide.offsetWidth;

    newSlide.style.transition = '';
    oldSlide.style.transition = '';

    oldSlide.style.transform = direction > 0 ? 'translateX(-40px)' : 'translateX(40px)';
    oldSlide.style.opacity = '0';

    newSlide.style.transform = 'translateX(0)';
    newSlide.style.opacity = '1';
    newSlide.classList.add('active');

    setTimeout(() => {
      oldSlide.style.cssText = '';
      oldSlide.classList.remove('active', 'exit-left');
      newSlide.style.cssText = '';
      isTransitioning = false;
    }, 200);

    currentSlide = index;
    updateUI();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function updateUI() {
    const pct = ((currentSlide + 1) / TOTAL_SLIDES) * 100;
    progressFill.style.width = pct + '%';
    slideCounter.textContent = `${currentSlide + 1} / ${TOTAL_SLIDES}`;
    btnPrev.disabled = currentSlide === 0;
    btnNext.disabled = currentSlide === TOTAL_SLIDES - 1;

    const dots = indicators.querySelectorAll('.indicator');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  // ---- Event Listeners ----
  btnPrev.addEventListener('click', prevSlide);
  btnNext.addEventListener('click', nextSlide);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(TOTAL_SLIDES - 1);
    } else if (e.key === 'f' || e.key === 'F') {
      toggleFullscreen();
    }
  });

  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
    }
  }, { passive: true });

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  }

  btnFullscreen.addEventListener('click', toggleFullscreen);

  // ---- Init ----
  renderContent();
  renderIndicators();
  updateUI();

})();
