
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setClientToken } from "../../spotify";

export default function AuthCallback() {
  const navigate = useNavigate();
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const token = new URLSearchParams(hash).get("access_token");
    if (token) {
      localStorage.setItem("token", token);
      setClientToken(token);
      navigate("/feed"); 
    } else {
      navigate("/login");
    }
  }, [navigate]);
  return <div>Logging in…</div>;
}
