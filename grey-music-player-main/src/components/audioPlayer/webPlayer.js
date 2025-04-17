
import React, { useEffect } from "react";
import { loadSpotifyPlayer } from "../../spotify";

const WebPlayer = ({ token, onDeviceReady }) => {
  useEffect(() => {
    if (token) {
      loadSpotifyPlayer(token, onDeviceReady);
    }
  }, [token]);

  return null;
};

export default WebPlayer;
