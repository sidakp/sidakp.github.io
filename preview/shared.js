// Shared behavior: reveal on scroll + tweaks panel + persistence
(function () {
  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
  const initReveal = () => document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  if (document.readyState !== 'loading') initReveal();
  else document.addEventListener('DOMContentLoaded', initReveal);

  // Restore saved tweaks
  const apply = (k, v) => {
    if (k === 'accent') document.documentElement.style.setProperty('--accent', v);
    if (k === 'accent-ink') document.documentElement.style.setProperty('--accent-ink', v);
    if (k === 'mode') document.documentElement.setAttribute('data-mode', v);
    if (k === 'density') document.documentElement.setAttribute('data-density', v);
  };
  const saved = JSON.parse(localStorage.getItem('sp_tweaks') || '{}');
  Object.entries(saved).forEach(([k, v]) => apply(k, v));

  // Expose for tweaks panel
  window.__sp = {
    set(k, v) {
      apply(k, v);
      const cur = JSON.parse(localStorage.getItem('sp_tweaks') || '{}');
      cur[k] = v;
      localStorage.setItem('sp_tweaks', JSON.stringify(cur));
      document.dispatchEvent(new CustomEvent('sp-tweak', { detail: { k, v } }));
    },
    get: () => JSON.parse(localStorage.getItem('sp_tweaks') || '{}'),
  };

  // Edit mode integration (Tweaks toolbar toggle)
  window.addEventListener('message', (e) => {
    const d = e.data || {};
    if (d.type === '__activate_edit_mode') document.querySelector('.tweaks')?.classList.add('on');
    if (d.type === '__deactivate_edit_mode') document.querySelector('.tweaks')?.classList.remove('on');
  });
  window.parent?.postMessage({ type: '__edit_mode_available' }, '*');
})();
