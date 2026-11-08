/* Arya Udhas — portfolio interactions
   Type out the name, reveal on scroll, highlight the current section,
   set the year, copy the email. Small enough to read in one sitting. */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- type the name ---- */
  var typed = document.getElementById("typed");
  if (typed) {
    var fullName = typed.textContent.trim();

    if (reduceMotion) {
      typed.textContent = fullName;
    } else {
      typed.textContent = "";
      var i = 0;
      var typeTimer = window.setInterval(function () {
        i += 1;
        typed.textContent = fullName.slice(0, i);
        if (i >= fullName.length) window.clearInterval(typeTimer);
      }, 85);
    }
  }

  /* ---- reveal on scroll ---- */
  var revealables = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    revealables.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealables.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---- highlight the section you're reading ---- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  var sections = navLinks
    .map(function (link) {
      return document.getElementById(link.getAttribute("href").slice(1));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var visible = new Map();

    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        var bestId = null;
        var bestRatio = 0;
        visible.forEach(function (ratio, id) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        navLinks.forEach(function (link) {
          if (bestId && link.getAttribute("href") === "#" + bestId) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ---- footer year ---- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---- copy email ---- */
  var copyBtn = document.querySelector("[data-copy]");
  if (copyBtn) {
    var copyText = copyBtn.querySelector(".copy-text");
    var original = copyText ? copyText.textContent : "";
    var resetTimer = null;

    copyBtn.addEventListener("click", function () {
      var value = copyBtn.getAttribute("data-copy");

      var done = function (ok) {
        if (!copyText) return;
        copyText.textContent = ok ? "Copied ✓" : "Press Ctrl+C";
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(function () {
          copyText.textContent = original;
        }, 1800);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(value).then(
          function () { done(true); },
          function () { done(false); }
        );
      } else {
        done(false);
      }
    });
  }
})();
