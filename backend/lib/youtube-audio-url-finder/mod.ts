import UrlFinder from "./url-finder.ts";
import InstanceFinder from "./invidious-instance-finder.ts";

const instanceFinder = new InstanceFinder(
  "https://api.invidious.io/instances.json",
);

const urlFinder = new UrlFinder(
  "https://invidious.snopyta.org/api/v1/videos/cDdlg9eqZlsa",
);

const res = await urlFinder.findUrl();

res.json().then((json) => {
  console.log(json.adaptiveFormats);
});
