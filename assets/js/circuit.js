/* Fiches circuits : bascule de formule, jour par jour sur la carte, galerie, régions.
   Une seule logique pour toutes les fiches : les données viennent de IA_DATA.fiches. */
(function () {
  'use strict';
  var IA = window.IA, $ = IA.$, $$ = IA.$$, W = window, DATA = window.IA_DATA;
  var main = $('[data-circuit]'); if (!main) return;
  var slug = main.getAttribute('data-fiche'), F = DATA.fiches[slug]; if (!F) return;
  var C = {}; DATA.circuits.forEach(function (c) { C[c.id] = c; });
  var MODES = Object.keys(F.modes);
  var LABEL = { autotour: 'autotour', guide: 'séjour guidé', confirme: 'départ confirmé' };
  var FORMULE = { autotour: 'Autotour', guide: 'Séjour guidé', confirme: 'Séjour guidé' };
  var mode = MODES[0], priceVal = C[F.modes[mode]].prix;
  function circ(m) { return C[F.modes[m || mode]]; }
  function pick(v, m) { return (v && !Array.isArray(v) && typeof v === 'object') ? v[m] : v; }
  IA.fiche = { slug: slug, data: F, circuit: function () { return circ(); }, mode: function () { return mode; } };

  function setPrice(to, animate) {
    var els = $$('[data-price]');
    if (animate && IA.hasGSAP && !IA.calm) {
      if (IA.odometer) { els.forEach(function (el) { IA.odometer(el, IA.euro(to)); }); }
      else {
        var o = { v: priceVal };
        gsap.to(o, { v: to, duration: 1.1, ease: 'expo.out', onUpdate: function () { els.forEach(function (el) { el.textContent = IA.euro(o.v); }); } });
      }
    } else els.forEach(function (el) { el.textContent = IA.euro(to); });
    priceVal = to;
  }

  function setMode(m, animate) {
    if (MODES.indexOf(m) < 0) return;
    var prev = mode; mode = m;
    var c = circ(m);
    main.setAttribute('data-mode', m);
    $$('[data-mode-switch]').forEach(function (s) {
      s.setAttribute('data-mode', m);
      $$('[data-set-mode]', s).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-set-mode') === m ? 'true' : 'false'); });
    });
    setPrice(c.prix, animate && prev !== m);
    $$('[data-periode]').forEach(function (el) { el.textContent = c.periode || 'nous consulter'; });
    $$('[data-driver]').forEach(function (el) { el.textContent = pick(F.driver, m); });
    $$('[data-mode-label]').forEach(function (el) { el.textContent = LABEL[m]; });
    $$('[data-mode-text]').forEach(function (el) { el.hidden = el.getAttribute('data-mode-text') !== m; });
    $$('p[data-a]').forEach(function (el) { el.textContent = el.getAttribute(m === 'guide' ? 'data-g' : 'data-a'); });
    $$('[data-devis-tour]').forEach(function (b) {
      b.setAttribute('data-devis-tour', c.name);
      b.setAttribute('data-devis-formule', FORMULE[m]);
      if (c.periode && c.formule !== 'confirme') b.setAttribute('data-devis-periode', 'Dates libres'); else b.removeAttribute('data-devis-periode');
    });
    $$('[data-fav]').forEach(function (b) { if (MODES.length > 1) { b.setAttribute('data-fav', c.id); if (IA.favSync) IA.favSync(); } });
    if (F.season) {
      $$('[data-months] i').forEach(function (cell, i) { cell.classList.toggle('on2', (F.season[m] || []).indexOf(i) >= 0); });
      var ml = $('[data-months-label]'); if (ml) ml.textContent = (c.periode || '').toLowerCase();
    }
    var g = $('[data-guide-note]'); if (g) g.hidden = m !== 'guide';
    var ul = $('[data-incl]');
    if (ul && Array.isArray(F.incl) === false) {
      var old = pick(F.incl, prev), now = pick(F.incl, m);
      ul.innerHTML = now.map(function (t) {
        return '<li' + (animate && old.indexOf(t) < 0 ? ' class="is-new"' : '') + '><svg aria-hidden="true"><use href="#i-check"/></svg>' + t + '</li>';
      }).join('');
    }
    if (MODES.length > 1) { try { history.replaceState(history.state, '', m === MODES[0] ? location.pathname + location.search : '#' + m); } catch (e) { } }
    if (animate && IA.hasGSAP && !IA.calm && prev !== m) {
      gsap.fromTo($$('[data-driver], [data-periode]'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 });
      $$('[data-mode-switch] [aria-pressed="true"] svg').forEach(function (s) { gsap.fromTo(s, { rotation: -120 }, { rotation: 0, duration: 0.9, ease: 'back.out(1.8)' }); });
      IA.announce && IA.announce('Formule ' + LABEL[m] + ' : ' + IA.euro(c.prix) + ' par personne.');
    }
  }

  function countdown() {
    $$('[data-countdown]').forEach(function (el) {
      var p = el.getAttribute('data-date').split('-').map(Number), approx = p.length < 3;
      var d = new Date(p[0], p[1] - 1, approx ? 1 : p[2]), t = new Date(); t.setHours(0, 0, 0, 0);
      var days = Math.round((d - t) / 86400000);
      el.textContent = days < 0 ? 'départ passé' : approx ? 'dans environ ' + Math.max(1, Math.round(days / 30.4)) + ' mois' : 'dans ' + days + ' jours';
    });
  }

  function heroIn() {
    var heroBox = $('[data-gl]');
    var gl = IA.initGL(heroBox, { reveal: IA.calm ? 1 : 0.3, pos: heroBox.getAttribute('data-gl-pos') || '0.5 0.5' });
    IA.heroGL = gl;
    if (!IA.hasGSAP || IA.calm) return;
    var split = IA.splitHero();
    var tl = gsap.timeline({ delay: IA.viewTransition ? 0.05 : 0.25 });
    if (split) tl.to(split.chars, { yPercent: 0, duration: 1.2, stagger: 0.022, ease: 'expo.out' }, 0);
    tl.from($$('[data-hero] [data-reveal]'), { y: 26, opacity: 0, stagger: 0.07, duration: 1.1 }, 0.15);
    var st = $('.stamp--hero');
    if (st) tl.fromTo(st, { scale: 2.2, opacity: 0, rotation: -24 }, { scale: 1, opacity: 1, rotation: -9, duration: 0.7, ease: 'back.out(2.2)' }, 0.9);
    var img = heroBox && heroBox.querySelector('img');
    if (img && !IA.viewTransition) tl.from(img, { scale: 1.12, duration: 2.4, ease: 'expo.out' }, 0);
    if (gl) tl.to(gl.uniforms.uReveal, { value: 1, duration: 1.8, ease: 'power2.out' }, 0);
  }

  /* ---- Jour par jour ---- */
  function routeOf(days) {
    var ids = ['windhoek'], idx = [];
    days.forEach(function (d) {
      if (d.via) ids.push(d.via);
      ids.push(d.stop); idx.push(ids.length - 1);
      (d.after || []).forEach(function (a) { ids.push(a); });
    });
    return { ids: ids, idx: idx };
  }
  IA.routeOf = routeOf;

  function initDays() {
    var box = $('[data-map="days"]'); if (!box || !IA.NamMap) return;
    var map = new IA.NamMap(box, { slice: true });
    var days = F.days, r = routeOf(days);
    // indices des étapes une fois les doublons consécutifs retirés
    var clean = [], map2 = [];
    r.ids.forEach(function (id, i) { if (!clean.length || clean[clean.length - 1] !== id) clean.push(id); map2[i] = clean.length - 1; });
    var dayIdx = r.idx.map(function (i) { return map2[i]; });
    var route = map.addRoute(clean, { ghost: true });
    if (IA.hasGSAP && !IA.calm) map.car(route);
    map.addStops(route.ids, { labels: ['windhoek'], left: ['otjiwarongo', 'grootfontein', 'kalahari', 'gobabis'], right: ['divundu'], above: ['divundu', 'uis', 'solitaire', 'okatare'], below: ['mahango', 'walvisbay', 'sossusvlei', 'onguma', 'ccf'] });
    IA.daysMap = { map: map, route: route, dayIdx: dayIdx };
    var hudDay = $('[data-hud-day]'), hudNight = $('[data-hud-night]'), hudKm = $('[data-hud-km]');
    var items = $$('.day');
    var prog = { L: 0, km: 0 }, cur = -1, total = days[days.length - 1].j2 || days[days.length - 1].j;
    var kmAt = []; var acc = 0; days.forEach(function (d) { acc += d.km || 0; kmAt.push(acc); });
    function go(i) {
      if (i === cur) return; cur = i;
      items.forEach(function (it, j) { it.classList.toggle('is-on', j === i); });
      var d = days[i];
      hudDay.textContent = 'Jour ' + d.j + (d.j2 ? '–' + d.j2 : '') + ' / ' + total;
      hudNight.textContent = d.nuit;
      map.setStops(route.ids.slice(0, dayIdx[i] + 1), d.stop);
      var L = route.lengthAt(dayIdx[i]);
      if (IA.hasGSAP && !IA.calm) {
        map.fauna(null);
        gsap.to(prog, { L: L, km: kmAt[i], duration: 1.3, ease: 'power2.inOut', overwrite: true, onComplete: function () { map.fauna(d.stop); }, onUpdate: function () {
          route.set(prog.L);
          if (hudKm) hudKm.textContent = '≈ ' + IA.fmt(prog.km) + ' km';
          if (IA.onRouteProgress) IA.onRouteProgress(map, route, prog.L);
        } });
        if (i === days.length - 1) map.reset(1.6); else map.zoomTo(d.stop, 1.9, 1.5);
      } else { route.set(L); if (hudKm) hudKm.textContent = '≈ ' + IA.fmt(kmAt[i]) + ' km'; }
      D.dispatchEvent(new CustomEvent('ia:day', { detail: { index: i, stop: d.stop } }));
    }
    var D = document;
    if (!IA.hasGSAP || IA.calm) {
      route.set(route.total); map.setStops(route.ids, 'windhoek');
      items.forEach(function (it) { it.classList.add('is-on'); });
      if (hudKm) hudKm.textContent = '≈ ' + IA.fmt(acc) + ' km';
      return;
    }
    items.forEach(function (it, i) {
      ScrollTrigger.create({ trigger: it, start: 'top 62%', end: 'bottom 62%', onToggle: function (s) { if (s.isActive) go(i); } });
    });
    ScrollTrigger.create({ trigger: items[0], start: 'top 95%', once: true, onEnter: function () { if (cur < 0) go(0); } });
  }

  /* ---- Galerie et visionneuse ---- */
  function initGallery() {
    var btns = $$('[data-full]'), lb = $('[data-lightbox]'); if (!lb || !btns.length) return;
    var view = $('[data-lb-view]', lb), track = $('[data-lb-track]', lb), cap = $('[data-lb-cap]', lb), idx = 0, last = null, w = 0, drag = null;
    var W = window, G = W.gsap;
    track.innerHTML = btns.map(function (b) {
      return '<figure class="lb__slide"><img alt="' + b.querySelector('img').alt.replace(/"/g, '&quot;') + '" data-src="assets/img/' + b.getAttribute('data-full') + '-1920.webp" draggable="false"></figure>';
    }).join('');
    var slides = $$('.lb__slide', track);
    function load(i) { var im = slides[i] && slides[i].querySelector('img'); if (im && !im.src) im.src = im.getAttribute('data-src'); }
    function caption() { cap.textContent = btns[idx].querySelector('span').textContent + ' · ' + (idx + 1) + ' / ' + btns.length; load(idx); load(idx + 1); load(idx - 1); }
    function measure() { w = view.clientWidth; if (drag) { drag.applyBounds({ minX: -(slides.length - 1) * w, maxX: 0 }); } if (G) G.set(track, { x: -idx * w }); else track.style.transform = 'translateX(' + (-idx * w) + 'px)'; }
    function show(i, instant) {
      idx = Math.max(0, Math.min(slides.length - 1, i));
      caption();
      if (G && !IA.calm && !instant) G.to(track, { x: -idx * w, duration: 0.8, ease: 'expo.out', overwrite: true });
      else if (G) G.set(track, { x: -idx * w }); else track.style.transform = 'translateX(' + (-idx * w) + 'px)';
    }
    function step(d) { var n = idx + d; if (n < 0) n = slides.length - 1; if (n > slides.length - 1) n = 0; show(n); }
    function open(i) {
      last = document.activeElement; lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false');
      measure(); show(i, true);
      if (IA.lenis) IA.lenis.stop(); $('[data-lb-close]', lb).focus();
    }
    function close() { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); if (IA.lenis) IA.lenis.start(); if (last) last.focus(); }
    btns.forEach(function (b, i) { b.addEventListener('click', function () { open(i); }); });
    $$('[data-lb]', lb).forEach(function (b) { b.addEventListener('click', function () { step(+b.getAttribute('data-lb')); }); });
    $('[data-lb-close]', lb).addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') step(1); else if (e.key === 'ArrowLeft') step(-1);
    });
    W.addEventListener('resize', function () { if (lb.classList.contains('is-open')) measure(); });
    if (W.Draggable && G) {
      G.registerPlugin(Draggable); if (W.InertiaPlugin) G.registerPlugin(InertiaPlugin);
      drag = Draggable.create(track, {
        type: 'x', inertia: !!W.InertiaPlugin && !IA.calm, edgeResistance: 0.85, dragResistance: 0, cursor: 'grab', activeCursor: 'grabbing', zIndexBoost: false,
        bounds: { minX: -(slides.length - 1) * 1000, maxX: 0 },
        snap: function (v) { return Math.round(v / w) * w; },
        onDragEnd: function () { if (!W.InertiaPlugin || IA.calm) { var dx = this.x - (-idx * w); show(idx + (Math.abs(dx) > w * 0.15 ? (dx < 0 ? 1 : -1) : 0)); } },
        onThrowComplete: function () { idx = Math.round(-this.x / w); caption(); },
        onClick: function (e) { if (e.target === this.target || e.target.classList.contains('lb__slide')) close(); }
      })[0];
    } else {
      var sx = 0;
      lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
      lb.addEventListener('touchend', function (e) { var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); }, { passive: true });
      view.addEventListener('click', function (e) { if (e.target.classList.contains('lb__slide')) close(); });
    }
  }

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
    $$('.bignum b').forEach(function (b, i) {
      gsap.from(b, { yPercent: 60, opacity: 0, duration: 1.1, delay: i * 0.12, ease: 'expo.out', scrollTrigger: { trigger: b, start: 'top 90%', once: true } });
    });
    var links = $$('[data-subnav] nav a');
    links.forEach(function (a) {
      var sec = document.getElementById(a.getAttribute('href').slice(1)); if (!sec) return;
      ScrollTrigger.create({ trigger: sec, start: 'top 45%', end: 'bottom 45%', onToggle: function (s) { if (s.isActive) links.forEach(function (l) { l.classList.toggle('is-on', l === a); }); } });
    });
    $$('.more [data-stamp]').forEach(function (st) {
      gsap.set(st, { opacity: 0 });
      ScrollTrigger.create({ trigger: st, start: 'top 90%', once: true, onEnter: function () { gsap.fromTo(st, { scale: 2.2, opacity: 0, rotation: -24 }, { scale: 1, opacity: 1, rotation: -9, duration: 0.7, ease: 'back.out(2.2)' }); } });
    });
  }

  $$('[data-set-mode]').forEach(function (b) { b.addEventListener('click', function () { setMode(b.getAttribute('data-set-mode'), true); }); });
  var h = (location.hash || '').slice(1);
  setMode(MODES.indexOf(h) >= 0 ? h : MODES[0], false);
  countdown();

  IA.ready(function () { heroIn(); initDays(); initGallery(); initAcc(); initDetails(); });
})();
