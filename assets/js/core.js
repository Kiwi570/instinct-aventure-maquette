/* Instinct Aventure · socle commun à toutes les pages */
(function () {
  'use strict';
  var D = document, H = D.documentElement, W = window;
  var IA = W.IA = W.IA || {};
  var $ = IA.$ = function (s, c) { return (c || D).querySelector(s); };
  var $$ = IA.$$ = function (s, c) { return Array.prototype.slice.call((c || D).querySelectorAll(s)); };
  var store = IA.store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { } }
  };
  var sstore = IA.sstore = {
    get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) { } },
    del: function (k) { try { sessionStorage.removeItem(k); } catch (e) { } }
  };

  IA.page = D.body.getAttribute('data-page');
  IA.calm = H.classList.contains('is-calm');
  IA.fine = W.matchMedia('(pointer: fine)').matches && W.matchMedia('(hover: hover)').matches;
  IA.desktop = function () { return W.innerWidth > 1100; };
  IA.hasGSAP = !!(W.gsap && W.ScrollTrigger);
  /* Mode allégé, activé quand l'appareil peine à suivre (voir gl.js) */
  IA.isLite = false;
  IA.lite = function () { if (IA.isLite) return; IA.isLite = true; H.classList.add('is-lite'); };
  IA.fmt = function (n, dec) { return Number(n).toLocaleString('fr-FR', { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0 }).replace(/ /g, ' '); };
  IA.euro = function (n) { return IA.fmt(Math.round(n)) + ' €'; };

  if (!IA.hasGSAP) {
    var intro0 = $('.intro'); if (intro0) intro0.remove();
    H.classList.remove('veil-in');
  } else {
    gsap.registerPlugin(ScrollTrigger);
    if (W.SplitText) gsap.registerPlugin(SplitText);
    if (W.Flip) gsap.registerPlugin(Flip);
    gsap.defaults({ ease: 'expo.out', duration: 1.1 });
    ScrollTrigger.config({ ignoreMobileResize: true });
  }

  /* ---------- Mode calme ---------- */
  $$('[data-calm]').forEach(function (b) {
    b.setAttribute('aria-pressed', IA.calm ? 'true' : 'false');
    b.addEventListener('click', function () {
      store.set('ia-calme', IA.calm ? '0' : '1');
      W.location.reload();
    });
  });

  /* ---------- Défilement fluide ---------- */
  var lenis = null;
  if (IA.hasGSAP && !IA.calm && W.Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.4 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  IA.lenis = lenis;
  IA.scrollTo = function (target, offset) {
    var el = typeof target === 'string' ? $(target) : target;
    if (!el) return;
    var off = offset != null ? offset : -84;
    if (lenis) lenis.scrollTo(el, { offset: off, duration: 1.5, easing: function (t) { return 1 - Math.pow(1 - t, 4); } });
    else W.scrollTo({ top: el.getBoundingClientRect().top + W.pageYOffset + off, behavior: IA.calm ? 'auto' : 'smooth' });
  };

  /* Ancres internes */
  D.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    var href = a.getAttribute('href');
    var hash = null;
    if (href.charAt(0) === '#') hash = href;
    else {
      var m = href.match(/^([\w-]+\.html)(#[\w-]+)?$/);
      // avec cleanUrls, l'adresse est « /voyages » quand le lien vaut « voyages.html »
      var norm = function (p) { return (p.split('/').pop() || 'index').replace(/\.html$/, ''); };
      if (m && m[2] && norm(m[1]) === norm(location.pathname)) hash = m[2];
    }
    if (!hash || hash.length < 2) return;
    var el = D.getElementById(hash.slice(1));
    if (!el) return;
    e.preventDefault();
    closeMenu();
    IA.scrollTo(el);
    D.dispatchEvent(new CustomEvent('ia:anchor', { detail: hash.slice(1) }));
  });

  /* ---------- En-tête ---------- */
  var hd = $('[data-hd]'), hero = $('[data-hero]');
  var lastY = W.pageYOffset, ticking = false;
  function onScroll() {
    var y = W.pageYOffset;
    var limit = hero ? hero.offsetHeight - 90 : 10;
    hd.classList.toggle('is-solid', y > limit);
    if (!D.body.classList.contains('menu-open') && !IA.calm) {
      if (y > lastY + 4 && y > 320) { hd.classList.add('is-hidden'); H.classList.add('hd-hidden'); }
      else if (y < lastY - 4 || y < 320) { hd.classList.remove('is-hidden'); H.classList.remove('hd-hidden'); }
    }
    lastY = y; ticking = false;
  }
  W.addEventListener('scroll', function () { if (!ticking) { ticking = true; W.requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  $$('[data-nav]').forEach(function (a) {
    var n = a.getAttribute('data-nav');
    if ((IA.page === 'voyages' && n === 'voyages') || (IA.page === 'circuit' && n === 'voyages') || (IA.page === 'preparer' && n === 'preparer')) a.setAttribute('aria-current', 'page');
  });

  /* ---------- Menu mobile ---------- */
  var menu = $('#menu'), burger = $('[data-menu]');
  if (menu) menu.setAttribute('data-lenis-prevent', '');
  function closeMenu(restore) {
    if (!menu || !menu.classList.contains('is-open')) return;
    menu.classList.remove('is-open'); menu.setAttribute('aria-hidden', 'true');
    D.body.classList.remove('menu-open'); H.classList.remove('verrou'); burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
    if (lenis) lenis.start();
    if (restore) burger.focus();
  }
  IA.closeMenu = closeMenu;
  if (burger) burger.addEventListener('click', function () {
    var open = !menu.classList.contains('is-open');
    if (!open) return closeMenu(true);
    menu.classList.add('is-open'); menu.setAttribute('aria-hidden', 'false');
    D.body.classList.add('menu-open'); H.classList.add('verrou'); burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Fermer le menu');
    if (lenis) lenis.stop();
    W.setTimeout(function () { var first = $('nav a', menu); if (first) first.focus({ preventScroll: true }); }, 80);
    if (IA.hasGSAP && !IA.calm) gsap.from($$('nav a', menu), { yPercent: 60, opacity: 0, stagger: 0.05, duration: 0.9, delay: 0.15 });
  });
  if (menu) menu.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });
  D.addEventListener('keydown', function (e) {
    if (!menu || !menu.classList.contains('is-open')) return;
    if (e.key === 'Escape') { e.preventDefault(); closeMenu(true); return; }
    if (e.key === 'Tab') {
      var f = [burger].concat($$('a, button', menu)).filter(function (el) { return el.offsetParent !== null || el === burger; });
      var i = f.indexOf(D.activeElement);
      if (e.shiftKey && (i <= 0)) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* ---------- Annonces pour lecteurs d'écran ---------- */
  var live = D.createElement('div');
  live.className = 'sr-only'; live.setAttribute('aria-live', 'polite'); live.setAttribute('role', 'status');
  D.body.appendChild(live);
  IA.announce = function (msg) { live.textContent = ''; W.setTimeout(function () { live.textContent = msg; }, 60); };

  /* ---------- Barre d'action mobile ---------- */
  var bar = $('[data-actionbar]');
  if (bar) {
    var heroEl = $('[data-hero]'), nightEl = $('.nuit'), barState = { pastHero: false, night: false };
    var setBar = function () { bar.classList.toggle('is-on', barState.pastHero && !barState.night && !D.body.classList.contains('menu-open')); };
    if ('IntersectionObserver' in W) {
      if (heroEl) new IntersectionObserver(function (es) { barState.pastHero = !es[0].isIntersecting; setBar(); }, { rootMargin: '-40% 0px 0px 0px' }).observe(heroEl);
      else barState.pastHero = true;
      if (nightEl) new IntersectionObserver(function (es) { barState.night = es[0].isIntersecting; setBar(); }, { rootMargin: '0px 0px -30% 0px' }).observe(nightEl);
    } else bar.classList.add('is-on');
    IA.setBar = setBar;
  }

  /* ---------- Heure de Windhoek ---------- */
  function tzOffset(tz, now) {
    var parts = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).formatToParts(now);
    var g = function (t) { return +parts.filter(function (p) { return p.type === t; })[0].value; };
    var asUTC = Date.UTC(g('year'), g('month') - 1, g('day'), g('hour') % 24, g('minute'));
    return Math.round((asUTC - now.getTime()) / 1800000) / 2;
  }
  var tFmt;
  try { tFmt = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Africa/Windhoek', hour: '2-digit', minute: '2-digit' }); } catch (e) { tFmt = null; }
  function tick() {
    if (!tFmt) return;
    var now = new Date();
    var t = tFmt.format(now).replace(':', 'h').replace(/^0/, '');
    var t2 = tFmt.format(now);
    var diff = tzOffset('Africa/Windhoek', now) - tzOffset('Europe/Paris', now);
    IA.offset = diff;
    $$('[data-clock]').forEach(function (el) { el.textContent = t2; });
    $$('[data-clock-sentence]').forEach(function (el) { el.textContent = 'Il est ' + t + ' à Windhoek'; });
    $$('[data-offset]').forEach(function (el) {
      el.textContent = diff === 0 ? 'même heure qu’à Paris en ce moment' : (Math.abs(diff) + ' h ' + (diff > 0 ? 'de plus' : 'de moins') + ' qu’à Paris');
    });
    $$('[data-offset-short]').forEach(function (el) { el.textContent = diff === 0 ? '0 h' : (diff > 0 ? '+' : '−') + Math.abs(diff) + ' h'; });
    $$('[data-offset-long]').forEach(function (el) {
      el.textContent = diff === 0 ? 'même heure qu’à Paris en ce moment, 1 h de plus quand la France passe à l’heure d’hiver'
        : Math.abs(diff) + ' h ' + (diff > 0 ? 'de plus' : 'de moins') + ' qu’à Paris en ce moment, même heure quand la France est à l’heure d’été';
    });
  }
  tick(); W.setInterval(tick, 20000);
  $$('[data-years-since]').forEach(function (el) {
    var now = new Date(), y = now.getFullYear() - 1990;
    if (now < new Date(now.getFullYear(), 2, 21)) y -= 1;
    el.textContent = y + ' ans';
  });

  /* ---------- Copier ---------- */
  D.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]');
    if (!b) return;
    var txt = b.getAttribute('data-copy');
    var done = function (ok) {
      var old = b.textContent; b.textContent = ok ? 'Copié' : 'Sélectionné';
      W.setTimeout(function () { b.textContent = old; }, 1800);
    };
    var fallback = function () {
      var t = b.parentElement.querySelector('b');
      if (t) { var r = D.createRange(); r.selectNodeContents(t); var s = W.getSelection(); s.removeAllRanges(); s.addRange(r); }
      done(false);
    };
    try { navigator.clipboard.writeText(txt).then(function () { done(true); }, fallback); } catch (err) { fallback(); }
  });

  /* ---------- Course du soleil : palette, ombres, cadran ---------- */
  var STOPS = [
    { p: 0, bg: [242, 222, 211], bg2: [234, 208, 194], ac: [196, 87, 42], mu: [110, 86, 73] },
    { p: 0.3, bg: [243, 231, 214], bg2: [234, 219, 196], ac: [196, 87, 42], mu: [106, 86, 70] },
    { p: 0.55, bg: [247, 240, 229], bg2: [238, 227, 210], ac: [196, 87, 42], mu: [104, 86, 70] },
    { p: 0.8, bg: [240, 220, 192], bg2: [230, 203, 166], ac: [184, 76, 34], mu: [96, 76, 60] },
    { p: 1, bg: [236, 205, 172], bg2: [226, 188, 148], ac: [166, 64, 28], mu: [88, 66, 52] }
  ];
  function mix(a, b, t) { return [0, 1, 2].map(function (i) { return Math.round(a[i] + (b[i] - a[i]) * t); }); }
  function rgb(c) { return 'rgb(' + c.join(',') + ')'; }
  var dial = $('.dial'), dialPath = dial && $('.dial__track', dial), dialSun = dial && $('.dial__sun', dial), dialHalo = dial && $('.dial__halo', dial), dialLabel = dial && $('.dial__label', dial);
  var dialLen = dialPath ? dialPath.getTotalLength() : 0;
  var PHASES = [[0.16, 'Aube'], [0.4, 'Matin'], [0.62, 'Midi'], [0.86, 'Après-midi'], [1.01, 'Coucher']];
  IA.day = 0;
  function setDay(p) {
    p = Math.max(0, Math.min(1, p));
    IA.day = p;
    var i = 0; while (i < STOPS.length - 2 && p > STOPS[i + 1].p) i++;
    var a = STOPS[i], b = STOPS[i + 1], t = (p - a.p) / (b.p - a.p);
    var s = H.style;
    s.setProperty('--bg', rgb(mix(a.bg, b.bg, t)));
    s.setProperty('--bg-2', rgb(mix(a.bg2, b.bg2, t)));
    s.setProperty('--accent', rgb(mix(a.ac, b.ac, t)));
    // même teinte, assombrie, pour les petits textes en accent : ≥ 5:1 sur le fond à toute heure
    s.setProperty('--accent-txt', rgb(mix(a.ac, b.ac, t).map(function (v) { return Math.round(v * 0.72); })));
    s.setProperty('--muted', rgb(mix(a.mu, b.mu, t)));
    var ang = (-70 + 140 * p) * Math.PI / 180;
    s.setProperty('--sh-x', (Math.sin(ang) * 26).toFixed(1) + 'px');
    s.setProperty('--sh-y', (10 + (1 - Math.cos(ang)) * 18).toFixed(1) + 'px');
    s.setProperty('--sun-p', (100 - p * 100).toFixed(1) + '%');
    s.setProperty('--sun-a', (-30 + 60 * p).toFixed(1) + 'deg');
    if (dialPath) {
      var pt = dialPath.getPointAtLength(dialLen * p);
      dialSun.setAttribute('cx', pt.x); dialSun.setAttribute('cy', pt.y);
      dialHalo.setAttribute('cx', pt.x); dialHalo.setAttribute('cy', pt.y);
      for (var k = 0; k < PHASES.length; k++) if (p < PHASES[k][0]) { if (dialLabel.textContent !== PHASES[k][1]) dialLabel.textContent = PHASES[k][1]; break; }
    }
  }
  IA.setDay = setDay;
  setDay(IA.calm ? 0.55 : 0);

  /* ---------- Namibie en direct : soleil de Windhoek (algorithme NOAA simplifié) ---------- */
  var WDH = { lat: -22.5609, lon: 17.0658 };
  function ymdIn(tz, d) {
    var p = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d).split('-');
    return [+p[0], +p[1] - 1, +p[2]];
  }
  function sunDay(y, m, d) {
    var rad = Math.PI / 180, doy = Math.round((Date.UTC(y, m, d) - Date.UTC(y, 0, 0)) / 864e5);
    var g = 2 * Math.PI / 365 * (doy - 1);
    var eq = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
    var dec = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
    var ha = Math.acos(Math.cos(90.833 * rad) / (Math.cos(WDH.lat * rad) * Math.cos(dec)) - Math.tan(WDH.lat * rad) * Math.tan(dec)) / rad;
    var base = Date.UTC(y, m, d);
    return { rise: new Date(base + (720 - 4 * (WDH.lon + ha) - eq) * 60000), set: new Date(base + (720 - 4 * (WDH.lon - ha) - eq) * 60000) };
  }
  IA.sun = function (now) {
    now = now || new Date();
    var t = ymdIn('Africa/Windhoek', now), today = sunDay(t[0], t[1], t[2]);
    var y = new Date(Date.UTC(t[0], t[1], t[2] - 1)), tm = new Date(Date.UTC(t[0], t[1], t[2] + 1));
    var prevSet = sunDay(y.getUTCFullYear(), y.getUTCMonth(), y.getUTCDate()).set, nextRise = sunDay(tm.getUTCFullYear(), tm.getUTCMonth(), tm.getUTCDate()).rise;
    var n = now.getTime(), r = today.rise.getTime(), st = today.set.getTime(), MIN = 60000, phase, p, night;
    if (n >= r && n <= st) { p = (n - r) / (st - r); night = false; }
    else if (n < r) { p = (n - prevSet.getTime()) / (r - prevSet.getTime()); night = true; }
    else { p = (n - st) / (nextRise.getTime() - st); night = true; }
    if (n < r - 30 * MIN || n > st + 40 * MIN) phase = 'night';
    else if (n < r + 60 * MIN) phase = 'dawn';
    else if (n > st - 75 * MIN) phase = 'golden';
    else phase = 'day';
    return { rise: today.rise, set: today.set, p: p, night: night, phase: phase };
  };
  var PHASE_TXT = { night: 'Nuit étoilée sur Windhoek', dawn: 'Le jour se lève sur Windhoek', golden: 'Lumière dorée sur Windhoek', day: 'Plein jour à Windhoek' };
  IA.sunText = function (s) { return PHASE_TXT[s.phase]; };
  var dialNow = $('[data-dial-now]');
  function liveSun() {
    if (!tFmt) return;
    var sn = IA.sun();
    IA.sunNow = sn;
    H.setAttribute('data-wdh', sn.phase);
    $$('[data-live]').forEach(function (box) {
      box.classList.toggle('is-night', sn.night);
      $('[data-live-state]', box).textContent = IA.sunText(sn);
      $('[data-live-rise]', box).textContent = tFmt.format(sn.rise);
      $('[data-live-set]', box).textContent = tFmt.format(sn.set);
      var t = Math.max(0, Math.min(1, sn.p)), u = 1 - t;
      var x = u * u * 14 + 2 * u * t * 120 + t * t * 226, yy = u * u * 86 + 2 * u * t * -26 + t * t * 86;
      $$('.live__sun, .live__halo', box).forEach(function (c) { c.setAttribute('cx', x.toFixed(1)); c.setAttribute('cy', yy.toFixed(1)); });
    });
    $$('[data-intro-live]').forEach(function (el) { el.textContent = 'En ce moment : ' + IA.sunText(sn).charAt(0).toLowerCase() + IA.sunText(sn).slice(1) + ', ' + tFmt.format(new Date()).replace(':', ' h '); });
    if (dialNow && dialPath) {
      if (sn.night) dialNow.style.display = 'none';
      else {
        var q = dialPath.getPointAtLength(dialLen * Math.max(0, Math.min(1, sn.p)));
        dialNow.style.display = ''; dialNow.setAttribute('transform', 'translate(' + q.x.toFixed(1) + ' ' + q.y.toFixed(1) + ')');
      }
    }
  }
  try { liveSun(); W.setInterval(liveSun, 60000); } catch (e) { if (W.console) console.error(e); }

  /* ---------- Curseur soleil ---------- */
  function initCursor() {
    if (!IA.fine || IA.calm || !IA.hasGSAP) return;
    var c = $('.cursor'); if (!c) return;
    H.classList.add('has-cursor');
    var dot = $('.cursor__dot', c), ring = $('.cursor__ring', c), label = $('.cursor__label', c);
    var x = -100, y = -100, rx = -100, ry = -100;
    W.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX; y = e.clientY;
      var t = e.target;
      c.classList.toggle('is-link', !!t.closest('a, button, label, summary, [data-devis], .racc'));
      c.classList.toggle('is-map', !!t.closest('[data-cursor="map"]'));
      c.classList.toggle('is-light', !!t.closest('.hero, .serene, .nuit, .menu, .lightbox, .racc') && !t.closest('.devis__panel'));
    }, { passive: true });
    D.addEventListener('pointerleave', function () { x = y = rx = ry = -100; });
    gsap.ticker.add(function () {
      rx += (x - rx) * 0.2; ry += (y - ry) * 0.2;
      dot.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
      label.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
    });
  }

  /* ---------- Boutons magnétiques et cartes inclinables ---------- */
  function initMagnetic() {
    if (!IA.fine || IA.calm || !IA.hasGSAP) return;
    $$('[data-magnetic]').forEach(function (el) {
      var s = parseFloat(el.getAttribute('data-magnetic')) || 10;
      var qx = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' }), qy = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        qx(((e.clientX - r.left) / r.width - 0.5) * 2 * s);
        qy(((e.clientY - r.top) / r.height - 0.5) * 2 * s * 0.6);
      });
      el.addEventListener('pointerleave', function () { gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.45)' }); });
    });
    $$('[data-tilt]').forEach(function (el) {
      gsap.set(el, { transformPerspective: 900 });
      var rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' }), ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' });
      var host = el.closest('a, article') || el;
      host.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 8);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 6);
      });
      host.addEventListener('pointerleave', function () { rx(0); ry(0); });
    });
  }

  /* ---------- Animations d'entrée ---------- */
  IA.splitHero = function () {
    var h = $('[data-split-now]');
    if (!h || !W.SplitText || IA.calm) return null;
    var st = SplitText.create(h, { type: 'lines,chars', mask: 'lines', linesClass: 'split-line' });
    gsap.set(st.chars, { yPercent: 115 });
    return st;
  };
  function initReveals() {
    if (!IA.hasGSAP || IA.calm) return;
    $$('[data-split]').forEach(function (el) {
      if (el.hasAttribute('data-split-now') || !W.SplitText) return;
      SplitText.create(el, {
        type: 'lines', mask: 'lines', linesClass: 'split-line', autoSplit: true,
        onSplit: function (self) {
          return gsap.from(self.lines, { yPercent: 105, duration: 1.3, stagger: 0.09, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
        }
      });
    });
    var groups = new Map();
    $$('[data-reveal]').forEach(function (el) {
      if (el.closest('[data-hero]')) return;
      var parent = el.parentElement;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(el);
    });
    groups.forEach(function (els) {
      els.forEach(function (el, i) {
        gsap.from(el, { y: 46, opacity: 0, duration: 1.3, delay: (i % 4) * 0.09, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
      });
    });
    $$('[data-parallax]').forEach(function (el) {
      var img = el.querySelector('img');
      var speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
      if (img && img.offsetHeight > el.offsetHeight + 4) {
        gsap.fromTo(img, { yPercent: function () { return -((img.offsetHeight - el.offsetHeight) / img.offsetHeight) * 100; } }, {
          yPercent: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true }
        });
      } else {
        gsap.fromTo(el, { y: function () { return speed * 260; } }, { y: function () { return -speed * 260; }, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
      }
    });
    $$('[data-count]').forEach(function (el) {
      var to = parseFloat(el.getAttribute('data-count')), dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var o = { v: 0 };
      gsap.to(o, { v: to, duration: 2.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true }, onUpdate: function () { el.textContent = IA.fmt(o.v, dec); } });
    });
    $$('[data-trust]').forEach(function (box) {
      var items = $$('.trust__item', box);
      items.forEach(function (it) { it.style.setProperty('--lit', 0); });
      ScrollTrigger.create({ trigger: box, start: 'top 85%', once: true, onEnter: function () {
        items.forEach(function (it, i) { gsap.to(it, { '--lit': 1, duration: 1.2, delay: i * 0.35, ease: 'expo.inOut' }); gsap.from(it.children, { opacity: 0, y: 14, stagger: 0.06, delay: i * 0.35 + 0.2, duration: 0.9 }); });
      } });
    });
  }

  /* ---------- Course du soleil liée au défilement ---------- */
  function initDayCycle() {
    if (!IA.hasGSAP || IA.calm) return;
    var main = $('#contenu');
    ScrollTrigger.create({ trigger: main, start: 'top top', end: 'bottom bottom', onUpdate: function (s) { setDay(s.progress); } });
    var night = $('.nuit');
    if (night && dial) ScrollTrigger.create({ trigger: night, start: 'top 55%', onToggle: function (s) { dial.classList.toggle('is-dim', s.isActive); } });
  }

  /* ---------- Ciel austral ---------- */
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function initStars() {
    $$('canvas[data-stars]').forEach(function (cv) {
      var ctx = cv.getContext('2d'); if (!ctx) return;
      var base = D.createElement('canvas'), bctx = base.getContext('2d');
      var stars = [], cross = [], w = 0, h = 0, dpr = 1, raf = 0, visible = false;
      function build() {
        w = cv.clientWidth; h = cv.clientHeight; if (!w || !h) return;
        dpr = Math.min(2, W.devicePixelRatio || 1);
        cv.width = base.width = Math.round(w * dpr); cv.height = base.height = Math.round(h * dpr);
        var r = rng(1990); stars = [];
        bctx.setTransform(dpr, 0, 0, dpr, 0, 0); bctx.clearRect(0, 0, w, h);
        for (var g = 0; g < 9; g++) {
          var t = g / 8, gx = w * (0.05 + 0.9 * t), gy = h * (0.05 + 0.55 * t) + Math.sin(t * 5) * h * 0.04;
          var rad = Math.max(w, h) * (0.16 + r() * 0.08);
          var grd = bctx.createRadialGradient(gx, gy, 0, gx, gy, rad);
          grd.addColorStop(0, 'rgba(210,200,230,0.08)'); grd.addColorStop(1, 'rgba(210,200,230,0)');
          bctx.fillStyle = grd; bctx.fillRect(0, 0, w, h);
        }
        var n = Math.min(1600, Math.round(w * h / 900));
        for (var i = 0; i < n; i++) {
          var band = i < n * 0.55, x, y;
          if (band) { var tt = r(); x = w * (0.02 + 0.96 * tt); y = h * (0.05 + 0.55 * tt) + Math.sin(tt * 5) * h * 0.04 + (r() + r() + r() - 1.5) * h * 0.09; }
          else { x = r() * w; y = r() * h; }
          var s = { x: x, y: y, r: Math.pow(r(), 3) * 1.5 + 0.25, a: 0.25 + r() * 0.65, ph: r() * 6.28, sp: 0.25 + r() * 0.7 };
          if (s.r > 1.05) stars.push(s);
          else { bctx.fillStyle = 'rgba(246,238,226,' + s.a.toFixed(2) + ')'; bctx.beginPath(); bctx.arc(s.x, s.y, s.r, 0, 6.283); bctx.fill(); }
        }
        var cx = w * 0.8, cy = h * 0.28, k = Math.min(w, h) * 0.055;
        cross = [[0, -1, 1.7], [0.06, 1, 2.1], [-0.62, -0.08, 1.8], [0.48, -0.26, 1.4], [0.24, 0.36, 1.0], [-1.75, 0.2, 1.9], [-2.55, 0.5, 2.2]].map(function (c) { return { x: cx + c[0] * k, y: cy + c[1] * k, r: c[2], ph: c[0] * 3, sp: 0.4 }; });
      }
      function draw(time) {
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
        ctx.drawImage(base, 0, 0);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        var t = (time || 0) / 1000;
        for (var i = 0; i < stars.length; i++) {
          var s = stars[i], a = s.a * (0.72 + 0.28 * Math.sin(t * s.sp + s.ph));
          ctx.fillStyle = 'rgba(255,248,236,' + a.toFixed(3) + ')'; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
        }
        for (var j = 0; j < cross.length; j++) {
          var c = cross[j], a2 = 0.85 + 0.15 * Math.sin(t * c.sp + c.ph);
          var gr = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r * 6);
          gr.addColorStop(0, 'rgba(255,246,230,' + (0.5 * a2).toFixed(3) + ')'); gr.addColorStop(1, 'rgba(255,246,230,0)');
          ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(c.x, c.y, c.r * 6, 0, 6.283); ctx.fill();
          ctx.fillStyle = 'rgba(255,250,240,' + a2.toFixed(3) + ')'; ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, 6.283); ctx.fill();
        }
      }
      var lastDraw = 0;
      function loop(time) { if (!IA.isLite || time - lastDraw > 120) { draw(time); lastDraw = time; } if (visible && !IA.calm) raf = W.requestAnimationFrame(loop); }
      build(); draw(0);
      if ('IntersectionObserver' in W) new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        W.cancelAnimationFrame(raf);
        if (visible && !IA.calm) raf = W.requestAnimationFrame(loop);
      }).observe(cv);
      var rt; W.addEventListener('resize', function () { W.clearTimeout(rt); rt = W.setTimeout(function () { build(); draw(performance.now()); }, 200); });
    });
  }

  /* ---------- Voile de sable entre les pages ---------- */
  var veil = $('.veil'), VT = 'onpagereveal' in W && W.CSS && CSS.supports('view-transition-name: a'), lastVT = null;
  IA.vt = VT;
  function veilOut() {
    if (!veil || !H.classList.contains('veil-in')) return;
    sstore.del('ia-voile');
    if (!IA.hasGSAP) { H.classList.remove('veil-in'); return; }
    gsap.set(veil, { xPercent: 0 });
    veil.classList.add('is-moving');
    H.classList.remove('veil-in');
    gsap.to(veil, { xPercent: 102, duration: 0.9, ease: 'expo.inOut', delay: 0.05, onComplete: function () { veil.classList.remove('is-moving'); gsap.set(veil, { xPercent: -102 }); } });
  }
  D.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || a.target === '_blank' || IA.calm || !IA.hasGSAP) return;
    var href = a.getAttribute('href');
    if (!/^[\w-]+\.html(#[\w-]+)?$/.test(href)) return;
    var cur = function (p) { return (p.split('/').pop() || 'index').replace(/\.html$/, ''); };
    if (cur(href.split('#')[0]) === cur(location.pathname) && href.indexOf('#') < 0) { e.preventDefault(); closeMenu(); IA.scrollTo(D.body); return; }
    if (VT) {
      /* Navigateurs récents : transition native entre pages, la photo de la carte devient le héros de la fiche */
      var slug = href.split('#')[0].replace('.html', '');
      if (lastVT) { lastVT.style.viewTransitionName = ''; lastVT = null; }
      if (W.IA_DATA && IA_DATA.fiches && IA_DATA.fiches[slug]) {
        var card = a.closest('.trip, .qres, .wcard, .envie, .rel, .depart'), im = card && card.querySelector('img');
        if (im) { im.style.viewTransitionName = 'vt-' + slug; lastVT = im; }
      }
      closeMenu();
      return;
    }
    e.preventDefault();
    closeMenu();
    sstore.set('ia-voile', '1');
    veil.classList.add('is-moving');
    gsap.fromTo(veil, { xPercent: -102 }, { xPercent: 0, duration: 0.65, ease: 'expo.inOut', onComplete: function () { W.location.href = href; } });
  });
  W.addEventListener('pageshow', function (e) { if (e.persisted) closeMenu(); if (e.persisted && lastVT) { lastVT.style.viewTransitionName = ''; lastVT = null; } if (e.persisted && veil && IA.hasGSAP) { gsap.set(veil, { xPercent: -102 }); veil.classList.remove('is-moving'); sstore.del('ia-voile'); } });

  /* ---------- Compteur à rouleaux (prix) ---------- */
  IA.odometer = function (el, str) {
    var old = el.getAttribute('data-odo') || el.textContent;
    el.setAttribute('data-odo', str);
    if (!IA.hasGSAP || IA.calm) { el.textContent = str; return; }
    var od = old.replace(/\D/g, ''), nd = str.replace(/\D/g, ''), di = 0, cols = [];
    var html = '<span class="sr-only">' + str + '</span><span class="odo" aria-hidden="true">';
    for (var i = 0; i < str.length; i++) {
      var c = str[i];
      if (/\d/.test(c)) {
        var strip = ''; for (var k = 0; k < 20; k++) strip += '<i>' + (k % 10) + '</i>';
        html += '<span class="odo__c"><span class="odo__s">' + strip + '</span></span>';
        var from = od.length === nd.length ? +od[di] : 0;
        cols.push({ from: from, to: +nd[di] }); di++;
      } else html += '<span class="odo__x">' + (c === ' ' || c === ' ' || c === ' ' ? '&nbsp;' : c) + '</span>';
    }
    el.innerHTML = html + '</span>';
    var strips = el.querySelectorAll('.odo__s'), n = strips.length;
    for (var j = 0; j < n; j++) {
      var cfg = cols[j], target = cfg.to + 10;
      gsap.fromTo(strips[j], { yPercent: -cfg.from * 5 }, { yPercent: -target * 5, duration: 1.1 + (n - j) * 0.12, ease: 'power3.inOut', delay: j * 0.04,
        onComplete: j === 0 ? function () { if (el.getAttribute('data-odo') === str) W.setTimeout(function () { if (el.getAttribute('data-odo') === str) el.textContent = str; }, 200 + n * 120); } : null });
    }
  };

  /* ---------- Safari de nuit : la lampe révèle les éléphants ---------- */
  function initSafari() {
    var box = $('[data-safari]'); if (!box) return;
    var view = $('.safari__view', box), scene = $('.safari__scene', box), eyes = $$('.safari__eyes i', box);
    var countEl = $('[data-safari-count]', box), doneEl = $('[data-safari-done]', box);
    var pairs = [], found = 0;
    for (var i = 0; i < eyes.length; i += 2) {
      pairs.push({ a: eyes[i], b: eyes[i + 1], x: (parseFloat(eyes[i].style.getPropertyValue('--x')) + parseFloat(eyes[i + 1].style.getPropertyValue('--x'))) / 200, y: parseFloat(eyes[i].style.getPropertyValue('--y')) / 100, found: false });
      var dl = (Math.random() * 5).toFixed(2) + 's'; eyes[i].style.animationDelay = dl; eyes[i + 1].style.animationDelay = dl;
    }
    var fx = 0.5, fy = 0.4, tx = 0.5, ty = 0.4, idleAt = 0, visible = false, raf = 0, t0 = performance.now();
    function size() { return { vw: view.clientWidth, vh: view.clientHeight, sw: scene.offsetWidth }; }
    function frame(now) {
      raf = 0;
      if (!visible) return;
      var z = size();
      if (now - idleAt > 2600 && !IA.calm) {
        var t = (now - t0) / 1000;
        tx = 0.5 + 0.44 * Math.sin(t * 0.33); ty = 0.36 + 0.14 * Math.sin(t * 0.71 + 1);
      }
      fx += (tx - fx) * 0.08; fy += (ty - fy) * 0.08;
      var off = Math.max(0, z.sw - z.vw) * fx;
      scene.style.transform = 'translate3d(' + (-off).toFixed(1) + 'px,0,0)';
      var lx = fx * z.sw, ly = fy * z.vh, r = Math.max(95, Math.min(165, z.vw * 0.11));
      scene.style.setProperty('--lx', lx.toFixed(1) + 'px'); scene.style.setProperty('--ly', ly.toFixed(1) + 'px'); scene.style.setProperty('--r', r.toFixed(0) + 'px');
      pairs.forEach(function (p) {
        var dx = p.x * z.sw - lx, dy = p.y * z.vh - ly, lit = Math.sqrt(dx * dx + dy * dy) < r * 0.62;
        p.a.classList.toggle('is-lit', lit); p.b.classList.toggle('is-lit', lit);
        if (lit && !p.found && now - idleAt <= 2600) {
          p.found = true; found++;
          countEl.textContent = found;
          if (IA.hasGSAP && !IA.calm) gsap.fromTo(countEl, { scale: 1.8 }, { scale: 1, duration: 0.6, ease: 'back.out(3)' });
          if (found === pairs.length) { doneEl.textContent = 'Bravo, toute la famille est là. Ce soir, on dort sous la Croix du Sud.'; box.classList.add('is-done'); }
        }
      });
      raf = requestAnimationFrame(frame);
    }
    function kick() { if (!raf && visible) raf = requestAnimationFrame(frame); }
    view.addEventListener('pointermove', function (e) {
      var rc = view.getBoundingClientRect();
      tx = Math.max(0, Math.min(1, (e.clientX - rc.left) / rc.width));
      ty = Math.max(0.05, Math.min(0.95, (e.clientY - rc.top) / rc.height));
      idleAt = performance.now(); kick();
    });
    view.addEventListener('pointerdown', function (e) { idleAt = performance.now(); var rc = view.getBoundingClientRect(); tx = (e.clientX - rc.left) / rc.width; ty = (e.clientY - rc.top) / rc.height; kick(); });
    idleAt = -1e9;
    if ('IntersectionObserver' in W) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; kick(); }).observe(view);
    else { visible = true; kick(); }
  }

  /* ---------- Démarrage ---------- */
  var started = false;
  function runReady(fn) { try { fn(); } catch (err) { if (W.console) console.error(err); } }
  IA.ready = function (fn) { if (started) runReady(fn); else (IA._ready = IA._ready || []).push(fn); };
  function start() {
    started = true;
    initCursor(); initMagnetic(); initReveals(); initDayCycle(); initStars(); initSafari();
    veilOut();
    (IA._ready || []).forEach(runReady);
    if (IA.hasGSAP) {
      W.addEventListener('load', function () { ScrollTrigger.refresh(); });
      W.setTimeout(function () { ScrollTrigger.refresh(); }, 1200);
    }
    if (location.hash && location.hash.length > 1) {
      var target = D.getElementById(location.hash.slice(1));
      if (target) W.setTimeout(function () { IA.scrollTo(target); }, IA.page === 'home' ? 600 : 350);
    }
  }
  var fontsReady = D.fonts && D.fonts.ready ? D.fonts.ready : Promise.resolve();
  var domReady = new Promise(function (r) { if (D.readyState !== 'loading') r(); else D.addEventListener('DOMContentLoaded', r); });
  Promise.all([domReady, Promise.race([fontsReady, new Promise(function (r) { W.setTimeout(r, 1200); })])]).then(function () { W.requestAnimationFrame(start); });
})();
