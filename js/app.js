/* ToolBanQuyen.vn — app.js */

const STATE = {
  apps: [], categories: [], combos: [],
  currency: 'USD', plan: 'individual',
  category: 'all', search: '',
  selected: new Map(), // id -> { app, tier }
  rate: 25450, theme: 'dark',
  drawerApp: null, drawerPlan: 'individual', drawerTier: null,
};

// ── Init ──────────────────────────────────────────────────────
async function init() {
  loadTheme();
  await Promise.all([loadData(), loadRate()]);
  renderCombos();
  renderCategories();
  renderApps();
  bindEvents();
}

// ── Data ──────────────────────────────────────────────────────
async function loadData() {
  try {
    const res = await fetch('data/apps.json');
    const d = await res.json();
    STATE.apps = d.apps;
    STATE.categories = d.categories;
    STATE.combos = d.combos;
  } catch(e) { console.error('Data load failed:', e); }
}

// ── Exchange Rate ─────────────────────────────────────────────
async function loadRate() {
  const cached = localStorage.getItem('tbq_rate');
  const t = localStorage.getItem('tbq_rate_time');
  if (cached && t && Date.now() - Number(t) < 6 * 3600000) {
    STATE.rate = Number(cached);
    updateRateBadge(); return;
  }
  try {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const d = await res.json();
    if (d.rates?.VND) {
      STATE.rate = Math.round(d.rates.VND);
      localStorage.setItem('tbq_rate', STATE.rate);
      localStorage.setItem('tbq_rate_time', Date.now());
    }
  } catch {}
  updateRateBadge();
}

function updateRateBadge() {
  const el = document.getElementById('rate-badge');
  if (el) el.textContent = `1 USD ≈ ${STATE.rate.toLocaleString('vi-VN')} ₫`;
}

// ── Theme ─────────────────────────────────────────────────────
function loadTheme() {
  STATE.theme = localStorage.getItem('tbq_theme') || 'dark';
  document.body.className = STATE.theme;
  updateThemeBtn();
}
function toggleTheme() {
  STATE.theme = STATE.theme === 'dark' ? 'light' : 'dark';
  document.body.className = STATE.theme;
  localStorage.setItem('tbq_theme', STATE.theme);
  updateThemeBtn();
}
function updateThemeBtn() {
  const b = document.getElementById('theme-btn');
  if (b) b.textContent = STATE.theme === 'dark' ? '☀️' : '🌙';
}

// ── Helpers ───────────────────────────────────────────────────
function fmtUSD(n) { return '$' + (n % 1 === 0 ? n : n.toFixed(2)); }
function fmtVND(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M ₫';
  return n.toLocaleString('vi-VN') + ' ₫';
}
function fmtPrice(usd) {
  if (STATE.currency === 'USD') return fmtUSD(usd);
  return fmtVND(Math.round(usd * STATE.rate));
}
function getLogoHTML(app, cls = 'app-logo', fallbackCls = 'app-logo-fallback') {
  let domain = '';
  try { domain = new URL(app.url).hostname; } catch {}
  const src = domain
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    : app.logo;
  return `<img class="${cls}" src="${src}" alt="${app.name}"
    onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
    <div class="${fallbackCls}" style="display:none">${app.name.charAt(0)}</div>`;
}

// ── Best tier for current plan ────────────────────────────────
function getBestTier(app) {
  const planData = app.pricing[STATE.plan];
  if (!planData || !planData.tiers || !planData.tiers.length) return null;
  const paid = planData.tiers.filter(t => t.monthly > 0 && !t.contact_sales);
  if (paid.length) return paid[0];
  const free = planData.tiers.find(t => t.monthly === 0);
  if (free) return free;
  return planData.tiers[0];
}

