document.addEventListener("DOMContentLoaded", () => {
  const mapModel = new MapModel();

  const profile_fields = [
    "historical_name",
    "modern_name",
    "present_day_location",
    "category",
    "primary_description",
  ];

  const account_fields = ["historical_name", "category"];

  fetch("./data/sites.export.geojson")
    .then((response) => response.json())
    .then((geojsonData) => {
      const profileModel = new ProfileModel("map-profile", profile_fields);
      const accountModel = new AccountModel("map-account", account_fields);

      mapModel.renderMap("map", geojsonData, profileModel, accountModel);
      accountModel.renderDefault(geojsonData.features);
    })
    .catch((err) => console.error("Error loading GeoJSON:", err));
});
