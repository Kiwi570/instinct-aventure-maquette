/* Nos voyages : filtres, carte des tracés, départs confirmés triés automatiquement */
(function () {
  'use strict';
  var IA = window.IA, $ = IA.$, $$ = IA.$$, W = window, D = document, DATA = window.IA_DATA;

  function heroIn() {
    var heroBox = $('[data-gl]');
    var gl = IA.initGL(heroBox, { reveal: IA.calm ? 1 : 0.35, pos: '0.5 0.55' });
    if (!IA.hasGSAP || IA.calm) return;
    var split = IA.splitHero();
    var tl = gsap.timeline({ delay: 0.25 });
    if (split) tl.to(split.chars, { yPercent: 0, duration: 1.2, stagger: 0.02, ease: 'expo.out' }, 0);
    tl.from($$('[data-hero] [data-reveal]'), { y: 26, opacity: 0, stagger: 0.08, duration: 1.1 }, 0.2);
    var img = heroBox && heroBox.querySelector('img');
    if (img) tl.from(img, { scale: 1.12, duration: 2.4, ease: 'expo.out' }, 0);
    if (gl) tl.to(gl.uniforms.uReveal, { value: 1, duration: 1.8, ease: 'power2.out' }, 0);
  }

  /* ---- Départs confirmés ---- */
  var MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  function renderDeparts() {
    var box = $('[data-departs]'); if (!box) return;
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var list = DATA.circuits.filter(function (c) { return c.formule === 'confirme'; }).map(function (c) {
      var p = c.depart.split('-').map(Number), approx = p.length < 3;
      var date = new Date(p[0], p[1] - 1, approx ? 1 : p[2]);
      return { c: c, date: date, approx: approx, past: (approx ? new Date(p[0], p[1], 0) : date) < today };
    }).sort(function (a, b) { return a.date - b.date; });
    var up = list.filter(function (d) { return !d.past; }), past = list.filter(function (d) { return d.past; });
    function card(d) {
      var c = d.c, days = Math.round((d.date - today) / 86400000);
      var when = d.approx
        ? '<b>' + MOIS[d.date.getMonth()].charAt(0).toUpperCase() + MOIS[d.date.getMonth()].slice(1) + '</b><span>' + d.date.getFullYear() + ', dates à définir</span>'
        : '<b>' + d.date.getDate() + '</b><span>' + MOIS[d.date.getMonth()] + ' ' + d.date.getFullYear() + '</span>';
      var count = d.past ? 'Départ passé'
        : d.approx ? 'Départ dans environ <b>' + Math.max(1, Math.round(days / 30.4)) + '</b> mois'
          : 'Départ dans <b>' + days + '</b> jours';
      return '<article class="depart' + (d.past ? ' is-past' : '') + '" data-reveal>' +
        '<div class="depart__date">' + when + '</div>' +
        '<div class="depart__body"><h3>' + c.name + '</h3><p>' + c.sub + ' · ' + c.nuitsLabel + ' · accompagnateur francophone</p>' +
        '<p><b class="num" style="color:var(--fg)">' + IA.euro(c.prix) + '</b> TTC par personne, base ' + c.base + ' personnes, hors vols</p></div>' +
        '<div class="depart__side">' + (c.statut === 'complet' ? '<span class="stamp">Complet</span>' : '') +
        '<span class="count">' + count + '</span>' +
        '<a class="link-arrow" href="' + c.page + '" target="_blank" rel="noopener"><span>Programme jour par jour</span><svg aria-hidden="true"><use href="#i-arrow"/></svg></a></div></article>';
    }
    box.innerHTML = up.map(card).join('') + (past.length ? '<h3 class="eyebrow" style="margin-top:28px">Départs passés</h3>' + past.map(card).join('') : '');
    if (IA.hasGSAP && !IA.calm) {
      $$('.depart', box).forEach(function (el, i) {
        gsap.from(el, { y: 40, opacity: 0, duration: 1.1, delay: i * 0.08, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
        var st = $('.stamp', el);
        if (st) gsap.from(st, { scale: 2, opacity: 0, rotation: -20, duration: 0.7, ease: 'back.out(2)', delay: 0.4 + i * 0.08, scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      });
    }
  }

  /* ---- Catalogue filtrable ---- */
  function initCatalogue() {
    var grid = $('[data-cat]'); if (!grid) return;
    var cards = $$('.trip', grid), empty = $('[data-empty]', grid), out = $('[data-count-out]');
    var budget = $('#f-budget'), bOut = $('[data-budget-out]');
    var state = { formule: 'all', duree: 'all', region: 'all', budget: +budget.value };
    var paths = {};
    var mapBox = $('[data-map="cat"]');
    var nameEl = $('[data-cat-name]'), descEl = $('[data-cat-desc]');
    var byId = {}; DATA.circuits.forEach(function (c) { byId[c.id] = c; });
    if (mapBox && IA.NamMap) {
      var map = new IA.NamMap(mapBox);
      paths = map.allRoutes(DATA.circuits);
      map.addStops(['windhoek'], { labels: ['windhoek'] });
      map.setStops(['windhoek'], null);
    }
    function ok(c) {
      var f = c.getAttribute('data-formule'), j = +c.getAttribute('data-jours'), p = +c.getAttribute('data-prix'), r = c.getAttribute('data-regions').split(' ');
      return (state.formule === 'all' || f === state.formule) &&
        (state.duree === 'all' || (state.duree === 'court' ? j <= 14 : j >= 17)) &&
        p <= state.budget && (state.region === 'all' || r.indexOf(state.region) >= 0);
    }
    var sortSel = $('#f-sort'), order0 = cards.slice();
    function sortCards() {
      var v = sortSel ? sortSel.value : 'reco', arr = order0.slice();
      if (v === 'prix-asc') arr.sort(function (a, b) { return +a.getAttribute('data-prix') - +b.getAttribute('data-prix'); });
      else if (v === 'prix-desc') arr.sort(function (a, b) { return +b.getAttribute('data-prix') - +a.getAttribute('data-prix'); });
      else if (v === 'duree') arr.sort(function (a, b) { return +a.getAttribute('data-jours') - +b.getAttribute('data-jours') || +a.getAttribute('data-prix') - +b.getAttribute('data-prix'); });
      arr.forEach(function (c) { grid.insertBefore(c, empty); });
    }
    function apply(animate) {
      var fs = (animate && W.Flip && !IA.calm) ? Flip.getState(cards) : null;
      sortCards();
      var n = 0;
      cards.forEach(function (c) {
        var show = ok(c); c.hidden = !show; if (show) n++;
        var p = paths[c.getAttribute('data-trip')]; if (p) p.style.opacity = show ? '' : '0.15';
      });
      empty.hidden = n > 0; out.textContent = n;
      $$('[data-f]').forEach(function (b) { b.setAttribute('aria-pressed', state[b.getAttribute('data-f')] === b.getAttribute('data-v') ? 'true' : 'false'); });
      bOut.textContent = IA.euro(state.budget);
      if (fs) Flip.from(fs, {
        duration: 0.75, ease: 'power3.inOut', absolute: true, scale: true, nested: true,
        onEnter: function (els) { return gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6 }); },
        onLeave: function (els) { return gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.4 }); },
        onComplete: function () { ScrollTrigger.refresh(); }
      });
      else if (IA.hasGSAP) ScrollTrigger.refresh();
    }
    $$('[data-f]').forEach(function (b) {
      b.addEventListener('click', function () { state[b.getAttribute('data-f')] = b.getAttribute('data-v'); apply(true); });
    });
    budget.addEventListener('input', function () { state.budget = +budget.value; apply(false); });
    if (sortSel) sortSel.addEventListener('change', function () { apply(true); });
    budget.addEventListener('change', function () { apply(true); });
    $$('[data-reset]').forEach(function (b) { b.addEventListener('click', function () { state = { formule: 'all', duree: 'all', region: 'all', budget: 4300 }; budget.value = 4300; apply(true); }); });
    function setFormule(f, scroll) { state.formule = f; apply(true); if (scroll) IA.scrollTo('#catalogue'); }
    $$('[data-filter-jump]').forEach(function (b) { b.addEventListener('click', function () { setFormule(b.getAttribute('data-filter-jump'), true); }); });
    var fromHash = function (h) { if (h === 'autotours') setFormule('autotour'); else if (h === 'guides') setFormule('guide'); };
    fromHash((location.hash || '').slice(1));
    document.addEventListener('ia:anchor', function (e) { fromHash(e.detail); });

    function hot(c) {
      var id = c ? c.getAttribute('data-trip') : null;
      for (var k in paths) paths[k].classList.toggle('is-hot', k === id);
      if (c && byId[id]) {
        var d = byId[id];
        nameEl.textContent = d.name;
        descEl.textContent = d.sub + ' · ' + d.jours + ' jours · ' + IA.euro(d.prix) + ' TTC par personne';
      } else { nameEl.textContent = 'Tous les itinéraires'; descEl.textContent = 'Survolez un voyage pour afficher son tracé.'; }
    }
    cards.forEach(function (c) {
      c.addEventListener('pointerenter', function () { hot(c); });
      c.addEventListener('focusin', function () { hot(c); });
      c.addEventListener('pointerleave', function () { hot(null); });
      c.addEventListener('focusout', function () { hot(null); });
    });
    apply(false);
  }

  /* ---- Tente de toit et étapes ---- */
  function initDetails() {
    if (!IA.hasGSAP || IA.calm) return;
    $$('[data-tent]').forEach(function (t) {
      var unfold = function () { gsap.fromTo(t, { scaleY: 0.08 }, { scaleY: 1, duration: 1.6, ease: 'elastic.out(1, 0.55)' }); };
      gsap.set(t, { scaleY: 0.08 });
      ScrollTrigger.create({ trigger: t.closest('figure'), start: 'top 75%', once: true, onEnter: unfold });
      t.closest('.formula').addEventListener('pointerenter', unfold);
    });
    var line = $('[data-steps-line]');
    if (line) gsap.fromTo(line, { attr: { x2: 2 } }, { attr: { x2: 98 }, ease: 'none', scrollTrigger: { trigger: '[data-steps]', start: 'top 80%', end: 'top 35%', scrub: true } });
  }


  /* ---- Comparateur ---- */
  var REG = DATA.regions, FORM = { autotour: 'Autotour', guide: 'Séjour guidé', confirme: 'Départ confirmé' };
  function ficheOf(id) {
    for (var slug in DATA.fiches) { var f = DATA.fiches[slug]; for (var m in f.modes) if (f.modes[m] === id) return { slug: slug, f: f, mode: m }; }
    return null;
  }
  function pick(v, m) { return (v && !Array.isArray(v) && typeof v === 'object') ? v[m] : v; }
  function initCompare() {
    var bar = $('[data-cmpbar]'), view = $('#comparer'); if (!bar || !view) return;
    var sel = [], last = null;
    var boxes = $$('[data-compare]');
    function syncBar() {
      boxes.forEach(function (b) { b.checked = sel.indexOf(b.getAttribute('data-compare')) >= 0; b.closest('.trip').classList.toggle('is-compared', b.checked); });
      $('[data-cmp-count]', bar).textContent = sel.length;
      $('[data-cmp-open]', bar).disabled = sel.length < 2;
      bar.hidden = sel.length === 0;
      if (!bar.hidden && W.gsap && !IA.calm && sel.length === 1) gsap.fromTo(bar, { yPercent: 120 }, { yPercent: 0, duration: 0.6, ease: 'expo.out' });
    }
    boxes.forEach(function (b) {
      b.addEventListener('change', function () {
        var id = b.getAttribute('data-compare'), i = sel.indexOf(id);
        if (b.checked && i < 0) { sel.push(id); if (sel.length > 2) sel.shift(); }
        if (!b.checked && i >= 0) sel.splice(i, 1);
        syncBar();
        if (sel.length === 2) IA.toast && IA.toast('Deux voyages sélectionnés : cliquez sur Comparer.');
      });
    });
    function row(label, vals) { return '<tr><th scope="row">' + label + '</th>' + vals.map(function (v) { return '<td>' + v + '</td>'; }).join('') + '</tr>'; }
    function render() {
      var cs = sel.map(function (id) { return DATA.circuits.filter(function (c) { return c.id === id; })[0]; });
      var fs = cs.map(function (c) { return ficheOf(c.id); });
      var head = '<tr><th></th>' + cs.map(function (c) { return '<th scope="col"><img src="assets/img/' + c.img + '-640.webp" alt=""><a class="link" href="' + c.page + '">' + c.name + '</a></th>'; }).join('') + '</tr>';
      var minP = Math.min.apply(null, cs.map(function (c) { return c.prix; }));
      var rows = [
        row('Formule', cs.map(function (c) { return FORM[c.formule]; })),
        row('Durée', cs.map(function (c) { return c.nuitsLabel; })),
        row('Prix', cs.map(function (c) { return '<b class="num' + (c.prix === minP ? ' best' : '') + '">' + IA.euro(c.prix) + '</b><br><span class="muted">TTC par personne, base ' + c.base + '</span>'; })),
        row('Quand', cs.map(function (c) { return c.formule === 'confirme' ? 'Départ ' + c.departLabel + (c.statut === 'complet' ? ' · complet' : '') : (c.periode || 'Dates à définir avec vous'); })),
        row('Régions', cs.map(function (c) { return c.regions.map(function (r) { return REG[r]; }).join(', '); })),
        row('Nuits', fs.map(function (x) { return x && x.f.stats.kind === 'nuits' ? x.f.stats.items.map(function (it) { return it[1] + ' ' + it[0].toLowerCase().replace('nuits ', ''); }).join('<br>') : '—'; })),
        row('Accompagnement', fs.map(function (x) { return x ? pick(x.f.driver, x.mode) : '—'; })),
        row('Inclus', fs.map(function (x) { var l = x ? pick(x.f.incl, x.mode) : []; return '<ul>' + l.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>'; })),
        row('Non inclus', fs.map(function (x) { var l = x ? pick(x.f.nonIncl, x.mode) : []; return '<ul class="muted">' + l.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>'; })),
        row('', cs.map(function (c) { return '<div class="btn-row"><a class="btn btn--sm" href="' + c.page + '">Voir le voyage</a><button class="icon-btn fav-btn" type="button" data-fav="' + c.id + '" aria-pressed="false" aria-label="Ajouter à ma liste d’envies"><svg aria-hidden="true"><use href="#i-heart"/></svg></button></div>'; }))
      ];
      $('[data-cmp-body]', view).innerHTML = '<div class="cmptable"><table><thead>' + head + '</thead><tbody>' + rows.join('') + '</tbody></table></div>';
      IA.favSync && IA.favSync();
    }
    function open() {
      last = D.activeElement; render();
      view.classList.add('is-open'); view.setAttribute('aria-hidden', 'false');
      D.documentElement.classList.add('devis-open');
      if (IA.lenis) IA.lenis.stop();
      var c = $('[data-cmp-close].devis__close', view); if (c) c.focus({ preventScroll: true });
    }
    function close() {
      view.classList.remove('is-open'); view.setAttribute('aria-hidden', 'true');
      D.documentElement.classList.remove('devis-open');
      if (IA.lenis) IA.lenis.start();
      if (last) last.focus({ preventScroll: true });
    }
    $('[data-cmp-open]', bar).addEventListener('click', open);
    $('[data-cmp-clear]', bar).addEventListener('click', function () { sel = []; syncBar(); });
    view.addEventListener('click', function (e) { if (e.target.closest('[data-cmp-close]')) close(); });
    D.addEventListener('keydown', function (e) { if (e.key === 'Escape' && view.classList.contains('is-open')) close(); });
    syncBar();
  }

  /* ---- Quand partir ? ---- */
  var MOIS_L = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  function monthsOf(c) {
    if (c.formule === 'confirme') return [+c.depart.split('-')[1] - 1];
    var x = ficheOf(c.id);
    if (x && x.f.season && x.f.season[x.mode]) return x.f.season[x.mode];
    return null;
  }
  function initWhen() {
    var pick0 = $('[data-mpick]'), out = $('[data-when]'); if (!pick0 || !out) return;
    var btns = $$('[data-month]', pick0);
    function card(c, note) {
      return '<a class="wcard" href="' + c.page + '"><img src="assets/img/' + c.img + '-640.webp" alt="" loading="lazy"><span><b>' + c.name + '</b><small>' + FORM[c.formule] + ' · ' + c.jours + ' jours · ' + IA.euro(c.prix) + '</small>' + (note ? '<small class="wnote">' + note + '</small>' : '') + '</span></a>';
    }
    function sel(m) {
      btns.forEach(function (b) { b.setAttribute('aria-pressed', +b.getAttribute('data-month') === m ? 'true' : 'false'); });
      var yes = [], ask = [];
      DATA.circuits.forEach(function (c) {
        var ms = monthsOf(c);
        if (ms === null) ask.push(c);
        else if (ms.indexOf(m) >= 0) yes.push(c);
      });
      var dry = m >= 4 && m <= 9;
      out.innerHTML = '<p class="when__head"><b>En ' + MOIS_L[m] + '</b> · ' + (dry ? 'saison sèche, idéale pour la faune' : 'hors saison sèche') + '</p>' +
        (yes.length ? '<div class="when__grid">' + yes.map(function (c) { return card(c, c.statut === 'complet' ? 'Départ ' + c.departLabel + ' complet' : (c.formule === 'confirme' ? 'Départ ' + c.departLabel : (c.periode || ''))); }).join('') + '</div>'
          : '<p class="muted">Aucun voyage annoncé pour ce mois. Nous pouvons étudier une date sur mesure.</p>') +
        (ask.length ? '<p class="when__sub">Sur demande, dates à définir avec vous</p><div class="when__grid when__grid--ask">' + ask.map(function (c) { return card(c); }).join('') + '</div>' : '');
      if (W.gsap && !IA.calm) gsap.from(out.querySelectorAll('.wcard'), { y: 18, opacity: 0, stagger: 0.04, duration: 0.5, ease: 'expo.out' });
    }
    btns.forEach(function (b) { b.addEventListener('click', function () { sel(+b.getAttribute('data-month')); }); });
    var now = new Date().getMonth();
    sel(now);
  }

  IA.ready(function () { heroIn(); renderDeparts(); initCatalogue(); initCompare(); initWhen(); initDetails(); });
})();
