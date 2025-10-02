"use strict";

class ProfileModel {
  constructor(containerID, properties) {
    this.container = document.getElementById(containerID);
    this.properties = properties;
  }

  render(featureCollection) {
    let profile = ``;

    if (featureCollection.length == 1) {
      const feature = featureCollection[0];

      profile = `
      <header class="profile-content" id="profile-header">
        <h2 id="profile-name">
          ${feature?.properties["historical_name"] || "Unnamed"}
        </h2>
        <button id="profile-close" title="Close Side Panel">
          <img src="./assets/icons/close.svg" alt="Close">
        </button>
      </header>
      <section class="profile-content" id="profile-fields"></section>
    `;

      this.container.innerHTML = profile;

      for (const property of this.properties) {
        this.container.querySelector("#profile-fields").innerHTML +=
          ProfileModel._createFieldItem(
            property,
            feature?.properties[property]
          );
      }

      this.container.classList.add("active");
    } else {
      clear();
    }
  }

  clear() {
    this.container.classList.remove("active");
    this.container.innerHTML = ``;
  }

  static _createFieldItem(name, value) {
    const fieldItem = `
      <div class="field-item">
        <h3 class="field-name">${name.replace(/_/g, " ")}</h3>
        <p class="field-value">${value}</p>
      </div>
    `;

    return fieldItem;
  }
}
