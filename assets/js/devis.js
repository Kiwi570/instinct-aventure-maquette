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
    show(0);
    dv.classList.add('is-open'); dv.setAttribute('aria-hidden', 'false');
    if (IA.lenis) IA.lenis.stop();
    D.documentElement.style.overflow = 'hidden';
    IA.closeMenu && IA.closeMenu();
    window.setTimeout(function () { var c = $('input[name="formule"]:checked', dv); (c || panel).focus({ preventScroll: true }); }, 60);
  }
  function close() {
    dv.classList.remove('is-open'); dv.setAttribute('aria-hidden', 'true');
    if (IA.lenis) IA.lenis.start();
    D.documentElement.style.overflow = '';
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
    if (fd.get('message')) rows.push(['Message', fd.get('message')]);
    $('[data-recap]', dv).innerHTML = rows.map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd></div>'; }).join('');
  }
  next.addEventListener('click', function () {
    if (step === 2 && !validContact()) return;
    if (step === 2) recap();
    show(step + 1);
  });
  prev.addEventListener('click', function () { show(Math.max(0, step - 1)); });
  form.addEventListener('submit', function (e) { e.preventDefault(); });
})();
