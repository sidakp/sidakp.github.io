// Palette toggle: injects the sun/moon control into the fixed nav row.
(function () {
  var key = 'sidak-theme';
  var root = document.documentElement;
  var sun = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true"><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path></svg>';
  var moon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true"><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"></path></svg>';

  function getSavedTheme() {
    try {
      return localStorage.getItem(key) === 'dark' ? 'dark' : 'light';
    } catch (err) {
      return 'light';
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(key, theme);
    } catch (err) {
      /* ignore private-mode storage failures */
    }
  }

  function syncButton(button, theme) {
    if (!button) return;
    button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light palette' : 'Switch to dark palette');
    button.title = theme === 'dark' ? 'Switch to light palette' : 'Switch to dark palette';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    root.style.setProperty('--accent', theme === 'dark' ? '#c3955b' : '#88481E');
    document.querySelectorAll('.theme-toggle').forEach(function (button) {
      syncButton(button, theme);
    });
  }

  function mountToggle() {
    var nav = document.querySelector('.site-nav');
    if (!nav) return;

    var button = nav.querySelector('.theme-toggle');
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'theme-toggle';
      button.innerHTML = '<span class="theme-icon theme-icon-sun">' + sun + '</span><span class="theme-icon theme-icon-moon">' + moon + '</span>';
      nav.appendChild(button);
    }

    syncButton(button, root.getAttribute('data-theme') || 'light');
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest && event.target.closest('.theme-toggle');
    if (!button) return;
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    saveTheme(next);
  });

  applyTheme(getSavedTheme());
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountToggle);
  } else {
    mountToggle();
  }
})();

// Quiet scroll-reveal: cards/entries fade-rise as they enter the viewport.
// Skipped entirely for reduced-motion users or without IntersectionObserver
// (content just renders normally).
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  var els = document.querySelectorAll('.book-card, .entry, .comp-section, .log-entry');
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
