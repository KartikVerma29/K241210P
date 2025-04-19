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

   
   
  }, []);

  // Fetch tracks for a specific playlist and get preview URL
  const fetchPlaylistTracks = (playlistId) => {
    APIKit.get(`playlists/${playlistId}/tracks`)
      .then((response) => {
        const tracks = response?.data?.items || [];
        const tracksWithPreview = tracks.map((trackItem) => ({
          name: trackItem.track.name,
          preview_url: trackItem.track.preview_url,
        }));
        console.log("Tracks with Preview URL:", tracksWithPreview);
      })
      .catch((error) => console.error("Error fetching playlist tracks:", error));
  };

  const playPlaylist = (id) => {
    fetchPlaylistTracks(id);  // Fetch tracks for preview URL
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

      
      </div>
    </div>
  );
}
