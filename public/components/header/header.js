document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("header").innerHTML = Header();
    initThemeToggle();
});

function Header() {
    return `
        <section class="header-item" id="header-logo">
            <img src="./assets/logos/logo-name-dark.png" alt="Banwar" class="logo-name">
        </section>

        <section class="header-item" id="header-feature">
            <div class="feature-item" id="header-buttons">
                <div id="header-theme">
                    <button id="header-icon" title="Change Theme">
                        <img src="./assets/icons/sun.svg" alt="Theme">
                    </button>
                </div>
                <button id="header-export" title="Export Data">
                    <img src="./assets/icons/archive.svg" alt="Export">
                </button>
            </div>
            <div class="separator"></div>
            <form action="./map.html" class="feature-item" id="header-search">
                <input type="search" name="search" placeholder="Explore the Cordillera!">
                <button type="submit" form="header-search" value="Search" title="Explore Map">
                    <img src="./assets/icons/search.svg" alt="Explore">
                </button>
            </form>
        </section>
    `;
}

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
