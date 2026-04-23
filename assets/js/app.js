/*  NirmanBazar · নির্মাণবাজার
    SPA frontend — renders sections, categories, product cards, modal, search, filter.
*/

(() => {
  'use strict';

  // ---------- i18n ----------
  const I18N = {
    bn: {
      'nav.categories': 'ক্যাটাগরি',
      'nav.about': 'আমাদের সম্পর্কে',
      'nav.contact': 'যোগাযোগ',
      'topbar.delivery': 'সারা বাংলাদেশে হোম ডেলিভারি',
      'hero.badge': '✦ বাংলাদেশের #১ নির্মাণ সামগ্রীর বাজার',
      'hero.title_1': 'প্রিমিয়াম নির্মাণ সামগ্রী',
      'hero.title_2': 'এক ছাদের নিচে',
      'hero.subtitle': 'সিমেন্ট থেকে দরজা, টাইলস থেকে স্যানিটারি — সবকিছুই সর্বোচ্চ মানে, সরাসরি যাচাই-করা বিক্রেতাদের কাছ থেকে।',
      'hero.cta1': 'ক্যাটাগরি দেখুন',
      'hero.cta2': 'ফিচার্ড পণ্য',
      'hero.stat.products': 'পণ্য',
      'hero.stat.categories': 'ক্যাটাগরি',
      'hero.stat.districts': 'জেলায় সেবা',
      'hero.stat.verified': 'ভেরিফাইড বিক্রেতা',
      'trust.1t': 'যাচাইকৃত মান', 'trust.1s': 'সকল পণ্যের গুণগত মান নিশ্চিত',
      'trust.2t': 'সেরা দাম', 'trust.2s': 'বাজারের সর্বোত্তম মূল্য গ্যারান্টি',
      'trust.3t': 'দ্রুত ডেলিভারি', 'trust.3s': 'সারাদেশে সময়মত পৌঁছে দেই',
      'trust.4t': '২৪/৭ সাপোর্ট', 'trust.4s': 'যেকোনো সহায়তায় আমাদের পাশে',
      'sections.title': 'শ্রেণীবিন্যাস',
      'sections.subtitle': 'আপনার প্রয়োজন অনুযায়ী ক্যাটাগরি নির্বাচন করুন',
      'catalog.title': 'সকল পণ্য',
      'catalog.all': 'সকল বিভাগ',
      'catalog.sort.default': 'ডিফল্ট',
      'catalog.sort.price_asc': 'দাম: কম থেকে বেশি',
      'catalog.sort.price_desc': 'দাম: বেশি থেকে কম',
      'catalog.sort.title': 'নাম (A→Z)',
      'catalog.load_more': 'আরও দেখুন',
      'featured.title': 'ফিচার্ড কালেকশন',
      'featured.subtitle': 'আমাদের নির্বাচিত সেরা পণ্যসমূহ',
      'about.eye': 'আমাদের সম্পর্কে',
      'about.title': 'নির্মাণকে করি সহজ ও বিশ্বস্ত',
      'about.p1': 'NirmanBazar — নির্মাণবাজার — বাংলাদেশের প্রিমিয়াম অনলাইন নির্মাণ সামগ্রীর মার্কেটপ্লেস। আমরা বিশ্বমানের গুণমান, স্বচ্ছ মূল্য এবং সময়মত ডেলিভারি নিশ্চিত করে আপনার প্রতিটি প্রকল্পের পাশে থাকি।',
      'about.p2': 'আমাদের প্ল্যাটফর্মে রয়েছে ১,২০০+ যাচাইকৃত পণ্য, ১৪৫+ ক্যাটাগরি এবং সারা বাংলাদেশের নির্ভরযোগ্য বিক্রেতা। ছোট মেরামত থেকে বড় প্রকল্প — সবকিছুর জন্য এক নাম NirmanBazar।',
      'about.f1': 'যাচাইকৃত সরবরাহকারী', 'about.f2': 'স্বচ্ছ মূল্য তালিকা',
      'about.f3': 'বাল্ক ও রিটেইল অর্ডার', 'about.f4': 'সারাদেশে ডেলিভারি',
      'about.rating': 'গ্রাহক সন্তুষ্টি', 'about.orders': 'সফল ডেলিভারি',
      'about.sellers': 'নিবন্ধিত বিক্রেতা', 'about.support': 'গ্রাহক সেবা',
      'contact.eye': 'যোগাযোগ',
      'contact.title': 'আজই আমাদের সাথে কথা বলুন',
      'contact.sub': 'প্রকল্পের জন্য পরামর্শ, বাল্ক অর্ডার বা পণ্যের বিশদ জানতে আমাদের সাথে যোগাযোগ করুন।',
      'contact.addr': 'ঢাকা, বাংলাদেশ',
      'contact.hours': 'সকাল ৯টা — রাত ৯টা (প্রতিদিন)',
      'contact.send': 'বার্তা পাঠান',
      'footer.about': 'বাংলাদেশের বিশ্বস্ত নির্মাণ সামগ্রীর মার্কেটপ্লেস। প্রিমিয়াম গুণমান, সেরা দাম, নিশ্চিত ডেলিভারি।',
      'footer.shop': 'দোকান',
      'footer.links': 'দ্রুত লিংক',
      'footer.contact': 'যোগাযোগ',
      'footer.rights': 'সর্বস্বত্ব সংরক্ষিত।',
      'prod.view': 'বিস্তারিত',
      'modal.inquire': 'অনুসন্ধান করুন',
      'modal.call': 'কল করুন',
      'modal.cat': 'ক্যাটাগরি',
      'modal.price_note': '(বিকন, বাল্ক অর্ডারে বিশেষ মূল্য)',
      'no_results': 'কোনো পণ্য পাওয়া যায়নি।',
    },
    en: {
      'nav.categories': 'Categories',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'topbar.delivery': 'Nationwide home delivery',
      'hero.badge': '✦ Bangladesh\'s #1 Construction Marketplace',
      'hero.title_1': 'Premium Construction Materials',
      'hero.title_2': 'Under One Roof',
      'hero.subtitle': 'From cement to doors, tiles to sanitary ware — everything at top quality, sourced directly from verified sellers.',
      'hero.cta1': 'Explore Categories',
      'hero.cta2': 'Featured Products',
      'hero.stat.products': 'Products',
      'hero.stat.categories': 'Categories',
      'hero.stat.districts': 'Districts',
      'hero.stat.verified': 'Verified Sellers',
      'trust.1t': 'Verified Quality', 'trust.1s': 'Every product inspected & certified',
      'trust.2t': 'Best Prices', 'trust.2s': 'Market-best pricing guaranteed',
      'trust.3t': 'Fast Delivery', 'trust.3s': 'On-time nationwide shipping',
      'trust.4t': '24/7 Support', 'trust.4s': 'We are here when you need us',
      'sections.title': 'Shop by Category',
      'sections.subtitle': 'Find exactly what your project needs',
      'catalog.title': 'All Products',
      'catalog.all': 'All Sections',
      'catalog.sort.default': 'Default',
      'catalog.sort.price_asc': 'Price: Low to High',
      'catalog.sort.price_desc': 'Price: High to Low',
      'catalog.sort.title': 'Name (A→Z)',
      'catalog.load_more': 'Load More',
      'featured.title': 'Featured Collection',
      'featured.subtitle': 'Handpicked best-sellers from our catalog',
      'about.eye': 'About Us',
      'about.title': 'Building Bangladesh\'s Future, Together',
      'about.p1': 'NirmanBazar — নির্মাণবাজার — is Bangladesh\'s premium online marketplace for construction materials. We guarantee world-class quality, transparent pricing, and timely delivery for every project.',
      'about.p2': 'Our platform features 1,200+ verified products, 145+ categories, and trusted sellers nationwide. From small repairs to large-scale projects — NirmanBazar is the name you can trust.',
      'about.f1': 'Verified Suppliers', 'about.f2': 'Transparent Pricing',
      'about.f3': 'Bulk & Retail Orders', 'about.f4': 'Nationwide Delivery',
      'about.rating': 'Customer Satisfaction', 'about.orders': 'Successful Deliveries',
      'about.sellers': 'Registered Sellers', 'about.support': 'Customer Support',
      'contact.eye': 'Get In Touch',
      'contact.title': 'Let\'s talk about your project today',
      'contact.sub': 'Whether you need product advice, bulk orders, or detailed specifications — our team is ready to help.',
      'contact.addr': 'Dhaka, Bangladesh',
      'contact.hours': '9 AM — 9 PM (Daily)',
      'contact.send': 'Send Message',
      'footer.about': 'Bangladesh\'s trusted construction marketplace. Premium quality, best prices, guaranteed delivery.',
      'footer.shop': 'Shop',
      'footer.links': 'Quick Links',
      'footer.contact': 'Contact',
      'footer.rights': 'All rights reserved.',
      'prod.view': 'View Details',
      'modal.inquire': 'Inquire Now',
      'modal.call': 'Call Us',
      'modal.cat': 'Category',
      'modal.price_note': '(Special pricing available for bulk orders)',
      'no_results': 'No products found.',
    }
  };

  let LANG = 'bn';
  const t = (key) => (I18N[LANG] && I18N[LANG][key]) || key;

  function applyI18n() {
    document.documentElement.setAttribute('data-lang', LANG);
    document.documentElement.setAttribute('lang', LANG === 'bn' ? 'bn' : 'en');
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val) el.textContent = val;
    });
  }

  // ---------- State ----------
  let DATA = null;
  let filtered = [];
  let currentSection = 'all';
  let currentCategory = 'all';
  let currentSort = 'default';
  let currentSearch = '';
  let visibleCount = 24;
  const PAGE = 24;

  // ---------- Utilities ----------
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const priceNum = (p) => p ? Number(String(p).replace(/[^0-9.]/g,'')) || 0 : 0;
  const fmtPrice = (p) => p ? `৳${p}` : '';

  // ---------- Load data ----------
  async function loadData() {
    try {
      const res = await fetch('products.json', {cache: 'no-cache'});
      DATA = await res.json();
      init();
    } catch (e) {
      console.error('Failed to load products.json', e);
      $('#productGrid').innerHTML = `<p class="muted">Failed to load products. Please refresh.</p>`;
    }
  }

  // ---------- Init ----------
  function init() {
    renderSections();
    renderSectionFilter();
    renderChips();
    applyFilters();
    renderFeatured();
    renderFooterSections();
    updateStats();
    applyI18n();
    attachEvents();
  }

  function updateStats() {
    $('#stat-products').textContent = DATA.listings.length.toLocaleString(LANG === 'bn' ? 'bn-BD' : 'en-US');
    $('#stat-categories').textContent = DATA.categories.length.toLocaleString(LANG === 'bn' ? 'bn-BD' : 'en-US');
  }

  // ---------- Render sections grid ----------
  function renderSections() {
    const grid = $('#sectionsGrid');
    grid.innerHTML = DATA.sections.map(s => `
      <button class="sec-card" data-section="${esc(s.id)}" aria-label="${esc(s.en)}">
        <span class="sec-card__icon">${s.icon || '📦'}</span>
        <span class="sec-card__title">${esc(LANG === 'bn' ? (s.bn || s.en) : s.en)}</span>
        <span class="sec-card__meta">${s.item_count} ${LANG === 'bn' ? 'পণ্য' : 'items'} · ${s.category_count} ${LANG === 'bn' ? 'ক্যাটাগরি' : 'categories'}</span>
        <span class="sec-card__arrow">→</span>
      </button>
    `).join('');
    grid.querySelectorAll('.sec-card').forEach(el => {
      el.addEventListener('click', () => {
        const sec = el.getAttribute('data-section');
        currentSection = sec;
        currentCategory = 'all';
        $('#sectionFilter').value = sec;
        renderChips();
        applyFilters();
        $('#catalog').scrollIntoView({behavior: 'smooth', block: 'start'});
      });
    });
  }

  // ---------- Render section filter dropdown ----------
  function renderSectionFilter() {
    const sel = $('#sectionFilter');
    DATA.sections.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = LANG === 'bn' ? (s.bn || s.en) : s.en;
      opt.dataset.bn = s.bn || s.en;
      opt.dataset.en = s.en;
      sel.appendChild(opt);
    });
  }

  // ---------- Render chips (categories within selected section) ----------
  function renderChips() {
    const row = $('#chipsRow');
    let cats;
    if (currentSection === 'all') {
      cats = DATA.categories;
    } else {
      cats = DATA.categories.filter(c => c.section === currentSection);
    }
    // Show top 40 categories to keep chips manageable
    cats = cats.slice().sort((a,b) => b.count - a.count).slice(0, 40);
    row.innerHTML = `<button class="chip ${currentCategory === 'all' ? 'active' : ''}" data-cat="all">${LANG === 'bn' ? 'সব' : 'All'}</button>` +
      cats.map(c => `<button class="chip ${currentCategory === c.slug ? 'active' : ''}" data-cat="${esc(c.slug)}">${esc(c.name)} <small style="opacity:.55;">${c.count}</small></button>`).join('');
    row.querySelectorAll('.chip').forEach(b => {
      b.addEventListener('click', () => {
        currentCategory = b.getAttribute('data-cat');
        row.querySelectorAll('.chip').forEach(x => x.classList.toggle('active', x === b));
        applyFilters();
      });
    });
  }

  // ---------- Filter & render products ----------
  function applyFilters() {
    let L = DATA.listings.slice();
    if (currentSection !== 'all') L = L.filter(x => x.section === currentSection);
    if (currentCategory !== 'all') L = L.filter(x => x.category_slug === currentCategory);
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      L = L.filter(x => (x.title || '').toLowerCase().includes(q) ||
                        (x.category_name || '').toLowerCase().includes(q) ||
                        (x.text || '').toLowerCase().includes(q));
    }
    if (currentSort === 'price_asc') L.sort((a,b) => priceNum(a.price) - priceNum(b.price));
    else if (currentSort === 'price_desc') L.sort((a,b) => priceNum(b.price) - priceNum(a.price));
    else if (currentSort === 'title_asc') L.sort((a,b) => (a.title || '').localeCompare(b.title || ''));

    filtered = L;
    visibleCount = PAGE;
    renderGrid();
    updateCatalogMeta();
  }

  function updateCatalogMeta() {
    const n = filtered.length;
    const label = LANG === 'bn' ? `${n.toLocaleString('bn-BD')} টি পণ্য` : `${n.toLocaleString('en-US')} products`;
    let titleText = LANG === 'bn' ? 'সকল পণ্য' : 'All Products';
    if (currentSection !== 'all') {
      const s = DATA.sections.find(x => x.id === currentSection);
      if (s) titleText = LANG === 'bn' ? (s.bn || s.en) : s.en;
    }
    if (currentCategory !== 'all') {
      const c = DATA.categories.find(x => x.slug === currentCategory);
      if (c) titleText = c.name;
    }
    $('#catalogTitle').textContent = titleText;
    $('#catalogCount').textContent = label;
  }

  function renderGrid() {
    const grid = $('#productGrid');
    const items = filtered.slice(0, visibleCount);
    if (items.length === 0) {
      grid.innerHTML = `<p class="muted" style="grid-column:1/-1;text-align:center;padding:40px 0;">${t('no_results')}</p>`;
      $('#loadMore').style.display = 'none';
      return;
    }
    grid.innerHTML = items.map((p, i) => cardHTML(p, i)).join('');
    $('#loadMore').style.display = visibleCount < filtered.length ? 'inline-flex' : 'none';
    grid.querySelectorAll('.prod').forEach((el, i) => {
      el.addEventListener('click', () => openModal(items[i]));
    });
    observeImages(grid);
  }

  // Section styling for placeholders
  const SECTION_STYLE = {
    'construction-materials': { c1: '#8b4513', c2: '#d2691e', icon: '🧱' },
    'paint-chemical':         { c1: '#6a1b9a', c2: '#b83dba', icon: '🎨' },
    'electrical':             { c1: '#0277bd', c2: '#29b6f6', icon: '⚡' },
    'kitchen':                { c1: '#bf360c', c2: '#ff7043', icon: '🍳' },
    'sanitary-ware':          { c1: '#00695c', c2: '#26a69a', icon: '🚿' },
    'doors-windows':          { c1: '#4e342e', c2: '#8d6e63', icon: '🚪' },
    'tiles-marble':           { c1: '#37474f', c2: '#78909c', icon: '🏛️' },
    'pipe-fittings':          { c1: '#1565c0', c2: '#42a5f5', icon: '🔧' },
    'rooftop':                { c1: '#283593', c2: '#5c6bc0', icon: '🏠' },
    'tools':                  { c1: '#424242', c2: '#757575', icon: '🛠️' },
    'safety-security':        { c1: '#b71c1c', c2: '#e53935', icon: '🛡️' },
    'real-estate':            { c1: '#1b5e20', c2: '#66bb6a', icon: '🏢' },
    'services':               { c1: '#6a4c93', c2: '#9575cd', icon: '🧰' },
    'others':                 { c1: '#0b1a2b', c2: '#13263d', icon: '📦' },
  };

  function placeholder(title, section) {
    const s = SECTION_STYLE[section] || SECTION_STYLE['others'];
    const letter = String(title || 'N').replace(/[^A-Za-z0-9]/g, '')[0] || 'N';
    const initial = letter.toUpperCase();
    const svg =
`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
<defs>
<linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
<stop offset="0" stop-color="${s.c1}"/>
<stop offset="1" stop-color="${s.c2}"/>
</linearGradient>
<pattern id="p" width="44" height="44" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
<rect width="44" height="44" fill="transparent"/>
<circle cx="22" cy="22" r="1.6" fill="rgba(255,255,255,0.18)"/>
</pattern>
</defs>
<rect width="400" height="300" fill="url(#g)"/>
<rect width="400" height="300" fill="url(#p)"/>
<text x="200" y="130" text-anchor="middle" font-family="Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif" font-size="86">${s.icon}</text>
<text x="200" y="220" text-anchor="middle" fill="rgba(255,255,255,0.95)" font-family="Playfair Display, Georgia, serif" font-size="44" font-weight="700">${initial}</text>
</svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function cardHTML(p, idx) {
    const ph = placeholder(p.title, p.section);
    const desc = (p.text || p.description || p.title || '').slice(0, 140);
    return `
      <article class="prod" tabindex="0">
        <div class="prod__imgwrap">
          <img class="prod__img" src="${ph}" data-src="${esc(p.image_local || p.image || '')}" alt="${esc(p.title)}" loading="lazy"/>
          ${p.category_name ? `<span class="prod__cat-chip">${esc(p.category_name)}</span>` : ''}
        </div>
        <div class="prod__body">
          <h3 class="prod__title">${esc(p.title)}</h3>
          <p class="prod__desc">${esc(desc)}</p>
          <div class="prod__foot">
            <span class="prod__price"><span class="tk">৳</span>${esc(p.price || '—')}</span>
            <span class="prod__view">${t('prod.view')}</span>
          </div>
        </div>
      </article>
    `;
  }

  // Progressively upgrade placeholders to real images when they intersect viewport.
  // Throttled to avoid rate-limit errors from external source.
  let upgradeQueue = [];
  let upgradeActive = 0;
  const UPGRADE_CONCURRENCY = 3;

  function upgradeImage(img) {
    const realSrc = img.getAttribute('data-src');
    if (!realSrc) return;
    img.removeAttribute('data-src');
    const loader = new Image();
    loader.onload = () => { img.src = realSrc; upgradeActive--; pump(); };
    loader.onerror = () => { upgradeActive--; pump(); };
    loader.src = realSrc;
  }
  function pump() {
    while (upgradeQueue.length && upgradeActive < UPGRADE_CONCURRENCY) {
      const img = upgradeQueue.shift();
      if (!img || !img.getAttribute('data-src')) continue;
      upgradeActive++;
      upgradeImage(img);
    }
  }
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        io.unobserve(e.target);
        upgradeQueue.push(e.target);
      }
    });
    pump();
  }, { rootMargin: '200px' }) : null;

  function observeImages(root) {
    (root || document).querySelectorAll('img.prod__img[data-src]').forEach(img => {
      if (io) io.observe(img);
      else { upgradeQueue.push(img); }
    });
    pump();
  }

  // ---------- Featured (top priced + random) ----------
  function renderFeatured() {
    const grid = $('#featuredGrid');
    // Pick high-value items with images and descriptions, ensure variety
    const pool = DATA.listings
      .filter(l => l.image && l.text && l.text.length > 60)
      .sort((a,b) => priceNum(b.price) - priceNum(a.price));
    // Ensure variety by section
    const bySection = {};
    pool.forEach(p => {
      if (!bySection[p.section]) bySection[p.section] = [];
      bySection[p.section].push(p);
    });
    const picks = [];
    const sections = Object.keys(bySection);
    for (let i=0; i<8 && picks.length < 8; i++) {
      for (const s of sections) {
        if (picks.length >= 8) break;
        if (bySection[s][i]) picks.push(bySection[s][i]);
      }
    }
    grid.innerHTML = picks.slice(0, 8).map((p,i) => cardHTML(p, i)).join('');
    grid.querySelectorAll('.prod').forEach((el, i) => {
      el.addEventListener('click', () => openModal(picks[i]));
    });
    observeImages(grid);
  }

  // ---------- Footer sections ----------
  function renderFooterSections() {
    $('#footerSections').innerHTML = DATA.sections.slice(0, 8).map(s =>
      `<li><a href="#sections" data-sec="${esc(s.id)}">${esc(LANG === 'bn' ? (s.bn || s.en) : s.en)}</a></li>`
    ).join('');
    $('#footerSections').querySelectorAll('a').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        currentSection = a.getAttribute('data-sec');
        currentCategory = 'all';
        $('#sectionFilter').value = currentSection;
        renderChips();
        applyFilters();
        $('#catalog').scrollIntoView({behavior: 'smooth'});
      });
    });
  }

  // ---------- Modal ----------
  function openModal(p) {
    const ph = placeholder(p.title, p.section);
    const desc = p.description || p.text || '';
    const content = `
      <div class="modal__img">
        <img id="modalImg" src="${ph}" data-src="${esc(p.image_local || p.image || '')}" alt="${esc(p.title)}"/>
      </div>
      <div class="modal__info">
        ${p.category_name ? `<span class="modal__cat">${t('modal.cat')}: ${esc(p.category_name)}</span>` : ''}
        <h3>${esc(p.title)}</h3>
        <div class="modal__price">
          <span class="tk">৳</span>${esc(p.price || '—')}
          <small>${t('modal.price_note')}</small>
        </div>
        <p class="modal__desc">${esc(desc || p.title)}</p>
        <div class="modal__cta">
          <a class="btn btn-primary btn-lg" href="#contact" data-close>${t('modal.inquire')}</a>
          <a class="btn btn-outline btn-lg" href="tel:+8801700000000">${t('modal.call')}</a>
        </div>
        <div class="modal__meta">
          NirmanBazar · নির্মাণবাজার — ${LANG === 'bn' ? 'বিশ্বাসের সঙ্গে ক্রয়' : 'Buy with confidence'}
        </div>
      </div>
    `;
    $('#modalContent').innerHTML = content;
    $('#productModal').classList.add('open');
    $('#productModal').setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    const mi = document.getElementById('modalImg');
    if (mi) upgradeImage(mi);
  }
  function closeModal() {
    $('#productModal').classList.remove('open');
    $('#productModal').setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  // ---------- Events ----------
  function attachEvents() {
    // Search
    const doSearch = () => {
      currentSearch = $('#searchInput').value.trim();
      applyFilters();
      if (currentSearch) $('#catalog').scrollIntoView({behavior: 'smooth'});
    };
    $('#searchForm').addEventListener('submit', e => { e.preventDefault(); doSearch(); });
    let tmo;
    $('#searchInput').addEventListener('input', () => {
      clearTimeout(tmo);
      tmo = setTimeout(doSearch, 300);
    });

    // Section filter
    $('#sectionFilter').addEventListener('change', e => {
      currentSection = e.target.value;
      currentCategory = 'all';
      renderChips();
      applyFilters();
    });
    // Sort
    $('#sortSelect').addEventListener('change', e => {
      currentSort = e.target.value;
      applyFilters();
    });
    // Load more
    $('#loadMore').addEventListener('click', () => {
      visibleCount += PAGE;
      renderGrid();
    });

    // Modal close
    $$('#productModal [data-close]').forEach(el => el.addEventListener('click', closeModal));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    // Language toggle
    $('#langToggle').addEventListener('click', () => {
      LANG = LANG === 'bn' ? 'en' : 'bn';
      applyI18n();
      // re-render dynamic content
      renderSections();
      // Update section filter labels
      $$('#sectionFilter option').forEach((opt, i) => {
        if (i === 0) opt.textContent = t('catalog.all');
        else {
          const s = DATA.sections.find(s => s.id === opt.value);
          if (s) opt.textContent = LANG === 'bn' ? (s.bn || s.en) : s.en;
        }
      });
      renderChips();
      renderGrid();
      renderFeatured();
      renderFooterSections();
      updateStats();
      updateCatalogMeta();
    });

    // Header scroll effect
    const header = $('#header');
    const toTop = $('#toTop');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
      toTop.classList.toggle('show', window.scrollY > 500);
    });
    toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

    // Year
    $('#year').textContent = new Date().getFullYear();
  }

  // ---------- Go ----------
  loadData();
})();
