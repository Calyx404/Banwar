"use strict";

class AccountModel {
  constructor(containerID, properties) {
    this.container = document.getElementById(containerID);
    this.properties = properties;
  }

  render(featureCollection) {
    const account = `
      <nav class="account-item" id="account-header"></nav>
      <div class="account-item" id="account-content"></div>
    `;

    this.container.innerHTML = account;

    if (featureCollection.length == 1) {
      console.log(featureCollection[0]);
      this._bindAccountHeader("#account-header", featureCollection[0]);
      this._bindAccountContent("#account-content", featureCollection[0]);
    } else {
      this._bindAccountHeaderDefault("#account-header");
      this._bindAccountContentDefault("#account-content", featureCollection);
    }
  }

  _bindAccountHeader(headerID, feature) {
    const category = feature?.properties?.category || "Uncategorized";
    const historicalName = feature?.properties?.historical_name || "Unnamed";

    const header = `
    <nav class="account-title">
      <h4><a href="#map-account">${category.toLowerCase()}</a></h4>
      <div class="separator"></div>
      <h4><a href="#map-account">${historicalName.toLowerCase()}</a></h4>
      <div class="separator"></div>
    </nav>
    <button onclick="document.location='#main'">
      <img src="./assets/icons/top.svg" alt="Top">
      <span>Back to Top</span>
    </button>
  `;

    this.container.querySelector(headerID).innerHTML = header;
  }

  _bindAccountContent(contentID, feature) {
    let content = ``;

    for (const property of this.properties) {
      const contentDetails =
        feature.properties[property] || "Information not available.";
      content += AccountModel._createContentItem(property, contentDetails);
    }

    this.container.querySelector(contentID).innerHTML = content;
  }

  _bindAccountHeaderDefault(headerID) {
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

    this.container.querySelector(headerID).innerHTML = header;
  }

  _bindAccountContentDefault(contentID, featureCollection) {
    let slides = ``;
    let categories = {};

    // store feature categories and icon
    for (const feature of featureCollection) {
      const category = feature.properties.category || "Uncategorized";

      if (!categories[category]) {
        categories[category] = `${feature.properties.icon}` || `map.svg`;
      }
    }

    // compile slides
    for (const [category, icon] of Object.entries(categories)) {
      slides += AccountModel._createSlide(icon, category);
    }

    const content = `
      <section class="content-item">
        <div class="carousel">
          ${Carousel(slides)}
        </div>
      </section>
    `;

    this.container.querySelector(contentID).innerHTML = content;
  }

  static _createContentItem(header, content) {
    const contentItem = `
      <section class="content-item">
        <div class="content-header">
          <h3 class="header-value">${header.replace(/_/g, " ")}</h3>
        </div>
        <div class="content-content">
          <p class="content-value">${content}</p>
        </div>
      </section>
    `;

    return contentItem;
  }

  static _createSlide(icon, category) {
    const slide = `
      <section class="slide">
        <img class="slide-icon" src="./assets/icons/${icon}" alt="${category.toUpperCase()}">
        <h3 class="slide-name">${category}</h3>
      </section>
    `;

    return slide;
  }
}
