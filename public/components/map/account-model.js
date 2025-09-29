"use strict";

class AccountModel {
  constructor(headerId, contentId) {
    this.header = document.getElementById(headerId);
    this.content = document.getElementById(contentId);
    // this.carousel = new Carousel(contentId);
  }

  render(properties) {
    if (!this.header) return;

    this.header.innerHTML = `
      <h4 class="account-title">
        ${properties["category"].toLowerCase() || "Uncategorized"} /
        ${properties["historical_name"] || "Unnamed"}
      </h4>
      <button onclick="document.location='#main'">
          <img src="./assets/icons/top.svg" alt="Top">
          <span>Back to Top</span>
      </button>
    `;

    // TODO: define and parse excluded from map.js
    // Filter out ProfileModel fields except category & historical_name
    const excluded = [
      "historical_name",
      "modern_name",
      "present_day_location",
      "category",
      "primary_description",
    ];
    const entries = Object.entries(properties).filter(
      ([key]) => !excluded.includes(key)
    );

    this.content.innerHTML = `
      <section class="account-details">
        ${entries
          .map(
            ([key, value]) => `
          <div class="field-item">
            <h3 class="field-name">${key.replace(/_/g, " ")}</h3>
            <p class="field-value">${value}</p>
          </div>
        `
          )
          .join("")}
      </section>
    `;
  }

  renderDefault(features) {
    this.header.innerHTML = `
    <h4 class="account-title">All Categories</h4>
    <button onclick="document.location='#main'">
        <img src="./assets/icons/top.svg" alt="Top">
        <span>Back to Top</span>
    </button>
    `;
    // this.carousel.init(features);
  }
}
