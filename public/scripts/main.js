document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
});

function initThemeToggle() {
  const root = document.documentElement;
  const toggleBtn = document.querySelector("#header-theme");
  const logoNames = document.querySelectorAll(".logo-name");

  const lightLogoName = "./assets/logos/logo-name-light.png";
  const darkLogoName = "./assets/logos/logo-name-dark.png";

  // Load saved theme (default: light)
  const savedTheme = localStorage.getItem("theme") || "light";
  root.setAttribute("data-theme", savedTheme);

  // Update all logo images
  logoNames.forEach(logo =>
    logo.setAttribute("src", savedTheme === "dark" ? lightLogoName : darkLogoName)
  );

  if (savedTheme === "dark") toggleBtn.classList.add("switch");

  // Toggle Handler
  toggleBtn.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";

    if (isDark) {
      // Switch to light mode
      root.setAttribute("data-theme", "light");
      logoNames.forEach(logo => logo.setAttribute("src", darkLogoName));
      localStorage.setItem("theme", "light");
      toggleBtn.classList.remove("switch");
    } else {
      // Switch to dark mode
      root.setAttribute("data-theme", "dark");
      logoNames.forEach(logo => logo.setAttribute("src", lightLogoName));
      localStorage.setItem("theme", "dark");
      toggleBtn.classList.add("switch");
    }
  });
}
