(() => {
'use strict';
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(pointer: fine)').matches;

/* ---------- intro ---------- */
const bootEl = $('#boot');
function startSite() { document.body.classList.add('loaded'); }
if (bootEl && !reduced) {
  const num = $('#bootNum'), fill = $('#bootBar'), t0 = performance.now();
  let loadDone = document.readyState === 'complete';
  addEventListener('load', () => { loadDone = true; });
  (function step(t) {
    const el = t - t0;
    if (el > 2800) loadDone = true;
    let p = Math.min(el / 1200, 1);
    if (!loadDone) p = Math.min(p, .94);
    num.textContent = String(Math.round(p * 100)).padStart(3, '0');
    fill.style.transform = `scaleX(${p})`;
    if (p >= 1 && loadDone) {
      bootEl.classList.add('done');
      setTimeout(startSite, 450);
      setTimeout(() => bootEl.remove(), 1300);
    } else requestAnimationFrame(step);
  })(t0);
} else {
  if (bootEl) bootEl.remove();
  requestAnimationFrame(() => requestAnimationFrame(startSite));
}

/* ---------- reveal on scroll ---------- */
if ('IntersectionObserver' in window && !reduced) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  $$('[data-reveal]').forEach(el => io.observe(el));
} else {
  $$('[data-reveal]').forEach(el => el.classList.add('visible'));
}

/* ---------- mobile menu ---------- */
const menu = $('#menuToggle'), links = $('#siteNav');
function setMenu(open) {
  links.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.style.overflow = open ? 'hidden' : '';
}
menu.addEventListener('click', () => setMenu(!links.classList.contains('open')));
$$('a', links).forEach(a => a.addEventListener('click', () => setMenu(false)));
addEventListener('keydown', e => { if (e.key === 'Escape' && links.classList.contains('open')) setMenu(false); });

/* ---------- scroll-linked words ---------- */
const wordsEl = $('#manifestoWords');
let wordEls = [];
if (wordsEl) {
  const text = wordsEl.textContent.trim();
  wordsEl.setAttribute('aria-label', text);
  wordsEl.innerHTML = text.split(/\s+/).map(w => `<span class="w" aria-hidden="true">${w}</span>`).join(' ');
  wordEls = $$('.w', wordsEl);
  if (reduced) wordEls.forEach(w => w.classList.add('on'));
}
let litCount = -1;

/* ---------- element refs for the scroll loop ---------- */
const bar = $('#progress'), nav = $('#nav');
const heroMedia = $('#heroMedia'), heroContent = $('#heroContent'), hero = $('#top');
const manifesto = $('#philosophy');
const models = $$('[data-model]');
const lightSec = $('#lightMedia')?.parentElement;
const studio = $('#studio'), studioTrack = $('#studioTrack');
const timeline = $('#timeline'), steps = $$('[data-step]');
const railEl = $('#rail'), railLinks = $$('.rail a'), railPct = $('#railPct');
const railSecs = railLinks.map(a => document.getElementById(a.dataset.sec));
const slides = $$('[data-slide]');
let railCur = -1;

let hsOverflow = 0;
function setupStudio() {
  if (!studio) return;
  const on = innerWidth > 860 && !reduced;
  studio.classList.toggle('hs-on', on);
  studioTrack.style.transform = '';
  if (!on) { studio.style.height = ''; hsOverflow = 0; return; }
  studio.style.height = '';
  hsOverflow = Math.max(0, studioTrack.scrollWidth - innerWidth);
  studio.style.height = (innerHeight + hsOverflow) + 'px';
}
setupStudio();
let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { setupStudio(); tick(); }, 150); });
addEventListener('load', () => { setupStudio(); tick(); });

