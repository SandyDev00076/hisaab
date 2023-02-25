import PocketBase from "pocketbase";

const pbURL = import.meta.env.VITE_PB_URL;

if (!pbURL) {
  // environment variable missing
  throw new Error("Not able to fetch Pocket base URL");
}

const pb = new PocketBase(pbURL);

export default pb;
