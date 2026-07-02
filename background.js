// Scenic-but-quiet background layer. Three variants, one canvas.
//
//   stars    - sparse drifting starfield with slow twinkle
//   contours - faint topographic ridgelines, barely moving
//   grain    - deep off-black gradient with living film grain
//   off      - nothing (flat #000)
//
// Pick locally: a small switcher appears only on file:// or localhost, or
// force one with ?bg=stars|contours|grain|off (persists via localStorage).
// Once a winner is chosen, hardcode it in DEFAULT below and the switcher
// code can be deleted.
(function () {
  var DEFAULT = 'stars'; // <- hardcode the winning variant here
  var VARIANTS = ['stars', 'contours', 'grain', 'off'];

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isLocal = location.protocol === 'file:' ||
    location.hostname === 'localhost' || location.hostname === '127.0.0.1';

  var param = new URLSearchParams(location.search).get('bg');
  if (param && VARIANTS.indexOf(param) !== -1) {
    try { localStorage.setItem('bg-variant', param); } catch (e) {}
  }
  var variant;
  try { variant = localStorage.getItem('bg-variant'); } catch (e) {}
  if (VARIANTS.indexOf(variant) === -1) variant = DEFAULT;

  var canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;';
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  var W, H, dpr, raf = 0, stopped = false;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.width = Math.floor(innerWidth * dpr);
    H = canvas.height = Math.floor(innerHeight * dpr);
  }

  /* ---------- stars ---------- */
  var stars = null;
  function makeStars() {
    var n = Math.round((W * H) / (dpr * dpr) / 11000); // ~ sparse
    stars = [];
    for (var i = 0; i < n; i++) {
      stars.push({
        x: Math.random(), y: Math.random(),
        r: (0.4 + Math.random() * 0.8) * dpr,
        a: 0.10 + Math.random() * 0.30,        // base alpha
        tw: 0.5 + Math.random() * 1.6,          // twinkle rate
        ph: Math.random() * Math.PI * 2,        // twinkle phase
        vx: (Math.random() - 0.5) * 0.000012,   // drift, fraction of screen/frame
        vy: (Math.random() - 0.5) * 0.000008
      });
    }
  }
  function drawStars(t) {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      if (!reduced) {
        s.x = (s.x + s.vx + 1) % 1;
        s.y = (s.y + s.vy + 1) % 1;
      }
      var a = s.a * (reduced ? 1 : (0.7 + 0.3 * Math.sin(t * 0.001 * s.tw + s.ph)));
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(234,232,227,' + a.toFixed(3) + ')';
      ctx.fill();
    }
  }

  /* ---------- contours ---------- */
  function drawContours(t) {
    ctx.clearRect(0, 0, W, H);
    var lines = 16;
    var drift = reduced ? 0 : t * 0.000045;
    ctx.lineWidth = 1 * dpr;
    for (var i = 0; i < lines; i++) {
      var baseY = (H * (i + 0.5)) / lines;
      var amp1 = H * 0.028, amp2 = H * 0.012;
      var f1 = 1.6 + (i % 5) * 0.35, f2 = 3.9 + (i % 3) * 0.6;
      var p1 = i * 1.7 + drift, p2 = i * 0.9 - drift * 1.6;
      ctx.beginPath();
      for (var x = 0; x <= W; x += 6 * dpr) {
        var nx = x / W;
        var y = baseY +
          amp1 * Math.sin(nx * Math.PI * f1 + p1) +
          amp2 * Math.sin(nx * Math.PI * f2 + p2);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(234,232,227,' + (0.020 + 0.012 * (i % 3)).toFixed(3) + ')';
      ctx.stroke();
    }
  }

  /* ---------- grain ---------- */
  var grainTiles = null, grainIdx = 0, lastGrainSwap = 0;
  function makeGrain() {
    grainTiles = [];
    for (var k = 0; k < 3; k++) {
      var tile = document.createElement('canvas');
      tile.width = tile.height = 160;
      var tc = tile.getContext('2d');
      var img = tc.createImageData(160, 160);
      for (var i = 0; i < img.data.length; i += 4) {
        var v = 200 + Math.random() * 55;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = Math.random() < 0.5 ? 0 : 14; // sparse, faint
      }
      tc.putImageData(img, 0, 0);
      grainTiles.push(tile);
    }
  }
  function drawGrain(t) {
    var g = ctx.createRadialGradient(W * 0.32, H * 0.12, 0, W * 0.32, H * 0.12, Math.max(W, H) * 1.05);
    g.addColorStop(0, '#0b0a08');
    g.addColorStop(0.55, '#040403');
    g.addColorStop(1, '#000');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    if (!reduced && t - lastGrainSwap > 120) { // ~8fps grain, calm not fizzy
      grainIdx = (grainIdx + 1) % grainTiles.length;
      lastGrainSwap = t;
    }
    ctx.save();
    ctx.fillStyle = ctx.createPattern(grainTiles[grainIdx], 'repeat');
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  /* ---------- run loop ---------- */
  function frame(t) {
    if (stopped) return;
    if (variant === 'stars') drawStars(t);
    else if (variant === 'contours') drawContours(t);
    else if (variant === 'grain') drawGrain(t);
    if (!reduced && variant !== 'off') raf = requestAnimationFrame(frame);
  }

  function start() {
    cancelAnimationFrame(raf);
    stopped = false;
    resize();
    if (variant === 'off') { ctx.clearRect(0, 0, W, H); return; }
    if (variant === 'stars' && !stars) makeStars();
    if (variant === 'grain' && !grainTiles) makeGrain();
    if (reduced) { frame(performance.now()); } // single static frame
    else { raf = requestAnimationFrame(frame); }
  }

  window.addEventListener('resize', function () {
    resize();
    if (variant === 'stars') makeStars();
    if (reduced) frame(performance.now());
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { stopped = true; cancelAnimationFrame(raf); }
    else start();
  });

  start();

  /* ---------- local-only switcher ---------- */
  if (isLocal) {
    var bar = document.createElement('div');
    bar.style.cssText = [
      'position:fixed;left:14px;bottom:14px;z-index:400;display:flex;gap:6px;',
      'font-family:Satoshi, sans-serif;font-size:11px;letter-spacing:0.8px;',
      'text-transform:uppercase;user-select:none'
    ].join('');
    VARIANTS.forEach(function (v) {
      var b = document.createElement('button');
      b.textContent = v;
      b.style.cssText = [
        'padding:6px 10px;border-radius:6px;cursor:pointer;',
        'background:rgba(5,5,5,0.8);color:#918d85;',
        'border:1px solid ' + (v === variant ? '#c3955b' : '#24211e'),
        ';font:inherit;letter-spacing:inherit;text-transform:inherit'
      ].join('');
      b.addEventListener('click', function () {
        variant = v;
        try { localStorage.setItem('bg-variant', v); } catch (e) {}
        Array.prototype.forEach.call(bar.children, function (c) {
          c.style.borderColor = c.textContent === v ? '#c3955b' : '#24211e';
        });
        stars = null; // rescale to current size
        start();
      });
      bar.appendChild(b);
    });
    document.body.appendChild(bar);
  }
})();
