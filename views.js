// Translucent unique-visitor counter. Homepage only.
// Desktop: pinned bottom-centre. Mobile (<=560px): sits in normal flow after
// the footer, so it's only seen at the very bottom of the page.
// Fetches /api/views (a Vercel serverless function). If the count isn't
// available (local dev, KV not configured), the widget never appears.
(function () {
  var style = document.createElement('style');
  style.textContent = [
    '#view-counter{',
    '  position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:150;',
    '  font-family:Satoshi, sans-serif;font-size:11px;font-weight:500;',
    '  letter-spacing:1.6px;text-transform:uppercase;',
    '  color:rgba(234,232,227,0.16);white-space:nowrap;user-select:none;',
    '  transition:color 0.45s ease;',
    '}',
    '#view-counter:hover{color:rgba(234,232,227,0.5);}',
    '@media (max-width:560px){',
    '  #view-counter{',
    '    position:static;transform:none;display:block;',
    '    text-align:center;padding:28px 0 20px;',
    '  }',
    '}'
  ].join('\n');

  fetch('/api/views', { method: 'POST' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (!data || data.views == null) return;
      var el = document.createElement('div');
      el.id = 'view-counter';
      var n = Number(data.views);
      el.textContent = n.toLocaleString() + (n === 1 ? ' visitor' : ' visitors');
      document.head.appendChild(style);
      document.body.appendChild(el);
    })
    .catch(function () { /* stay hidden */ });
})();
