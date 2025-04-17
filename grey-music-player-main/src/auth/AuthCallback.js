// src/auth/AuthCallback.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setClientToken } from "../spotify";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1];
    
    if (token) {
      localStorage.setItem("token", token);
      setClientToken(token);
      navigate("/home"); // redirect to main screen
    }
  }, [navigate]);

  return null;
}
