/* Carte de Namibie en SVG : fonds Natural Earth, itinéraires en trace de pneus, étapes, zoom */
(function () {
  'use strict';
  var IA = window.IA, M = window.IA_MAP, DATA = window.IA_DATA;
  if (!M || !DATA) return;
  var NS = 'http://www.w3.org/2000/svg', uid = 0, P = DATA.places;

  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function proj(lon, lat) { return [(lon - M.proj.lon0) * M.proj.cos * M.proj.k, (M.proj.lat0 - lat) * M.proj.k]; }
  function pt(id) { var p = P[id]; return proj(p.lon, p.lat); }
  function segs(pts) {
    var out = [];
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      var c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      var c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      out.push(' C' + c1[0].toFixed(1) + ',' + c1[1].toFixed(1) + ' ' + c2[0].toFixed(1) + ',' + c2[1].toFixed(1) + ' ' + p2[0].toFixed(1) + ',' + p2[1].toFixed(1));
    }
    return out;
  }
  function dedupe(ids) { return ids.filter(function (id, i) { return i === 0 || id !== ids[i - 1]; }); }

  function NamMap(container, o) {
    o = o || {};
    this.c = container; this.W = M.w; this.H = M.h; this.stops = {};
    this.vb = { x: 0, y: 0, w: M.w, h: M.h };
    var svg = this.svg = el('svg', { viewBox: '0 0 ' + M.w + ' ' + M.h, preserveAspectRatio: o.slice ? 'xMidYMid slice' : 'xMidYMid meet', 'aria-hidden': 'true', focusable: 'false' });
    container.appendChild(svg);
    this.defs = el('defs', {}, svg);
    var base = el('g', { 'class': 'm-base' }, svg);
    el('rect', { 'class': 'm-ocean', x: -600, y: -600, width: M.w + 1200, height: M.h + 1200 }, base);
    var sw = el('g', { 'class': 'm-ocean-lines' }, base);
    for (var i = 0; i < 11; i++) {
      var y = 60 + i * 86, d = 'M -40 ' + y;
      for (var x = -40; x < 420; x += 40) d += ' q 20 ' + (i % 2 ? 7 : -7) + ' 40 0';
      el('path', { d: d, 'vector-effect': 'non-scaling-stroke' }, sw);
    }
    M.lands.slice().sort(function (a) { return a.code === 'NAM' ? 1 : -1; }).forEach(function (l) {
      el('path', { d: l.d, 'class': l.code === 'NAM' ? 'm-nam' : 'm-land', 'vector-effect': 'non-scaling-stroke' }, base);
    });
    M.pans.forEach(function (p) { el('path', { d: p.d, 'class': 'm-pan', 'vector-effect': 'non-scaling-stroke' }, base); });
    M.rivers.forEach(function (r) { el('path', { d: r.d, 'class': 'm-river', 'vector-effect': 'non-scaling-stroke' }, base); });
    var lab = this.labels = el('g', { 'class': 'm-labels' }, svg);
    [['Océan Atlantique', 12.55, -24.6, -72, 'm-label m-label--sea'], ['Angola', 15.2, -16.9, 0, 'm-label'], ['Zambie', 24.2, -16.95, 0, 'm-label'],
     ['Botswana', 23.2, -22.7, 0, 'm-label'], ['Afrique du Sud', 21.6, -28.9, 0, 'm-label'], ['Etosha Pan', 16.3, -18.45, 0, 'm-label m-label--pan']].forEach(function (L) {
      var q = proj(L[1], L[2]);
      var t = el('text', { x: q[0], y: q[1], 'class': L[4], 'text-anchor': 'middle', transform: L[3] ? 'rotate(' + L[3] + ' ' + q[0] + ' ' + q[1] + ')' : null }, lab);
      t.textContent = L[0];
    });
    this.routeLayer = el('g', {}, svg);
    this.stopLayer = el('g', {}, svg);
  }

  NamMap.prototype.addRoute = function (ids, o) {
    o = o || {};
    ids = dedupe(ids);
    var pts = ids.map(pt), s = segs(pts);
    var d = 'M' + pts[0][0].toFixed(1) + ',' + pts[0][1].toFixed(1) + s.join('');
    if (o.ghost) el('path', { d: d, 'class': 'm-route-ghost', 'vector-effect': 'non-scaling-stroke' }, this.routeLayer);
    var id = 'mk' + (++uid);
    var mask = el('mask', { id: id, maskUnits: 'userSpaceOnUse', x: -200, y: -200, width: M.w + 400, height: M.h + 400 }, this.defs);
    var mp = el('path', { d: d, fill: 'none', stroke: '#fff', 'stroke-width': 18, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, mask);
    var g = el('g', { mask: 'url(#' + id + ')' }, this.routeLayer);
    el('path', { d: d, 'class': 'm-route-base', 'vector-effect': 'non-scaling-stroke' }, g);
    el('path', { d: d, 'class': 'm-route-tread', 'vector-effect': 'non-scaling-stroke' }, g);
    var total = mp.getTotalLength();
    var tmp = el('path', {}, this.defs), lens = [0], acc = 'M' + pts[0][0].toFixed(1) + ',' + pts[0][1].toFixed(1);
    for (var i = 0; i < s.length; i++) { acc += s[i]; tmp.setAttribute('d', acc); lens.push(tmp.getTotalLength()); }
    tmp.remove();
    mp.style.strokeDasharray = (total + 40) + ' ' + (total + 40);
    var r = {
      ids: ids, pts: pts, total: total, lens: lens, cur: 0, g: g,
      set: function (L) { r.cur = L; mp.style.strokeDashoffset = Math.max(0, total + 40 - L - (L >= total ? 40 : 0)); },
      progress: function (p) { r.set(total * p); },
      lengthAt: function (idx) { return lens[Math.max(0, Math.min(lens.length - 1, idx))]; },
      indexOf: function (stopId, from) { for (var i = from || 0; i < ids.length; i++) if (ids[i] === stopId) return i; return -1; }
    };
    r.set(o.full ? total : 0);
    return r;
  };

  NamMap.prototype.allRoutes = function (list) {
    var g = el('g', { 'class': 'm-all' }, this.routeLayer), out = {};
    list.forEach(function (c) {
      var ids = dedupe(c.route), pts = ids.map(pt);
      out[c.id] = el('path', { d: 'M' + pts[0][0].toFixed(1) + ',' + pts[0][1].toFixed(1) + segs(pts).join(''), 'vector-effect': 'non-scaling-stroke', 'data-id': c.id }, g);
    });
    return out;
  };

  NamMap.prototype.addStops = function (ids, o) {
    o = o || {};
    var self = this, seen = {};
    ids.forEach(function (id) {
      if (seen[id] || !P[id]) return; seen[id] = 1;
      var q = pt(id), right = (P[id].lon > 21 && (o.right || []).indexOf(id) < 0) || (o.left || []).indexOf(id) >= 0;
      var dy = (o.below || []).indexOf(id) >= 0 ? 13 : (o.above || []).indexOf(id) >= 0 ? -13 : 0;
      var g = el('g', { 'class': 'm-stop' + ((o.labels || []).indexOf(id) >= 0 ? ' is-label' : ''), 'data-stop': id }, self.stopLayer);
      var pulse = el('circle', { 'class': 'm-pulse', cx: q[0], cy: q[1], r: 10 }, g);
      var c = el('circle', { cx: q[0], cy: q[1], r: id === 'windhoek' ? 6 : 5 }, g);
      var t = el('text', { x: q[0] + (right ? -12 : 12), y: q[1] + 5, 'text-anchor': right ? 'end' : 'start' }, g);
      t.textContent = P[id].n;
      self.stops[id] = { g: g, c: c, t: t, pulse: pulse, x: q[0], y: q[1], right: right, dy: dy, r: id === 'windhoek' ? 6 : 5 };
    });
    this.scaleStops();
  };

  NamMap.prototype.setStops = function (onIds, current) {
    var on = {}; (onIds || []).forEach(function (id) { on[id] = 1; });
    for (var id in this.stops) {
      var s = this.stops[id];
      s.g.classList.toggle('is-on', !!on[id]);
      s.g.classList.toggle('is-current', id === current);
      s.pulse.classList.toggle('is-on', id === current && !IA.calm);
    }
    this.scaleStops();
  };

  NamMap.prototype.scaleStops = function () {
    var k = this.vb.w / this.W;
    for (var id in this.stops) {
      var s = this.stops[id], cur = s.g.classList.contains('is-current');
      s.c.setAttribute('r', ((cur ? 9 : s.r) * k).toFixed(2));
      s.c.style.strokeWidth = (cur ? 3 : 2) * k;
      s.pulse.setAttribute('r', (10 * k).toFixed(2));
      s.t.style.fontSize = (14 * k).toFixed(2) + 'px';
      s.t.style.strokeWidth = (4 * k).toFixed(2) + 'px';
      s.t.setAttribute('x', s.x + (s.right ? -13 : 13) * k);
      s.t.setAttribute('y', s.y + (5 + s.dy) * k);
    }
    var lk = this.vb.w / this.W;
    this.labels.style.opacity = lk < 0.75 ? 0 : 1;
  };

  NamMap.prototype.applyVB = function () {
    this.svg.setAttribute('viewBox', this.vb.x.toFixed(1) + ' ' + this.vb.y.toFixed(1) + ' ' + this.vb.w.toFixed(1) + ' ' + this.vb.h.toFixed(1));
    this.scaleStops();
  };

  NamMap.prototype.zoomTo = function (id, z, dur) {
    var s = this.stops[id] || { x: pt(id)[0], y: pt(id)[1] };
    var w = this.W / z, h = this.H / z;
    var x = Math.max(-40, Math.min(this.W - w + 40, s.x - w / 2));
    var y = Math.max(-40, Math.min(this.H - h + 40, s.y - h / 2));
    this.animVB({ x: x, y: y, w: w, h: h }, dur);
  };
  NamMap.prototype.reset = function (dur) { this.animVB({ x: 0, y: 0, w: this.W, h: this.H }, dur); };
  NamMap.prototype.animVB = function (to, dur) {
    var self = this;
    if (!window.gsap || IA.calm || dur === 0) { this.vb = to; this.applyVB(); return; }
    gsap.to(this.vb, { x: to.x, y: to.y, w: to.w, h: to.h, duration: dur == null ? 1.4 : dur, ease: 'power3.inOut', overwrite: true, onUpdate: function () { self.applyVB(); } });
  };

  IA.NamMap = NamMap;
  IA.proj = proj;
})();