/* ---------- master scroll loop ---------- */
let queued = false;
function tick() {
  queued = false;
  const y = scrollY, H = innerHeight;
  const max = document.documentElement.scrollHeight - H;
  bar.style.width = (max > 0 ? y / max * 100 : 0) + '%';
  nav.classList.toggle('scrolled', y > 30);

  if (!reduced) {
    if (y < H * 1.3) {
      heroMedia.style.transform = `translate3d(0,${(y * .2).toFixed(1)}px,0)`;
      heroContent.style.transform = `translate3d(0,${(-y * .1).toFixed(1)}px,0)`;
      heroContent.style.opacity = clamp(1 - y / (H * .72)).toFixed(3);
    }
    if (manifesto && wordEls.length) {
      const r = manifesto.getBoundingClientRect();
      const p = clamp(-r.top / Math.max(1, r.height - H));
      const n = Math.round(clamp(p / .82) * wordEls.length);
      if (n !== litCount) { wordEls.forEach((w, i) => w.classList.toggle('on', i < n)); litCount = n; }
    }
    models.forEach(m => {
      const r = m.getBoundingClientRect();
      const p = clamp(1 - r.top / H);
      m.style.setProperty('--s', (1.14 - .14 * p).toFixed(4));
      m.style.setProperty('--ty', ((1 - p) * 70).toFixed(1) + 'px');
      m.style.setProperty('--o', (.15 + .85 * p).toFixed(3));
    });
    if (lightSec) {
      const r = lightSec.getBoundingClientRect();
      const p = clamp((H - r.top) / (H + r.height));
      lightSec.style.setProperty('--ls', (1.1 + .34 * p).toFixed(4));
    }
    if (hsOverflow && studio.classList.contains('hs-on')) {
      const r = studio.getBoundingClientRect();
      const p = clamp(-r.top / Math.max(1, r.height - H));
      studioTrack.style.transform = `translate3d(${(-p * hsOverflow).toFixed(1)}px,0,0)`;
    }
  }
  if (railEl) {
    const prog = max > 0 ? clamp(y / max) : 0;
    railEl.style.setProperty('--rp', prog.toFixed(3));
    railPct.textContent = String(Math.round(prog * 100)).padStart(2, '0');
    let cur = 0;
    railSecs.forEach((el, i) => { if (el && el.getBoundingClientRect().top <= H * .45) cur = i; });
    if (cur !== railCur) { railLinks.forEach((a, i) => a.classList.toggle('on', i === cur)); railCur = cur; }
  }
  if (!reduced) slides.forEach(el => {
    const r = el.getBoundingClientRect();
    const p = clamp((H - r.top) / (H + r.height));
    el.style.setProperty('--sx', ((p - .5) * -38).toFixed(2) + 'vw');
  });
  if (timeline) {
    const r = timeline.getBoundingClientRect();
    timeline.style.setProperty('--tl', clamp((H * .62 - r.top) / Math.max(1, r.height * .92)).toFixed(3));
    steps.forEach(s => s.classList.toggle('on', s.getBoundingClientRect().top < H * .68));
  }
}
function queue() { if (!queued) { queued = true; requestAnimationFrame(tick); } }
addEventListener('scroll', queue, { passive: true });
tick();

/* ---------- hero dust particles ---------- */
(() => {
  const c = $('#heroDust');
  if (!c || reduced) return;
  const ctx = c.getContext('2d');
  let w = 0, h = 0, parts = [], running = true, raf = 0;
  const make = () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.5 + .3, vy: -(Math.random() * .3 + .06), vx: (Math.random() - .5) * .14, a: Math.random() * .55 + .12, t: Math.random() * 6.28 });
  function size() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = c.clientWidth; h = c.clientHeight;
    c.width = w * dpr; c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    parts = Array.from({ length: Math.min(80, Math.round(w / 16)) }, make);
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const p of parts) {
      p.x += p.vx + Math.sin(p.t += .01) * .08; p.y += p.vy;
      if (p.y < -8) { p.y = h + 8; p.x = Math.random() * w; }
      const tw = .6 + .4 * Math.sin(p.t * 2.3);
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
      g.addColorStop(0, `rgba(255,226,170,${(p.a * tw).toFixed(3)})`);
      g.addColorStop(1, 'rgba(255,226,170,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, 6.2832); ctx.fill();
    }
    if (running) raf = requestAnimationFrame(draw);
  }
  size(); draw();
  addEventListener('resize', size);
  new IntersectionObserver(es => {
    const vis = es[0].isIntersecting;
    if (vis && !running) { running = true; raf = requestAnimationFrame(draw); }
    else if (!vis) { running = false; cancelAnimationFrame(raf); }
  }).observe(hero);
})();

