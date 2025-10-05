export class SearchView {
  constructor(bus, service, containerId = "header-search") {
    this.bus = bus;
    this.service = service;
    this.containerId = containerId;
  }

  init() {
    this.container = document.getElementById(this.containerId);

    if (!this.container) {
      console.warn("SearchView: container not found:", this.containerId);
      return;
    }
    const input = this.container.querySelector("input[type='search']");
    const results = this.container.querySelector("#search-results");

    if (!input || !results) {
      console.warn("SearchView: missing input or results element.");
      return;
    }

    input.addEventListener("input", async () => {
      const q = input.value.trim();

      if (!q) {
        results.innerHTML = "";
        return;
      }

      const matches = await this.service.search(q);
      results.innerHTML = matches
        .map(
          (f) => `
          <div class="search-result" data-id="${f.__fid}">
            <img src="./assets/icons/${this._escapeHtml(
              f.properties?.icon || "map.svg"
            )}" alt="${this._escapeHtml(f.properties?.category || "Icon")}">
            <div class="result-description">
              <h4>
                ${this._escapeHtml(f.properties?.historical_name || "Unnamed")}
              </h4>
              <p>
                ${this._escapeHtml(f.properties?.category || "Uncategorized")}
              </p>
            </div>
          </div>`
        )
        .join("");

      // CSS already handles visibility (#header-search #search-results)
      results.querySelectorAll(".search-result").forEach((el) =>
        el.addEventListener("click", () => {
          const feature = this.service.getById(el.dataset.id);
          if (feature) {
            this.bus.emit("feature:selected", { feature });
          } else {
            console.warn(
              "[SearchView] Feature not found for id:",
              el.dataset.id
            );
          }
          results.innerHTML = "";
        })
      );
    });
  }

  _escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
}
