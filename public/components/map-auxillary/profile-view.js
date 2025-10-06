export class ProfileView {
  constructor(bus, containerId, fields = []) {
    this.bus = bus;
    this.container = document.getElementById(containerId);
    this.fields = fields;
  }

  init() {
    if (!this.container) {
      console.warn("ProfileView: container not found:", this.container);
      return;
    }

    // Listen to feature events
    this.bus.on("feature:selected", ({ id, feature }) => {
      if (feature) {
        this.render(feature);
      }
    });

    this.bus.on("feature:cleared", () => {
      this.clear();
    });
  }

  render(feature) {
    if (!this.container) return;

    try {
      if (!feature || !feature.properties) {
        this.clear();
        return;
      }

      const name = feature.properties["historical_name"] || "Unnamed";

      let html = `
        <header class="profile-content" id="profile-header">
          <h2 id="profile-name">${this._escapeHtml(name)}</h2>
          <button id="profile-close" title="Close Side Panel">
            <img src="./assets/icons/close.svg" alt="Close">
          </button>
        </header>
        <section class="profile-content" id="profile-fields"></section>
      `;

      this.container.innerHTML = html;
      const fieldsContainer = this.container.querySelector("#profile-fields");

      this.fields.forEach((field) => {
        const val = feature.properties[field];
        if (val) fieldsContainer.innerHTML += this._createFieldItem(field, val);
      });

      this.container.classList.add("active");

      const closeBtn = this.container.querySelector("#profile-close");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          this.bus.emit("feature:cleared");
        });
      }
    } catch (e) {
      console.error("ProfileView.render error:", e);
      this.clear();
    }
  }

  clear() {
    if (!this.container) return;
    this.container.classList.remove("active");
    this.container.innerHTML = "";
  }

  _createFieldItem(name, value) {
    return `
      <div class="field-item">
        <h3 class="field-name">${this._escapeHtml(name.replace(/_/g, " "))}</h3>
        <p class="field-value">${this._escapeHtml(value)}</p>
      </div>
    `;
  }

  _escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
}
