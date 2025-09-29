import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import App from "./App.jsx";
import "./index.css";

// Initialize Storyblok
storyblokInit({
  accessToken: import.meta.env.VITE_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
