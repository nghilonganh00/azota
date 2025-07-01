import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./output.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routers/Routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NotificationProvider } from "./Globals/Context/NotificationContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="431729167675-q2ju9cdj79g32lmgloi8gn6brp5jsngg.apps.googleusercontent.com">
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
reportWebVitals();
