import PocketBase from "pocketbase";

const pbURL = import.meta.env.PB_URL;

if (!pbURL) {
  throw new Error("Not able to fetch Pocket base URL");
}

const pb = new PocketBase(pbURL);

export default pb;
