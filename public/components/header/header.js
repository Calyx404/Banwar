window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("header").innerHTML = Header();

  initTheme();

  document.dispatchEvent(new CustomEvent("header:ready"));
});

function Header() {
  return `
    <section class="header-item" id="header-logo">
      <img src="./assets/logos/logo-name-dark.png"
           alt="Banwar"
           class="logo-name"
           onclick="document.location='./index.html'">
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
      <form class="feature-item" id="header-search">
        <input type="search" name="search" placeholder="Explore the Cordillera!" />
        <div id="search-results"></div>
        <button type="submit" title="Explore Map">
          <img src="./assets/icons/search.svg" alt="Explore" />
        </button>
      </form>
    </section>
  `;
}

/**
 * Initialize theme toggle logic
 */
function initTheme() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("header-theme");
  const logoNames = document.getElementsByClassName("logo-name");
  const toggleBtn = document.getElementById("header-theme");
  const logoNames = document.getElementsByClassName("logo-name");

  const lightLogoName = "./assets/logos/logo-name-light.png";
  const darkLogoName = "./assets/logos/logo-name-dark.png";

  // Load saved theme (default: light)
  const savedTheme = localStorage.getItem("theme") || "light";
  root.setAttribute("data-theme", savedTheme);

  updateLogosAndButton(savedTheme === "dark");

  // Manual Toggle Theme Setting
  toggleBtn.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateLogosAndButton(newTheme === "dark");
  });

  function updateLogosAndButton(isDark) {
    Array.from(logoNames).forEach((logo) =>
      logo.setAttribute("src", isDark ? lightLogoName : darkLogoName)
    );
    toggleBtn.classList.toggle("switch", isDark);
  }
}
