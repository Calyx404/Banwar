"use strict";

class MapModel {
  constructor(
    name = "Philippines",
    geometryType = "Point",
    coordinates = [12.3792, 122.0674]
  ) {
    this.name = name;
    this.geometryType = geometryType;
    this.coordinates = coordinates;
    this.map = null;
    this.baseMaps = {};
    this.overlayMaps = {};
  }

  async render(mapContainer, profileContainer, accountContainer) {
    const search = new Search("./data/sites.export.geojson");

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("search") || "";

    const allFeatures = await search.find(query);

    const profileFields = [
      "historical_name",
      "modern_name",
      "present_day_location",
      "category",
      "primary_description",
    ];

    const accountFields = [];

    // Create models
    const profileModel = new ProfileModel(profileContainer, profileFields);
    const accountModel = new AccountModel(accountContainer, accountFields);

    // Init map and overlays
    this._initMap(mapContainer);
    this._initBaseMaps();
    this._initOverlayMaps(allFeatures, profileModel, accountModel);
    this._addControls();
    this._addLocateButton();
    this._addFullScreenButton();

    // Default render (all features)
    accountModel.render(allFeatures);

    return this.map;
  }

  _initMap(containerId) {
    this.map = L.map(containerId, {
      center: this.coordinates,
      zoom: 6,
      maxZoom: 18,
      zoomControl: true,
      attributionControl: false,
    });

    L.control.attribution({ position: "topleft" }).addTo(this.map);
  }

  _initBaseMaps() {
    this.baseMaps = {
      Terrain: MapModel._createTileLayer(
        "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
      ),
      Satellite: MapModel._createTileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      ),
      Topographic: MapModel._createTileLayer(
        "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      ),
    };

    this.baseMaps["Terrain"].addTo(this.map);
  }

  _initOverlayMaps(allFeatures, profileModel, accountModel) {
    const categoryLayers = {};

    L.geoJSON(allFeatures, {
      onEachFeature: (feature, layer) => {
        const category = feature.properties.category || "Uncategorized";

        if (!categoryLayers[category]) {
          categoryLayers[category] = L.layerGroup();
        }

        this._bindFeaturePopup(layer, feature.properties);
        this._bindFeatureClick(
          layer,
          feature,
          profileModel,
          accountModel,
          allFeatures
        );
        this._bindFeatureTooltip(layer, feature.properties);

        categoryLayers[category].addLayer(layer);
      },
    });

    for (const category in categoryLayers) {
      this.overlayMaps[category] = categoryLayers[category];
      categoryLayers[category].addTo(this.map);
    }
  }

  _bindFeatureTooltip(layer, properties) {
    if (!properties.historical_name) return;

    layer.bindTooltip(properties.historical_name, {
      permanent: true,
      direction: "bottom",
      className: "feature-tooltip",
    });

    this.map.on("zoomend", () => {
      const tooltips = document.getElementsByClassName("feature-tooltip");

      for (const tooltip of tooltips) {
        if (this.map.getZoom() >= 10) {
          tooltip.classList.add("show");
        } else {
          tooltip.classList.remove("show");
        }
      }
    });
  }

  _bindFeaturePopup(layer, properties) {
    layer.on("click", (e) => {
      const { lat, lng } = e.latlng;

      const popupContent = `
      <section class="feature-popup">
        <h3 class="popup-header">
          ${properties.historical_name?.toUpperCase() || "Feature"}
        </h3>
        <p class="popup-content">
          <strong>Coordinates:</strong> ${lng.toFixed(6)}, ${lat.toFixed(6)}
        </p>
      </section>
    `;

      layer.bindPopup(popupContent).openPopup();
    });
  }

  _bindFeatureClick(layer, feature, profileModel, accountModel, allFeatures) {
    layer.on("click", async () => {
      const _extractAccountFields = (featureObj, profileFields) => {
        const profileSet = new Set(profileFields);
        const accountFields = [];

        if (featureObj.properties) {
          for (const property of Object.keys(featureObj.properties)) {
            if (!profileSet.has(property)) {
              accountFields.push(property);
            }
          }
        }

        return accountFields;
      };

      // Dynamically compute account fields
      const accountFields = _extractAccountFields(
        feature,
        profileModel.properties
      );
      accountModel.properties = accountFields;

      // Render both panels with only this feature
      profileModel.render([feature]);
      accountModel.render([feature]);

      // Close button logic
      document
        .getElementById("profile-close")
        .addEventListener("click", async () => {
          profileModel.clear();
          accountModel.render(allFeatures);
          layer.closePopup();
        });
    });
  }

  _addControls() {
    L.control
      .layers(this.baseMaps, this.overlayMaps, {
        position: "topleft",
      })
      .addTo(this.map);
  }

  _addLocateButton() {
    if (L.control.locate) {
      L.control
        .locate({
          position: "topright",
          setView: true,
          maxZoom: 12,
          flyTo: true,
          showCompass: true,
        })
        .addTo(this.map);
    } else {
      console.error("Leaflet Locate plugin is not loaded.");
    }
  }

  _addFullScreenButton() {
    if (L.control.fullscreen) {
      L.control
        .fullscreen({
          position: "topright",
          title: "View Fullscreen",
          titleCancel: "Exit Fullscreen",
        })
        .addTo(this.map);

      const nav = document.getElementById("map-overlay");
      this.map.on("enterFullscreen", () => {
        nav.classList.add("hide");
      });
      this.map.on("exitFullscreen", () => {
        nav.classList.remove("hide");
      });
    } else {
      console.error("Leaflet Fullscreen plugin is not loaded.");
    }
  }

  static _createTileLayer(urlTemplate, attribution) {
    return L.tileLayer(urlTemplate, {
      maxZoom: 18,
      attribution: attribution,
    });
  }
}
