// Quiet scroll-reveal: cards/entries fade-rise as they enter the viewport.
// Skipped entirely for reduced-motion users or without IntersectionObserver
// (content just renders normally).
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  var els = document.querySelectorAll('.book-card, .comp-card, .entry, .comp-section, .log-entry');
  if (!els.length) return;

  document.documentElement.classList.add('js-reveal');

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      io.unobserve(en.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });

  els.forEach(function (el, i) {
    el.classList.add('rv');
    // small stagger for whatever is visible on load; capped so deep content
    // never waits on a long queue
    el.style.transitionDelay = Math.min(i * 60, 240) + 'ms';
    el.addEventListener('transitionend', function h() {
      el.style.transitionDelay = '';
      el.removeEventListener('transitionend', h);
    });
    io.observe(el);
  });
})();
