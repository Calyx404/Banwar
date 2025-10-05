import { AppController } from "../app-controller.js";

const app = new AppController({
  map: "map",
  profile: "map-profile",
  account: "map-account",
});

app.init();
