import { EventBus } from "./event-bus.js";
import { FeatureRepo } from "../data/feature-repo.js";
import { MapController } from "../components/map-core/map-controller.js";
import { SearchController } from "../components/search/search-controller.js";
import { SearchView } from "../components/search/search-view.js";
import { ProfileView } from "../components/map-auxillary/profile-view.js";
import { AccountView } from "../components/map-auxillary/account-view.js";

export class AppController {
  constructor(containers) {
    // Shared event bus and data repo
    this.bus = new EventBus();
    this.repo = new FeatureRepo(this.bus);

    // Map controller is responsible for rendering map & handling map events
    this.mapCtrl = new MapController(this.bus, this.repo, containers.map);

    // Search controllers & views
    this.searchController = new SearchController(this.repo);
    this.searchView = new SearchView(this.bus, this.searchController);

    // UI components
    this.profileFields = [
      "historical_name",
      "modern_name",
      "present_day_location",
      "category",
      "primary_description",
    ];

    this.profileView = new ProfileView(
      this.bus,
      containers.profile,
      this.profileFields
    );
    this.accountView = new AccountView(
      this.bus,
      containers.account,
      this.profileFields
    );
  }

  async init() {
    try {
      // Load map and data first
      await this.mapCtrl.init();

      // Then initialize the UI components
      this.profileView.init();
      this.accountView.init(this.repo);

      // Then search UI
      document.addEventListener("header:ready", () => {
        this.searchView.init();
      });

      // Bus events for diagnostics / error handling
      this.bus.on("features:loaded", ({ count }) =>
        console.log(`[AppController] Loaded ${count} features`)
      );

      this.bus.on("features:error", ({ error }) => {
        console.error("[AppController] Feature loading error:", error);
        alert("Failed to load map data. Please try again.");
      });
    } catch (e) {
      console.error("AppController.init error:", e);
    }
  }
}
