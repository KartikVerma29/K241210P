import React, { useState, useEffect } from "react";
import APIKit from "../../spotify";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import WidgetCard from "../../components/widgets/widgetCard";
import "./library.css";

export default function Library() {
  const [playlists, setPlaylists] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [newRelease, setNewRelease] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's playlists
    APIKit.get("me/playlists")
      .then((response) => setPlaylists(response?.data?.items || []))
      .catch((error) => console.error("Error fetching playlists:", error));

    // Fetch top artists
    APIKit.get("me/top/artists?limit=5")
      .then((res) => setSimilar(res?.data?.items || []))
      .catch((err) => console.error("Top Artists Error", err));

    // Fetch featured playlists
    APIKit.get("browse/featured-playlists?limit=5")
      .then((res) => setFeatured(res?.data?.playlists?.items || []))
      .catch((err) => console.error("Featured Playlists Error", err));

    // Fetch new releases
    APIKit.get("browse/new-releases?limit=5")
      .then((res) => setNewRelease(res?.data?.albums?.items || []))
      .catch((err) => console.error("New Releases Error", err));
  }, []);

  const playPlaylist = (id) => {
    navigate("/player", { state: { id: id } });
  };

  return (
    <div className="screen-container">
      <div className="library-body">
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div
              className="playlist-card"
              key={playlist.id}
              onClick={() => playPlaylist(playlist.id)}
            >
              <img
                src={playlist?.images?.[0]?.url || ""}
                className="playlist-image"
                alt="Playlist-Art"
              />
              <p className="playlist-title">{playlist.name}</p>
              <p className="playlist-subtitle">{playlist.tracks.total} Songs</p>
              <div className="playlist-fade">
                <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                  <AiFillPlayCircle />
                </IconContext.Provider>
              </div>
            </div>
          ))
        ) : (
          <div className="no-playlists">Loading playlists or none found.</div>
        )}

        {/* 🔥 Add WidgetCard Components Here */}
        <WidgetCard title="Top Artists" similar={similar} />
        <WidgetCard title="Featured Playlists" featured={featured} />
        <WidgetCard title="New Releases" newRelease={newRelease} />
      </div>
    </div>
  );
}
