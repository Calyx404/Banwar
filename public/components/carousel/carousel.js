"use strict";

class Carousel {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentIndex = 0;
    this.slides = [];
  }

  /**
   * Initialize carousel with categories from GeoJSON
   * @param {Array} features - GeoJSON features
   */
  init(features) {
    const categories = [
      ...new Set(features.map((f) => f.properties.category || "Uncategorized")),
    ];

    this.slides = categories.map((category) => ({
      title: category,
      features: features.filter(
        (f) => (f.properties.category || "Uncategorized") === category
      ),
    }));

    this.render();
  }

  /**
   * Render the carousel structure
   */
  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="carousel-wrapper">
        <button class="carousel-btn prev" id="carousel-prev">&#10094;</button>
        <div class="carousel-track">
          ${this.slides
            .map(
              (slide) => `
              <div class="carousel-slide">
                <h3 class="carousel-title">${slide.title}</h3>
                <p class="carousel-count">${slide.features.length} items</p>
              </div>
            `
            )
            .join("")}
        </div>
        <button class="carousel-btn next" id="carousel-next">&#10095;</button>
      </div>
    `;

    this.track = this.container.querySelector(".carousel-track");
    this._bindEvents();
    this._updateView();
  }

  /**
   * Update visible slide
   */
  _updateView() {
    if (!this.track) return;
    const offset = -this.currentIndex * 100;
    this.track.style.transform = `translateX(${offset}%)`;
  }

  /**
   * Event bindings
   */
  _bindEvents() {
    const prevBtn = this.container.querySelector("#carousel-prev");
    const nextBtn = this.container.querySelector("#carousel-next");

    prevBtn.addEventListener("click", () => {
      this.currentIndex =
        (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this._updateView();
    });

    nextBtn.addEventListener("click", () => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this._updateView();
    });
  }
}
