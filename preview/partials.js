// Shared header / footer / tweaks panel — injected on every page
(function () {
  const path = location.pathname.split('/').pop() || 'index.html';
  const isHome = path === 'index.html' || path === '';
  const projectsActive = path.startsWith('project-') || path === 'projects.html';

  const header = `
    <header class="site-header">
      <div class="wrap site-header__row">
        <a href="index.html" class="brand">Sidak <em>Plaha</em></a>
        <nav class="nav">
          <a href="index.html" class="${isHome ? 'is-active' : ''}">Index</a>
          <a href="projects.html" class="${projectsActive ? 'is-active' : ''}">Work</a>
          <a href="about.html" class="${path === 'about.html' ? 'is-active' : ''}">About</a>
          <a href="mailto:sidakplaha1164@gmail.com">Contact</a>
        </nav>
      </div>
    </header>
  `;

  const footer = `
    <footer class="site-footer">
      <div class="wrap">
        <p class="site-footer__big reveal">Let's <em>build</em> something.</p>
        <div class="site-footer__row">
          <div>
            <div>SIDAK PLAHA · LONDON · ${new Date().getFullYear()}</div>
            <div style="margin-top:.3rem">MEng Aerospace Engineering · Queen Mary University of London</div>
          </div>
          <ul>
            <li><a href="mailto:sidakplaha1164@gmail.com">sidakplaha1164@gmail.com ↗</a></li>
            <li><a href="https://www.linkedin.com/in/sidak-plaha-6a4011278/" target="_blank" rel="noopener">LinkedIn ↗</a></li>
            <li><a href="https://github.com/sidakp" target="_blank" rel="noopener">GitHub ↗</a></li>
          </ul>
        </div>
      </div>
    </footer>
  `;

  const tweaks = `
    <aside class="tweaks" aria-label="Tweaks">
      <div class="tweaks__head"><span>Tweaks</span><button onclick="document.querySelector('.tweaks').classList.remove('on')" aria-label="close">×</button></div>
      <div class="tweaks__body">
        <div class="tweaks__row">
          <span>Accent</span>
          <div class="tweaks__opts" id="tw-accent">
            <button class="tweaks__swatch" data-a="oklch(0.58 0.11 45)" data-ai="oklch(0.42 0.12 40)" style="background:oklch(0.58 0.11 45)"></button>
            <button class="tweaks__swatch" data-a="oklch(0.55 0.08 220)" data-ai="oklch(0.4 0.09 225)" style="background:oklch(0.55 0.08 220)"></button>
            <button class="tweaks__swatch" data-a="oklch(0.58 0.08 150)" data-ai="oklch(0.42 0.09 150)" style="background:oklch(0.58 0.08 150)"></button>
            <button class="tweaks__swatch" data-a="oklch(0.5 0.02 0)" data-ai="oklch(0.35 0.02 0)" style="background:oklch(0.5 0.02 0)"></button>
          </div>
        </div>
        <div class="tweaks__row">
          <span>Mode</span>
          <div class="tweaks__opts" id="tw-mode">
            <button class="tweaks__opt" data-v="light">Warm</button>
            <button class="tweaks__opt" data-v="dark">Dark</button>
          </div>
        </div>
        <div class="tweaks__row">
          <span>Density</span>
          <div class="tweaks__opts" id="tw-density">
            <button class="tweaks__opt" data-v="compact">Compact</button>
            <button class="tweaks__opt" data-v="default">Default</button>
            <button class="tweaks__opt" data-v="spacious">Spacious</button>
          </div>
        </div>
      </div>
    </aside>
  `;

  const init = () => {
    document.body.insertAdjacentHTML('afterbegin', header);
    document.body.insertAdjacentHTML('beforeend', footer);
    document.body.insertAdjacentHTML('beforeend', tweaks);

    // Wire tweaks
    const saved = window.__sp?.get?.() || {};
    const markAccent = (a) => {
      document.querySelectorAll('#tw-accent .tweaks__swatch').forEach(b => b.classList.toggle('on', b.dataset.a === a));
    };
    const markOpt = (sel, v) => {
      document.querySelectorAll(`${sel} .tweaks__opt`).forEach(b => b.classList.toggle('on', b.dataset.v === (v || 'default')));
    };

    document.querySelectorAll('#tw-accent .tweaks__swatch').forEach(b => {
      b.addEventListener('click', () => {
        window.__sp.set('accent', b.dataset.a);
        window.__sp.set('accent-ink', b.dataset.ai);
        markAccent(b.dataset.a);
      });
    });
    document.querySelectorAll('#tw-mode .tweaks__opt').forEach(b => {
      b.addEventListener('click', () => { window.__sp.set('mode', b.dataset.v); markOpt('#tw-mode', b.dataset.v); });
    });
    document.querySelectorAll('#tw-density .tweaks__opt').forEach(b => {
      b.addEventListener('click', () => {
        window.__sp.set('density', b.dataset.v);
        if (b.dataset.v === 'default') document.documentElement.removeAttribute('data-density');
        markOpt('#tw-density', b.dataset.v);
      });
    });

    markAccent(saved.accent || 'oklch(0.58 0.11 45)');
    markOpt('#tw-mode', saved.mode || 'light');
    markOpt('#tw-density', saved.density || 'default');
  };
  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
