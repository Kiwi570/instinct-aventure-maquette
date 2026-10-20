/* « Trouve ta piste » : 3 questions, la carte trace en direct le voyage qui correspond le mieux.
   Les recommandations viennent uniquement des circuits réels de data.js. */
(function () {
  'use strict';
  var IA = window.IA, $ = IA.$, $$ = IA.$$, D = document, W = window, DATA = window.IA_DATA;
  var qz = $('#quiz'); if (!qz) return;
  var steps = $$('[data-q]', qz), dots = $$('.qdots i', qz), back = $('[data-quiz-back]', qz);
  var live = $('[data-quiz-live]', qz), results = $('[data-quiz-results]', qz);
  var ans = { formule: null, duree: null, envies: [] }, step = 0, last = null, map = null, shown = null;
  var ENVIE = { namib: 'dunes du Namib', etosha: 'Etosha', okavango: 'Okavango', cote: 'côte atlantique', damaraland: 'Damaraland', kalahari: 'Kalahari', botswana: 'Botswana' };
  var FORM = { autotour: 'autotour', guide: 'séjour guidé', confirme: 'départ confirmé' };

  function score(c) {
    var f = ans.formule, d = ans.duree, e = ans.envies;
    var sF = !f || f === 'all' ? 1 : c.formule === f ? 1 : ((f === 'guide' && c.formule === 'confirme') || (f === 'confirme' && c.formule === 'guide')) ? 0.5 : 0;
    var okD = !d || d === 'all' || (d === 'court' ? c.jours <= 14 : c.jours >= 17);
    var hit = e.filter(function (x) { return c.regions.indexOf(x) >= 0; });
    var sE = e.length ? hit.length / e.length : 1;
    return { c: c, pct: Math.round((0.4 * sF + 0.25 * (okD ? 1 : 0.3) + 0.35 * sE) * 100), sF: sF, okD: okD, hit: hit, miss: e.filter(function (x) { return hit.indexOf(x) < 0; }) };
  }
  function ranked() {
    return DATA.circuits.map(score).sort(function (a, b) { return b.pct - a.pct || a.c.prix - b.c.prix; });
  }

  function routeIds(c) {
    var slug = c.page.split('#')[0].replace('.html', ''), f = DATA.fiches[slug];
    if (f && IA.routeOf) return IA.routeOf(f.days).ids;
    if (f) { var ids = ['windhoek']; f.days.forEach(function (d) { if (d.via) ids.push(d.via); ids.push(d.stop); (d.after || []).forEach(function (a) { ids.push(a); }); }); return ids; }
    return c.route;
  }
  function draw(c) {
    if (!map || !c || shown === c.id) return;
    shown = c.id;
    map.clear();
    var r = map.addRoute(routeIds(c), { ghost: false });
    if (W.gsap && !IA.calm) map.car(r);
    map.addStops(r.ids, { labels: ['windhoek'] });
    map.setStops(r.ids, null);
    if (W.gsap && !IA.calm) { var o = { p: 0 }; gsap.to(o, { p: 1, duration: 1.6, ease: 'power2.inOut', onUpdate: function () { r.progress(o.p); } }); }
    else r.progress(1);
    live.textContent = 'En tête : ' + c.name + ' · ' + c.jours + ' jours · ' + IA.euro(c.prix);
  }
  function update() { var top = ranked()[0]; draw(top.c); }

  function show(n) {
    step = n;
    steps.forEach(function (s) { s.hidden = +s.getAttribute('data-q') !== n; });
    dots.forEach(function (d, i) { d.classList.toggle('is-on', i <= n); });
    back.hidden = n === 0 || n === 3;
    var cur = steps.filter(function (s) { return !s.hidden; })[0];
    if (cur && W.gsap && !IA.calm) gsap.from(cur.querySelectorAll('legend, .qopts > *, .qres, .qresults__title'), { y: 24, opacity: 0, stagger: 0.05, duration: 0.6, ease: 'expo.out' });
    var f = cur && cur.querySelector('button');
    if (f) f.focus({ preventScroll: true });
  }

  function reasonList(r) {
    var c = r.c, out = [];
    out.push((r.sF === 1 ? '✓ ' : r.sF ? '≈ ' : '✗ ') + 'Formule : ' + FORM[c.formule]);
    out.push((r.okD ? '✓ ' : '✗ ') + c.nuitsLabel);
    if (r.hit.length) out.push('✓ ' + r.hit.map(function (x) { return ENVIE[x]; }).join(', '));
    if (r.miss.length) out.push('✗ ' + r.miss.map(function (x) { return ENVIE[x]; }).join(', '));
    if (c.statut === 'complet') out.push('Départ ' + c.departLabel + ' complet : demandez la prochaine date');
    return out;
  }
  function renderResults() {
    var top = ranked().slice(0, 3);
    results.innerHTML = top.map(function (r, i) {
      var c = r.c;
      return '<article class="qres' + (i === 0 ? ' qres--top' : '') + '" data-qres="' + c.id + '">' +
        '<img src="assets/img/' + c.img + '-640.webp" alt="" loading="lazy">' +
        '<div class="qres__body"><span class="qres__score"><b class="num">' + r.pct + '</b> % compatible</span>' +
        '<h4><a href="' + c.page + '">' + c.name + '</a></h4>' +
        '<p>' + c.sub + ' · ' + IA.euro(c.prix) + ' TTC par personne, base ' + c.base + '</p>' +
        '<ul>' + reasonList(r).map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>' +
        '<div class="btn-row"><a class="btn btn--sm" href="' + c.page + '">Voir le voyage</a>' +
        '<button class="icon-btn fav-btn" type="button" data-fav="' + c.id + '" aria-pressed="false" aria-label="Ajouter à ma liste d’envies"><svg aria-hidden="true"><use href="#i-heart"/></svg></button>' +
        '<button class="btn btn--sm btn--ghost" type="button" data-devis data-devis-tour="' + c.name + '" data-devis-formule="' + (c.formule === 'autotour' ? 'Autotour' : 'Séjour guidé') + '">Devis</button></div></div></article>';
    }).join('');
    IA.favSync && IA.favSync();
    shown = null; draw(top[0].c);
    $$('.qres', results).forEach(function (el) {
      el.addEventListener('pointerenter', function () { var c = DATA.circuits.filter(function (x) { return x.id === el.getAttribute('data-qres'); })[0]; shown = null; draw(c); });
    });
    if (W.gsap && !IA.calm) $$('.qres__score b', results).forEach(function (b) { var to = +b.textContent, o = { v: 0 }; gsap.to(o, { v: to, duration: 1.4, ease: 'expo.out', onUpdate: function () { b.textContent = Math.round(o.v); } }); });
  }

  qz.addEventListener('click', function (e) {
    var b = e.target.closest('[data-a]');
    if (b) {
      var k = b.getAttribute('data-a'), v = b.getAttribute('data-v');
      if (k === 'envies') {
        var i = ans.envies.indexOf(v);
        if (i >= 0) ans.envies.splice(i, 1); else ans.envies.push(v);
        b.setAttribute('aria-pressed', i >= 0 ? 'false' : 'true');
        if (W.gsap && !IA.calm) gsap.fromTo(b, { scale: 0.94 }, { scale: 1, duration: 0.5, ease: 'back.out(3)' });
        update();
      } else {
        ans[k] = v;
        $$('[data-a="' + k + '"]', qz).forEach(function (x) { x.classList.toggle('is-picked', x === b); });
        update();
        W.setTimeout(function () { show(step + 1); }, IA.calm ? 0 : 320);
      }
      return;
    }
    if (e.target.closest('[data-quiz-go]')) { renderResults(); show(3); }
    else if (e.target.closest('[data-quiz-back]')) show(Math.max(0, step - 1));
    else if (e.target.closest('[data-quiz-restart]')) { ans = { formule: null, duree: null, envies: [] }; $$('[aria-pressed]', qz).forEach(function (x) { if (x.hasAttribute('data-a')) x.setAttribute('aria-pressed', 'false'); }); $$('.is-picked', qz).forEach(function (x) { x.classList.remove('is-picked'); }); shown = null; update(); show(0); }
    else if (e.target.closest('[data-quiz-close]')) close();
    else if (e.target.closest('[data-devis]')) close(true);
  });

  function open() {
    last = D.activeElement;
    if (!map && IA.NamMap) { map = new IA.NamMap($('[data-map="quiz"]', qz)); }
    qz.classList.add('is-open'); qz.setAttribute('aria-hidden', 'false');
    D.documentElement.classList.add('devis-open');
    if (IA.lenis) IA.lenis.stop();
    IA.closeMenu && IA.closeMenu();
    shown = null; update(); show(step === 3 ? 3 : step);
  }
  function close(keepLock) {
    qz.classList.remove('is-open'); qz.setAttribute('aria-hidden', 'true');
    if (!keepLock) { D.documentElement.classList.remove('devis-open'); if (IA.lenis) IA.lenis.start(); if (last && last.focus) last.focus({ preventScroll: true }); }
  }
  IA.openQuiz = open;
  D.addEventListener('click', function (e) {
    var t = e.target.closest('[data-quiz]');
    if (!t) return;
    e.preventDefault(); e.stopPropagation(); open();
  }, true);
  D.addEventListener('keydown', function (e) {
    if (!qz.classList.contains('is-open')) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'Tab') {
      var f = $$('button, a[href]', qz).filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      if (e.shiftKey && D.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && D.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
  if (location.hash === '#trouver-ma-piste') W.addEventListener('load', function () { W.setTimeout(open, 600); });
})();
