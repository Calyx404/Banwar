document.addEventListener("DOMContentLoaded", () => {
    const mapID = "map";
    const mapModel = new MapModel();

    fetch("./data/sites.export.geojson")
        .then(response => response.json())
        .then(geojsonData => {
            mapModel.createMap(mapID, geojsonData);
        })
        .catch(err => console.error("Error loading GeoJSON:", err));
});
