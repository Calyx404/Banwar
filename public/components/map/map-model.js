"use strict";

class MapModel {
  constructor(
    name = "Unknown",
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

  renderMap(containerId, geojsonData, profileModel, accountModel) {
    this._initMap(containerId);
    this._initBaseMaps();
    this._initOverlayMaps(geojsonData, profileModel, accountModel);
    this._addControls();
    this._addLocateButton();
    this._addFullScreenButton();
    return this.map;
  }

  _initMap(containerId) {
    this.map = L.map(containerId, {
      center: this.coordinates,
      zoom: 6,
      zoomControl: true,
      attributionControl: false,
    });

    L.control.attribution({ position: "topleft" }).addTo(this.map);
  }

  _initBaseMaps() {
    this.baseMaps = {
      Terrain: MapModel._createTileLayer(
        "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        "© OpenTopoMap"
      ),
      Satellite: MapModel._createTileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        "Tiles © Esri"
      ),
      Topographic: MapModel._createTileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "© OpenStreetMap"
      ),
    };

    this.baseMaps["Terrain"].addTo(this.map);
  }

  _initOverlayMaps(geojsonData, profileModel, accountModel) {
    const categoryLayers = {};
    const allFeatures = geojsonData.features;

    L.geoJSON(geojsonData, {
      onEachFeature: (feature, layer) => {
        const category = feature.properties.category || "Uncategorized";

        if (!categoryLayers[category]) {
          categoryLayers[category] = L.layerGroup();
        }

        this._bindFeaturePopup(layer, feature.properties);
        this._bindFeatureClick(
          layer,
          feature.properties,
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

    layer
      .bindTooltip(properties.historical_name, {
        permanent: true,
        direction: "bottom",
        className: "feature-tooltip",
      })
      .closeTooltip();

    this.map.on("zoomend", () => {
      if (this.map.getZoom() >= 10) {
        layer.openTooltip();
      } else {
        layer.closeTooltip();
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

      layer.bindPopup(popupContent);
    });
  }

  _bindFeatureClick(
    layer,
    properties,
    profileModel,
    accountModel,
    allFeatures
  ) {
    layer.on("click", () => {
      profileModel.render(properties);
      accountModel.render(properties);

      const closeBtn = document.getElementById("profile-close");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          profileModel.clear();
          accountModel.renderDefault(allFeatures);
          layer.closePopup();
        });
      }
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

      // Optional: event listeners
      this.map.on("enterFullscreen", () => {
        console.log("Entered fullscreen");
      });
      this.map.on("exitFullscreen", () => {
        console.log("Exited fullscreen");
      });
    } else {
      console.error("Leaflet Fullscreen plugin is not loaded.");
    }
  }

  static _createTileLayer(urlTemplate, attribution) {
    return L.tileLayer(urlTemplate, {
      maxZoom: 19,
      attribution: attribution,
    });
  }
}
