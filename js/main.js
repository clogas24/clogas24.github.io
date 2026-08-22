// Hero stat counters — count up from 0 to years-since(date) on load.
(function () {
  var stats = document.querySelectorAll("[data-count-to-date]");
  stats.forEach(function (el) {
    var start = new Date(el.getAttribute("data-count-to-date"));
    var years = (Date.now() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    var duration = 1200;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      el.textContent = (years * progress).toFixed(4);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  });
})();

// Scroll reveal — fade/slide sections in as they enter the viewport.
// To revert: delete this block, the ".reveal" rules in css/style.css,
// and the class="reveal" attributes in index.html.
(function () {
  var targets = document.querySelectorAll(".reveal");
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();
