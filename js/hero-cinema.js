/* HAVEN / Hero Cinema Controller v1
   Independent of the existing site.js; never alters the vehicle configurator. */
(() => {
  'use strict';
  const hero = document.querySelector('#top');
  const video = document.querySelector('#heroFilm');
  const toggle = document.querySelector('#heroMotionToggle');
  const label = document.querySelector('#heroMotionLabel');
  if (!hero || !video || !toggle || !label) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const saveData = navigator.connection && navigator.connection.saveData;
  let optedOut = false;
  let visible = true;
  let ready = false;

  function showControl(playing) {
    toggle.hidden = false;
    toggle.setAttribute('aria-pressed', String(playing));
    toggle.setAttribute('aria-label', playing ? 'Pause background motion' : 'Play background motion');
    label.textContent = playing ? 'Pause motion' : 'Play motion';
  }
  function stop() {
    video.pause();
    hero.classList.remove('film-ready');
    if (ready) showControl(false);
  }
  async function start() {
    if (reduce.matches || saveData || optedOut || !visible || document.hidden) return;
    try {
      video.muted = true;
      await video.play();
      if (!video.paused) {
        hero.classList.add('film-ready');
        showControl(true);
      }
    } catch (_) {
      // Restricted autoplay: keep the original poster visible.
      hero.classList.remove('film-ready');
      if (ready) showControl(false);
    }
  }
  video.addEventListener('loadeddata', () => {
    ready = true;
    if (reduce.matches || saveData) return;
    start();
  });
  video.addEventListener('error', () => {
    ready = false;
    toggle.hidden = true;
    hero.classList.remove('film-ready');
  });
  toggle.addEventListener('click', () => {
    if (!video.paused && hero.classList.contains('film-ready')) {
      optedOut = true;
      hero.classList.add('motion-paused');
      stop();
    } else {
      optedOut = false;
      hero.classList.remove('motion-paused');
      start();
    }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      video.pause();
    } else if (!optedOut) {
      start();
    }
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = Boolean(entry && entry.isIntersecting);
      if (!visible) video.pause();
      else if (!optedOut) start();
    }, {threshold:0.08}).observe(hero);
  }
  if (reduce.addEventListener) reduce.addEventListener('change', () => {
    if (reduce.matches) {
      stop();
      toggle.hidden = true;
    } else if (!optedOut) start();
  });
  if (reduce.matches || saveData) { video.removeAttribute('autoplay'); video.pause(); return; }
  // Poster-first: actual film only reveals after a successful playback event.
  if (video.readyState >= 2) {ready=true;start();}
})();

/* Explicit, native playback on iOS: no reliance on background autoplay. */
(() => {
  'use strict';
  const button = document.getElementById('heroWatch');
  const layer = document.getElementById('heroFilmDialog');
  const close = document.getElementById('heroFilmClose');
  const film = document.getElementById('heroFilmFull');
  const bgFilm = document.getElementById('heroFilm');
  if (!button || !layer || !close || !film) return;
  let previousFocus = null;
  let bgWasPlaying = false;

  const closeFilm = () => {
    if (layer.hidden) return;
    film.pause();
    layer.hidden = true;
    document.body.classList.remove('film-dialog-open');
    if (bgWasPlaying && bgFilm && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      bgFilm.play().catch(() => {});
    }
    if (previousFocus && previousFocus.isConnected) previousFocus.focus();
  };
  button.addEventListener('click', () => {
    previousFocus = document.activeElement;
    bgWasPlaying = Boolean(bgFilm && !bgFilm.paused);
    if (bgFilm) bgFilm.pause();
    layer.hidden = false;
    document.body.classList.add('film-dialog-open');
    close.focus();
    if (!film.getAttribute('src')) {
      film.src = 'assets/haven-hero-motion.mp4';
      film.load();
    }
    film.currentTime = 0;
    film.muted = true;
    const playing = film.play();
    if (playing && playing.catch) playing.catch(() => {
      // Native controls remain available if Safari requires another gesture.
      film.controls = true;
    });
  });
  close.addEventListener('click', closeFilm);
  layer.addEventListener('click', (event) => { if (event.target === layer) closeFilm(); });
  document.addEventListener('keydown', (event) => {
    if (layer.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); closeFilm(); }
    if (event.key === 'Tab') {
      const focusable = [close,film].filter(el=>!el.disabled);
      const at = focusable.indexOf(document.activeElement);
      if (event.shiftKey && at === 0) {event.preventDefault();film.focus();}
      if (!event.shiftKey && at === focusable.length - 1) {event.preventDefault();close.focus();}
    }
  });
})();