/* ---------- count-up numbers ---------- */
(() => {
  const els = $$('.count');
  if (!els.length) return;
  const fmt = (el, v) => (el.dataset.prefix || '') + Math.round(v).toLocaleString('en-US') + (el.dataset.suffix || '');
  if (reduced || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    const el = e.target, to = +el.dataset.to, t0 = performance.now(), dur = 1700;
    (function step(t) {
      const k = clamp((t - t0) / dur), ease = 1 - Math.pow(1 - k, 4);
      el.textContent = fmt(el, to * ease);
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }), { threshold: .6 });
  els.forEach(el => io.observe(el));
})();

/* ---------- OpenArchitecture tabs + diagram ---------- */
(() => {
  const tabs = $$('.tab'), nodes = $$('.node'), detail = $('#archDetail');
  if (!tabs.length) return;
  const text = [
    'Modular fascia, trim, wraps and approved nonstructural panels.',
    'Replaceable cabin processor on an isolated, secure interface.',
    'Approved upholstery, comfort, trim and accessory programs.',
    'Safety-validated tire, brake and suspension packages.'
  ];
  let cur = 0, timer = 0, touched = false;
  function select(i, user) {
    cur = i;
    if (user) touched = true;
    tabs.forEach((t, j) => { t.classList.toggle('active', j === i); t.setAttribute('aria-selected', String(j === i)); t.tabIndex = j === i ? 0 : -1; });
    nodes.forEach((n, j) => n.classList.toggle('active', j === i));
    detail.textContent = text[i];
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(i, true));
    t.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const n = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
        select(n, true); tabs[n].focus();
      }
    });
  });
  nodes.forEach((n, i) => n.addEventListener('click', () => select(i, true)));
  select(0);
  if (reduced || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(es => {
    clearInterval(timer);
    if (es[0].isIntersecting) timer = setInterval(() => { if (!touched) select((cur + 1) % 4); }, 4200);
  }, { threshold: .35 }).observe($('#archSvg'));
})();

/* ---------- interior hotspots ---------- */
(() => {
  const hots = $$('.hot');
  const closeAll = except => hots.forEach(h => { if (h !== except) h.setAttribute('aria-expanded', 'false'); });
  hots.forEach(h => h.addEventListener('click', e => {
    e.stopPropagation();
    const open = h.getAttribute('aria-expanded') !== 'true';
    closeAll(h);
    h.setAttribute('aria-expanded', String(open));
  }));
  document.addEventListener('click', () => closeAll());
  addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
})();

