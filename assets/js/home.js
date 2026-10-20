/* Accueil : ouverture, mirage, philosophie, piste de la Grande aventure, galerie horizontale */
(function () {
  'use strict';
  var IA = window.IA, $ = IA.$, $$ = IA.$$, W = window, DATA = window.IA_DATA;

  IA.ready(function () {
    var hasG = IA.hasGSAP;
    var heroBox = $('[data-gl]');
    var hero = IA.initGL(heroBox, { reveal: 0, pos: '0.36 0.5' });
    var heroImg = heroBox && heroBox.querySelector('img');
    var split = IA.splitHero();
    var heroReveals = $$('[data-hero] [data-reveal]');

    /* ---- Ouverture ---- */
    var intro = $('.intro');
    function revealHero(tl, at) {
      if (split) tl.to(split.chars, { yPercent: 0, duration: 1.25, stagger: 0.016, ease: 'expo.out' }, at);
      tl.from(heroReveals, { y: 30, opacity: 0, duration: 1.2, stagger: 0.08, ease: 'expo.out' }, at + 0.25);
      if (hero) tl.to(hero.uniforms.uReveal, { value: 1, duration: 2.4, ease: 'power2.out' }, at - 0.6);
      if (heroImg) tl.from(heroImg, { scale: 1.14, duration: 2.6, ease: 'expo.out' }, at - 0.6);
    }
    if (!hasG || IA.calm) { if (intro) intro.remove(); if (hero) hero.uniforms.uReveal.value = 1; }
    else {
      var seen = IA.sstore.get('ia-intro') === '1';
      var tl = gsap.timeline({ defaults: { ease: 'expo.inOut' } });
      if (!seen && intro) {
        IA.sstore.set('ia-intro', '1');
        if (IA.lenis) IA.lenis.stop();
        var line = $('.intro__line', intro), sky = $('.intro__sky', intro), sun = $('.intro__sun', intro), word = $('.intro__word', intro);
        tl.to(line, { scaleX: 1, duration: 0.6 }, 0.05)
          .to(sky, { opacity: 1, duration: 0.9, ease: 'power2.inOut' }, 0.2)
          .to(sun, { opacity: 1, yPercent: -60, duration: 1.1, ease: 'power3.out' }, 0.22)
          .to(word, { opacity: 1, y: '-12vh', duration: 0.8, ease: 'expo.out' }, 0.35)
          .to(intro, { clipPath: 'inset(0 0 100% 0)', duration: 0.85, ease: 'expo.inOut' }, 1.05)
          .add(function () { if (IA.lenis) IA.lenis.start(); intro.remove(); }, 1.95);
        revealHero(tl, 1.3);
        var skip = function () { if (tl.progress() < 0.75) tl.progress(1); };
        var sk = $('[data-intro-skip]', intro);
        if (sk) { sk.addEventListener('click', skip); W.setTimeout(function () { try { sk.focus({ preventScroll: true }); } catch (e) { } }, 50); }
        W.addEventListener('pointerdown', skip, { once: true });
        W.addEventListener('keydown', skip, { once: true });
      } else {
        if (intro) intro.remove();
        revealHero(tl, 0.35);
      }
    }

    /* ---- Mirage au survol des cartes d'offres (filtre SVG) : géré en CSS ---- */

    /* ---- Philosophie : les mots s'allument au défilement ---- */
    var q = $('[data-words]');
    if (q) {
      var words = q.textContent.trim().split(/\s+/);
      q.innerHTML = words.map(function (w) { return '<span class="w">' + w + '</span>'; }).join(' ');
      var spans = $$('.w', q);
      if (hasG && !IA.calm) {
        ScrollTrigger.create({
          trigger: q, start: 'top 80%', end: 'bottom 45%', scrub: true,
          onUpdate: function (s) {
            var n = s.progress * spans.length;
            spans.forEach(function (sp, i) { sp.style.opacity = Math.max(0.16, Math.min(1, n - i + 0.6)); });
          }
        });
      }
    }

    /* ---- La piste : Grande aventure ---- */
    var piste = $('[data-piste]'), mapBox = $('[data-map="piste"]');
    if (piste && mapBox && IA.NamMap) {
      var map = new IA.NamMap(mapBox);
      var days = DATA.fiches['grande-aventure'].days;
      var ids = ['windhoek'];
      days.forEach(function (d) { if (d.via) ids.push(d.via); ids.push(d.stop); (d.after || []).forEach(function (a) { ids.push(a); }); });
      var route = map.addRoute(ids, { ghost: true });
      if (hasG && !IA.calm) map.car(route);
      map.addStops(route.ids, { labels: ['windhoek'], right: ['divundu'], above: ['divundu', 'halali'], below: ['mahango', 'walvisbay', 'okaukuejo'] });
      var dayIdx = [], k = 0;
      days.forEach(function (d) { var i = route.indexOf(d.stop, k); if (i < 0) i = k; dayIdx.push(i); k = i; });
      var bigDay = $('[data-day]'), dayStop = $('[data-day-stop]'), dayPlace = $('[data-day-place]');
      var regions = $$('[data-region]');
      var lastDay = -1;
      var setDay = function (dv) {
        var i = Math.max(0, Math.min(days.length - 1, Math.floor(dv)));
        var f = Math.max(0, Math.min(1, dv - i));
        var L0 = route.lengthAt(i === 0 ? 0 : dayIdx[i - 1]), L1 = route.lengthAt(dayIdx[i]);
        route.set(L0 + (L1 - L0) * Math.min(1, f * 1.4));
        map.fauna(f * 1.4 >= 1 || i === 0 ? days[i].stop : null);
        if (i === lastDay) return;
        lastDay = i;
        var d = days[i];
        bigDay.textContent = (d.j < 10 ? '0' : '') + d.j;
        IA.onPisteDay && IA.onPisteDay(d, map, route);
        dayStop.textContent = d.t;
        dayPlace.textContent = DATA.places[d.stop].n;
        var visited = route.ids.slice(0, dayIdx[i] + 1);
        map.setStops(visited, d.stop);
        var active = regions[0];
        regions.forEach(function (r) { if (d.j >= +r.getAttribute('data-from')) active = r; });
        regions.forEach(function (r) { r.classList.toggle('is-on', r === active); });
      };
      if (!hasG || IA.calm) { route.set(route.total); map.setStops(route.ids, 'windhoek'); bigDay.textContent = '21'; dayStop.textContent = 'Windhoek, retour'; dayPlace.textContent = 'Windhoek'; }
      else {
        setDay(0);
        var mm = gsap.matchMedia();
        mm.add('(min-width: 1101px)', function () {
          ScrollTrigger.create({ trigger: piste, start: 'top top', end: '+=260%', pin: true, scrub: 0.6, anticipatePin: 1,
            onUpdate: function (s) { setDay(s.progress * days.length * 0.999); } });
        });
        mm.add('(max-width: 1100px)', function () {
          ScrollTrigger.create({ trigger: mapBox, start: 'top 75%', end: 'bottom -40%', scrub: 0.6,
            onUpdate: function (s) { setDay(s.progress * days.length * 0.999); } });
        });
      }
    }

    /* ---- Galerie horizontale des voyages ---- */
    var trips = $('[data-trips]'), track = $('[data-trips-track]');
    var stamps = $$('[data-stamp]', trips || document);
    var stampIn = function (st) { gsap.fromTo(st, { scale: 2.2, opacity: 0, rotation: -24 }, { scale: 1, opacity: 1, rotation: -9, duration: 0.7, ease: 'back.out(2.2)' }); };
    if (trips && track && hasG && !IA.calm) {
      var mm2 = gsap.matchMedia();
      mm2.add('(min-width: 1101px)', function () {
        var dist = function () { return Math.max(0, track.scrollWidth - W.innerWidth); };
        var tween = gsap.to(track, { x: function () { return -dist(); }, ease: 'none',
          scrollTrigger: { trigger: trips, start: 'top top', end: function () { return '+=' + dist(); }, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 } });
        track.addEventListener('focusin', function (e) {
          var card = e.target.closest('.trip, .trips__intro'); if (!card) return;
          var st = tween.scrollTrigger, d = dist(); if (!st || !d) return;
          var p = Math.max(0, Math.min(1, (card.offsetLeft - W.innerWidth * 0.25) / d));
          var y = st.start + p * (st.end - st.start);
          if (IA.lenis) IA.lenis.scrollTo(y, { immediate: true }); else W.scrollTo(0, y);
        });
        stamps.forEach(function (st) {
          gsap.set(st, { opacity: 0 });
          ScrollTrigger.create({ trigger: st.closest('.trip'), containerAnimation: tween, start: 'left 70%', once: true, onEnter: function () { stampIn(st); } });
        });
        $$('.trip', track).forEach(function (t) {
          gsap.from(t, { y: 60, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: t, containerAnimation: tween, start: 'left 100%', end: 'left 65%', scrub: true } });
        });
      });
      mm2.add('(max-width: 1100px)', function () {
        if (!('IntersectionObserver' in W)) return;
        var io = new IntersectionObserver(function (es) {
          es.forEach(function (e) { if (e.isIntersecting) { stampIn(e.target); io.unobserve(e.target); } });
        }, { threshold: 0.9 });
        stamps.forEach(function (st) { gsap.set(st, { opacity: 0 }); io.observe(st); });
        return function () { io.disconnect(); gsap.set(stamps, { clearProps: 'all' }); };
      });
    }
  });
})();
