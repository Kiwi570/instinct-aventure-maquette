/* Effet « mirage » en WebGL sur la photo d'ouverture : la chaleur ondule au-dessus du sol
   et sous la souris, et la lumière passe de la nuit à l'aube au chargement. */
(function () {
  'use strict';
  var IA = window.IA, W = window;

  var vertex = 'attribute vec2 uv; attribute vec2 position; varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }';
  var fragment = [
    'precision highp float;',
    'uniform sampler2D tMap; uniform float uTime, uMouseAmt, uReveal, uScroll; uniform vec2 uRes, uImg, uMouse, uPos;',
    'varying vec2 vUv;',
    'float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }',
    'float noise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);',
    '  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y); }',
    'vec2 cover(vec2 uv){ float rs = uRes.x / uRes.y; float ri = uImg.x / uImg.y;',
    '  vec2 s = rs > ri ? vec2(1.0, ri / rs) : vec2(rs / ri, 1.0); return uv * s + (1.0 - s) * uPos; }',
    'void main(){',
    '  vec2 uv = vUv;',
    '  float z = 1.0 - 0.07 * (1.0 - uReveal) - 0.05 * uScroll;',
    '  uv = (uv - 0.5) * z + 0.5; uv.y += uScroll * 0.03;',
    '  float ground = smoothstep(0.6, 0.0, vUv.y);',
    '  float n1 = noise(vec2(uv.x * 7.0, uv.y * 42.0 - uTime * 1.5));',
    '  float n2 = noise(vec2(uv.x * 16.0 + uTime * 0.25, uv.y * 95.0 - uTime * 2.3));',
    '  vec2 haze = vec2((n1 - 0.5) * 0.006 + (n2 - 0.5) * 0.003, (n2 - 0.5) * 0.0035) * (0.25 + ground);',
    '  vec2 d = vUv - uMouse; d.x *= uRes.x / uRes.y;',
    '  float mh = smoothstep(0.3, 0.0, length(d)) * uMouseAmt;',
    '  haze += vec2(sin(vUv.y * 140.0 - uTime * 6.0), cos(vUv.x * 100.0 + uTime * 4.0)) * 0.0045 * mh;',
    '  vec3 col = texture2D(tMap, cover(uv + haze)).rgb;',
    '  float lum = dot(col, vec3(0.299, 0.587, 0.114));',
    '  vec3 night = vec3(lum * 0.22, lum * 0.25, lum * 0.4);',
    '  vec3 dawn = col * mix(vec3(1.12, 0.84, 0.74), vec3(1.0), smoothstep(0.45, 1.0, uReveal));',
    '  col = mix(night, dawn, smoothstep(0.0, 0.8, uReveal));',
    '  col += vec3(0.95, 0.45, 0.2) * 0.1 * max(0.0, 1.0 - abs(uReveal - 0.55) * 2.4) * smoothstep(0.25, 0.7, vUv.y);',
    '  vec2 q = vUv - 0.5; col *= 1.0 - dot(q, q) * 0.32;',
    '  gl_FragColor = vec4(col, 1.0);',
    '}'
  ].join('\n');

  IA.initGL = function (box, opts) {
    opts = opts || {};
    if (IA.calm || !W.OGL || !box) return null;
    var img = box.querySelector('img'); if (!img) return null;
    var renderer;
    try { renderer = new OGL.Renderer({ dpr: Math.min(1.5, W.devicePixelRatio || 1), alpha: false, antialias: false, powerPreference: 'low-power' }); } catch (e) { return null; }
    var gl = renderer.gl; if (!gl) return null;
    gl.clearColor(0.07, 0.06, 0.05, 1);
    var texture = new OGL.Texture(gl, { generateMipmaps: false, minFilter: gl.LINEAR, magFilter: gl.LINEAR, wrapS: gl.CLAMP_TO_EDGE, wrapT: gl.CLAMP_TO_EDGE });
    var pos = (opts.pos || '0.5 0.5').split(' ').map(parseFloat);
    var U = {
      tMap: { value: texture }, uTime: { value: 0 }, uRes: { value: [1, 1] }, uImg: { value: [img.naturalWidth || 16, img.naturalHeight || 9] },
      uMouse: { value: [0.5, 0.5] }, uMouseAmt: { value: 0 }, uReveal: { value: opts.reveal != null ? opts.reveal : 1 }, uScroll: { value: 0 }, uPos: { value: [pos[0], 1 - pos[1]] }
    };
    var program;
    try { program = new OGL.Program(gl, { vertex: vertex, fragment: fragment, uniforms: U }); } catch (e) { return null; }
    var mesh = new OGL.Mesh(gl, { geometry: new OGL.Triangle(gl), program: program });
    box.appendChild(gl.canvas);
    gl.canvas.setAttribute('aria-hidden', 'true');

    var ready = false, visible = true, raf = 0, t0 = performance.now(), target = { x: 0.5, y: 0.5, amt: 0 }, lastMove = 0;
    function load() {
      var im = new Image();
      im.decoding = 'async';
      im.onload = function () {
        texture.image = im;
        U.uImg.value = [im.naturalWidth, im.naturalHeight];
        ready = true; resize();
        box.classList.add('gl-ready');
      };
      im.src = img.currentSrc || img.src;
    }
    if (img.complete && img.naturalWidth) load(); else img.addEventListener('load', load, { once: true });

    function resize() {
      var w = box.clientWidth, h = box.clientHeight; if (!w || !h) return;
      renderer.setSize(w, h);
      U.uRes.value = [w, h];
    }
    if ('ResizeObserver' in W) new ResizeObserver(resize).observe(box); else W.addEventListener('resize', resize);

    var host = box.parentElement;
    host.addEventListener('pointermove', function (e) {
      var r = box.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width; target.y = 1 - (e.clientY - r.top) / r.height; target.amt = 1; lastMove = performance.now();
    }, { passive: true });
    host.addEventListener('pointerleave', function () { target.amt = 0; });

    function frame(now) {
      raf = 0;
      if (!visible || D.hidden) return;
      U.uTime.value = (now - t0) / 1000;
      if (now - lastMove > 1400) target.amt = 0;
      U.uMouse.value = [U.uMouse.value[0] + (target.x - U.uMouse.value[0]) * 0.08, U.uMouse.value[1] + (target.y - U.uMouse.value[1]) * 0.08];
      U.uMouseAmt.value += (target.amt - U.uMouseAmt.value) * 0.05;
      var hh = box.offsetHeight || 1;
      U.uScroll.value = Math.max(0, Math.min(1, W.pageYOffset / hh));
      if (ready) renderer.render({ scene: mesh });
      raf = W.requestAnimationFrame(frame);
    }
    var D = document;
    if ('IntersectionObserver' in W) new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      if (visible && !raf) raf = W.requestAnimationFrame(frame);
    }).observe(box);
    D.addEventListener('visibilitychange', function () { if (!D.hidden && visible && !raf) raf = W.requestAnimationFrame(frame); });
    raf = W.requestAnimationFrame(frame);
    gl.canvas.addEventListener('webglcontextlost', function (e) { e.preventDefault(); box.classList.remove('gl-ready'); ready = false; });
    return { uniforms: U, canvas: gl.canvas };
  };
})();
