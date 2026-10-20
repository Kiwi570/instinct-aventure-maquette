/* Demande de devis en 4 étapes (envoi simulé) */
(function () {
  'use strict';
  var IA = window.IA, $ = IA.$, $$ = IA.$$, D = document;
  var dv = $('#devis'); if (!dv) return;
  var panel = $('.devis__panel', dv), form = $('[data-devis-form]', dv);
  var steps = $$('[data-step]', dv), nav = $('[data-devis-nav]', dv);
  var prev = $('[data-prev]', dv), next = $('[data-next]', dv);
  var fill = $('.road__fill', dv), car = $('.road__car', dv), marks = $$('[data-road]', dv);
  var voy = $('#d-voy'), lastFocus = null, step = 0, nbVoy = 4;
  var DATA = window.IA_DATA, CBYNAME = {}, CBYID = {};
  DATA.circuits.forEach(function (c) { CBYNAME[c.name] = c; CBYID[c.id] = c; });
  var DRAFT = 'ia-devis-brouillon';
  var card = $('[data-devis-card]', dv), lbox = $('[data-devis-liste-box]', dv), litems = $('[data-devis-liste-items]', dv);
  function renderCard() {
    var c = CBYNAME[$('#d-tour').value];
    if (!c) { card.hidden = true; return; }
    card.hidden = false;
    card.innerHTML = '<img src="assets/img/' + c.img + '-640.webp" alt="">' +
      '<div><b>' + c.name + '</b><span>' + c.nuitsLabel + ' · ' + IA.euro(c.prix) + ' TTC par personne, base ' + c.base + '</span>' +
      '<span>' + (c.formule === 'confirme' ? 'Départ ' + c.departLabel + (c.statut === 'complet' ? ' · complet, nous vous proposons une autre date' : '') : (c.periode || 'Dates à définir avec vous')) + '</span></div>';
  }
  function renderListe(checkAll) {
    var favs = IA.favs ? IA.favs() : [];
    lbox.hidden = !favs.length;
    litems.innerHTML = favs.map(function (id) {
      var c = CBYID[id];
      return '<label class="check"><input type="checkbox" name="liste" value="' + c.name + '"' + (checkAll !== false ? ' checked' : '') + '><span>' + c.name + ' · ' + IA.euro(c.prix) + '</span></label>';
    }).join('');
  }
  function saveDraft() {
    var fd = new FormData(form), o = {};
    ['formule', 'tour', 'periode', 'nom', 'email', 'tel', 'message'].forEach(function (k) { o[k] = fd.get(k) || ''; });
    o.voyageurs = nbVoy; o.whatsapp = $('#d-wa').checked;
    IA.store.set(DRAFT, JSON.stringify(o));
  }
  function loadDraft() {
    var o; try { o = JSON.parse(IA.store.get(DRAFT) || 'null'); } catch (e) { o = null; }
    if (!o) return;
    ['nom', 'email', 'tel', 'message'].forEach(function (k) { var el = form.elements[k]; if (el && !el.value && o[k]) el.value = o[k]; });
    if (o.voyageurs) { nbVoy = o.voyageurs; voy.value = voy.textContent = String(nbVoy); }
    if (o.whatsapp) $('#d-wa').checked = true;
  }
  form.addEventListener('input', saveDraft);
  form.addEventListener('change', function (e) { saveDraft(); if (e.target.id === 'd-tour') renderCard(); });

  function show(n) {
    step = n;
    steps.forEach(function (s) { s.hidden = +s.getAttribute('data-step') !== n; });
    nav.hidden = n === 4;
    prev.hidden = n === 0;
    next.innerHTML = n === 3 ? 'Envoyer la demande <svg aria-hidden="true"><use href="#i-arrow"/></svg>' : 'Continuer <svg aria-hidden="true"><use href="#i-arrow"/></svg>';
    var p = Math.min(n, 3) / 3;
    fill.style.width = 'calc((100% - 12px) * ' + p + ')';
    car.style.left = 'calc((100% - 12px) * ' + p + ')';
    marks.forEach(function (m, i) { m.classList.toggle('is-done', i <= Math.min(n, 3)); });
    var cur = steps.filter(function (s) { return !s.hidden; })[0];
    if (cur && window.gsap && !IA.calm) gsap.from(cur, { opacity: 0, x: 24, duration: 0.6, ease: 'expo.out' });
    var f = cur && cur.querySelector('input:not([type=hidden]), select, textarea, button');
    if (f && n > 0) f.focus({ preventScroll: true });
    panel.scrollTop = 0;
  }

  function open(trigger) {
    lastFocus = D.activeElement;
    var formule = trigger && trigger.getAttribute('data-devis-formule');
    var tour = trigger && trigger.getAttribute('data-devis-tour');
    var periode = trigger && trigger.getAttribute('data-devis-periode');
    if (formule) $$('input[name="formule"]', dv).forEach(function (r) { r.checked = r.value === formule; });
    if (tour) {
      var sel = $('#d-tour'), found = false;
      $$('option', sel).forEach(function (o) { if (o.textContent === tour) { sel.value = o.value || o.textContent; found = true; } });
      if (!found) { var o = D.createElement('option'); o.textContent = tour; sel.appendChild(o); sel.value = tour; }
      var isGuide = /guidé/.test(tour);
      if (!formule) $$('input[name="formule"]', dv).forEach(function (r) { r.checked = r.value === (isGuide ? 'Séjour guidé' : 'Autotour'); });
    }
    if (periode) {
      var ps = $('#d-periode'), ok = false;
      $$('option', ps).forEach(function (o) { if (o.textContent === periode) ok = true; });
      if (!ok) { var op = D.createElement('option'); op.textContent = periode; ps.insertBefore(op, ps.firstChild); }
      ps.value = periode;
    }
    loadDraft();
    renderListe();
    if (trigger && trigger.hasAttribute('data-devis-liste')) {
      var favs = IA.favs ? IA.favs() : [];
      if (favs.length) { var sel0 = $('#d-tour'); sel0.value = CBYID[favs[0]].name; }
      $$('input[name="formule"]', dv).forEach(function (r) { r.checked = r.value === 'Sur mesure, à définir'; });
    }
    renderCard();
    show(0);
    dv.classList.add('is-open'); dv.setAttribute('aria-hidden', 'false');
    if (IA.lenis) IA.lenis.stop();
    D.documentElement.style.overflow = 'hidden';
    D.documentElement.classList.add('devis-open');
    IA.closeMenu && IA.closeMenu();
    window.setTimeout(function () { var c = $('input[name="formule"]:checked', dv); (c || panel).focus({ preventScroll: true }); }, 60);
  }
  function close() {
    dv.classList.remove('is-open'); dv.setAttribute('aria-hidden', 'true');
    if (IA.lenis) IA.lenis.start();
    D.documentElement.style.overflow = '';
    D.documentElement.classList.remove('devis-open');
    if (step === 4) { form.reset(); nbVoy = 4; voy.value = voy.textContent = '4'; }
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  IA.openDevis = open;

  D.addEventListener('click', function (e) {
    var t = e.target.closest('[data-devis]');
    if (t) { e.preventDefault(); open(t); return; }
    if (e.target.closest('[data-devis-close]') && dv.classList.contains('is-open')) close();
  });
  D.addEventListener('keydown', function (e) {
    if (!dv.classList.contains('is-open')) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'Tab') {
      var f = $$('button, a[href], input, select, textarea', panel).filter(function (el) { return !el.disabled && el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && D.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && D.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  $$('[data-voy]', dv).forEach(function (b) {
    b.addEventListener('click', function () {
      nbVoy = Math.max(1, Math.min(12, nbVoy + (+b.getAttribute('data-voy'))));
      voy.value = voy.textContent = String(nbVoy);
    });
  });

  function err(input, on) {
    var e = input.parentElement.querySelector('.err');
    if (e) e.hidden = !on;
    input.setAttribute('aria-invalid', on ? 'true' : 'false');
  }
  function validContact() {
    var ok = true, nom = $('#d-nom'), mail = $('#d-mail'), rg = $('#d-rgpd');
    if (!nom.value.trim()) { err(nom, true); ok = false; } else err(nom, false);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail.value.trim())) { err(mail, true); ok = false; } else err(mail, false);
    var re = $('[data-err-rgpd]', dv); re.hidden = rg.checked; if (!rg.checked) ok = false;
    if (!ok) { var bad = $('[aria-invalid="true"]', dv) || rg; bad.focus(); }
    return ok;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function recap() {
    var fd = new FormData(form);
    var rows = [
      ['Formule', fd.get('formule')], ['Voyage', fd.get('tour')], ['Période', fd.get('periode')],
      ['Voyageurs', nbVoy + (nbVoy > 1 ? ' personnes' : ' personne')], ['Nom', fd.get('nom')], ['E-mail', fd.get('email')]
    ];
    if (fd.get('tel')) rows.push(['Téléphone', fd.get('tel')]);
    var liste = fd.getAll('liste');
    if (liste.length) rows.push(['Ma liste d’envies', liste.join(' · ')]);
    if ($('#d-wa').checked) rows.push(['Rappel', 'Sur WhatsApp, de préférence']);
    if (fd.get('message')) rows.push(['Message', fd.get('message')]);
    $('[data-recap]', dv).innerHTML = rows.map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd></div>'; }).join('');
  }
  next.addEventListener('click', function () {
    if (step === 2 && !validContact()) return;
    if (step === 2) recap();
    show(step + 1);
    if (step === 4) {
      IA.store.set(DRAFT, '');
      var st = $('[data-done-stamp]', dv);
      if (st && window.gsap && !IA.calm) gsap.fromTo(st, { scale: 2.6, opacity: 0, rotation: -28 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.8, ease: 'back.out(2.4)', delay: 0.15 });
      if (window.gsap && !IA.calm) gsap.from($$('.nexts li', dv), { x: 20, opacity: 0, stagger: 0.1, duration: 0.7, delay: 0.5 });
    }
  });
  prev.addEventListener('click', function () { show(Math.max(0, step - 1)); });
  form.addEventListener('submit', function (e) { e.preventDefault(); });
})();
