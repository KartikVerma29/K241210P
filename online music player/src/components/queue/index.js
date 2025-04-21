import React from "react";
import "./queue.css";

export default function Queue({ tracks, setCurrentIndex }) {
  return (
    <div className="queue-container flex">
      <div className="queue flex">
        <p className="upNext">Up Next</p>
        <div className="queue-list">
          {tracks?.map((item, index) => {
            const trackName = item?.track?.name|| item?.name || "Unknown Title";
            return (
              <div
                key={index + "-track"}
                className="queue-item flex"
                onClick={() => setCurrentIndex(index)}
              >
                <p className="track-name">{trackName}</p>
                <p className="track-artist">
                  {item?.track?.artists?.map((artist) => artist.name).join(", ")}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
