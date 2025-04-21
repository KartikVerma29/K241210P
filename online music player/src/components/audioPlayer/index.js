import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import "./audioPlayer.css";
import Controls from "./controls";
import ProgressCircle from "./progressCircle";
import WaveAnimation from "./waveAnimation";


export default function AudioPLayer({
  currentTrack,
  currentIndex,
  setCurrentIndex,
  total,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const imageUrl = currentTrack?.album?.images?.[0]?.url;
  console.log("Current Track:", currentTrack);
  console.log("Image URL:", imageUrl);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total.length) % total.length);
  };

  const addZero = (n) => (n > 9 ? n : "0" + n);

  console.log("Image URL:", imageUrl);
  const artists =
    currentTrack?.album?.artists?.map((a) => a.name).join(" | ") || "Unknown Artist";

  return (
    <div className="player-body flex">
      <div className="player-left-body">
        <ProgressCircle
          percentage={100} 
          isPlaying={isPlaying}
          image={imageUrl}
          size={300}
          color="#C96850"
        />
      </div>
      <div className="player-right-body flex">
        <p className="song-title">{currentTrack?.name || "No Track"}</p>
        <p className="song-artist">{artists}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">0:00</p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className="duration"></p>
          </div>
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={total}
          />
        </div>
      </div>

     
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${currentTrack?.yt_video_id}`}
        playing={isPlaying}
        controls={false}
        width="0"
        height="0"
        onEnded={handleNext}
      />
    </div>
  );
}