// ── Combos ────────────────────────────────────────────────────
function renderCombos() {
  const grid = document.getElementById('combo-grid');
  if (!grid || !STATE.combos.length) return;
  grid.innerHTML = STATE.combos.map((combo, i) => {
    const appObjs = combo.apps.map(id => STATE.apps.find(a => a.id === id)).filter(Boolean);
    const total = appObjs.reduce((sum, app) => {
      const t = getBestTier(app);
      return sum + (t && t.monthly > 0 ? t.monthly : 0);
    }, 0);
    const names = appObjs.map(a => a.name);
    return `<div class="combo-card" style="animation-delay:${i*40}ms" onclick="addCombo('${combo.id}')">
      <div class="combo-icon-wrap" style="background:${combo.color}18;border-color:${combo.color}30">${combo.icon}</div>
      <div class="combo-name">${combo.name}</div>
      <div class="combo-desc">${combo.description}</div>
      <div class="combo-apps-row">${names.map(n => `<span class="combo-app-chip">${n}</span>`).join('')}</div>
      <div class="combo-price">
        <div>
          <div class="combo-price-label">Tổng tháng (cá nhân)</div>
          <div class="combo-price-num">${fmtPrice(total)}</div>
        </div>
        <button class="combo-add-btn" onclick="event.stopPropagation();addCombo('${combo.id}')">+ Thêm tất cả</button>
      </div>
    </div>`;
  }).join('');
}

function addCombo(comboId) {
  const combo = STATE.combos.find(c => c.id === comboId);
  if (!combo) return;
  combo.apps.forEach(id => {
    const app = STATE.apps.find(a => a.id === id);
    if (!app) return;
    const planData = app.pricing[STATE.plan];
    if (!planData) return;
    const tiers = planData.tiers || [];
    const paid = tiers.find(t => t.monthly > 0 && !t.contact_sales);
    const tier = paid || tiers[0];
    if (tier && !STATE.selected.has(id)) {
      STATE.selected.set(id, { app, tier, plan: STATE.plan });
    }
  });
  renderApps();
  updateCalcBar();
}

// ── Categories ────────────────────────────────────────────────
function renderCategories() {
  const el = document.getElementById('filter-tabs');
  if (!el) return;
  el.innerHTML = '';
  const allBtn = mkTabBtn('all', 'Tất cả', true);
  el.appendChild(allBtn);
  STATE.categories.forEach(cat => el.appendChild(mkTabBtn(cat.id, `${cat.icon} ${cat.label}`, false)));
}
function mkTabBtn(id, label, active) {
  const b = document.createElement('button');
  b.className = `tab-btn${active ? ' active' : ''}`;
  b.dataset.category = id;
  b.textContent = label;
  b.addEventListener('click', () => {
    STATE.category = id;
    document.querySelectorAll('.tab-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    renderApps();
  });
  return b;
}

// ── Apps Grid ─────────────────────────────────────────────────
function renderApps() {
  const grid = document.getElementById('app-grid');
  if (!grid) return;
  grid.innerHTML = '';
  let list = [...STATE.apps];
  if (STATE.category !== 'all') list = list.filter(a => a.category === STATE.category);
  if (STATE.search.trim()) {
    const q = STATE.search.toLowerCase();
    list = list.filter(a => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q));
  }
  if (!list.length) {
    grid.innerHTML = `<div class="empty-state"><div class="icon">🔍</div><h3>Không tìm thấy</h3><p>Thử từ khóa khác nhé</p></div>`;
    return;
  }
  list.forEach((app, i) => {
    const card = buildCard(app);
    card.style.animationDelay = `${i * 25}ms`;
    grid.appendChild(card);
  });
}

