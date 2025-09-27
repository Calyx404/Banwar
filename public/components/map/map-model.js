"use strict";

class MapModel {
    constructor(name = "Unknown", geometryType = "Point", coordinates = [12.3792, 122.0674]) {
        this.name = name;
        this.geometryType = geometryType;
        this.coordinates = coordinates;
        this.map = null;
        this.baseMaps = {};
        this.overlayMaps = {};
    }

    createMap(containerId, geojsonData) {
        this._initMap(containerId);
        this._initBaseMaps();
        this._initOverlayMaps(geojsonData);
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
        });
    }

    _initBaseMaps() {
        this.baseMaps = {
            "Terrain": MapModel._createTileLayer(
                "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
                "© OpenTopoMap"
            ),
            "Satellite": MapModel._createTileLayer(
                "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                "Tiles © Esri"
            ),
            "Topographic": MapModel._createTileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                "© OpenStreetMap"
            ),
        };

        this.baseMaps["Terrain"].addTo(this.map);
    }

    _initOverlayMaps(geojsonData) {
        const categoryLayers = {};

        L.geoJSON(geojsonData, {
            onEachFeature: (feature, layer) => {
                const category = feature.properties.category || "Uncategorized";

                if (!categoryLayers[category]) {
                    categoryLayers[category] = L.layerGroup();
                }

                this._bindFeaturePopup(layer, feature.properties);
                this._bindFeatureClick(layer);

                categoryLayers[category].addLayer(layer);
            }
        });

        for (const category in categoryLayers) {
            this.overlayMaps[category] = categoryLayers[category];
            categoryLayers[category].addTo(this.map);
        }
    }

    _bindFeaturePopup(layer, properties) {
        // only the name and category
        let popupContent = `<strong>${properties.name || "Feature"}</strong><br>`;
        for (const key in properties) {
            popupContent += `<b>${key}:</b> ${properties[key]}<br>`;
        }
        layer.bindPopup(popupContent);
    }

    _bindFeatureClick(layer) {
        // edit to be map panel
        layer.on("click", () => {
            if (layer.getBounds) {
                this.map.fitBounds(layer.getBounds());
            } else if (layer.getLatLng) {
                this.map.setView(layer.getLatLng(), 12);
            }
        });
    }

    _addControls() {
        L.control.layers(this.baseMaps, this.overlayMaps, {
            position: "bottomleft"
        }).addTo(this.map);
    }

    _addLocateButton() {
        if (L.control.locate) {
            L.control.locate({
                position: "topleft",
                setView: true,
                maxZoom: 16,
                flyTo: true,
                showCompass: true
            }).addTo(this.map);
        } else {
            console.error("Leaflet Locate plugin is not loaded.");
        }
    }

    _addFullScreenButton() {
        if (L.control.fullscreen) {
            L.control.fullscreen({
                position: "topleft",
                title: "View Fullscreen",
                titleCancel: "Exit Fullscreen"
            }).addTo(this.map);

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
            attribution: attribution
        });
    }
}
