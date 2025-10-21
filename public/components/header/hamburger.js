document.addEventListener("DOMContentLoaded", () => {
    const headerElement = document.getElementById("header");

    if (!headerElement) {
        console.error("Static <header id='header'> element not found.");
        return;
    }

    const observer = new MutationObserver((mutationList, obs) => {
        const featureSection = document.getElementById("header-feature");
        const buttonsSection = document.getElementById("header-buttons");

        if (featureSection && buttonsSection) {
            const hamburgerBtn = document.createElement("button");
            hamburgerBtn.id = "header-hamburger";
            hamburgerBtn.title = "Menu";
            hamburgerBtn.innerHTML = `<img src="./assets/icons/backend.svg" alt="Menu" class="icon" />`;

            featureSection.appendChild(hamburgerBtn);

            hamburgerBtn.addEventListener("click", () => {
                buttonsSection.classList.toggle("is-open");
            });

            obs.disconnect();
        }
    });

    observer.observe(headerElement, {
        childList: true,
        subtree: false,
    });
});