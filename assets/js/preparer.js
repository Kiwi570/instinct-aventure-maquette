/* Page « Préparer son voyage » : liste de départ à cocher (gardée sur l'appareil),
   carte des zones de paludisme d'après l'Institut Pasteur, sommaire actif. */
(function () {
  'use strict';
  var IA = window.IA, $ = IA.$, $$ = IA.$$, W = window, D = document, DATA = window.IA_DATA;

  function heroIn() {
    var heroBox = $('[data-gl]');
    var gl = IA.initGL ? IA.initGL(heroBox, { reveal: IA.calm ? 1 : 0.35, pos: '0.5 0.6' }) : null;
    if (!IA.hasGSAP || IA.calm) return;
    var split = IA.splitHero();
    var tl = gsap.timeline({ delay: 0.25 });
    if (split) tl.to(split.chars, { yPercent: 0, duration: 1.2, stagger: 0.02, ease: 'expo.out' }, 0);
    tl.from($$('[data-hero] [data-reveal]'), { y: 26, opacity: 0, stagger: 0.08, duration: 1.1 }, 0.2);
    var img = heroBox && heroBox.querySelector('img');
    if (img) tl.from(img, { scale: 1.12, duration: 2.4, ease: 'expo.out' }, 0);
    if (gl) tl.to(gl.uniforms.uReveal, { value: 1, duration: 1.8, ease: 'power2.out' }, 0);
  }

  /* ---- Liste de départ ---- */
  function initChecklist() {
    var box = $('[data-checklist]'); if (!box) return;
    var KEY = 'ia-depart', boxes = $$('input[type="checkbox"]', box), done = {};
    try { done = JSON.parse(IA.store.get(KEY) || '{}') || {}; } catch (e) { done = {}; }
    var stamp = $('[data-check-stamp]', box), bar = $('[data-check-bar]', box), wasAll = false, first = true;
    $$('[data-check-total]').forEach(function (el) { el.textContent = boxes.length; });
    boxes.forEach(function (b) { b.checked = !!done[b.value]; });
    function sync() {
      var n = boxes.filter(function (b) { return b.checked; }).length, all = n === boxes.length;
      $$('[data-check-done]').forEach(function (el) { el.textContent = n; });
      bar.style.transform = 'scaleX(' + (n / boxes.length) + ')';
      boxes.forEach(function (b) { b.closest('.tick').classList.toggle('is-done', b.checked); });
      $$('.check-group', box).forEach(function (g) {
        var bs = $$('input', g); g.classList.toggle('is-done', bs.every(function (b) { return b.checked; }));
      });
      stamp.hidden = !all;
      if (all && !wasAll && !first) {
        IA.announce && IA.announce('Tout est prêt : bon voyage !');
        if (W.gsap && !IA.calm) gsap.fromTo(stamp, { scale: 2.6, rotation: -24, opacity: 0 }, { scale: 1, rotation: -9, opacity: 1, duration: 0.55, ease: 'back.out(2.2)' });
      }
      wasAll = all; first = false;
    }
    box.addEventListener('change', function (e) {
      var b = e.target; if (!b.matches('input[type="checkbox"]')) return;
      done[b.value] = b.checked; IA.store.set(KEY, JSON.stringify(done));
      if (b.checked && W.gsap && !IA.calm) gsap.fromTo(b.closest('.tick'), { x: 6 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      sync();
    });
    $('[data-check-reset]', box).addEventListener('click', function () {
      boxes.forEach(function (b) { b.checked = false; }); done = {}; IA.store.set(KEY, '{}'); sync();
    });
    sync();
  }

  /* ---- Carte du paludisme ---- */
  function initPalu() {
    var host = $('[data-palu-map]'); if (!host || !IA.NamMap || !W.IA_MAP) return;
    var M = W.IA_MAP, NS = 'http://www.w3.org/2000/svg';
    var map = new IA.NamMap(host);
    function el(tag, a, p) { var e = D.createElementNS(NS, tag); for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
    function yOf(lat) { return (M.proj.lat0 - lat) * M.proj.k; }
    var nam = M.lands.filter(function (l) { return l.code === 'NAM'; })[0];
    var cid = 'palu-clip';
    var cp = el('clipPath', { id: cid }, map.defs); el('path', { d: nam.d }, cp);
    var zones = el('g', { 'class': 'p-zones', 'clip-path': 'url(#' + cid + ')' });
    map.svg.insertBefore(zones, map.labels);
    var yCut = yOf(-21.2);
    el('rect', { x: -100, y: -100, width: M.w + 200, height: yCut + 100, 'class': 'p-sais' }, zones);
    el('rect', { x: -100, y: yCut, width: M.w + 200, height: M.h, 'class': 'p-none' }, zones);
    el('line', { x1: 0, x2: M.w, y1: yCut, y2: yCut, 'class': 'p-cut', 'vector-effect': 'non-scaling-stroke' }, zones);
    /* Fleuves frontaliers du nord seulement : on coupe l'amont en Angola et le delta au Botswana */
    var x0 = (11.7 - M.proj.lon0) * M.proj.cos * M.proj.k, x1 = (25.3 - M.proj.lon0) * M.proj.cos * M.proj.k;
    var rc = el('clipPath', { id: 'palu-riv' }, map.defs);
    el('rect', { x: x0, y: yOf(-17.15), width: x1 - x0, height: yOf(-18.4) - yOf(-17.15) }, rc);
    var riv = el('g', { 'class': 'p-rivers', 'clip-path': 'url(#palu-riv)' });
    map.svg.insertBefore(riv, map.labels);
    M.rivers.forEach(function (r) {
      if (['Okavango', 'Cunene', 'Zambezi'].indexOf(r.name) >= 0) el('path', { d: r.d, 'class': 'p-perm', 'vector-effect': 'non-scaling-stroke' }, riv);
    });
    map.addStops(['windhoek'], { labels: ['windhoek'] });
    map.setStops(['windhoek'], null);

    /* Voyages qui longent l'Okavango et le Zambèze */
    var list = $('[data-palu-trips]'); if (!list) return;
    var hit = DATA.circuits.filter(function (c) { return c.regions.indexOf('okavango') >= 0; });
    var seen = {}, uniq = hit.filter(function (c) { var k = c.page.split('#')[0]; if (seen[k]) return false; seen[k] = 1; return true; });
    list.innerHTML = '<p><b>Nos voyages qui passent par l’Okavango et le Caprivi</b>, en zone de risque toute l’année :</p><div class="palu__chips">' +
      uniq.map(function (c) { return '<button type="button" class="fbtn" data-palu-trip="' + c.id + '" aria-pressed="false">' + (c.short || c.name) + '</button>'; }).join('') + '</div>';
    var cur = null;
    function routeIds(c) {
      var f = DATA.fiches[c.page.split('#')[0].replace('.html', '')];
      return f && IA.routeOf ? IA.routeOf(f.days).ids : (f ? ['windhoek'].concat(f.days.map(function (d) { return d.stop; })) : c.route);
    }
    list.addEventListener('click', function (e) {
      var b = e.target.closest('[data-palu-trip]'); if (!b) return;
      var c = DATA.circuits.filter(function (x) { return x.id === b.getAttribute('data-palu-trip'); })[0];
      var on = b.getAttribute('aria-pressed') !== 'true';
      $$('[data-palu-trip]', list).forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      map.clear();
      if (on) {
        b.setAttribute('aria-pressed', 'true');
        var r = map.addRoute(routeIds(c), { ghost: false });
        if (W.gsap && !IA.calm) map.car(r);
        map.addStops(r.ids, { labels: ['windhoek'] }); map.setStops(r.ids, null);
        if (W.gsap && !IA.calm) { var o = { p: 0 }; gsap.to(o, { p: 1, duration: 1.4, ease: 'power2.inOut', onUpdate: function () { r.progress(o.p); } }); } else r.progress(1);
      } else { map.addStops(['windhoek'], { labels: ['windhoek'] }); map.setStops(['windhoek'], null); }
    });
  }

  /* ---- Sommaire actif ---- */
  function initSubnav() {
    var links = $$('[data-subnav] nav a'); if (!links.length || !('IntersectionObserver' in W)) return;
    var map = {}; links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('is-on'); });
        var a = map[e.target.id]; if (a) { a.classList.add('is-on'); a.scrollIntoView({ block: 'nearest', inline: 'center' }); }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) { var s = D.getElementById(id); if (s) io.observe(s); });
  }

  IA.ready(function () { initChecklist(); initPalu(); initSubnav(); heroIn(); });
})();