function buildCard(app) {
  const card = document.createElement('div');
  const sel = STATE.selected.has(app.id);
  card.className = `app-card${sel ? ' selected' : ''}`;
  card.dataset.id = app.id;

  const planData = app.pricing[STATE.plan];
  const tier = getBestTier(app);
  let priceHTML = '';

  if (!planData || !tier) {
    priceHTML = `<span class="price-contact">—</span>`;
  } else if (tier.contact_sales) {
    priceHTML = `<span class="price-contact">Liên hệ</span>`;
  } else if (tier.monthly === 0) {
    priceHTML = `<span class="price-free">Miễn phí</span>`;
  } else {
    priceHTML = `<span class="price-amount">${fmtPrice(tier.monthly)}</span><span class="price-period">/th${tier.per_seat ? '/seat' : ''}</span>`;
  }

  card.innerHTML = `
    <div class="card-top">
      ${getLogoHTML(app)}
      <div class="app-meta">
        <div class="app-name">${app.name}</div>
        <div class="app-cat">${app.category}</div>
      </div>
    </div>
    <div class="card-desc">${app.description}</div>
    <div class="card-price-row">
      <div style="display:flex;align-items:baseline;gap:4px">${priceHTML}</div>
      ${tier && tier.label ? `<span class="price-label-chip">${tier.label}</span>` : ''}
    </div>
    <div class="view-plans-btn">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      Xem tất cả plan
    </div>`;

  card.addEventListener('click', () => openDrawer(app));
  return card;
}

// ── Drawer ────────────────────────────────────────────────────
function openDrawer(app) {
  STATE.drawerApp = app;
  STATE.drawerPlan = STATE.plan;
  STATE.drawerTier = null;
  renderDrawer();
  document.getElementById('drawer').classList.add('open');
  document.getElementById('drawer-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('drawer-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function renderDrawer() {
  const app = STATE.drawerApp;
  if (!app) return;

  // Header
  const hdr = document.getElementById('drawer-header');
  hdr.innerHTML = `
    ${getLogoHTML(app, 'drawer-logo', 'drawer-logo-fallback')}
    <div>
      <div class="drawer-app-name">${app.name}</div>
      <div class="drawer-app-desc">${app.description}</div>
    </div>
    <button class="drawer-close" id="drawer-close-btn">✕</button>`;
  document.getElementById('drawer-close-btn').addEventListener('click', closeDrawer);

  // Body
  const body = document.getElementById('drawer-body');
  const plans = [
    { key: 'individual', label: 'Cá nhân' },
    { key: 'team', label: 'Team' },
    { key: 'enterprise', label: 'Doanh nghiệp' },
  ];

  let planTabsHTML = `<div class="drawer-plan-tabs">`;
  plans.forEach(p => {
    const hasPlan = app.pricing[p.key];
    if (hasPlan) planTabsHTML += `<button class="drawer-plan-btn${p.key === STATE.drawerPlan ? ' active' : ''}" data-plan="${p.key}">${p.label}</button>`;
  });
  planTabsHTML += `</div>`;

  body.innerHTML = planTabsHTML + `<div class="tier-list" id="tier-list"></div>`;

  body.querySelectorAll('.drawer-plan-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      STATE.drawerPlan = btn.dataset.plan;
      body.querySelectorAll('.drawer-plan-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTiers();
      updateDrawerAddBtn();
    });
  });

  renderTiers();
  updateDrawerAddBtn();
}

function renderTiers() {
  const app = STATE.drawerApp;
  const planData = app.pricing[STATE.drawerPlan];
  const list = document.getElementById('tier-list');
  if (!list) return;
  if (!planData || !planData.tiers) {
    list.innerHTML = `<p style="color:var(--text-2);font-size:13px;padding:12px 0">Không có plan cho lựa chọn này.</p>`;
    return;
  }
  list.innerHTML = planData.tiers.map((tier, i) => {
    const isSel = STATE.drawerTier && STATE.drawerTier.name === tier.name;
    let priceBlock = '';
    if (tier.contact_sales || tier.monthly === null) {
      priceBlock = `<div class="tier-contact">Liên hệ sales</div>`;
    } else if (tier.monthly === 0) {
      priceBlock = `<div class="tier-price-row"><span class="tier-price-usd" style="color:var(--accent)">Miễn phí</span></div>`;
    } else {
      const vnd = fmtVND(Math.round(tier.monthly * STATE.rate));
      const perSeat = tier.per_seat ? '<span class="tier-per-seat"> / seat</span>' : '';
      const saving = tier.yearly ? Math.round((1 - tier.yearly / (tier.monthly * 12)) * 100) : 0;
      priceBlock = `
        <div class="tier-price-row">
          <span class="tier-price-usd">${fmtUSD(tier.monthly)}</span>
          <span class="tier-price-period">/tháng${perSeat ? '' : ''}</span>${perSeat}
        </div>
        <div class="tier-price-vnd">≈ ${vnd}/tháng</div>
        ${saving > 0 ? `<div class="tier-yearly">Thanh toán năm: ${fmtUSD(tier.yearly / 12).replace('$','$')} — tiết kiệm ${saving}%</div>` : ''}`;
    }
    const features = tier.features ? tier.features.map(f => `<div class="tier-feature">${f}</div>`).join('') : '';
    return `<div class="tier-card${isSel ? ' selected-tier' : ''}${tier.contact_sales ? '' : ''}" 
      data-tier-idx="${i}" onclick="selectTier(${i})">
      <div class="tier-top">
        <span class="tier-name">${tier.name}</span>
        ${tier.label ? `<span class="tier-badge">${tier.label}</span>` : ''}
      </div>
      ${priceBlock}
      <div class="tier-features">${features}</div>
    </div>`;
  }).join('');
}

