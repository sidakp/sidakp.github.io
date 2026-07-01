// Translucent page-view counter, pinned bottom-centre.
// Fetches /api/views (a Vercel serverless function). If the count isn't
// available (local dev, KV not configured), the widget never appears.
(function () {
  var DIM = 'rgba(234,232,227,0.16)';
  var LIT = 'rgba(234,232,227,0.5)';

  var el = document.createElement('div');
  el.id = 'view-counter';
  el.style.cssText = [
    'position:fixed',
    'left:50%',
    'bottom:16px',
    'transform:translateX(-50%)',
    'z-index:150',
    'font-family:Satoshi, sans-serif',
    'font-size:11px',
    'font-weight:500',
    'letter-spacing:1.6px',
    'text-transform:uppercase',
    'color:' + DIM,
    'white-space:nowrap',
    'user-select:none',
    'pointer-events:auto',
    'transition:color 0.45s ease'
  ].join(';');

  // Faint by default; only resolves when you look/hover directly.
  el.addEventListener('mouseenter', function () { el.style.color = LIT; });
  el.addEventListener('mouseleave', function () { el.style.color = DIM; });

  fetch('/api/views', { method: 'POST' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (!data || data.views == null) return;
      el.textContent = Number(data.views).toLocaleString() + ' views';
      document.body.appendChild(el);
    })
    .catch(function () { /* stay hidden */ });
})();
