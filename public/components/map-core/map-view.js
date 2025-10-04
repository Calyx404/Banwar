export class MapView {
  constructor(containerId) {
    this.containerId = containerId;
    this.map = null;
    this.baseMaps = {};
    this.overlayMaps = {};
    this._tooltipLayers = []; // track layers which have tooltips for zoom logic
  }

  init(center = [12.3792, 122.0674], zoom = 6) {
    try {
      this.map = L.map(this.containerId, {
        center,
        zoom,
        maxZoom: 19,
        zoomControl: true,
        attributionControl: false,
      });
      L.control.attribution({ position: "topleft" }).addTo(this.map);
    } catch (e) {
      console.error("MapView.init error:", e);
    }
  }

  addBaseLayers() {
    try {
      this.baseMaps = {
        Terrain: MapView._createTileLayer(
          "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
        ),
        Satellite: MapView._createTileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        ),
        Topographic: MapView._createTileLayer(
          "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        ),
      };

      // Add default base layer
      this.baseMaps.Terrain.addTo(this.map);
    } catch (e) {
      console.error("MapView.addBaseLayers error:", e);
    }
  }

  renderFeatures(geojson, { onClick } = {}) {
    try {
      const features = Array.isArray(geojson)
        ? geojson
        : geojson?.features ?? [];
      const categoryLayers = {};

      L.geoJSON(features, {
        onEachFeature: (feature, layer) => {
          const category = feature.properties?.category || "Uncategorized";
          if (!categoryLayers[category])
            categoryLayers[category] = L.layerGroup();

          // popup + tooltip
          this._bindFeaturePopup(layer, feature);
          this._bindFeatureTooltip(layer, feature);

          // click handler -> either call onClick or leave it to consumer
          if (typeof onClick === "function") {
            layer.on("click", () => onClick(feature, layer));
          }

          categoryLayers[category].addLayer(layer);
        },
      });

      // add category layers to overlayMaps and to the map
      for (const category in categoryLayers) {
        this.overlayMaps[category] = categoryLayers[category];
        categoryLayers[category].addTo(this.map);
      }

      // prepare zoom handler to toggle tooltips
      this._setupTooltipZoomHandler();
    } catch (e) {
      console.error("MapView.renderFeatures error:", e);
    }
  }

  focusFeature(feature) {
    try {
      if (!feature) return;
      const geom = feature.geometry || {};
      const type = geom.type;
      if (type === "Point") {
        // Leaflet expects [lat, lng]
        const [lng, lat] = geom.coordinates;
        if (Number.isFinite(lat) && Number.isFinite(lng)) {
          this.map.flyTo([lat, lng], 12);
        } else {
          console.warn(
            "MapView.focusFeature: invalid point coordinates",
            geom.coordinates
          );
        }
      } else {
        // polygon/lines: fit bounds
        const layer = L.geoJSON(feature);
        const bounds = layer.getBounds();
        if (bounds && bounds.isValid && bounds.isValid()) {
          this.map.fitBounds(bounds, { maxZoom: 14 });
        } else {
          // fallback: try centroid / point fallback
          const center = bounds.getCenter ? bounds.getCenter() : null;
          if (center) this.map.flyTo(center, 12);
        }
      }
    } catch (e) {
      console.error("MapView.focusFeature error:", e);
    }
  }

  addLayerControl() {
    try {
      L.control
        .layers(this.baseMaps, this.overlayMaps, { position: "topleft" })
        .addTo(this.map);
    } catch (e) {
      console.error("MapView.addLayerControl error:", e);
    }
  }

  addLocateControl(opts = {}) {
    try {
      if (!L.control.locate) {
        console.warn("Leaflet locate control not loaded.");
        return;
      }
      L.control
        .locate(
          Object.assign(
            {
              position: "topright",
              setView: true,
              maxZoom: 12,
              flyTo: true,
              showCompass: true,
            },
            opts
          )
        )
        .addTo(this.map);
    } catch (e) {
      console.error("MapView.addLocateControl error:", e);
    }
  }

  addFullscreenControl(opts = {}) {
    try {
      if (!L.control.fullscreen) {
        console.warn("Leaflet fullscreen control not loaded.");
        return;
      }
      L.control
        .fullscreen(
          Object.assign(
            {
              position: "topright",
              title: "View Fullscreen",
              titleCancel: "Exit Fullscreen",
            },
            opts
          )
        )
        .addTo(this.map);

      // Optional UI hook: hide overlay when fullscreen
      const overlay = document.getElementById("map-overlay");
      if (overlay) {
        this.map.on("enterFullscreen", () => overlay.classList.add("hide"));
        this.map.on("exitFullscreen", () => overlay.classList.remove("hide"));
      }
    } catch (e) {
      console.error("MapView.addFullscreenControl error:", e);
    }
  }

  _bindFeaturePopup(layer, feature) {
    try {
      layer.on("click", (e) => {
        const lat = e?.latlng?.lat;
        const lng = e?.latlng?.lng;
        const props = feature.properties || {};
        const popupContent = `
          <section class="feature-popup">
            <h3 class="popup-header">${(
              props.historical_name || "Feature"
            ).toUpperCase()}</h3>
            <p class="popup-content">
              <strong>Coordinates:</strong> ${
                Number.isFinite(lng) ? lng.toFixed(6) : "-"
              }, ${Number.isFinite(lat) ? lat.toFixed(6) : "-"}
            </p>
          </section>
        `;
        try {
          layer.bindPopup(popupContent).openPopup();
        } catch (err) {
          console.error("MapView._bindFeaturePopup bind/open error:", err);
        }
      });
    } catch (e) {
      console.error("MapView._bindFeaturePopup error:", e);
    }
  }

  _bindFeatureTooltip(layer, feature) {
    try {
      const name = feature.properties?.historical_name;
      if (!name) return;

      layer.bindTooltip(name, {
        permanent: true,
        direction: "bottom",
        className: "feature-tooltip",
      });

      this._tooltipLayers.push(layer);

      try {
        layer.closeTooltip();
      } catch (e) {
        /* ignore */
      }
    } catch (e) {
      console.error("MapView._bindFeatureTooltip error:", e);
    }
  }

  _setupTooltipZoomHandler() {
    try {
      if (!this.map) return;

      if (this._tooltipZoomHandler) {
        this.map.off("zoomend", this._tooltipZoomHandler);
      }

      this._tooltipZoomHandler = () => {
        const show = this.map.getZoom() >= 10;
        for (const layer of this._tooltipLayers) {
          try {
            if (show) layer.openTooltip();
            else layer.closeTooltip();
          } catch (e) {
            // ignore layers without tooltip
          }
        }
      };

      this.map.on("zoomend", this._tooltipZoomHandler);
      this._tooltipZoomHandler(); // initial sync
    } catch (e) {
      console.error("MapView._setupTooltipZoomHandler error:", e);
    }
  }

  static _createTileLayer(url, attribution) {
    return L.tileLayer(url, { maxZoom: 19, attribution });
  }
}
