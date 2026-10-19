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
      var here = (location.pathname.split('/').pop() || 'index.html');
      if (m && m[2] && (m[1] === here || (here === '' && m[1] === 'index.html') || (m[1] === 'index.html' && IA.page === 'home'))) hash = m[2];
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
    if ((IA.page === 'voyages' && n === 'voyages') || (IA.page === 'circuit' && n === 'voyages')) a.setAttribute('aria-current', 'page');
  });

  /* ---------- Menu mobile ---------- */
  var menu = $('#menu'), burger = $('[data-menu]');
  function closeMenu() {
    if (!menu || !menu.classList.contains('is-open')) return;
    menu.classList.remove('is-open'); menu.setAttribute('aria-hidden', 'true');
    D.body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false');
    if (lenis) lenis.start();
  }
  IA.closeMenu = closeMenu;
  if (burger) burger.addEventListener('click', function () {
    var open = !menu.classList.contains('is-open');
    if (!open) return closeMenu();
    menu.classList.add('is-open'); menu.setAttribute('aria-hidden', 'false');
    D.body.classList.add('menu-open'); burger.setAttribute('aria-expanded', 'true');
    if (lenis) lenis.stop();
    if (IA.hasGSAP && !IA.calm) gsap.from($$('nav a', menu), { yPercent: 60, opacity: 0, stagger: 0.05, duration: 0.9, delay: 0.15 });
  });
  if (menu) menu.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });

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
      el.textContent = diff === 0 ? 'de décalage avec la France en ce moment ; +1 h quand la France passe à l’heure d’hiver'
        : 'de décalage avec la France en ce moment ; aucun quand la France est à l’heure d’été';
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
    s.setProperty('--muted', rgb(mix(a.mu, b.mu, t)));
    var ang = (-70 + 140 * p) * Math.PI / 180;
    s.setProperty('--sh-x', (Math.sin(ang) * 18).toFixed(1) + 'px');
    s.setProperty('--sh-y', (8 + (1 - Math.cos(ang)) * 14).toFixed(1) + 'px');
    if (dialPath) {
      var pt = dialPath.getPointAtLength(dialLen * p);
      dialSun.setAttribute('cx', pt.x); dialSun.setAttribute('cy', pt.y);
      dialHalo.setAttribute('cx', pt.x); dialHalo.setAttribute('cy', pt.y);
      for (var k = 0; k < PHASES.length; k++) if (p < PHASES[k][0]) { if (dialLabel.textContent !== PHASES[k][1]) dialLabel.textContent = PHASES[k][1]; break; }
    }
  }
  IA.setDay = setDay;
  setDay(IA.calm ? 0.55 : 0);

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
      function loop(time) { draw(time); if (visible && !IA.calm) raf = W.requestAnimationFrame(loop); }
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
  var veil = $('.veil');
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
    e.preventDefault();
    closeMenu();
    sstore.set('ia-voile', '1');
    veil.classList.add('is-moving');
    gsap.fromTo(veil, { xPercent: -102 }, { xPercent: 0, duration: 0.65, ease: 'expo.inOut', onComplete: function () { W.location.href = href; } });
  });
  W.addEventListener('pageshow', function (e) { if (e.persisted && veil && IA.hasGSAP) { gsap.set(veil, { xPercent: -102 }); veil.classList.remove('is-moving'); sstore.del('ia-voile'); } });

  /* ---------- Démarrage ---------- */
  IA.ready = function (fn) { (IA._ready = IA._ready || []).push(fn); };
  function start() {
    initCursor(); initMagnetic(); initReveals(); initDayCycle(); initStars();
    veilOut();
    (IA._ready || []).forEach(function (fn) { try { fn(); } catch (err) { if (W.console) console.error(err); } });
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
  Promise.race([fontsReady, new Promise(function (r) { W.setTimeout(r, 1200); })]).then(function () { W.requestAnimationFrame(start); });
})();
