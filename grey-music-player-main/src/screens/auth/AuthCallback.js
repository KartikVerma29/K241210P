import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setClientToken } from "../../spotify";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const token = hash
      ?.substring(1)
      .split("&")
      .find((item) => item.startsWith("access_token"))
      ?.split("=")[1];

    if (token) {
      localStorage.setItem("token", token);
      setClientToken(token);
      navigate("/feed"); // or your default home page
    } else {
      navigate("/");
    }
  }, [navigate]);

  return <div>Logging in...</div>;
};

export default AuthCallback;