function selectTier(idx) {
  const app = STATE.drawerApp;
  const planData = app.pricing[STATE.drawerPlan];
  if (!planData) return;
  const tier = planData.tiers[idx];
  if (!tier || tier.contact_sales) return;
  STATE.drawerTier = tier;
  document.querySelectorAll('.tier-card').forEach((c, i) => c.classList.toggle('selected-tier', i === idx));
  updateDrawerAddBtn();
}

function updateDrawerAddBtn() {
  const btn = document.getElementById('drawer-add-btn');
  if (!btn) return;
  const app = STATE.drawerApp;
  const alreadyIn = STATE.selected.has(app.id);
  if (!STATE.drawerTier) {
    btn.textContent = 'Chọn một plan để thêm';
    btn.disabled = true;
    return;
  }
  btn.disabled = false;
  btn.textContent = alreadyIn ? '✓ Cập nhật giỏ' : '+ Thêm vào giỏ';
}

// Add button handler set once
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('drawer-add-btn').addEventListener('click', () => {
    const app = STATE.drawerApp;
    const tier = STATE.drawerTier;
    if (!app || !tier) return;
    STATE.selected.set(app.id, { app, tier, plan: STATE.drawerPlan });
    updateCardSelected(app.id, true);
    updateCalcBar();
    closeDrawer();
  });
});

function updateCardSelected(id, sel) {
  const card = document.querySelector(`.app-card[data-id="${id}"]`);
  if (card) card.classList.toggle('selected', sel);
}

// ── Calc Bar ──────────────────────────────────────────────────
function updateCalcBar() {
  const bar = document.getElementById('calc-bar');
  const n = STATE.selected.size;
  if (!bar) return;
  bar.classList.toggle('visible', n > 0);
  updatePageSalary();
  if (!n) return;
  document.getElementById('calc-count').innerHTML = `Đã chọn <strong>${n}</strong> app`;
  const total = calcTotal();
  document.getElementById('calc-total').textContent = STATE.currency === 'USD'
    ? fmtUSD(total.usd) : fmtVND(total.vnd);
}

function calcTotal() {
  let usd = 0;
  STATE.selected.forEach(({ tier }) => { if (tier.monthly > 0) usd += tier.monthly; });
  return { usd: parseFloat(usd.toFixed(2)), vnd: Math.round(usd * STATE.rate) };
}

