<<<<<<< HEAD
// src/App.js
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { setClientToken } from "./spotify";
import Login from "./screens/auth/login";
import AuthCallback from "./screens/auth/AuthCallback";
import Home from "./screens/home";   // ← picks up src/screens/home/index.js

export default function App() {
  // 1. On mount: extract & store token (if in URL), or re‑inject from localStorage
  useEffect(() => {
    const hash = window.location.hash;        // e.g. #access_token=...
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");
      if (token) {
        localStorage.setItem("token", token);
        setClientToken(token);
        window.location.hash = "";            // clean up URL
        return;
      }
    }
    // No hash: try re‑injecting existing token
    const existing = localStorage.getItem("token");
    if (existing) setClientToken(existing);
  }, []);

  // 2. Check auth state
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<AuthCallback />} />

        {/* Protected: any path under / (including /feed, /player, etc.) */}
        <Route
          path="/*"
          element={
            token 
              ? <Home /> 
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
=======
import React from "react";
import Home from "./screens/home";

export default function App() {
  return (
    <div>
      <Home />
    </div>
>>>>>>> parent of fec401c (trying to connect ngrok, api and project)
  );
}
