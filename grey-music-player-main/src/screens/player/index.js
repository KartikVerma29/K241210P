import React, { useEffect, useState } from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
import apiClient from "../../spotify";
import SongCard from "../../components/songCard";
import Queue from "../../components/queue";
import AudioPLayer from "../../components/audioPlayer/index";
import Widgets from "../../components/widgets";

export default function Player() {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res = await apiClient.get("playlists/" + location.state?.id + "/tracks", {
          params: {
            market: "from_token",
            limit: 50,
          },
        });

        const items = res.data?.items
          ?.map((item) => {
            const track = item.track;
            return {
              ...track,
              preview_url: track?.preview_url || track?.external_urls?.spotify,
            };
          })
          ?.filter((item) => item.preview_url);

        setTracks(items || []);
        setCurrentTrack(items?.[0] || null);
      } catch (err) {
        console.error("Failed to fetch playlist tracks:", err);
      }
    };
    fetchTracks();
  }, [location.state]);

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex] || null);
  }, [currentIndex, tracks]);

  return (
    <div className="screen-container flex">
      <div className="left-player-body">
        <AudioPLayer
          currentTrack={currentTrack}
          total={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        {currentTrack?.album?.artists?.[0]?.id && (
          <Widgets artistID={currentTrack.album.artists[0].id} />
        )}
      </div>
      <div className="right-player-body">
        {currentTrack?.album && <SongCard album={currentTrack.album} />}
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
}