// ── Page Salary ───────────────────────────────────────────────
function updatePageSalary() {
  const input = document.getElementById('page-salary-input');
  const curSel = document.getElementById('page-salary-currency');
  const result = document.getElementById('page-salary-result');
  if (!input || !result) return;
  const raw = parseFloat(input.dataset.rawValue || input.value.replace(/\D/g, '')) || 0;
  if (!raw || raw <= 0 || STATE.selected.size === 0) {
    result.innerHTML = STATE.selected.size === 0
      ? '<div class="salary-hint">Chọn app phía trên để bắt đầu tính</div>'
      : '<div class="salary-hint">Nhập lương để xem kết quả</div>';
    return;
  }
  const cur = curSel ? curSel.value : 'VND';
  const total = calcTotal();
  const grossVND = cur === 'VND' ? raw : raw * STATE.rate;
  const costVND = total.vnd;
  const netVND = Math.max(0, grossVND - costVND);
  const pct = ((costVND / grossVND) * 100).toFixed(1);
  result.innerHTML = `
    <div class="salary-result-card">
      <div class="salary-result-row"><span class="lbl">Lương gross</span><span class="val">${fmtVND(Math.round(grossVND))}</span></div>
      <div class="salary-result-row cost"><span class="lbl">Chi phí app / tháng</span><span class="val">- ${fmtVND(Math.round(costVND))}</span></div>
      <div class="salary-result-row hi"><span class="lbl">Còn lại</span><span class="val">${fmtVND(Math.round(netVND))}</span></div>
      <div class="salary-result-row"><span class="lbl">App chiếm % lương</span><span class="val" style="color:var(--accent)">${pct}%</span></div>
    </div>`;
}

// ── Modal ─────────────────────────────────────────────────────
function openModal() {
  document.getElementById('modal-overlay').classList.add('open');
  renderModalBody();
}
function closeModal() { document.getElementById('modal-overlay').classList.remove('open'); }

function renderModalBody() {
  const body = document.getElementById('modal-body');
  if (!body) return;
  const total = calcTotal();
  const items = [...STATE.selected.entries()].map(([id, { app, tier, plan }]) => {
    const planLabel = { individual: 'Cá nhân', team: 'Team', enterprise: 'Doanh nghiệp' }[plan];
    const price = tier.monthly > 0 ? `${fmtUSD(tier.monthly)}/th` : 'Miễn phí';
    const vnd = tier.monthly > 0 ? fmtVND(Math.round(tier.monthly * STATE.rate)) + '/th' : '';
    return `<div class="selected-item">
      <img class="selected-item-logo" src="${app.logo}" alt="${app.name}" onerror="this.style.display='none'">
      <div class="selected-item-info">
        <div class="selected-item-name">${app.name}</div>
        <div class="selected-item-plan">${tier.name} · ${planLabel}</div>
      </div>
      <div class="selected-item-price">
        <div class="usd">${price}</div>
        <div class="vnd">${vnd}</div>
      </div>
      <button class="remove-btn" onclick="removeItem('${id}')">✕</button>
    </div>`;
  }).join('');

  body.innerHTML = `
    <div class="selected-list">${items}</div>
    <div class="modal-divider"></div>
    <div class="total-row">
      <span class="total-label">💰 Tổng / tháng</span>
      <div>
        <div class="total-usd">${fmtUSD(total.usd)}</div>
        <div class="total-vnd">${fmtVND(total.vnd)}</div>
      </div>
    </div>
    <div class="salary-section">
      <h3>🧮 Lương còn lại sau khi trả app</h3>
      <div class="salary-inputs">
        <input type="text" inputmode="numeric" id="salary-input" placeholder="Nhập lương..." autocomplete="off">
        <select id="salary-currency"><option value="VND">VND</option><option value="USD">USD</option></select>
      </div>
      <div class="salary-result-box" id="salary-result-box">
        <div class="result-row"><span class="label">Lương gross</span><span class="value" id="res-gross">—</span></div>
        <div class="result-row cost"><span class="label">Chi phí app / tháng</span><span class="value" id="res-cost">—</span></div>
        <div class="result-row highlight"><span class="label">Còn lại</span><span class="value" id="res-net">—</span></div>
        <div class="result-row"><span class="label">App chiếm % lương</span><span class="value" id="res-pct">—</span></div>
      </div>
    </div>`;

  const salEl = document.getElementById('salary-input');
  salEl.addEventListener('input', function() {
    const raw = this.value.replace(/\D/g, '');
    this.dataset.rawValue = raw;
    this.value = raw ? parseInt(raw, 10).toLocaleString('vi-VN') : '';
    calcSalary();
  });
  document.getElementById('salary-currency').addEventListener('change', calcSalary);
}

