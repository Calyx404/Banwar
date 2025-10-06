/**
 * [Purpose]
 * - Minimal entrypoint: instantiate and call MapModel.renderMap.
 *
 * [Algorithm]
 * 1. Create MapModel instance.
 * 2. Call renderMap with container ids (map, profile, account header, account content).
 */
document.addEventListener("DOMContentLoaded", () => {
  const mapModel = new MapModel();
  mapModel.render("map", "map-profile", "map-account");
});
