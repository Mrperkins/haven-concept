(() => {
'use strict';
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(pointer: fine)').matches;

/* ---------- intro ---------- */
requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('loaded')));

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
      canvas.width = src.naturalWidth; canvas.height = src.naturalHeight;
      ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(src, 0, 0);
      base = ctx.getImageData(0, 0, canvas.width, canvas.height);
      build(base.data, canvas.width, canvas.height);
      ready = true; car.classList.add('hide'); paint();
    } catch (e) { canvas.hidden = true; car.classList.remove('hide'); }
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
  $$('.card').forEach(c => c.addEventListener('click', () => {
    last = document.activeElement;
    img.src = c.dataset.full; img.alt = $('img', c).alt; cap.textContent = c.dataset.caption;
    box.classList.add('open'); box.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; close.focus();
  }));
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
})();
