import { MapView } from "./map-view.js";

export class MapController {
  constructor(bus, repo, mapContainerId) {
    this.bus = bus;
    this.repo = repo;
    this.view = new MapView(mapContainerId);
  }

  async init() {
    try {
      // 1. Load GeoJSON data through the shared repo
      const features = await this.repo.load();
      if (!features.length) {
        console.warn("[MapController] No features loaded.");
      }

      // 2. Initialize map and layers
      this.view.init();
      this.view.addBaseLayers();
      this.view.renderFeatures(features, {
        onClick: (feature) => this.repo.setSelected(feature),
      });
      this.view.addLayerControl();
      this.view.addLocateControl();
      this.view.addFullscreenControl();

      // 3. Map reacts to feature selection / clearing
      this.bus.on("feature:selected", ({ feature }) => {
        if (feature) this.view.focusFeature(feature);
      });

      this.bus.on("feature:cleared", () => {
        // Close popups & return to default state
        if (this.view.map) this.view.map.closePopup();
      });

      console.log("[MapController] Map initialized successfully.");
    } catch (e) {
      console.error("MapController.init error:", e);
    }
  }
}
