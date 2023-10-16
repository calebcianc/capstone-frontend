import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_API_DOMAIN}
    clientId={process.env.REACT_APP_API_CLIENTID}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: process.env.REACT_APP_API_AUDIENCE,
      scope: "profile email metadata",
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
);
