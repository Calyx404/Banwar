document.addEventListener("DOMContentLoaded", () => {
  document.body.style.overflow = "hidden";

  const splash = document.createElement("div");
  splash.innerHTML = Loading();
  document.body.appendChild(splash.firstElementChild);

  splash.innerHTML = Loading();

  setTimeout(() => {
    const splashEl = document.querySelector(".splash-container");
    splashEl.remove();
    document.body.style.overflow = "";
  }, 6000);
});

function Loading() {
  return `
    <div class="splash-container">
      <header id="splash-header">
        <button onclick="document.location='index.html'" title="Back to Home">
          <img src="./assets/icons/left.svg" alt="Back">
          <span>Go Back</span>
        </button>
      </header>
      <main id="splash-main">
        <div id="story">
          <img id="character" src="./assets/images/dance.gif" alt="Igorot">
          <p id="storyline">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, asperiores!</p>
        </div>
        <h4 class="status">Saglet...</h4>
      </main>
    </div>
  `;
}
