import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/home.css";
import "./styles/listings.css";
import "./styles/auth.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
