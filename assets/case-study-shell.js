// SHARED PROJECT ROUTE HELPERS: restore the saved theme and keep the footer year current.
(function () {
  "use strict";
  // Match the visitor's homepage theme preference on each project page.
  try {
    if (localStorage.getItem("desloper-theme") === "light") document.documentElement.dataset.theme = "light";
  } catch (error) {}
  // Project-route footer uses this class (the homepage uses its own single year element).
  document.querySelectorAll(".copyright-year").forEach(function (item) {
    item.textContent = String(new Date().getFullYear());
  });
}());
