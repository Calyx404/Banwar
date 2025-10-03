export class SearchView {
  constructor(bus, service, containerId = "header-search") {
    this.bus = bus;
    this.service = service;
    this.container = document.getElementById(containerId);
  }

  init() {
    if (!this.container) {
      console.warn("SearchView: container not found:", this.containerId);
      return;
    }
    const input = this.container.querySelector("input");
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
            ${this._escapeHtml(f.properties?.historical_name || "Unnamed")}
          </div>`
        )
        .join("");

      // CSS already handles visibility (#header-search #search-results)
      results.querySelectorAll(".search-result").forEach((el) =>
        el.addEventListener("click", () => {
          this.bus.emit("feature:selected", { id: el.dataset.id });
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
