import { Carousel } from "../carousel/carousel.js";

export class AccountView {
  constructor(bus, containerId, excludeFields = []) {
    this.bus = bus;
    this.container = document.getElementById(containerId);
    this.excludeFields = new Set(excludeFields);
  }

  init(repo) {
    if (!this.container) {
      console.warn("AccountView: container not found");
      return;
    }

    const all = repo.getAll();
    if (all && all.length > 0) {
      this.render(all);
    }

    // render initial list once features are loaded (repo emits event)
    this.bus.on("features:loaded", () => this.render(repo.getAll()));

    this.bus.on("feature:selected", ({ feature }) => {
      if (feature) this.render([feature]);
    });

    this.bus.on("feature:cleared", () => this.render(repo.getAll()));
  }

  render(featureCollection = []) {
    if (!this.container) return;

    try {
      // top-level wrapper expected by CSS: account-item header + content
      const account = `
        <nav class="account-item" id="account-header"></nav>
        <div class="account-item" id="account-content"></div>
      `;
      this.container.innerHTML = account;

      if (featureCollection.length === 1) {
        // feature view (prototype default)
        this._bindAccountHeader("#account-header", featureCollection[0]);
        this._bindAccountContent("#account-content", featureCollection[0]);
      } else {
        // default view (prototype feature listing)
        this._bindAccountHeaderDefault("#account-header");
        this._bindAccountContentDefault("#account-content", featureCollection);
      }
    } catch (e) {
      console.error("AccountView.render error:", e);
      this.container.innerHTML = "<p>Error rendering account section</p>";
    }
  }

  _bindAccountHeader(headerID, feature) {
    try {
      const category = feature?.properties?.category || "Uncategorized";
      const historicalName = feature?.properties?.historical_name || "Unnamed";

      const header = `
        <nav class="account-title">
          <h4><a href="#map-account">${this._escapeHtml(
            category.toLowerCase()
          )}</a></h4>
          <div class="separator"></div>
          <h4><a href="#map-account">${this._escapeHtml(
            historicalName.toLowerCase()
          )}</a></h4>
          <div class="separator"></div>
        </nav>
        <button onclick="document.location='#main'">
          <img src="./assets/icons/top.svg" alt="Top">
          <span>Back to Top</span>
        </button>
      `;
      const headerEl = this.container.querySelector(headerID);
      if (headerEl) headerEl.innerHTML = header;
    } catch (e) {
      console.error("AccountView._bindAccountHeader error:", e);
    }
  }

  _bindAccountContent(contentID, feature) {
    try {
      const el = this.container.querySelector(contentID);
      if (!el) return;

      let content = "";
      const props = feature.properties || {};

      for (const [key, value] of Object.entries(props)) {
        if (this.excludeFields.has(key) || key == "icon") continue;
        const val = value ?? "Information not available.";
        content += AccountView._createContentItem(key, val);
      }

      el.innerHTML = content;
    } catch (e) {
      console.error("AccountView._bindAccountContent error:", e);
    }
  }

  _bindAccountHeaderDefault(headerID) {
    try {
      const header = `
        <nav class="account-title">
          <h4><a href="#map-account">All Categories</a></h4>
          <div class="separator"></div>
        </nav>
        <button onclick="document.location='#main'">
          <img src="./assets/icons/top.svg" alt="Top">
          <span>Back to Top</span>
        </button>
      `;
      const el = this.container.querySelector(headerID);
      if (el) el.innerHTML = header;
    } catch (e) {
      console.error("AccountView._bindAccountHeaderDefault error:", e);
    }
  }

  _bindAccountContentDefault(contentID, featureCollection) {
    try {
      const categories = {};
      for (const feature of featureCollection) {
        const category = feature.properties?.category || "Uncategorized";
        if (!categories[category]) {
          categories[category] = {
            icon: feature.properties?.icon || "icons/map.svg",
            className: "icon",
            features: [],
          };
        }
        categories[category].features.push(feature);
      }

      const content = `
      <section class="content-item content-carousel">
        <div id="account-carousel"></div>
        <div id="account-carousel-context"></div>
      </section>
    `;

      const el = this.container.querySelector(contentID);
      if (el) {
        el.innerHTML = content;
        this._initAccountCarousel(categories);
      }
    } catch (e) {
      console.error("AccountView._bindAccountContentDefault error:", e);
      const el = this.container.querySelector(contentID);
      if (el) el.innerHTML = "<p>Error rendering categories</p>";
    }
  }

  _initAccountCarousel(categories) {
    try {
      const carouselContainerSelector = "#account-carousel";
      const contextEl = document.getElementById("account-carousel-context");

      if (!document.querySelector(carouselContainerSelector) || !contextEl) {
        console.warn(
          "AccountView._initAccountCarousel: container/context not found"
        );
        return;
      }

      // Import dynamically (lazy load) to avoid circular imports at module top
      import("../carousel/carousel.js").then(({ Carousel }) => {
        const carousel = new Carousel(carouselContainerSelector, {
          autoplay: false,
        });

        carousel.init(categories, (activeKey) => {
          const categoryData = categories[activeKey];
          if (!categoryData) {
            contextEl.innerHTML = "";
            return;
          }

          const categoryHTML = categoryData
            ? `<div class="profile">
            <div class="category">
              <img class="category-icon" src="./assets/${categoryData.icon}" alt="Category">
            </div>
            <div class="details">
              <q class="details-content">Sites are organized by category to help you find what you need quickly. Browse through the list to explore the category.</q>
              <div class="separator"></div>
              <div class="details-card">
                <div class="card-icon">
                  <img src="./assets/icons/map.svg" alt="category">
                </div>
                <div class="card-description">
                  <h3>${activeKey}</h3>
                  <p>Category</p>
                </div>
              </div>
            </div>
          </div>`
            : "";

          const locationsHTML = categoryData.features
            ? `<div class="account">
              <h2 class="category">${activeKey} Site List</h2>
              <div class="separator"></div>
              <div class="features" id="feature-list">
                ${categoryData.features
                  .map(
                    (feature) => `
                  <div class="feature">
                    <div class="feature-icon">
                      <img src="./assets/icons/location.svg" alt="Location">
                    </div>
                    <div class="feature-description">
                      <h3>${
                        feature.properties?.historical_name || "Unknown"
                      }</h3>
                      <p>Site</p>
                    </div>
                  </div>
                `
                  )
                  .join("")}
                </div>
            </div>`
            : "";

          contextEl.innerHTML = categoryHTML + locationsHTML;

          document
            .getElementById("feature-list")
            .querySelectorAll(".feature")
            .forEach((feature) =>
              feature.addEventListener("click", () => {
                const feature = this.service.getById(feature.dataset.id);
                if (feature) {
                  this.bus.emit("feature:selected", { feature });
                } else {
                  console.warn(
                    "[SearchView] Feature not found for id:",
                    feature.dataset.id
                  );
                }
              })
            );
        });
      });
    } catch (e) {
      console.error("AccountView._initAccountCarousel error:", e);
    }
  }

  static _createContentItem(header, content) {
    return `
      <section class="content-item">
        <div class="content-header">
          <h3 class="header-value">${header.replace(/_/g, " ")}</h3>
        </div>
        <div class="content-content">
          <p class="content-value">${content}</p>
        </div>
      </section>
    `;
  }

  static _createSlide(icon, category) {
    return `
      <section class="slide">
        <img class="slide-icon" src="./assets/icons/${icon}" alt="${category.toUpperCase()}">
        <h3 class="slide-name">${category}</h3>
      </section>
    `;
  }

  _escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
}
