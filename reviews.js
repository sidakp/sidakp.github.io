// Click the review cover to blow it up in a centred lightbox.
(function () {
  var cover = document.querySelector('.review-cover');
  if (!cover) return;

  cover.setAttribute('role', 'button');
  cover.setAttribute('tabindex', '0');
  cover.setAttribute('aria-label', 'Enlarge cover');

  var box = null;

  function close() {
    if (!box) return;
    box.classList.remove('open');
    var el = box;
    box = null;
    document.body.style.overflow = '';
    setTimeout(function () { el.remove(); }, 220);
    cover.focus();
  }

  function open() {
    if (box) return;
    box = document.createElement('div');
    box.className = 'lightbox';
    var img = document.createElement('img');
    img.src = cover.getAttribute('src');
    img.alt = cover.getAttribute('alt') || '';
    box.appendChild(img);
    document.body.appendChild(box);
    document.body.style.overflow = 'hidden';
    // next frame so the transition runs
    requestAnimationFrame(function () { box.classList.add('open'); });
    box.addEventListener('click', close);
  }

  cover.addEventListener('click', open);
  cover.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && box) close();
  });
})();
