import { EventBus } from "../scripts/event-bus.js";

export class FeatureRepo {
  constructor(bus, path = "./data/sites.export.geojson") {
    this.bus = bus;
    this.path = path;
    this.features = [];
    this.loaded = false;
    this.selectedId = null;
  }

  async load() {
    if (this.loaded) return this.features;
    try {
      const res = await fetch(this.path);
      if (!res.ok) throw new Error(`Failed to fetch GeoJSON: ${res.status}`);
      const data = await res.json();
      this.features = Array.isArray(data.features)
        ? data.features.map((f, i) => {
            f.__fid = f.id ?? f.properties?.id ?? `f_${i}`;
            return f;
          })
        : [];
      this.loaded = true;
      this.bus.emit("features:loaded", { count: this.features.length });
    } catch (err) {
      console.error("FeatureRepo.load error:", err);
      this.features = [];
      this.bus.emit("features:error", { error: err.message });
    }
    return this.features;
  }

  getAll() {
    return this.features.slice();
  }

  find(query = "") {
    if (!query || !String(query).trim()) return this.getAll();
    const q = query.toLowerCase();
    return this.features.filter((f) =>
      (f.properties?.historical_name || "").toLowerCase().includes(q)
    );
  }

  getById(id) {
    return (
      this.features.find(
        (f) => f.__fid === id || f.id === id || f.properties?.id === id
      ) || null
    );
  }

  setSelected(idOrFeature) {
    let feature;
    let id;

    if (typeof idOrFeature === "object" && idOrFeature !== null) {
      feature = idOrFeature;
      id = feature.__fid;
    } else {
      id = idOrFeature;
      feature = this.getById(id);
    }

    this.selectedId = id;
    this.bus.emit("feature:selected", { id, feature });
  }

  clearSelected() {
    this.selectedId = null;
    this.bus.emit("feature:cleared");
  }
}
