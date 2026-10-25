/* Liste d'envies : cœurs sur les voyages, compteur dans l'en-tête, tiroir, jointe au devis.
   La liste reste dans le navigateur du visiteur (localStorage). */
(function () {
  'use strict';
  var IA = window.IA, $ = IA.$, $$ = IA.$$, D = document, W = window, DATA = window.IA_DATA;
  var C = {}; DATA.circuits.forEach(function (c) { C[c.id] = c; });
  var KEY = 'ia-envies', list = [];
  try { list = JSON.parse(IA.store.get(KEY) || '[]').filter(function (id) { return C[id]; }); } catch (e) { list = []; }
  function save() { IA.store.set(KEY, JSON.stringify(list)); }
  IA.favs = function () { return list.slice(); };

  var toast = $('[data-toast]'), tt;
  IA.toast = function (msg) {
    if (!toast) return;
    toast.textContent = msg; toast.classList.add('is-on');
    W.clearTimeout(tt); tt = W.setTimeout(function () { toast.classList.remove('is-on'); }, 2600);
  };

  function sync() {
    $$('[data-fav]').forEach(function (b) {
      var on = list.indexOf(b.getAttribute('data-fav')) >= 0;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      var c = C[b.getAttribute('data-fav')];
      if (c) b.setAttribute('aria-label', (on ? 'Retirer ' : 'Ajouter ') + c.name + (on ? ' de ma liste d’envies' : ' à ma liste d’envies'));
    });
    $$('[data-envies-count]').forEach(function (el) { el.textContent = list.length; el.hidden = !list.length; });
    renderDrawer();
  }
  IA.favSync = sync;

  function burst(btn) {
    if (!W.gsap || IA.calm) return;
    gsap.fromTo(btn, { scale: 0.6 }, { scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    var r = btn.getBoundingClientRect();
    for (var i = 0; i < 7; i++) {
      var p = D.createElement('i');
      p.className = 'heart-spark';
      p.style.left = (r.left + r.width / 2) + 'px'; p.style.top = (r.top + r.height / 2) + 'px';
      D.body.appendChild(p);
      var a = (i / 7) * Math.PI * 2;
      gsap.to(p, { x: Math.cos(a) * 34, y: Math.sin(a) * 34, opacity: 0, scale: 0.4, duration: 0.7, ease: 'power3.out', onComplete: function () { this.targets()[0].remove(); } });
    }
    var counter = $('.hd [data-envies-count]');
    if (counter && !counter.hidden) gsap.fromTo(counter, { scale: 1.8 }, { scale: 1, duration: 0.6, ease: 'back.out(3)' });
  }

  D.addEventListener('click', function (e) {
    var b = e.target.closest('[data-fav]'); if (!b) return;
    e.preventDefault(); e.stopPropagation();
    var id = b.getAttribute('data-fav'), i = list.indexOf(id);
    if (i >= 0) { list.splice(i, 1); IA.toast(C[id].name + ' retiré de votre liste.'); }
    else { list.push(id); burst(b); IA.toast(C[id].name + ' ajouté à votre liste d’envies.'); }
    save(); sync();
  });

  /* ---- Tiroir ---- */
  var dr = $('#envies'), last = null;
  function renderDrawer() {
    if (!dr) return;
    var box = $('[data-envies-list]', dr), empty = $('[data-envies-empty]', dr), foot = $('[data-envies-foot]', dr);
    empty.hidden = list.length > 0; foot.hidden = list.length === 0;
    box.innerHTML = list.map(function (id) {
      var c = C[id];
      var when = c.formule === 'confirme' ? 'Départ ' + c.departLabel + (c.statut === 'complet' ? ' · complet' : '') : (c.periode || 'Dates à définir avec vous');
      return '<div class="envie"><img src="assets/img/' + c.img + '-640.webp" alt="" loading="lazy">' +
        '<div><a class="link" href="' + c.page + '">' + c.name + '</a><span>' + c.nuitsLabel + ' · ' + IA.euro(c.prix) + ' TTC par personne</span><span>' + when + '</span></div>' +
        '<button class="icon-btn" type="button" data-fav="' + id + '" aria-pressed="true" aria-label="Retirer de ma liste"><svg aria-hidden="true"><use href="#i-cross"/></svg></button></div>';
    }).join('');
  }
  function open() {
    last = D.activeElement;
    dr.classList.add('is-open'); dr.setAttribute('aria-hidden', 'false');
    if (IA.lenis) IA.lenis.stop();
    W.setTimeout(function () { var c = $('[data-drawer-close].devis__close', dr); if (c) c.focus({ preventScroll: true }); }, 60);
  }
  function close() {
    dr.classList.remove('is-open'); dr.setAttribute('aria-hidden', 'true');
    if (IA.lenis && !D.documentElement.classList.contains('devis-open')) IA.lenis.start();
    if (last && last.focus) last.focus({ preventScroll: true });
  }
  IA.closeDrawer = close;
  D.addEventListener('click', function (e) {
    if (e.target.closest('[data-envies-open]')) { e.preventDefault(); open(); }
    else if (e.target.closest('[data-drawer-close]')) close();
    else if (e.target.closest('[data-devis-liste]') && dr.classList.contains('is-open')) close();
  });
  D.addEventListener('keydown', function (e) { if (e.key === 'Escape' && dr && dr.classList.contains('is-open')) close(); });

  /* ---- Carnet de route : un tampon par région traversée ---- */
  var REGION_OF = {
    sesriem: 'namib', sossusvlei: 'namib', solitaire: 'namib',
    swakopmund: 'cote', walvisbay: 'cote',
    uis: 'damaraland', brandberg: 'damaraland', spitzkoppe: 'damaraland', palmwag: 'damaraland', twyfelfontein: 'damaraland', vingerklip: 'damaraland',
    okaukuejo: 'etosha', halali: 'etosha', namutoni: 'etosha', onguma: 'etosha',
    rundu: 'okavango', divundu: 'okavango', mahango: 'okavango',
    waterberg: 'waterberg', kalahari: 'kalahari', guma: 'botswana', dkar: 'botswana'
  };
  var REG = DATA.regions, RK = Object.keys(REG), CKEY = 'ia-carnet', got = [];
  try { got = JSON.parse(IA.store.get(CKEY) || '[]').filter(function (r) { return REG[r]; }); } catch (e) { got = []; }
  var slam = $('[data-slam]'), slamT;
  function renderCarnet() {
    var grid = $('[data-carnet]'); if (!grid) return;
    $$('[data-carnet-count]').forEach(function (el) { el.textContent = got.length + ' / ' + RK.length; });
    grid.innerHTML = RK.map(function (r, i) {
      var on = got.indexOf(r) >= 0;
      return '<span class="cstamp' + (on ? ' is-on' : '') + '" style="--rot:' + ((i * 37) % 17 - 8) + 'deg">' + REG[r] + '</span>';
    }).join('');
  }
  function earn(r) {
    if (!r || !REG[r] || got.indexOf(r) >= 0) return;
    got.push(r); IA.store.set(CKEY, JSON.stringify(got)); renderCarnet();
    var all = got.length === RK.length;
    if (slam) {
      slam.innerHTML = '<span class="stamp">' + REG[r] + '<small>' + (all ? 'carnet complet' : 'tampon ' + got.length + ' / ' + RK.length) + '</small></span>';
      slam.classList.add('is-on');
      if (W.gsap && !IA.calm) gsap.fromTo(slam.firstChild, { scale: 2.8, rotation: -28, opacity: 0 }, { scale: 1, rotation: -8, opacity: 1, duration: 0.5, ease: 'back.out(2.4)' });
      W.clearTimeout(slamT); slamT = W.setTimeout(function () { slam.classList.remove('is-on'); }, 2600);
    }
    IA.announce && IA.announce('Nouveau tampon dans votre carnet de route : ' + REG[r] + '.');
    if (all) W.setTimeout(function () { IA.toast('Carnet complet : toute la Namibie est tamponnée. Prêt pour la vraie piste ?'); }, 900);
  }
  IA.stampStop = function (stop) { earn(REGION_OF[stop]); };
  D.addEventListener('ia:day', function (e) { IA.stampStop(e.detail.stop); });
  var prevPiste = IA.onPisteDay;
  IA.onPisteDay = function (d, map, route) { if (prevPiste) prevPiste(d, map, route); IA.stampStop(d.stop); };
  renderCarnet();

  sync();
})();
