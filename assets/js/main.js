// Reveal on scroll + light interactions
(function () {
  var io = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });

  document.addEventListener('DOMContentLoaded', function () {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) io.observe(reveals[i]);

    // Animate the hero J2 orbit diagram if present
    var svg = document.getElementById('orbitSvg');
    if (svg) {
      var s1 = document.getElementById('sat1');
      var s2 = document.getElementById('sat2');
      var cx = 260, cy = 260;
      var rxA = 180, ryA = 90, rotA = -18;
      var rxB = 180, ryB = 90, rotB = 22;
      var rad = function (d) { return d * Math.PI / 180; };
      var pt = function (t, rx, ry, rot) {
        var x = rx * Math.cos(t);
        var y = ry * Math.sin(t);
        var r = rad(rot);
        return [cx + x * Math.cos(r) - y * Math.sin(r),
                cy + x * Math.sin(r) + y * Math.cos(r)];
      };
      var start = performance.now();
      var frame = function (now) {
        var t = (now - start) / 1000;
        var a = pt(t * 0.6, rxA, ryA, rotA);
        var b = pt(t * 0.55 + 1.4, rxB, ryB, rotB);
        s1.setAttribute('cx', a[0]); s1.setAttribute('cy', a[1]);
        s2.setAttribute('cx', b[0]); s2.setAttribute('cy', b[1]);
        requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    }
  });
})();
