/* ============================================================
   CAREVIDER — SHARED NAV BEHAVIOR
   Mobile menu toggle + auto-close + aria-expanded sync.
   Loaded with `defer` on every page. No inline nav JS needed.
   ============================================================ */
(function () {
  "use strict";

  var toggle = document.querySelector(".menu-toggle");
  var links  = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  // Ensure correct initial ARIA state.
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", "primary-nav");

  function setState(open) {
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  // Toggle on hamburger click.
  toggle.addEventListener("click", function () {
    setState(!links.classList.contains("open"));
  });

  // Auto-close when a nav link is clicked (was the old bottom script).
  links.addEventListener("click", function (e) {
    if (e.target.closest("a")) setState(false);
  });

  // Close on Escape for keyboard users.
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && links.classList.contains("open")) {
      setState(false);
      toggle.focus();
    }
  });

  // If resized up to desktop while open, reset state so it doesn't
  // linger as an open dropdown when the horizontal nav takes over.
  var mq = window.matchMedia("(min-width: 961px)");
  function handleMq(e) { if (e.matches) setState(false); }
  if (mq.addEventListener) mq.addEventListener("change", handleMq);
  else if (mq.addListener) mq.addListener(handleMq); // older Safari
})();
