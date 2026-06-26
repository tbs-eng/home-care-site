/* ============================================================
   calculator.js — Carevider cost estimator
   Math (locked, matches homepage inline estimator):
     weekly  = rate × hours × days
     monthly = weekly × 4.33
   Self-guards: no-ops if calc inputs are absent (safe everywhere).
   ============================================================ */
(function () {
  "use strict";

  // ----------------------------------------------------------
  // PLACEHOLDER_RATES — hourly $/hr by care level.
  // TODO: replace with confirmed San Diego rates before launch.
  // These are intentionally NOT real figures (do not cite).
  // ----------------------------------------------------------
  var PLACEHOLDER_RATES = {
    companion: 30,    // [PLACEHOLDER] Companion care $/hr
    personal: 40,     // [PLACEHOLDER] Personal care $/hr
    specialized: 50   // [PLACEHOLDER] Specialized / dementia care $/hr
  };

  var WEEKS_PER_MONTH = 4.33;

  // Grab elements; bail out cleanly if this page has no calculator.
  var levelEl   = document.getElementById("calc-care-level");
  var hoursEl   = document.getElementById("calc-hours");
  var daysEl    = document.getElementById("calc-days");
  var weeklyEl  = document.getElementById("calc-weekly");
  var monthlyEl = document.getElementById("calc-monthly");

  if (!levelEl || !hoursEl || !daysEl || !weeklyEl || !monthlyEl) {
    return; // no-op guard — page has no calculator inputs
  }

  // Format a number as USD with no decimals (e.g., $1,234).
  function formatUSD(value) {
    if (!isFinite(value) || value <= 0) return "$0";
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      }).format(value);
    } catch (e) {
      return "$" + Math.round(value).toLocaleString("en-US");
    }
  }

  // Clamp a numeric input to a sane range; fall back to 0 if invalid.
  function clampNum(el, min, max) {
    var n = parseFloat(el.value);
    if (isNaN(n)) return 0;
    if (n < min) n = min;
    if (n > max) n = max;
    return n;
  }

  function recalc() {
    var rate  = PLACEHOLDER_RATES[levelEl.value] || 0;
    var hours = clampNum(hoursEl, 0, 24);
    var days  = clampNum(daysEl, 0, 7);

    var weekly  = rate * hours * days;
    var monthly = weekly * WEEKS_PER_MONTH;

    weeklyEl.textContent  = formatUSD(weekly);
    monthlyEl.textContent = formatUSD(monthly);
  }

  // Recalculate on any input change.
  levelEl.addEventListener("change", recalc);
  hoursEl.addEventListener("input", recalc);
  daysEl.addEventListener("input", recalc);

  // Initial render on load.
  recalc();
})();
