"use strict";

class Search {
  constructor() {
    this.geojsonPath = "./data/sites.export.geojson";
    this.features = [];
    this.isLoaded = false;
  }

  static async _loadGeojson() {
    if (this.isLoaded) return;
    try {
      const res = await fetch(this.geojsonPath);
      const data = await res.json();
      this.features = Array.isArray(data.features) ? data.features : [];
      this.isLoaded = true;
    } catch (error) {
      console.error("Error loading GeoJSON: ", error);
      this.features = [];
    }
  }

  // Redirect to Map
  loadFeature() {}

  async find(query = "") {
    await Search._loadGeojson();

    if (!query || !String(query).trim()) {
      return this.features.slice();
    }

    return this.features.filter(
      (feature) =>
        feature?.properties?.historical_name &&
        feature.properties.historical_name
          .toLowerCase()
          .includes(String(query).toLowerCase())
    );
  }

  static _validateInputQuery(input, results) {
    const query = input.value.replace(/[<>]/g, "").trim();

    // Missing input
    if (!query) {
      results.innerHTML = "";
      results.classList.add("hide");
      return;
    }

    // Not exisiting
    if (matches.length === 0) {
      results.innerHTML = "<p>No results found.</p>";
      results.classList.remove("hide");
      return;
    }
  }

  renderResults() {
    const form = document.getElementById("header-search");
    const input = form.querySelector("input[name='search']");
    const results = form.querySelector("#search-results");

    input.addEventListener("input", async () => {
      Search._validateInputQuery(input, results);

      const matches = await Search.find(query);
      console.log("Typing query:", query, "matches:", matches.length);

      results.innerHTML = matches
        .map(
          (f) => `
            <div class="search-result" data-name="${encodeURIComponent(
              f.properties.historical_name
            )}">
              ${escapeHtml(f.properties.historical_name)}
            </div>`
        )
        .join("");
      results.classList.remove("hide");

      results.querySelectorAll(".search-result").forEach((item) => {
        item.addEventListener("click", () => {
          const name = item.dataset.name;
          window.location.href = `./map.html?search=${name}`;
        });
      });
    });

    // Submit
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const query = Search._validateInputQuery(input.value);

      const matches = await search.find(query);
      if (matches.length > 0) {
        const name = encodeURIComponent(matches[0].properties.historical_name);
        window.location.href = `./map.html?search=${name}`;
      }
    });

    // Hide when clicking outside
    document.addEventListener("click", (e) => {
      if (!form.contains(e.target)) {
        results.classList.add("hide");
      }
    });
  }

  static _createResultItem() {}

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
}
