
import React, { useState } from "react";
import WebPlayer from "../../components/audioPlayer/webPlayer";
// import "./player.css";

const PlayerScreen = ({ token }) => {
  const [deviceId, setDeviceId] = useState(null);

  const handleDeviceReady = (id) => {
    console.log("Device Ready:", id);
    setDeviceId(id);
  };

  return (
    <div className="player">
      <WebPlayer token={token} onDeviceReady={handleDeviceReady} />
      <h2>Spotify Web Player</h2>
      {deviceId && <p>Connected to device: {deviceId}</p>}
    </div>
  );
};

export default PlayerScreen;
