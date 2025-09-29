class ProfileModel {
  constructor(containerId, fields) {
    this.container = document.getElementById(containerId);
    this.fields = fields;
  }

  render(properties) {
    const profile = `
      <header class="profile-content" id="profile-header">
        <h2 id="profile-name">${properties["historical_name"] || "Unnamed"}</h2>
        <button id="profile-close" title="Close Profile">
          <img src="./assets/icons/close.svg" alt="Close">
        </button>
      </header>
      <section class="profile-content" id="profile-fields"></section>
    `;

    this.container.innerHTML = profile;

    const fieldsContainer = this.container.querySelector("#profile-fields");
    this.fields.forEach((field) => {
      if (properties[field]) {
        fieldsContainer.innerHTML += `
          <div class="field-item">
            <h3 class="field-name">${field.replace(/_/g, " ")}</h3>
            <p class="field-value">${properties[field]}</p>
          </div>
        `;
      }
    });

    this.container.classList.add("active");
  }

  clear() {
    this.container.innerHTML = "";
    this.container.classList.remove("active");
  }
}