function removeItem(id) {
  STATE.selected.delete(id);
  updateCardSelected(id, false);
  updateCalcBar();
  if (STATE.selected.size === 0) { closeModal(); return; }
  const salIn = document.getElementById('salary-input');
  const salCur = document.getElementById('salary-currency');
  const savedRaw = salIn ? (salIn.dataset.rawValue || '') : '';
  const savedCur = salCur ? salCur.value : 'VND';
  renderModalBody();
  if (savedRaw) {
    const newIn = document.getElementById('salary-input');
    const newCur = document.getElementById('salary-currency');
    if (newIn) { newIn.dataset.rawValue = savedRaw; newIn.value = parseInt(savedRaw, 10).toLocaleString('vi-VN'); }
    if (newCur) newCur.value = savedCur;
    calcSalary();
  }
}

function calcSalary() {
  const salInput = document.getElementById('salary-input');
  const val = parseFloat(salInput ? (salInput.dataset.rawValue || salInput.value.replace(/\D/g, '')) : 0);
  const cur = document.getElementById('salary-currency').value;
  const box = document.getElementById('salary-result-box');
  if (!val || val <= 0) { box.classList.remove('show'); return; }
  box.classList.add('show');
  const total = calcTotal();
  const grossVND = cur === 'VND' ? val : val * STATE.rate;
  const costVND = total.vnd;
  const netVND = Math.max(0, grossVND - costVND);
  const pct = ((costVND / grossVND) * 100).toFixed(1);
  document.getElementById('res-gross').textContent = fmtVND(Math.round(grossVND));
  document.getElementById('res-cost').textContent = `- ${fmtVND(Math.round(costVND))}`;
  document.getElementById('res-net').textContent = fmtVND(Math.round(netVND));
  document.getElementById('res-pct').textContent = `${pct}%`;
}

// ── Bind Events ───────────────────────────────────────────────
function bindEvents() {
  const searchEl = document.getElementById('search');
  if (searchEl) {
    const doSearch = e => { STATE.search = e.target.value; renderApps(); };
    searchEl.addEventListener('input', doSearch);
    searchEl.addEventListener('keyup', doSearch);
  }
  document.getElementById('btn-usd').addEventListener('click', () => setCurrency('USD'));
  document.getElementById('btn-vnd').addEventListener('click', () => setCurrency('VND'));
  document.querySelectorAll('.plan-btn').forEach(btn => btn.addEventListener('click', () => {
    STATE.plan = btn.dataset.plan;
    document.querySelectorAll('.plan-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderApps(); renderCombos(); updateCalcBar();
  }));
  document.getElementById('theme-btn').addEventListener('click', toggleTheme);
  document.getElementById('calc-open-btn').addEventListener('click', openModal);
  document.getElementById('calc-reset').addEventListener('click', () => {
    STATE.selected.clear();
    document.querySelectorAll('.app-card.selected').forEach(c => c.classList.remove('selected'));
    updateCalcBar();
  });
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
  const pageSalIn = document.getElementById('page-salary-input');
  const pageSalCur = document.getElementById('page-salary-currency');
  if (pageSalIn) {
    pageSalIn.addEventListener('input', function() {
      const raw = this.value.replace(/\D/g, '');
      this.dataset.rawValue = raw;
      this.value = raw ? parseInt(raw, 10).toLocaleString('vi-VN') : '';
      updatePageSalary();
    });
  }
  if (pageSalCur) pageSalCur.addEventListener('change', updatePageSalary);
  document.getElementById('drawer-overlay').addEventListener('click', closeDrawer);
}

function setCurrency(c) {
  STATE.currency = c;
  document.getElementById('btn-usd').classList.toggle('active', c === 'USD');
  document.getElementById('btn-vnd').classList.toggle('active', c === 'VND');
  renderApps(); renderCombos(); updateCalcBar();
}

document.addEventListener('DOMContentLoaded', init);
