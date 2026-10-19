/* Fiche « De l'océan au Caprivi » : bascule autotour / guidé, jour par jour sur la carte, galerie */
(function () {
  'use strict';
  var IA = window.IA, $ = IA.$, $$ = IA.$$, W = window, DATA = window.IA_DATA;
  var C = {};
  DATA.circuits.forEach(function (c) { C[c.id] = c; });
  var MODES = {
    autotour: {
      c: C['ocean-caprivi'], label: 'autotour', driver: 'Vous conduisez', tour: 'De l’océan au Caprivi', formule: 'Autotour',
      months: [3, 4, 5, 6, 7, 8, 9], monthsLabel: 'd’avril à fin octobre 2027, dates libres',
      incl: ['L’organisation du séjour', 'La location du 4x4 équipé et son assurance', 'La prise en charge à l’aéroport', 'Le road book détaillé', 'Les réservations des hébergements et campings', 'La sortie en bateau à Walvis Bay', 'L’assistance téléphonique via WhatsApp', 'Nos conseils sur place']
    },
    guide: {
      c: C['ocean-caprivi-guide'], label: 'séjour guidé', driver: 'Votre chauffeur-guide conduit', tour: 'De l’océan au Caprivi guidé', formule: 'Séjour guidé',
      months: [2, 3, 4, 5, 6, 7, 8, 9, 10], monthsLabel: 'de mars à novembre, dates libres',
      incl: ['L’organisation du séjour', 'Le véhicule équipé et son assurance', 'Le chauffeur-guide du premier au dernier jour', 'La prise en charge à l’aéroport', 'Les réservations des hébergements et campings', 'La sortie en bateau à Walvis Bay', 'L’assistance disponible tout au long du voyage', 'Nos conseils sur place']
    }
  };
  var main = $('[data-circuit]'), mode = 'autotour', priceVal = MODES.autotour.c.prix;

  function setMode(m, animate) {
    if (!MODES[m]) return;
    var prev = mode; mode = m;
    var M = MODES[m];
    main.setAttribute('data-mode', m);
    $$('[data-mode-switch]').forEach(function (s) {
      s.setAttribute('data-mode', m);
      $$('[data-set-mode]', s).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-set-mode') === m ? 'true' : 'false'); });
    });
    var to = M.c.prix;
    if (animate && IA.hasGSAP && !IA.calm) {
      var o = { v: priceVal };
      gsap.to(o, { v: to, duration: 1.1, ease: 'expo.out', onUpdate: function () { $$('[data-price]').forEach(function (el) { el.textContent = IA.euro(o.v); }); } });
    } else $$('[data-price]').forEach(function (el) { el.textContent = IA.euro(to); });
    priceVal = to;
    $$('[data-periode]').forEach(function (el) { el.textContent = M.c.periode; });
    $$('[data-driver]').forEach(function (el) { el.textContent = M.driver; });
    $$('[data-mode-label]').forEach(function (el) { el.textContent = M.label; });
    $$('[data-text-a]').forEach(function (el) { el.hidden = m !== 'autotour'; });
    $$('[data-text-g]').forEach(function (el) { el.hidden = m !== 'guide'; });
    $$('p[data-a]').forEach(function (el) { el.textContent = el.getAttribute(m === 'guide' ? 'data-g' : 'data-a'); });
    $$('[data-devis-tour]').forEach(function (b) { b.setAttribute('data-devis-tour', M.tour); b.setAttribute('data-devis-formule', M.formule); });
    var cells = $$('[data-months] i');
    cells.forEach(function (c, i) { c.classList.toggle('on2', M.months.indexOf(i) >= 0); });
    var ml = $('[data-months-label]'); if (ml) ml.textContent = M.monthsLabel;
    var g = $('[data-guide-note]'); if (g) g.hidden = m !== 'guide';
    var ul = $('[data-incl]');
    if (ul) {
      var old = prev !== m && animate ? MODES[prev].incl : M.incl;
      ul.innerHTML = M.incl.map(function (t) {
        return '<li' + (old.indexOf(t) < 0 ? ' class="is-new"' : '') + '><svg aria-hidden="true"><use href="#i-check"/></svg>' + t + '</li>';
      }).join('');
    }
    try { history.replaceState(null, '', m === 'guide' ? '#guide' : location.pathname + location.search); } catch (e) { }
    if (animate && IA.hasGSAP && !IA.calm) {
      gsap.fromTo($$('[data-driver], [data-periode]'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 });
      $$('[data-mode-switch] [aria-pressed="true"] svg').forEach(function (s) { gsap.fromTo(s, { rotation: -120 }, { rotation: 0, duration: 0.9, ease: 'back.out(1.8)' }); });
    }
  }

  function heroIn() {
    var heroBox = $('[data-gl]');
    var gl = IA.initGL(heroBox, { reveal: IA.calm ? 1 : 0.3, pos: '0.5 0.5' });
    if (!IA.hasGSAP || IA.calm) return;
    var split = IA.splitHero();
    var tl = gsap.timeline({ delay: 0.25 });
    if (split) tl.to(split.chars, { yPercent: 0, duration: 1.2, stagger: 0.022, ease: 'expo.out' }, 0);
    tl.from($$('[data-hero] [data-reveal]'), { y: 26, opacity: 0, stagger: 0.07, duration: 1.1 }, 0.15);
    var img = heroBox && heroBox.querySelector('img');
    if (img) tl.from(img, { scale: 1.12, duration: 2.4, ease: 'expo.out' }, 0);
    if (gl) tl.to(gl.uniforms.uReveal, { value: 1, duration: 1.8, ease: 'power2.out' }, 0);
  }

  /* ---- Jour par jour ---- */
  function initDays() {
    var box = $('[data-map="days"]'); if (!box || !IA.NamMap) return;
    var map = new IA.NamMap(box, { slice: true });
    var days = DATA.oceanCaprivi;
    var ids = ['windhoek'];
    days.forEach(function (d) { if (d.via) ids.push(d.via); ids.push(d.stop); });
    var route = map.addRoute(ids, { ghost: true });
    map.addStops(route.ids, { labels: ['windhoek'], left: ['otjiwarongo', 'grootfontein'], right: ['divundu'], above: ['divundu', 'uis'], below: ['mahango', 'walvisbay'] });
    var dayIdx = [], k = 0;
    days.forEach(function (d) { var i = route.indexOf(d.stop, k); if (i < 0) i = k; dayIdx.push(i); k = i; });
    var hudDay = $('[data-hud-day]'), hudNight = $('[data-hud-night]');
    var items = $$('.day');
    var prog = { L: 0 }, cur = -1;
    function go(i) {
      if (i === cur) return; cur = i;
      items.forEach(function (it, j) { it.classList.toggle('is-on', j === i); });
      var d = days[i];
      hudDay.textContent = 'Jour ' + d.j + ' / ' + days.length;
      hudNight.textContent = d.nuit;
      map.setStops(route.ids.slice(0, dayIdx[i] + 1), d.stop);
      var L = route.lengthAt(dayIdx[i]);
      if (IA.hasGSAP && !IA.calm) {
        gsap.to(prog, { L: L, duration: 1.3, ease: 'power2.inOut', overwrite: true, onUpdate: function () { route.set(prog.L); } });
        if (d.j === days.length) map.reset(1.6); else map.zoomTo(d.stop, 1.9, 1.5);
      } else { route.set(L); }
    }
    if (!IA.hasGSAP || IA.calm) { route.set(route.total); map.setStops(route.ids, 'windhoek'); items.forEach(function (it) { it.classList.add('is-on'); }); return; }
    items.forEach(function (it, i) {
      ScrollTrigger.create({ trigger: it, start: 'top 62%', end: 'bottom 62%', onToggle: function (s) { if (s.isActive) go(i); } });
    });
    ScrollTrigger.create({ trigger: items[0], start: 'top 95%', once: true, onEnter: function () { go(0); } });
  }

  /* ---- Galerie et visionneuse ---- */
  function initGallery() {
    var btns = $$('[data-full]'), lb = $('[data-lightbox]'); if (!lb || !btns.length) return;
    var img = $('[data-lb-img]', lb), cap = $('[data-lb-cap]', lb), idx = 0, last = null;
    function show(i) {
      idx = (i + btns.length) % btns.length;
      var b = btns[idx], name = b.getAttribute('data-full');
      img.src = 'assets/img/' + name + '-1920.webp';
      img.alt = b.querySelector('img').alt;
      cap.textContent = b.querySelector('span').textContent + ' · ' + (idx + 1) + ' / ' + btns.length;
    }
    function open(i) { last = document.activeElement; show(i); lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); if (IA.lenis) IA.lenis.stop(); $('[data-lb-close]', lb).focus(); }
    function close() { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); if (IA.lenis) IA.lenis.start(); if (last) last.focus(); }
    btns.forEach(function (b, i) { b.addEventListener('click', function () { open(i); }); });
    $$('[data-lb]', lb).forEach(function (b) { b.addEventListener('click', function () { show(idx + (+b.getAttribute('data-lb'))); }); });
    $('[data-lb-close]', lb).addEventListener('click', close);
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target === img) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') show(idx + 1); else if (e.key === 'ArrowLeft') show(idx - 1);
    });
  }

  /* ---- Régions en accordéon ---- */
  function initAcc() {
    var acc = $('[data-acc]'); if (!acc) return;
    var items = $$('.racc', acc);
    function open(it) { items.forEach(function (x) { x.classList.toggle('is-open', x === it); x.setAttribute('aria-expanded', x === it ? 'true' : 'false'); }); }
    items.forEach(function (it) {
      it.addEventListener('click', function () { open(it); });
      if (IA.fine) it.addEventListener('pointerenter', function () { open(it); });
    });
  }

  function initDetails() {
    if (!IA.hasGSAP || IA.calm) return;
    var kits = $$('[data-kit] .kit');
    if (kits.length) gsap.from(kits, { scale: 0.4, opacity: 0, y: 20, stagger: 0.18, duration: 0.8, ease: 'back.out(2)', scrollTrigger: { trigger: '[data-kit]', start: 'top 70%', once: true } });
    $$('[data-gauges] .gauge__bar i').forEach(function (b, i) {
      gsap.from(b, { scaleX: 0, duration: 1.6, delay: i * 0.2, ease: 'expo.out', scrollTrigger: { trigger: b, start: 'top 90%', once: true } });
    });
    var links = $$('[data-subnav] nav a');
    links.forEach(function (a) {
      var sec = document.getElementById(a.getAttribute('href').slice(1)); if (!sec) return;
      ScrollTrigger.create({ trigger: sec, start: 'top 45%', end: 'bottom 45%', onToggle: function (s) { if (s.isActive) links.forEach(function (l) { l.classList.toggle('is-on', l === a); }); } });
    });
  }

  $$('[data-set-mode]').forEach(function (b) { b.addEventListener('click', function () { setMode(b.getAttribute('data-set-mode'), true); }); });
  setMode(location.hash === '#guide' ? 'guide' : 'autotour', false);

  IA.ready(function () { heroIn(); initDays(); initGallery(); initAcc(); initDetails(); });
})();
