import React from "react";
import ReactDOM from "react-dom/client";
import RouteContainer from "./components/RouteContainer";
import { LoadingProvider } from "./data/loadingContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LoadingProvider>
      <RouteContainer />
    </LoadingProvider>
  </React.StrictMode>
);
