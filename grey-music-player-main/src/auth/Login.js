// src/auth/Login.js
import React from "react";
import { loginEndpoint } from "../spotify";

export default function Login() {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Welcome to Grey Music Player</h2>
      <a href={loginEndpoint}>
        <button style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}>
          Log in with Spotify
        </button>
      </a>
    </div>
  );
}
