(function () {
  var root = document.documentElement;
  var button = document.getElementById("theme-toggle");
  var storageKey = "theme";

  function apply(theme) {
    var dark = theme === "dark";
    root.classList.toggle("theme-dark", dark);
    if (!button) {
      return;
    }
    button.setAttribute("aria-pressed", dark ? "true" : "false");
    button.textContent = dark ? "Mode clair" : "Mode sombre";
  }

  var saved = null;
  try {
    saved = localStorage.getItem(storageKey);
  } catch (error) {
    saved = null;
  }

  var initial = saved;
  if (initial !== "dark" && initial !== "light") {
    initial = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  apply(initial);

  if (!button) {
    return;
  }

  button.addEventListener("click", function () {
    var next = root.classList.contains("theme-dark") ? "light" : "dark";
    apply(next);
    try {
      localStorage.setItem(storageKey, next);
    } catch (error) {
      /* stockage indisponible */
    }
  });
})();
