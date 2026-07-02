// "Reading log" on book review pages. Fetches ./notes/<slug>.json
// (slug from the page's own filename, book-<slug>.html) and, if entries
// exist, renders them after the review body. No JSON / empty JSON ->
// the section simply never appears.
(function () {
  var m = location.pathname.match(/book-([a-z0-9-]+)\.html$/i);
  if (!m) return;

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];

  function ordinal(n) {
    if (n % 100 >= 11 && n % 100 <= 13) return n + 'th';
    return n + (['th', 'st', 'nd', 'rd'][n % 10] || 'th');
  }

  // "2026-06-15" -> "June 15th, 2026"
  function niceDate(iso) {
    var p = iso.split('-'); // YYYY-MM-DD
    if (p.length !== 3) return iso;
    return (MONTHS[parseInt(p[1], 10) - 1] || p[1]) + ' ' + ordinal(parseInt(p[2], 10)) + ', ' + p[0];
  }

  fetch('./notes/' + m[1] + '.json')
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (entries) {
      if (!entries || !entries.length) return;
      var body = document.querySelector('.review-body');
      if (!body) return;

      // two columns: review prose stays centre-left, log rides the right rail
      var layout = document.createElement('div');
      layout.className = 'review-layout';
      body.parentNode.insertBefore(layout, body);
      layout.appendChild(body);

      var section = document.createElement('aside');
      section.className = 'reading-log';

      var label = document.createElement('p');
      label.className = 'section-label';
      label.textContent = 'reading log';
      section.appendChild(label);

      var list = document.createElement('div');
      list.className = 'log-entries';
      section.appendChild(list);

      entries.forEach(function (e) {
        var entry = document.createElement('article');
        entry.className = 'log-entry';

        var meta = document.createElement('p');
        meta.className = 'log-meta';
        var bits = [niceDate(e.date)];
        if (e.time) bits.push(e.time);
        if (e.pages) bits.push(e.pages);
        meta.textContent = bits.join(' · ');
        entry.appendChild(meta);

        var text = document.createElement('div');
        text.className = 'log-body';
        text.innerHTML = e.html; // generated from Sidak's own vault by tools/publish-notes.ps1
        entry.appendChild(text);

        list.appendChild(entry);
      });

      layout.appendChild(section);
    })
    .catch(function () { /* stay hidden */ });
})();
