/*  NirmanBazar · নির্মাণবাজার
    SPA frontend — sections, products, modal, search, filters,
    quote builder, deep-link, brand filter, RFQ, supplier form.
*/

(() => {
  'use strict';

  // ---------- i18n ----------
  const I18N = {
    bn: {
      'nav.categories': 'ক্যাটাগরি',
      'nav.about': 'আমাদের সম্পর্কে',
      'nav.contact': 'যোগাযোগ',
      'nav.quote': 'কোটেশন',
      'nav.rfq': 'বাল্ক RFQ',
      'nav.supplier': 'সাপ্লায়ার হোন',
      'topbar.delivery': 'সারা বাংলাদেশে হোম ডেলিভারি',
      'hero.badge': '✦ বাংলাদেশের #১ নির্মাণ সামগ্রীর বাজার',
      'hero.title_1': 'প্রিমিয়াম নির্মাণ সামগ্রী',
      'hero.title_2': 'এক ছাদের নিচে',
      'hero.subtitle': 'সিমেন্ট থেকে দরজা, টাইলস থেকে স্যানিটারি — সবকিছুই সর্বোচ্চ মানে, সরাসরি যাচাই-করা বিক্রেতাদের কাছ থেকে।',
      'hero.cta1': 'ক্যাটাগরি দেখুন',
      'hero.cta2': 'ফিচার্ড পণ্য',
      'hero.cta3': 'কোটেশন বানান',
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
      'catalog.all_brands': 'সকল ব্র্যান্ড',
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
      'contact.addr': '১১/২ পল্লবী, মিরপুর, ঢাকা',
      'contact.hours': 'সকাল ৯টা — রাত ৯টা (প্রতিদিন)',
      'contact.send': 'বার্তা পাঠান',
      'rfq.eye': 'বাল্ক RFQ',
      'rfq.title': 'বাল্ক অর্ডার বা প্রজেক্টের জন্য কোটেশন চান?',
      'rfq.subtitle': 'আপনার তালিকা/BOQ আপলোড করুন বা লিখে পাঠান — আমরা ২৪ ঘন্টায় কোটেশন দেব।',
      'rfq.send': '📤 RFQ পাঠান',
      'supplier.eye': 'সাপ্লায়ার?',
      'supplier.title': 'আপনার পণ্য আমাদের প্ল্যাটফর্মে যোগ করুন',
      'supplier.subtitle': 'আপনি যদি প্রস্তুতকারক, পরিবেশক বা খুচরা বিক্রেতা হন, আমাদের প্ল্যাটফর্মে যুক্ত হয়ে দেশজুড়ে গ্রাহকদের কাছে পৌঁছে যান।',
      'supplier.f1': 'দেশজুড়ে দৃশ্যমানতা', 'supplier.f2': 'নিজস্ব সেলার পেজ',
      'supplier.f3': 'যাচাইকৃত ব্যাজ', 'supplier.f4': '২৪/৭ সাপোর্ট',
      'supplier.submit': 'সাপ্লায়ার হিসেবে আবেদন',
      'quote.eye': 'কোটেশন বিল্ডার',
      'quote.title': 'নিজের কোম্পানির নামে কোটেশন বানান',
      'quote.subtitle': 'যেকোনো পণ্য নির্বাচন করে আপনার লোগো, কোম্পানির নাম ও ঠিকানা সহ পেশাদার কোটেশন তৈরি করুন। রিসেলার হলে markup/discount সেট করুন।',
      'quote.company': 'আপনার কোম্পানির তথ্য',
      'quote.client': 'ক্লায়েন্টের তথ্য (ঐচ্ছিক)',
      'quote.settings': 'কোটেশন সেটিংস',
      'quote.upload_logo': '📎 কোম্পানির লোগো আপলোড করুন',
      'quote.remove_logo': '✕ সরান',
      'quote.markup': 'রিসেলার markup (%)',
      'quote.vat': 'VAT (%)',
      'quote.validity': 'বৈধতা (দিন)',
      'quote.note': 'নোট / শর্তাবলী (ঐচ্ছিক)',
      'quote.items': 'যোগ করা পণ্যসমূহ',
      'quote.empty': 'কোনো পণ্য যোগ করেননি। ক্যাটালগ থেকে "কোটেশনে যোগ করুন" বাটনে ক্লিক করুন।',
      'quote.go_catalog': 'ক্যাটালগে যান',
      'quote.col.item': 'পণ্য',
      'quote.col.qty': 'পরিমাণ',
      'quote.col.unit_price': 'একক দর',
      'quote.col.total': 'মোট',
      'quote.subtotal': 'সাবটোটাল',
      'quote.markup_amount': 'Markup',
      'quote.vat_amount': 'VAT',
      'quote.grand_total': 'গ্র্যান্ড টোটাল',
      'quote.print': '🖨 প্রিন্ট / PDF সংরক্ষণ',
      'quote.whatsapp': '💬 WhatsApp শেয়ার',
      'quote.clear': '🗑 পরিষ্কার করুন',
      'quote.added': 'কোটেশনে যোগ হয়েছে',
      'quote.removed': 'কোটেশন থেকে সরানো হয়েছে',
      'quote.cleared': 'কোটেশন পরিষ্কার করা হয়েছে',
      'footer.about': 'বাংলাদেশের বিশ্বস্ত নির্মাণ সামগ্রীর মার্কেটপ্লেস। প্রিমিয়াম গুণমান, সেরা দাম, নিশ্চিত ডেলিভারি।',
      'footer.shop': 'দোকান', 'footer.links': 'দ্রুত লিংক', 'footer.contact': 'যোগাযোগ', 'footer.rights': 'সর্বস্বত্ব সংরক্ষিত।',
      'prod.view': 'বিস্তারিত',
      'prod.add_quote': '+ কোটেশনে যোগ',
      'prod.in_quote': '✓ যোগ করা হয়েছে',
      'prod.whatsapp': '💬 WhatsApp',
      'prod.call': '📞 কল',
      'modal.inquire': 'অনুসন্ধান করুন',
      'modal.call': 'কল করুন',
      'modal.cat': 'ক্যাটাগরি',
      'modal.share': 'শেয়ার',
      'modal.price_note': '(বিকন, বাল্ক অর্ডারে বিশেষ মূল্য)',
      'price.call': 'কল করুন',
      'price.per_piece': '/পিস',
      'no_results': 'কোনো পণ্য পাওয়া যায়নি।',
      'msg.contact_sent': 'ধন্যবাদ! আমরা শীঘ্রই যোগাযোগ করব।',
      'msg.rfq_sent': 'RFQ পাঠানো হয়েছে! আমরা ২৪ ঘন্টায় ফিরব।',
      'msg.supplier_sent': 'আবেদন পাওয়া গেছে! আমরা যাচাই করে যোগাযোগ করব।',
      'msg.copied': 'লিংক কপি হয়েছে',
    },
    en: {
      'nav.categories': 'Categories', 'nav.about': 'About', 'nav.contact': 'Contact',
      'nav.quote': 'Quote', 'nav.rfq': 'Bulk RFQ', 'nav.supplier': 'Become Supplier',
      'topbar.delivery': 'Nationwide home delivery',
      'hero.badge': "✦ Bangladesh's #1 Construction Marketplace",
      'hero.title_1': 'Premium Construction Materials',
      'hero.title_2': 'Under One Roof',
      'hero.subtitle': 'From cement to doors, tiles to sanitary ware — everything at top quality, sourced directly from verified sellers.',
      'hero.cta1': 'Explore Categories',
      'hero.cta2': 'Featured Products',
      'hero.cta3': 'Build a Quote',
      'hero.stat.products': 'Products', 'hero.stat.categories': 'Categories',
      'hero.stat.districts': 'Districts', 'hero.stat.verified': 'Verified Sellers',
      'trust.1t': 'Verified Quality', 'trust.1s': 'Every product inspected & certified',
      'trust.2t': 'Best Prices', 'trust.2s': 'Market-best pricing guaranteed',
      'trust.3t': 'Fast Delivery', 'trust.3s': 'On-time nationwide shipping',
      'trust.4t': '24/7 Support', 'trust.4s': 'We are here when you need us',
      'sections.title': 'Shop by Category',
      'sections.subtitle': 'Find exactly what your project needs',
      'catalog.title': 'All Products',
      'catalog.all': 'All Sections', 'catalog.all_brands': 'All Brands',
      'catalog.sort.default': 'Default',
      'catalog.sort.price_asc': 'Price: Low to High',
      'catalog.sort.price_desc': 'Price: High to Low',
      'catalog.sort.title': 'Name (A→Z)',
      'catalog.load_more': 'Load More',
      'featured.title': 'Featured Collection', 'featured.subtitle': 'Handpicked best-sellers from our catalog',
      'about.eye': 'About Us', 'about.title': 'Construction made simple & trusted',
      'about.p1': 'NirmanBazar is Bangladesh\'s premium online marketplace for construction materials. We deliver world-class quality, transparent pricing and on-time delivery for every project.',
      'about.p2': 'Our platform features 1,200+ verified products, 145+ categories and trusted sellers from across Bangladesh. From small repairs to large projects — one name: NirmanBazar.',
      'about.f1': 'Verified suppliers', 'about.f2': 'Transparent pricing',
      'about.f3': 'Bulk & retail orders', 'about.f4': 'Nationwide delivery',
      'about.rating': 'Customer satisfaction', 'about.orders': 'Successful deliveries',
      'about.sellers': 'Registered sellers', 'about.support': 'Customer support',
      'contact.eye': 'Contact Us', 'contact.title': 'Talk to us today',
      'contact.sub': 'Reach out for project consultation, bulk orders or product details.',
      'contact.addr': '11/2 Pallabi, Mirpur, Dhaka',
      'contact.hours': '9 AM – 9 PM (daily)',
      'contact.send': 'Send Message',
      'rfq.eye': 'Bulk RFQ', 'rfq.title': 'Need a quote for bulk order or project?',
      'rfq.subtitle': 'Send your list / BOQ and we will respond within 24 hours with a quotation.',
      'rfq.send': '📤 Send RFQ',
      'supplier.eye': 'Supplier?', 'supplier.title': 'List your products on our platform',
      'supplier.subtitle': 'Manufacturer, distributor or retailer — join us to reach customers nationwide. Transparent commission, weekly payouts.',
      'supplier.f1': 'Nationwide visibility', 'supplier.f2': 'Your own seller page',
      'supplier.f3': 'Verified badge', 'supplier.f4': '24/7 support',
      'supplier.submit': 'Apply as supplier',
      'quote.eye': 'Quote Builder',
      'quote.title': 'Build a quote with your company branding',
      'quote.subtitle': 'Select any products and generate a professional quotation with your logo, name and address. As a reseller, set markup or discount.',
      'quote.company': 'Your Company Information',
      'quote.client': 'Client Information (optional)',
      'quote.settings': 'Quote Settings',
      'quote.upload_logo': '📎 Upload company logo',
      'quote.remove_logo': '✕ Remove',
      'quote.markup': 'Reseller markup (%)',
      'quote.vat': 'VAT (%)', 'quote.validity': 'Validity (days)',
      'quote.note': 'Notes / Terms (optional)',
      'quote.items': 'Selected Items',
      'quote.empty': 'No products yet. Click "Add to Quote" on any product card.',
      'quote.go_catalog': 'Go to Catalog',
      'quote.col.item': 'Item', 'quote.col.qty': 'Qty', 'quote.col.unit_price': 'Unit Price', 'quote.col.total': 'Total',
      'quote.subtotal': 'Subtotal', 'quote.markup_amount': 'Markup',
      'quote.vat_amount': 'VAT', 'quote.grand_total': 'Grand Total',
      'quote.print': '🖨 Print / Save PDF',
      'quote.whatsapp': '💬 Share on WhatsApp',
      'quote.clear': '🗑 Clear',
      'quote.added': 'Added to quote',
      'quote.removed': 'Removed from quote',
      'quote.cleared': 'Quote cleared',
      'footer.about': 'Bangladesh\'s trusted construction marketplace. Premium quality, best prices, guaranteed delivery.',
      'footer.shop': 'Shop', 'footer.links': 'Quick Links', 'footer.contact': 'Contact', 'footer.rights': 'All rights reserved.',
      'prod.view': 'View Details',
      'prod.add_quote': '+ Add to Quote',
      'prod.in_quote': '✓ In Quote',
      'prod.whatsapp': '💬 WhatsApp',
      'prod.call': '📞 Call',
      'modal.inquire': 'Inquire Now', 'modal.call': 'Call Now', 'modal.cat': 'Category',
      'modal.share': 'Share',
      'modal.price_note': '(special pricing for bulk orders)',
      'price.call': 'Call for price', 'price.per_piece': '/piece',
      'no_results': 'No products found.',
      'msg.contact_sent': 'Thank you! We will get in touch shortly.',
      'msg.rfq_sent': 'RFQ sent! We will respond within 24 hours.',
      'msg.supplier_sent': 'Application received! We will verify and contact you.',
      'msg.copied': 'Link copied',
    }
  };

  let LANG = localStorage.getItem('nb_lang') || 'bn';
  if (!I18N[LANG]) LANG = 'bn';
  function t(key) { return (I18N[LANG] && I18N[LANG][key]) || I18N.bn[key] || key; }
  function setLang(l) {
    LANG = l;
    localStorage.setItem('nb_lang', l);
    document.documentElement.setAttribute('lang', l);
    document.documentElement.setAttribute('data-lang', l);
  }
  setLang(LANG);

  function applyI18n() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val) el.textContent = val;
    });
  }

  // ---------- Brand list ----------
  const BRANDS = [
    'Asian Paints', 'Berger', 'Hafele', 'INAX', 'Walton', 'Kansai Nerolac', 'Nerolac',
    'BSRM', 'BLANCO', 'GROHE', 'Grohe', 'Havells', 'RFL', 'PHP', 'Gazi', 'NPOLY',
    'Marquis', 'BRB Cable', 'BRB', 'Rainbow', 'Roma', 'Akij', 'Super Star',
    'Elite', 'Crown Cement', 'Bashundhara', 'Holcim', 'Lafarge', 'Diamond',
    'Star', 'Premier', 'Anwar', 'Confidence', 'Meghna', 'Aman', 'Robi',
    'Kohler', 'TOTO', 'CERA', 'American Standard', 'Jaquar', 'Crown',
    'Sherwin Williams', 'Dulux', 'JSW', 'Tata',
  ];
  function detectBrand(title) {
    if (!title) return null;
    const T = title;
    for (const b of BRANDS) {
      const re = new RegExp('\\b' + b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
      if (re.test(T)) return b;
    }
    return null;
  }

  // ---------- State ----------
  let DATA = null;
  let filtered = [];
  let currentSection = 'all';
  let currentCategory = 'all';
  let currentBrand = 'all';
  let currentSort = 'default';
  let currentSearch = '';
  let visibleCount = 24;
  const PAGE = 24;

  // Cart (Quote)
  let CART = [];      // [{id, qty, override?: number}]
  const CART_KEY = 'nb_cart_v1';
  const QUOTE_KEY = 'nb_quote_v1';

  // ---------- Utilities ----------
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const priceNum = (p) => p ? Number(String(p).replace(/[^0-9.]/g,'')) || 0 : 0;
  const fmtMoney = (n) => {
    const v = Math.round(Number(n) || 0);
    return '৳' + v.toLocaleString(LANG === 'bn' ? 'bn-BD' : 'en-US');
  };
  function priceDisplay(p) {
    const n = priceNum(p.price);
    if (!n) return `<span class="muted">${t('price.call')}</span>`;
    // ultra-low price → mark as per piece (bricks etc)
    if (n > 0 && n < 50 && /brick|ইট/i.test((p.title || '') + ' ' + (p.text || ''))) {
      return `<span class="tk">৳</span>${esc(p.price)} <small style="opacity:.7;">${t('price.per_piece')}</small>`;
    }
    return `<span class="tk">৳</span>${esc(p.price)}`;
  }
  function priceForCart(p) {
    return priceNum(p.price);
  }
  function showToast(msg) {
    const tEl = $('#toast');
    if (!tEl) return;
    tEl.textContent = msg;
    tEl.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => tEl.classList.remove('show'), 2200);
  }

  function loadCart() {
    try { CART = JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
    catch { CART = []; }
  }
  function saveCart() { localStorage.setItem(CART_KEY, JSON.stringify(CART)); }
  function cartHas(id) { return CART.some(c => c.id === id); }
  function cartGet(id) { return CART.find(c => c.id === id); }
  function cartAdd(id) {
    if (cartHas(id)) return;
    CART.push({ id, qty: 1 });
    saveCart();
    updateCartBadge();
    if (typeof renderQuote === 'function') renderQuote();
  }
  function cartRemove(id) {
    CART = CART.filter(c => c.id !== id);
    saveCart();
    updateCartBadge();
    if (typeof renderQuote === 'function') renderQuote();
  }
  function cartSetQty(id, qty) {
    const c = cartGet(id);
    if (c) { c.qty = Math.max(1, Number(qty) || 1); saveCart(); }
  }
  function cartSetOverride(id, val) {
    const c = cartGet(id);
    if (!c) return;
    if (val === '' || val == null) delete c.override;
    else c.override = Number(val) || 0;
    saveCart();
  }
  function cartClear() { CART = []; saveCart(); updateCartBadge(); }

  function updateCartBadge() {
    const el = $('#cartCount');
    if (el) el.textContent = String(CART.length);
    if (el) el.classList.toggle('cart-count--zero', CART.length === 0);
  }

  // ---------- Load data ----------
  async function loadData() {
    try {
      const res = await fetch('products.json', { cache: 'no-cache' });
      DATA = await res.json();
      // Pre-compute id, brand for each listing
      DATA.listings.forEach((p, i) => {
        p.id = String(i);
        p.brand = detectBrand(p.title);
      });
      // Build brand index
      const brandSet = new Set();
      DATA.listings.forEach(p => { if (p.brand) brandSet.add(p.brand); });
      DATA._brands = Array.from(brandSet).sort();
      init();
    } catch (e) {
      console.error('Failed to load products.json', e);
      $('#productGrid').innerHTML = `<p class="muted">Failed to load products. Please refresh.</p>`;
    }
  }

  // ---------- Init ----------
  function init() {
    loadCart();
    renderSections();
    renderSectionFilter();
    renderBrandFilter();
    renderChips();
    applyFilters();
    renderFeatured();
    renderFooterSections();
    updateStats();
    updateCartBadge();
    applyI18n();
    attachEvents();
    handleDeepLink();
  }

  function updateStats() {
    $('#stat-products').textContent = DATA.listings.length.toLocaleString(LANG === 'bn' ? 'bn-BD' : 'en-US');
    $('#stat-categories').textContent = DATA.categories.length.toLocaleString(LANG === 'bn' ? 'bn-BD' : 'en-US');
  }

  // ---------- Sections grid ----------
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
        currentSection = el.getAttribute('data-section');
        currentCategory = 'all';
        currentBrand = 'all';
        $('#sectionFilter').value = currentSection;
        const bf0 = $('#brandFilter'); if (bf0) bf0.value = 'all';
        renderChips();
        applyFilters();
        $('#catalog').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function renderSectionFilter() {
    const sel = $('#sectionFilter');
    sel.innerHTML = `<option value="all">${t('catalog.all')}</option>`;
    DATA.sections.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = LANG === 'bn' ? (s.bn || s.en) : s.en;
      sel.appendChild(opt);
    });
    sel.value = currentSection;
  }

  function renderBrandFilter() {
    const sel = $('#brandFilter');
    if (!sel) return;
    sel.innerHTML = `<option value="all">${t('catalog.all_brands')}</option>` +
      DATA._brands.map(b => `<option value="${esc(b)}">${esc(b)}</option>`).join('');
    sel.value = currentBrand;
  }

  function renderChips() {
    const row = $('#chipsRow');
    let cats;
    if (currentSection === 'all') cats = DATA.categories;
    else cats = DATA.categories.filter(c => c.section === currentSection);
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

  function applyFilters() {
    let L = DATA.listings.slice();
    if (currentSection !== 'all') L = L.filter(x => x.section === currentSection);
    if (currentCategory !== 'all') L = L.filter(x => x.category_slug === currentCategory);
    if (currentBrand !== 'all') L = L.filter(x => x.brand === currentBrand);
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      L = L.filter(x => (x.title || '').toLowerCase().includes(q) ||
                        (x.category_name || '').toLowerCase().includes(q) ||
                        (x.text || '').toLowerCase().includes(q) ||
                        (x.brand || '').toLowerCase().includes(q));
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
    if (currentBrand !== 'all') titleText += ` · ${currentBrand}`;
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
    grid.innerHTML = items.map(p => cardHTML(p)).join('');
    $('#loadMore').style.display = visibleCount < filtered.length ? 'inline-flex' : 'none';
    grid.querySelectorAll('.prod').forEach(el => {
      const id = el.getAttribute('data-id');
      const p = items.find(x => x.id === id);
      el.querySelector('.prod__main').addEventListener('click', () => openModal(p));
      el.querySelectorAll('[data-action="add"]').forEach(b => b.addEventListener('click', e => {
        e.stopPropagation();
        if (cartHas(p.id)) return;
        cartAdd(p.id);
        b.classList.add('added');
        b.querySelector('span').textContent = t('prod.in_quote');
        showToast(t('quote.added'));
      }));
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

  // Read the dedicated WhatsApp number (digits only, no '+') from the
  // #contactWhatsapp anchor's href (https://wa.me/<digits>). Falls back to
  // the topbar phone if the WhatsApp anchor is missing. Phone and WhatsApp
  // can be different numbers, so wa.me URLs must NOT use #topbarPhone.
  function getWaPhone() {
    const wa = document.querySelector('#contactWhatsapp');
    if (wa) {
      const m = (wa.getAttribute('href') || '').match(/wa\.me\/(\d+)/);
      if (m) return m[1];
    }
    const phone = (document.querySelector('#topbarPhone')?.textContent || '+8801700000000');
    return phone.replace(/[^0-9]/g, '');
  }

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

  function cardHTML(p) {
    const ph = placeholder(p.title, p.section);
    const desc = (p.text || p.description || p.title || '').slice(0, 120);
    const inCart = cartHas(p.id);
    const phone = ($('#topbarPhone')?.textContent || '+8801700000000').replace(/[^0-9+]/g, '');
    return `
      <article class="prod" tabindex="0" data-id="${esc(p.id)}">
        <div class="prod__main">
          <div class="prod__imgwrap">
            <img class="prod__img" src="${ph}" data-src="${esc(p.image_local || p.image || '')}" alt="${esc(p.title)}" loading="lazy"/>
            ${p.category_name ? `<span class="prod__cat-chip">${esc(p.category_name)}</span>` : ''}
            ${p.brand ? `<span class="prod__brand-chip">${esc(p.brand)}</span>` : ''}
          </div>
          <div class="prod__body">
            <h3 class="prod__title">${esc(p.title)}</h3>
            <p class="prod__desc">${esc(desc)}</p>
            <div class="prod__foot">
              <span class="prod__price">${priceDisplay(p)}</span>
              <span class="prod__view">${t('prod.view')}</span>
            </div>
          </div>
        </div>
        <div class="prod__cta">
          <button class="btn btn-cta-add ${inCart ? 'added' : ''}" data-action="add" type="button"><span>${inCart ? t('prod.in_quote') : t('prod.add_quote')}</span></button>
          <a class="btn btn-cta-wa" href="https://wa.me/${getWaPhone()}?text=${encodeURIComponent('Inquiry: ' + p.title)}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="${t('prod.whatsapp')}">💬</a>
          <a class="btn btn-cta-call" href="tel:${phone}" onclick="event.stopPropagation()" title="${t('prod.call')}">📞</a>
        </div>
      </article>
    `;
  }

  // Image upgrade pipeline
  let upgradeQueue = [];
  let upgradeActive = 0;
  const UPGRADE_CONCURRENCY = 3;

  function upgradeImage(img) {
    const realSrc = img.getAttribute('data-src');
    if (!realSrc) return;
    img.removeAttribute('data-src');
    upgradeActive++;
    const loader = new Image();
    loader.onload = () => { img.src = realSrc; upgradeActive--; pump(); };
    loader.onerror = () => { upgradeActive--; pump(); };
    loader.src = realSrc;
  }
  function pump() {
    while (upgradeQueue.length && upgradeActive < UPGRADE_CONCURRENCY) {
      const img = upgradeQueue.shift();
      if (!img || !img.getAttribute('data-src')) continue;
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
    (root || document).querySelectorAll('img.prod__img[data-src], img.modal__rimg[data-src]').forEach(img => {
      if (io) io.observe(img);
      else upgradeQueue.push(img);
    });
    pump();
  }

  // ---------- Featured ----------
  function renderFeatured() {
    const grid = $('#featuredGrid');
    const pool = DATA.listings.filter(l => l.image && l.text && l.text.length > 60)
      .sort((a,b) => priceNum(b.price) - priceNum(a.price));
    const bySection = {};
    pool.forEach(p => { (bySection[p.section] = bySection[p.section] || []).push(p); });
    const picks = [];
    for (let i=0; i<8 && picks.length < 8; i++) {
      for (const s of Object.keys(bySection)) {
        if (picks.length >= 8) break;
        if (bySection[s][i]) picks.push(bySection[s][i]);
      }
    }
    grid.innerHTML = picks.slice(0, 8).map(p => cardHTML(p)).join('');
    grid.querySelectorAll('.prod').forEach(el => {
      const id = el.getAttribute('data-id');
      const p = picks.find(x => x.id === id);
      if (!p) return;
      el.querySelector('.prod__main').addEventListener('click', () => openModal(p));
      el.querySelectorAll('[data-action="add"]').forEach(b => b.addEventListener('click', e => {
        e.stopPropagation();
        if (cartHas(p.id)) return;
        cartAdd(p.id);
        b.classList.add('added');
        b.querySelector('span').textContent = t('prod.in_quote');
        showToast(t('quote.added'));
      }));
    });
    observeImages(grid);
  }

  function renderFooterSections() {
    $('#footerSections').innerHTML = DATA.sections.slice(0, 8).map(s =>
      `<li><a href="#sections" data-sec="${esc(s.id)}">${esc(LANG === 'bn' ? (s.bn || s.en) : s.en)}</a></li>`
    ).join('');
    $('#footerSections').querySelectorAll('a').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        currentSection = a.getAttribute('data-sec');
        currentCategory = 'all';
        currentBrand = 'all';
        $('#sectionFilter').value = currentSection;
        const bf0 = $('#brandFilter'); if (bf0) bf0.value = 'all';
        renderChips();
        applyFilters();
        $('#catalog').scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  // ---------- Modal ----------
  function openModal(p) {
    const ph = placeholder(p.title, p.section);
    const desc = p.description || p.text || '';
    const phone = ($('#topbarPhone')?.textContent || '+8801700000000').replace(/[^0-9+]/g, '');
    const shareUrl = location.origin + location.pathname + '?p=' + encodeURIComponent(p.id);
    const inCart = cartHas(p.id);
    const content = `
      <div class="modal__img">
        <img id="modalImg" class="modal__rimg" src="${ph}" data-src="${esc(p.image_local || p.image || '')}" alt="${esc(p.title)}"/>
      </div>
      <div class="modal__info">
        ${p.category_name ? `<span class="modal__cat">${t('modal.cat')}: ${esc(p.category_name)}${p.brand ? ' · ' + esc(p.brand) : ''}</span>` : ''}
        <h3 id="modalTitle">${esc(p.title)}</h3>
        <div class="modal__price">
          ${priceDisplay(p)}
          <small>${t('modal.price_note')}</small>
        </div>
        <p class="modal__desc">${esc(desc || p.title)}</p>
        <div class="modal__cta">
          <button class="btn btn-primary btn-lg" id="modalAddQuote" type="button" ${inCart ? 'disabled' : ''}>${inCart ? t('prod.in_quote') : t('prod.add_quote')}</button>
          <a class="btn btn-outline btn-lg" href="https://wa.me/${getWaPhone()}?text=${encodeURIComponent('Inquiry: ' + p.title + ' — ' + shareUrl)}" target="_blank" rel="noopener">${t('prod.whatsapp')}</a>
          <a class="btn btn-outline btn-lg" href="tel:${phone}">${t('modal.call')}</a>
          <button class="btn btn-ghost btn-lg" id="modalShare" type="button">🔗 ${t('modal.share')}</button>
        </div>
        <div class="modal__meta">
          NirmanBazar · নির্মাণবাজার — ${LANG === 'bn' ? 'বিশ্বাসের সঙ্গে ক্রয়' : 'Buy with confidence'}
        </div>
      </div>
    `;
    $('#modalContent').innerHTML = content;
    const modalEl = $('#productModal');
    modalEl.classList.add('open');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // update URL hash for share
    try { history.replaceState({}, '', '?p=' + encodeURIComponent(p.id) + '#prod'); } catch {}
    const mi = $('#modalImg');
    if (mi) upgradeImage(mi);
    const addBtn = $('#modalAddQuote');
    if (addBtn) addBtn.addEventListener('click', () => {
      if (cartHas(p.id)) return;
      cartAdd(p.id);
      addBtn.disabled = true;
      addBtn.textContent = t('prod.in_quote');
      showToast(t('quote.added'));
    });
    const shareBtn = $('#modalShare');
    if (shareBtn) shareBtn.addEventListener('click', async () => {
      try {
        if (navigator.share) await navigator.share({ title: p.title, url: shareUrl });
        else { await navigator.clipboard.writeText(shareUrl); showToast(t('msg.copied')); }
      } catch {}
    });
  }
  function closeModal() {
    const m = $('#productModal');
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // strip ?p= from URL
    try {
      const u = new URL(location.href);
      u.searchParams.delete('p');
      history.replaceState({}, '', u.pathname + (u.search ? u.search : '') + (location.hash === '#prod' ? '' : location.hash));
    } catch {}
  }
  function handleDeepLink() {
    const params = new URLSearchParams(location.search);
    const pid = params.get('p');
    if (!pid) return;
    const p = DATA.listings.find(x => x.id === pid);
    if (p) openModal(p);
  }

  // ---------- Quote Builder ----------
  let QUOTE_META = { logo: null };
  function loadQuoteMeta() {
    try { QUOTE_META = JSON.parse(localStorage.getItem(QUOTE_KEY) || '{}'); }
    catch { QUOTE_META = {}; }
    if (!QUOTE_META) QUOTE_META = {};
  }
  function saveQuoteMeta() { localStorage.setItem(QUOTE_KEY, JSON.stringify(QUOTE_META)); }

  function quoteRefs() {
    return {
      companyName: $('#qCompanyName'), companyPhone: $('#qCompanyPhone'),
      companyEmail: $('#qCompanyEmail'), companyVat: $('#qCompanyVat'),
      companyAddr: $('#qCompanyAddress'),
      clientName: $('#qClientName'), clientPhone: $('#qClientPhone'),
      clientAddr: $('#qClientAddress'),
      markup: $('#qMarkup'), vat: $('#qVat'), validity: $('#qValidity'),
      note: $('#qNote'),
      logoFile: $('#qLogoFile'), logoPreview: $('#qLogoPreview'), logoClear: $('#qLogoClear'),
      table: $('#quoteTable'), empty: $('#quoteEmpty'), body: $('#quoteBody'),
      subtotal: $('#qSubtotal'), markupVal: $('#qMarkupVal'), vatVal: $('#qVatVal'), grand: $('#qGrand'),
      print: $('#qPrint'), shareWa: $('#qShareWa'), clear: $('#qClear'),
    };
  }
  function persistQuoteFields() {
    const r = quoteRefs();
    QUOTE_META.companyName = r.companyName.value;
    QUOTE_META.companyPhone = r.companyPhone.value;
    QUOTE_META.companyEmail = r.companyEmail.value;
    QUOTE_META.companyVat = r.companyVat.value;
    QUOTE_META.companyAddr = r.companyAddr.value;
    QUOTE_META.clientName = r.clientName.value;
    QUOTE_META.clientPhone = r.clientPhone.value;
    QUOTE_META.clientAddr = r.clientAddr.value;
    QUOTE_META.markup = r.markup.value;
    QUOTE_META.vat = r.vat.value;
    QUOTE_META.validity = r.validity.value;
    QUOTE_META.note = r.note.value;
    saveQuoteMeta();
  }
  function restoreQuoteFields() {
    const r = quoteRefs();
    if (!QUOTE_META) return;
    r.companyName.value = QUOTE_META.companyName || '';
    r.companyPhone.value = QUOTE_META.companyPhone || '';
    r.companyEmail.value = QUOTE_META.companyEmail || '';
    r.companyVat.value = QUOTE_META.companyVat || '';
    r.companyAddr.value = QUOTE_META.companyAddr || '';
    r.clientName.value = QUOTE_META.clientName || '';
    r.clientPhone.value = QUOTE_META.clientPhone || '';
    r.clientAddr.value = QUOTE_META.clientAddr || '';
    r.markup.value = QUOTE_META.markup ?? '0';
    r.vat.value = QUOTE_META.vat ?? '0';
    r.validity.value = QUOTE_META.validity ?? '7';
    r.note.value = QUOTE_META.note || '';
    if (QUOTE_META.logo) {
      r.logoPreview.src = QUOTE_META.logo;
      r.logoPreview.hidden = false;
      r.logoClear.hidden = false;
    }
  }

  function renderQuote() {
    const r = quoteRefs();
    if (!r.body) return;
    if (CART.length === 0) {
      r.empty.hidden = false;
      r.table.hidden = true;
      return;
    }
    r.empty.hidden = true;
    r.table.hidden = false;
    r.body.innerHTML = CART.map(c => {
      const p = DATA.listings.find(x => x.id === c.id);
      if (!p) return '';
      const base = priceForCart(p);
      const unit = c.override != null ? Number(c.override) : base;
      const total = unit * (c.qty || 1);
      return `
        <tr data-id="${esc(c.id)}">
          <td class="quote__item">
            <strong>${esc(p.title)}</strong>
            <small class="muted">${esc(p.category_name || '')}${p.brand ? ' · ' + esc(p.brand) : ''}</small>
          </td>
          <td><input type="number" class="qty-input" value="${c.qty}" min="1" data-action="qty"/></td>
          <td>
            <input type="number" class="price-input" value="${unit}" data-action="price" placeholder="${base}"/>
            ${c.override != null && c.override !== base ? `<small class="muted">base ${fmtMoney(base)}</small>` : ''}
          </td>
          <td class="quote__total">${fmtMoney(total)}</td>
          <td><button class="btn btn-ghost btn-sm" data-action="remove" type="button" aria-label="Remove">✕</button></td>
        </tr>
      `;
    }).join('');

    // Live update on every keystroke without DOM replacement (preserves focus).
    // Only the affected row's total + the summary totals are touched.
    function liveUpdate(tr) {
      const id = tr.getAttribute('data-id');
      const c = cartGet(id);
      if (!c) return;
      const p = DATA.listings.find(x => x.id === id);
      if (!p) return;
      const base = priceForCart(p);
      const unit = c.override != null ? Number(c.override) : base;
      const total = unit * (c.qty || 1);
      const totalCell = tr.querySelector('.quote__total');
      if (totalCell) totalCell.textContent = fmtMoney(total);
      // Recompute grand totals
      const sub = CART.reduce((s, cc) => {
        const pp = DATA.listings.find(x => x.id === cc.id);
        const bb = priceForCart(pp || {});
        const uu = cc.override != null ? Number(cc.override) : bb;
        return s + uu * (cc.qty || 1);
      }, 0);
      const mPct = Number(r.markup.value) || 0;
      const vPct = Number(r.vat.value) || 0;
      const mAmt = sub * mPct / 100;
      const vAmt = (sub + mAmt) * vPct / 100;
      r.subtotal.textContent = fmtMoney(sub);
      r.markupVal.textContent = (mPct >= 0 ? '+' : '') + fmtMoney(mAmt);
      r.vatVal.textContent = fmtMoney(vAmt);
      r.grand.textContent = fmtMoney(sub + mAmt + vAmt);
    }
    r.body.querySelectorAll('[data-action="qty"]').forEach(inp => {
      inp.addEventListener('input', () => {
        const tr = inp.closest('tr');
        cartSetQty(tr.getAttribute('data-id'), inp.value);
        liveUpdate(tr);
      });
      // On commit (blur/Enter), do a full re-render so any derived UI (like
      // the "base" hint next to an overridden price) refreshes.
      inp.addEventListener('change', () => renderQuote());
    });
    r.body.querySelectorAll('[data-action="price"]').forEach(inp => {
      inp.addEventListener('input', () => {
        const tr = inp.closest('tr');
        cartSetOverride(tr.getAttribute('data-id'), inp.value);
        liveUpdate(tr);
      });
      inp.addEventListener('change', () => renderQuote());
    });
    r.body.querySelectorAll('[data-action="remove"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.closest('tr').getAttribute('data-id');
        cartRemove(id);
        renderQuote();
        showToast(t('quote.removed'));
      });
    });

    // Totals
    const sub = CART.reduce((s, c) => {
      const p = DATA.listings.find(x => x.id === c.id);
      const base = priceForCart(p || {});
      const unit = c.override != null ? Number(c.override) : base;
      return s + unit * (c.qty || 1);
    }, 0);
    const markupPct = Number(r.markup.value) || 0;
    const vatPct = Number(r.vat.value) || 0;
    const markupAmt = sub * markupPct / 100;
    const vatAmt = (sub + markupAmt) * vatPct / 100;
    const grand = sub + markupAmt + vatAmt;
    r.subtotal.textContent = fmtMoney(sub);
    r.markupVal.textContent = (markupPct >= 0 ? '+' : '') + fmtMoney(markupAmt);
    r.vatVal.textContent = fmtMoney(vatAmt);
    r.grand.textContent = fmtMoney(grand);
  }

  function quoteDocHTML() {
    // Build a self-contained printable HTML
    const r = quoteRefs();
    const company = {
      name: r.companyName.value || 'Your Company',
      phone: r.companyPhone.value || '',
      email: r.companyEmail.value || '',
      vat: r.companyVat.value || '',
      address: r.companyAddr.value || '',
      logo: QUOTE_META.logo || null,
    };
    const client = {
      name: r.clientName.value || '',
      phone: r.clientPhone.value || '',
      address: r.clientAddr.value || '',
    };
    const markupPct = Number(r.markup.value) || 0;
    const vatPct = Number(r.vat.value) || 0;
    const validity = Number(r.validity.value) || 7;
    const note = r.note.value || '';

    let sub = 0;
    const rows = CART.map((c, i) => {
      const p = DATA.listings.find(x => x.id === c.id);
      if (!p) return '';
      const base = priceForCart(p);
      const unit = c.override != null ? Number(c.override) : base;
      const total = unit * (c.qty || 1);
      sub += total;
      return `<tr>
        <td>${i+1}</td>
        <td><strong>${esc(p.title)}</strong><br><small>${esc(p.category_name || '')}${p.brand ? ' · ' + esc(p.brand) : ''}</small></td>
        <td>${c.qty}</td>
        <td>${fmtMoney(unit)}</td>
        <td>${fmtMoney(total)}</td>
      </tr>`;
    }).join('');
    const markupAmt = sub * markupPct / 100;
    const vatAmt = (sub + markupAmt) * vatPct / 100;
    const grand = sub + markupAmt + vatAmt;

    const today = new Date();
    const dateStr = today.toLocaleDateString(LANG === 'bn' ? 'bn-BD' : 'en-GB', { day:'2-digit', month:'short', year:'numeric' });
    const validUntil = new Date(today.getTime() + validity*24*60*60*1000).toLocaleDateString(LANG === 'bn' ? 'bn-BD' : 'en-GB', { day:'2-digit', month:'short', year:'numeric' });
    const quoteNo = 'Q-' + today.getFullYear().toString().slice(-2) + String(today.getMonth()+1).padStart(2,'0') + String(today.getDate()).padStart(2,'0') + '-' + String(Math.floor(Math.random()*1000)).padStart(3,'0');

    return `<!DOCTYPE html>
<html lang="${LANG}"><head><meta charset="UTF-8"><title>Quotation ${quoteNo}</title>
<style>
@page { size: A4; margin: 14mm; }
body { font-family: 'Hind Siliguri', 'Inter', system-ui, Arial, sans-serif; color:#0b1a2b; }
.q-head { display:flex; justify-content:space-between; align-items:flex-start; gap:24px; border-bottom:2px solid #0b1a2b; padding-bottom:14px; }
.q-head .left { display:flex; gap:14px; align-items:center; }
.q-head img { max-height:80px; max-width:120px; object-fit:contain; }
.q-title { text-align:right; }
.q-title h1 { font-size:28px; margin:0; color:#b4862d; letter-spacing:2px; }
.q-meta { font-size:13px; color:#555; margin-top:6px; }
.parties { display:grid; grid-template-columns:1fr 1fr; gap:30px; margin:18px 0; }
.parties h3 { margin:0 0 6px; font-size:13px; color:#555; text-transform:uppercase; letter-spacing:1px; }
.parties p { margin:2px 0; font-size:14px; line-height:1.5; }
table { width:100%; border-collapse:collapse; margin-top:10px; font-size:13px; }
thead th { background:#0b1a2b; color:#fff; padding:10px 8px; text-align:left; }
tbody td { padding:10px 8px; border-bottom:1px solid #e6e6e6; vertical-align:top; }
tbody td:nth-child(3),tbody td:nth-child(4),tbody td:nth-child(5) { text-align:right; }
tfoot td { padding:8px 8px; font-size:14px; }
tfoot tr.grand td { border-top:2px solid #0b1a2b; font-weight:800; font-size:16px; color:#0b1a2b; }
.note { margin-top:24px; padding:14px; background:#fff8e1; border-left:4px solid #d4a84b; font-size:13px; line-height:1.6; }
.foot { margin-top:30px; display:flex; justify-content:space-between; align-items:flex-end; font-size:12px; color:#555; }
.signature { border-top:1px solid #aaa; padding-top:6px; min-width:180px; text-align:center; }
@media print { .no-print { display:none !important; } }
.bar { background:#0b1a2b; color:#d4a84b; padding:6px 12px; font-size:12px; border-radius:4px; }
</style></head>
<body>
<div class="q-head">
  <div class="left">
    ${company.logo ? `<img src="${company.logo}"/>` : `<div class="bar">${esc(company.name).toUpperCase()}</div>`}
    <div>
      <h2 style="margin:0;font-size:20px;">${esc(company.name)}</h2>
      <p style="margin:2px 0;font-size:13px;color:#555;">${esc(company.address)}</p>
      <p style="margin:2px 0;font-size:13px;color:#555;">${[company.phone, company.email, company.vat ? 'VAT: '+company.vat : ''].filter(Boolean).map(esc).join(' · ')}</p>
    </div>
  </div>
  <div class="q-title">
    <h1>QUOTATION</h1>
    <p class="q-meta"><strong>${esc(quoteNo)}</strong></p>
    <p class="q-meta">${LANG==='bn'?'তারিখ':'Date'}: ${esc(dateStr)}</p>
    <p class="q-meta">${LANG==='bn'?'মেয়াদ':'Valid until'}: ${esc(validUntil)}</p>
  </div>
</div>

<div class="parties">
  <div>
    <h3>${LANG==='bn'?'ইস্যুকারী':'From'}</h3>
    <p><strong>${esc(company.name)}</strong></p>
    <p>${esc(company.address)}</p>
    <p>${esc(company.phone)} ${company.email?'· '+esc(company.email):''}</p>
  </div>
  <div>
    <h3>${LANG==='bn'?'ক্লায়েন্ট':'Bill To'}</h3>
    <p><strong>${esc(client.name || '—')}</strong></p>
    <p>${esc(client.address)}</p>
    <p>${esc(client.phone)}</p>
  </div>
</div>

<table>
  <thead><tr>
    <th>#</th>
    <th>${LANG==='bn'?'পণ্য বিবরণ':'Item / Description'}</th>
    <th>${LANG==='bn'?'পরিমাণ':'Qty'}</th>
    <th>${LANG==='bn'?'একক দর':'Unit Price'}</th>
    <th>${LANG==='bn'?'মোট':'Amount'}</th>
  </tr></thead>
  <tbody>${rows}</tbody>
  <tfoot>
    <tr><td colspan="4" style="text-align:right;">${LANG==='bn'?'সাবটোটাল':'Subtotal'}</td><td style="text-align:right;">${fmtMoney(sub)}</td></tr>
    ${markupPct ? `<tr><td colspan="4" style="text-align:right;">${LANG==='bn'?'মার্কআপ':'Markup'} (${markupPct}%)</td><td style="text-align:right;">${(markupAmt>=0?'+':'')}${fmtMoney(markupAmt)}</td></tr>` : ''}
    ${vatPct ? `<tr><td colspan="4" style="text-align:right;">VAT (${vatPct}%)</td><td style="text-align:right;">${fmtMoney(vatAmt)}</td></tr>` : ''}
    <tr class="grand"><td colspan="4" style="text-align:right;">${LANG==='bn'?'গ্র্যান্ড টোটাল':'Grand Total'}</td><td style="text-align:right;">${fmtMoney(grand)}</td></tr>
  </tfoot>
</table>

${note ? `<div class="note"><strong>${LANG==='bn'?'নোট / শর্তাবলী':'Notes / Terms'}:</strong><br>${esc(note)}</div>` : ''}

<div class="foot">
  <div>
    ${LANG==='bn'?'কোটেশন তৈরি — NirmanBazar.com':'Quotation generated by NirmanBazar.com'}
  </div>
  <div class="signature">
    ${LANG==='bn'?'অনুমোদিত স্বাক্ষর':'Authorised Signature'}
  </div>
</div>

<script>window.onload=()=>setTimeout(()=>window.print(),300);<\/script>
</body></html>`;
  }
  function printQuote() {
    persistQuoteFields();
    if (CART.length === 0) { showToast(t('quote.empty')); return; }
    const html = quoteDocHTML();
    const w = window.open('', '_blank');
    if (!w) { alert('Pop-up blocked. Please allow pop-ups to print quote.'); return; }
    w.document.write(html);
    w.document.close();
  }
  function shareQuoteWa() {
    persistQuoteFields();
    if (CART.length === 0) { showToast(t('quote.empty')); return; }
    const r = quoteRefs();
    const phone = getWaPhone();
    let sub = 0;
    const lines = CART.map((c, i) => {
      const p = DATA.listings.find(x => x.id === c.id);
      if (!p) return '';
      const base = priceForCart(p);
      const unit = c.override != null ? Number(c.override) : base;
      const total = unit * (c.qty || 1);
      sub += total;
      return `${i+1}. ${p.title} × ${c.qty} = ${fmtMoney(total)}`;
    }).join('\n');
    const markupAmt = sub * (Number(r.markup.value)||0)/100;
    const vatAmt = (sub+markupAmt) * (Number(r.vat.value)||0)/100;
    const grand = sub + markupAmt + vatAmt;
    const msg = `*${r.companyName.value || 'Quotation'}*\n${lines}\n\nSubtotal: ${fmtMoney(sub)}\nGrand Total: ${fmtMoney(grand)}\n— via NirmanBazar`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  function attachQuoteEvents() {
    const r = quoteRefs();
    if (!r.body) return;
    [r.companyName, r.companyPhone, r.companyEmail, r.companyVat, r.companyAddr,
     r.clientName, r.clientPhone, r.clientAddr, r.markup, r.vat, r.validity, r.note]
      .filter(Boolean).forEach(el => el.addEventListener('input', () => { persistQuoteFields(); renderQuote(); }));

    // Logo upload
    if (r.logoFile) r.logoFile.addEventListener('change', e => {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      if (f.size > 1024 * 1024) { alert('Logo too large (>1MB). Please use a smaller image.'); return; }
      const fr = new FileReader();
      fr.onload = () => {
        QUOTE_META.logo = fr.result;
        saveQuoteMeta();
        r.logoPreview.src = fr.result;
        r.logoPreview.hidden = false;
        r.logoClear.hidden = false;
      };
      fr.readAsDataURL(f);
    });
    if (r.logoClear) r.logoClear.addEventListener('click', () => {
      QUOTE_META.logo = null; saveQuoteMeta();
      r.logoPreview.hidden = true; r.logoClear.hidden = true;
      if (r.logoFile) r.logoFile.value = '';
    });

    if (r.print) r.print.addEventListener('click', printQuote);
    if (r.shareWa) r.shareWa.addEventListener('click', shareQuoteWa);
    if (r.clear) r.clear.addEventListener('click', () => {
      if (!confirm(LANG==='bn'?'কোটেশন থেকে সব পণ্য সরিয়ে ফেলবেন?':'Remove all items from the quote?')) return;
      cartClear();
      renderQuote();
      showToast(t('quote.cleared'));
    });
  }

  // ---------- Forms (contact, RFQ, supplier) ----------
  function attachForms() {
    const phone = ($('#topbarPhone')?.textContent || '+8801700000000').replace(/[^0-9+]/g, '');
    const email = ($('#topbarEmail')?.textContent || 'hello@nirmanbazar.com');

    const cf = $('#contactForm');
    if (cf) cf.addEventListener('submit', e => {
      e.preventDefault();
      const name = $('#cName').value, ph = $('#cPhone').value, em = $('#cEmail').value, msg = $('#cMessage').value;
      const body = `Name: ${name}\nPhone: ${ph}\nEmail: ${em}\n\n${msg}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent('Inquiry from NirmanBazar')}&body=${encodeURIComponent(body)}`;
      cf.reset();
      showToast(t('msg.contact_sent'));
    });

    const rf = $('#rfqForm');
    if (rf) rf.addEventListener('submit', e => {
      e.preventDefault();
      const name = $('#rfqName').value, comp = $('#rfqCompany').value, ph = $('#rfqPhone').value, em = $('#rfqEmail').value, list = $('#rfqList').value;
      const body = `RFQ\nName: ${name}\nCompany: ${comp}\nPhone: ${ph}\nEmail: ${em}\n\nItems:\n${list}`;
      // Open WhatsApp pre-filled (preferred)
      window.open(`https://wa.me/${getWaPhone()}?text=${encodeURIComponent(body)}`, '_blank');
      // Also offer mailto fallback
      try { window.location.href = `mailto:${email}?subject=${encodeURIComponent('RFQ from ' + (comp||name))}&body=${encodeURIComponent(body)}`; } catch {}
      rf.reset();
      showToast(t('msg.rfq_sent'));
    });

    const sf = $('#supplierForm');
    if (sf) sf.addEventListener('submit', e => {
      e.preventDefault();
      const name = $('#sName').value, comp = $('#sCompany').value, ph = $('#sPhone').value, em = $('#sEmail').value, cat = $('#sCategory').value, desc = $('#sDescription').value;
      const body = `Supplier Application\nName: ${name}\nCompany: ${comp}\nPhone: ${ph}\nEmail: ${em}\nCategory: ${cat}\n\nDescription:\n${desc}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent('Supplier application — ' + comp)}&body=${encodeURIComponent(body)}`;
      sf.reset();
      showToast(t('msg.supplier_sent'));
    });
  }

  // ---------- Events ----------
  function attachEvents() {
    // Search
    const doSearch = () => {
      currentSearch = $('#searchInput').value.trim();
      applyFilters();
      if (currentSearch) $('#catalog').scrollIntoView({ behavior: 'smooth' });
    };
    $('#searchForm').addEventListener('submit', e => { e.preventDefault(); doSearch(); });
    let tmo;
    $('#searchInput').addEventListener('input', () => { clearTimeout(tmo); tmo = setTimeout(doSearch, 300); });

    $('#sectionFilter').addEventListener('change', e => {
      currentSection = e.target.value;
      currentCategory = 'all';
      currentBrand = 'all';
      const bf2 = $('#brandFilter'); if (bf2) bf2.value = 'all';
      renderChips();
      applyFilters();
    });
    const bf = $('#brandFilter');
    if (bf) bf.addEventListener('change', e => { currentBrand = e.target.value; applyFilters(); });
    $('#sortSelect').addEventListener('change', e => { currentSort = e.target.value; applyFilters(); });
    $('#loadMore').addEventListener('click', () => { visibleCount += PAGE; renderGrid(); });

    // Modal close — event delegation (covers dynamic [data-close] elements)
    const modalEl = $('#productModal');
    modalEl.addEventListener('click', e => {
      if (e.target.closest('[data-close]')) closeModal();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    // Cart button → scroll to quote
    const cb = $('#cartBtn');
    if (cb) cb.addEventListener('click', () => {
      $('#quote').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Language toggle
    $('#langToggle').addEventListener('click', () => {
      setLang(LANG === 'bn' ? 'en' : 'bn');
      applyI18n();
      renderSections();
      renderSectionFilter();
      renderBrandFilter();
      renderChips();
      renderGrid();
      renderFeatured();
      renderFooterSections();
      updateStats();
      updateCatalogMeta();
      renderQuote();
    });

    // Header scroll effect
    const header = $('#header');
    const toTop = $('#toTop');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
      toTop.classList.toggle('show', window.scrollY > 500);
    });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    $('#year').textContent = new Date().getFullYear();

    // Quote page
    loadQuoteMeta();
    restoreQuoteFields();
    renderQuote();
    attachQuoteEvents();
    attachForms();

    // Re-render quote when cart changes (storage event for multi-tab)
    window.addEventListener('storage', e => {
      if (e.key === CART_KEY) { loadCart(); updateCartBadge(); renderQuote(); }
    });
  }

  // ---------- Go ----------
  loadData();
})();