/* ---------- pointer glow + magnetic buttons ---------- */
if (fine && !reduced) {
  $$('.pcard').forEach(c => c.addEventListener('pointermove', e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }));
  $$('.btn-solid').forEach(b => {
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${((e.clientX - r.left) / r.width - .5) * 10}px,${((e.clientY - r.top) / r.height - .5) * 8}px)`;
    });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
}

/* ---------- toast ---------- */
const toast = $('#toast');
let toastT;
function notify(msg) {
  toast.textContent = msg; toast.classList.add('on');
  clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove('on'), 3000);
}

/* lazy images inside sticky / transformed layers can stay blank on iOS Safari; the page is ~3 MB, so load them eagerly */
$$('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });

/* ---------- configurator ---------- */
(() => {
  const car = $('#configCar');
  if (!car) return;
  const themes = {
    graphite: { name: 'Graphite', rgb: [50, 54, 58] },
    silver: { name: 'Ceramic silver', rgb: [196, 190, 186] },
    blue: { name: 'Midnight blue', rgb: [57, 75, 92] },
    red: { name: 'Burgundy', rgb: [105, 54, 59] },
    bronze: { name: 'Burnished bronze', rgb: [120, 100, 70] },
    obsidian: { name: 'Obsidian black', rgb: [14, 16, 20] },
    white: { name: 'Arctic white', rgb: [221, 218, 210] },
    green: { name: 'Deep green', rgb: [22, 76, 61] }
  };
  const accents = {
    gold: ['Gold', '#c9a46a'], red: ['Red', '#d1313f'], silver: ['Silver', '#c9ccd1'],
    bronze: ['Bronze', '#b87c52'], blue: ['Blue', '#4f8cff']
  };
  const BASE = 17990;
  let color = 'graphite', accent = 'gold';
  const seats = $('#upSeats'), audio = $('#upAudio'), compute = $('#upCompute');
  try {
    const s = JSON.parse(localStorage.getItem('haven-concept-build') || 'null');
    if (s) {
      if (themes[s.color]) color = s.color;
      if (accents[s.accent]) accent = s.accent;
      seats.checked = !!s.seats; audio.checked = !!s.audio; compute.checked = !!s.compute;
    }
  } catch (e) {}

  /* paint engine — recolors only the painted-body pixels of the render */
  const canvas = document.createElement('canvas');
  canvas.setAttribute('role', 'img');
  car.insertAdjacentElement('afterend', canvas);
  let ctx, base, idx, alpha, ready = false;
  function build(data, w, h) {
    const I = [], A = [];
    for (let y = Math.floor(h * .32); y < h * .89; y++) {
      for (let x = Math.floor(w * .08); x < w * .94; x++) {
        const i = (y * w + x) * 4, R = data[i], G = data[i + 1], B = data[i + 2];
        const lum = (R + G + B) / 3;
        if (lum <= 26 || lum >= 168) continue;
        if (!(B >= R * .86 && B >= G * .86)) continue;
        const a = Math.min(.88, Math.max(0, (lum - 24) / 58)) * Math.min(1, (168 - lum) / 38);
        if (a > .01) { I.push(i); A.push(a); }
      }
    }
    idx = Uint32Array.from(I); alpha = Float32Array.from(A);
  }
  function paint() {
    if (!ready) return;
    const out = new Uint8ClampedArray(base.data), d = base.data, rgb = themes[color].rgb;
    for (let n = 0; n < idx.length; n++) {
      const i = idx[n], a = alpha[n];
      const lum = Math.max(.27, Math.min(1.52, ((d[i] + d[i + 1] + d[i + 2]) / 3) / 82));
      for (let k = 0; k < 3; k++) out[i + k] = d[i + k] * (1 - a) + Math.min(255, rgb[k] * lum) * a;
    }
    ctx.putImageData(new ImageData(out, base.width, base.height), 0, 0);
    canvas.setAttribute('aria-label', 'HAVEN P1 concept in ' + themes[color].name);
  }
  const src = new Image();
  src.decoding = 'async';
  src.onload = () => {
    try {
      const sc = Math.min(1, 1200 / src.naturalWidth);
      canvas.width = Math.round(src.naturalWidth * sc); canvas.height = Math.round(src.naturalHeight * sc);
      ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(src, 0, 0, canvas.width, canvas.height);
      base = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // if the browser handed back an empty bitmap, keep the plain image
      let seen = 0; for (let i = 3; i < base.data.length && seen < 50; i += 4000) if (base.data[i] > 0) seen++;
      if (!seen) throw new Error('blank canvas');
      build(base.data, canvas.width, canvas.height);
      ready = true; paint();
    } catch (e) { canvas.hidden = true; ready = false; }
  };
  src.onerror = () => { canvas.hidden = true; };
  src.src = car.getAttribute('src');

  /* controls */
  function update(fromUser) {
    const price = BASE + (seats.checked ? 650 : 0) + (audio.checked ? 350 : 0) + (compute.checked ? 800 : 0);
    $('#configPrice').textContent = '$' + price.toLocaleString('en-US');
    $('#colorText').textContent = themes[color].name;
    $('#accentText').textContent = accents[accent][0];
    $$('.swatch').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.color === color)));
    $$('[data-accent]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.accent === accent)));
    document.documentElement.style.setProperty('--chosen-accent', accents[accent][1]);
    if (fromUser === 'color' && ready) { paint(); if (!reduced) canvas.animate([{ opacity: .55 }, { opacity: 1 }], { duration: 450, easing: 'ease-out' }); }
    try { localStorage.setItem('haven-concept-build', JSON.stringify({ color, accent, seats: seats.checked, audio: audio.checked, compute: compute.checked })); } catch (e) {}
  }
  $$('.swatch').forEach(b => b.addEventListener('click', () => { color = b.dataset.color; update('color'); }));
  $$('[data-accent]').forEach(b => b.addEventListener('click', () => { accent = b.dataset.accent; update(); }));
  [seats, audio, compute].forEach(i => i.addEventListener('change', () => update()));
  update();

  $('#copyBuild').addEventListener('click', async () => {
    const ups = [seats.checked && 'contrast-stitched seats', audio.checked && 'enhanced audio', compute.checked && 'compute upgrade'].filter(Boolean);
    const value = `HAVEN P1 CORE — non-binding conceptual configuration\nExterior: ${themes[color].name}\nAccent light: ${accents[accent][0]}\nUpgrades: ${ups.join(', ') || 'none'}\nIllustrative price: ${$('#configPrice').textContent} delivered\nNo vehicles currently offered; no orders or reservations accepted.`;
    try { await navigator.clipboard.writeText(value); notify('Concept build copied to clipboard'); }
    catch (e) {
      const t = document.createElement('textarea'); t.value = value; document.body.append(t); t.select();
      try { document.execCommand('copy'); notify('Concept build copied'); } catch (e2) { notify('Copy unavailable in this browser'); }
      t.remove();
    }
  });
})();

/* ---------- lightbox ---------- */
(() => {
  const box = $('#lightbox'), img = $('#lightboxImage'), cap = $('#lightboxCaption'), close = $('#lightboxClose');
  let last = null;
  img.addEventListener('load', () => { img.style.maxWidth = Math.max(320, img.naturalWidth * 2) + 'px'; });
  document.addEventListener('click', e => {
    const c = e.target.closest('[data-full]');
    if (!c || c.closest('#lightbox')) return;
    last = document.activeElement;
    img.style.maxWidth = '';
    img.src = c.dataset.full; img.alt = $('img', c)?.alt || ''; cap.textContent = c.dataset.caption || '';
    box.classList.add('open'); box.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; close.focus();
  });
  function hide() {
    box.classList.remove('open'); box.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; img.removeAttribute('src');
    if (last) last.focus();
  }
  close.addEventListener('click', hide);
  box.addEventListener('click', e => { if (e.target === box) hide(); });
  addEventListener('keydown', e => {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') hide();
    if (e.key === 'Tab') { e.preventDefault(); close.focus(); }
  });
})();

/* ---------- segmented controls ---------- */
function seg(root, attr, cb) {
  const btns = $$('button', root);
  const pick = i => {
    btns.forEach((b, j) => { b.classList.toggle('on', j === i); b.setAttribute('aria-selected', String(j === i)); b.tabIndex = j === i ? 0 : -1; });
    cb(btns[i].dataset[attr]);
  };
  btns.forEach((b, i) => {
    b.tabIndex = i === 0 ? 0 : -1;
    b.addEventListener('click', () => pick(i));
    b.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const n = (i + (e.key === 'ArrowRight' ? 1 : btns.length - 1)) % btns.length;
        pick(n); btns[n].focus();
      }
    });
  });
}

/* ---------- model panels: trigger gauges / pips ---------- */
(() => {
  const ms = $$('[data-model]');
  if (reduced || !('IntersectionObserver' in window)) { ms.forEach(m => m.classList.add('in')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .55 });
  ms.forEach(m => io.observe(m));
})();

/* ---------- hero HUD: mission clock + telemetry ticker ---------- */
(() => {
  const clock = $('#clock');
  if (clock && !reduced) {
    const t0 = Date.now();
    setInterval(() => {
      const t = Math.floor((Date.now() - t0) / 1000);
      clock.textContent = [Math.floor(t / 3600), Math.floor(t / 60) % 60, t % 60].map(n => String(n).padStart(2, '0')).join(':');
    }, 1000);
  }
  const box = $('.hud-tele'), k = $('#teleK'), v = $('#teleV');
  if (!box || reduced) return;
  const items = [['Program', 'HAVEN Concept Studio'], ['Lineup', '4 concept vehicles'], ['P1R target', '800–1,000 hp'], ['Stage', 'Concept development'], ['P1 target', '$17,990 delivered']];
  let i = 0;
  setInterval(() => {
    box.classList.add('swap');
    setTimeout(() => { i = (i + 1) % items.length; k.textContent = items[i][0]; v.textContent = items[i][1]; box.classList.remove('swap'); }, 360);
  }, 3400);
})();

/* ---------- cursor ring ---------- */
if (fine && !reduced) {
  const c = document.createElement('div');
  c.className = 'cursor'; c.setAttribute('aria-hidden', 'true');
  document.body.append(c);
  let x = -100, y = -100, tx = -100, ty = -100;
  addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; c.classList.add('vis'); }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => c.classList.remove('vis'));
  document.addEventListener('pointerover', e => c.classList.toggle('hover', !!e.target.closest('a,button,label,[data-full]')));
  (function loop() { x += (tx - x) * .2; y += (ty - y) * .2; c.style.transform = `translate(${x}px,${y}px)`; requestAnimationFrame(loop); })();
}

/* ---------- blueprint / dimensions ---------- */
(() => {
  const bp = $('#bp'), cells = $('#specCells'), tabs = $('#specTabs');
  if (!bp) return;
  const D = {
    p1: { len: 195.7, lenmm: '4,970 mm', wb: 114.2, w: 75.6, wmm: '1,921 mm', hlk: 'Cabin targets', hl: '13-inch display<br>12.3-inch cluster' },
    p1r: { len: 197.8, lenmm: '5,025 mm', wb: 115.4, w: 79.1, wmm: '2,009 mm', hlk: 'Performance targets', hl: '800–1,000 hp<br>0–60 mph ≤ 2.5 s' }
  };
  const q = k => $(`[data-k="${k}"]`, cells);
  const cur = { len: 0, wb: 0, w: 0 };
  let key = 'p1', raf = 0;
  const paint = () => {
    ['len', 'wb', 'w'].forEach(k => { q(k).textContent = cur[k].toFixed(1); });
    const L = $('#bpLen'), W = $('#bpWb'), X = $('#bpWid');
    if (L) L.textContent = cur.len.toFixed(1) + ' in';
    if (W) W.textContent = cur.wb.toFixed(1) + ' in';
    if (X) X.textContent = cur.w.toFixed(1) + ' in';
  };
  function go(k0) {
    key = k0;
    const t = D[k0], from = { ...cur }, t0 = performance.now();
    q('lenmm').textContent = t.lenmm; q('wmm').textContent = t.wmm; q('hlk').textContent = t.hlk; q('hl').innerHTML = t.hl;
    cancelAnimationFrame(raf);
    (function step(n) {
      const k = clamp((n - t0) / 1200), e = 1 - Math.pow(1 - k, 3);
      ['len', 'wb', 'w'].forEach(m => { cur[m] = from[m] + (t[m] - from[m]) * e; });
      paint();
      if (k < 1) raf = requestAnimationFrame(step);
    })(t0);
  }
  if (reduced || !('IntersectionObserver' in window)) { Object.assign(cur, { len: D.p1.len, wb: D.p1.wb, w: D.p1.w }); paint(); }
  else {
    paint();
    new IntersectionObserver((es, io) => { if (es[0].isIntersecting) { io.disconnect(); go(key); } }, { threshold: .35 }).observe(bp);
  }
  /* view switcher: uses the design-board scenes (front / side / rear / cutaway) */
  const stage = $('#bpStage'), img = $('#bpImg'), cap = $('#bpCap'), botL = $('#bpBotL');
  const NAMES = { p1: 'P1 Core', p1r: 'P1R Founder\u2019s' };
  const VN = { side: 'side elevation', front: 'front elevation', rear: 'rear elevation', section: 'cutaway' };
  const DIMS = { // wheel-centre positions and body span measured on each crop (% of image width)
    p1: { l: 17, w: 62 }, p1r: { l: 17, w: 61.5 }
  };
  let view = 'side', model = 'p1';
  function show() {
    const nm = NAMES[model];
    stage.classList.add('swap');
    setTimeout(() => {
      img.src = `assets/haven-views/${model}-${view}.webp`;
      img.alt = `HAVEN ${nm} ${VN[view]}`;
      stage.dataset.view = view;
      const d = DIMS[model];
      stage.style.setProperty('--wl', d.l + '%'); stage.style.setProperty('--ww', d.w + '%');
      botL.innerHTML = view === 'side' ? 'OVERALL LENGTH <b id="bpLen"></b>' : 'OVERALL WIDTH <b id="bpWid"></b>';
      cap.textContent = nm + ' \u00b7 ' + VN[view] + (view === 'section' ? ' \u2014 illustrative packaging, not engineering validated' : ' \u2014 concept render; dimensions are unverified targets');
      paint();
      stage.classList.remove('swap');
      stage.classList.remove('drawn'); void stage.offsetWidth; stage.classList.add('drawn');
    }, reduced ? 0 : 220);
  }
  seg($('#bpViews'), 'bpv', k => { view = k; show(); });
  stage.classList.add('drawn');
  seg(tabs, 'spec', k => { model = k; show(); if (reduced) { Object.assign(cur, { len: D[k].len, wb: D[k].wb, w: D[k].w }); q('lenmm').textContent = D[k].lenmm; q('wmm').textContent = D[k].wmm; q('hlk').textContent = D[k].hlk; q('hl').innerHTML = D[k].hl; paint(); } else go(k); });
})();

/* ---------- SUV switcher ---------- */
(() => {
  const wrap = $('#suvWrap'), tabs = $('#suvTabs');
  if (!wrap) return;
  const P = d => `assets/haven-suv/${d}/`;
  const SUV = {
    core: { dir: 'core', name: 'HAVEN Core SUV', fig: 'Fig. A — Core SUV · concept render', hero: 'exterior-hero-clean.webp', lede: 'Everyday practicality, advanced safety thinking and technology you can live with. A family-minded SUV built on the same keep-it-for-life idea.', tags: ['Family-minded concept', 'Upgrade-ready by intent', 'Concept art crop'] },
    reserve: { dir: 'reserve', name: 'HAVEN Reserve SUV', fig: 'Fig. B — Reserve SUV · concept render', hero: 'exterior-hero-clean.webp', lede: 'The flagship expression of the idea: commanding presence, richer materials and the most ambitious take on a car you keep for life.', tags: ['Flagship concept', 'Executive cabin', 'Concept art crop'] }
  };
  const files = { front: 'exterior-front.webp', side: 'exterior-side.webp', rear: 'exterior-rear.webp', cockpit: 'interior-cockpit.webp', second: 'interior-second-row.webp' };
  const labels = { front: 'front view', side: 'side profile', rear: 'rear view', cockpit: 'cockpit', second: 'second-row seating' };
  function apply(k) {
    const d = SUV[k], base = P(d.dir);
    const hero = $('#suvHero');
    hero.src = base + d.hero; hero.alt = d.name + ' concept, front three-quarter view';
    $('#suvFig').textContent = d.fig; $('#suvName').textContent = d.name; $('#suvLede').textContent = d.lede;
    $('#suvTags').innerHTML = d.tags.map(t => `<li>${t}</li>`).join('');
    const short = d.name.replace('HAVEN ', '');
    $$('[data-view],[data-cabin]', wrap).forEach(b => {
      const key = b.dataset.view || b.dataset.cabin, im = $('img', b);
      b.dataset.full = base + files[key];
      b.dataset.caption = short + ' · ' + labels[key];
      im.src = base + files[key]; im.alt = d.name + ', ' + labels[key];
    });
  }
  seg(tabs, 'suv', k => {
    if (reduced) { apply(k); return; }
    wrap.classList.add('swap');
    setTimeout(() => { apply(k); setTimeout(() => wrap.classList.remove('swap'), 80); }, 300);
  });
})();

})();
