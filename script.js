(function () {
  var root = document.documentElement;

  // Theme toggle (persists per browser; falls back to OS preference)
  var themeBtn = document.getElementById('theme-toggle');
  themeBtn.addEventListener('click', function () {
    var current = root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    var next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Mobile menu
  var menuBtn = document.getElementById('menu-toggle');
  var links = document.getElementById('nav-links');
  menuBtn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Active nav link on scroll
  var navAnchors = Array.prototype.slice.call(links.querySelectorAll('a'));
  var sections = navAnchors.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navAnchors.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) spy.observe(s); });

    // Reveal on scroll
    var revealEls = document.querySelectorAll('.section-title, .job, .feature, .card, .skill-group, .edu, .links');
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); reveal.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { el.classList.add('reveal'); reveal.observe(el); });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
