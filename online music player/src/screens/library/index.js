import React, { useState, useEffect } from "react";
import APIKit from "../../spotify";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./library.css";
import getYoutubeVideo from "../../utils/getYoutubeVideo";


const enhanceTracksWithYoutube = async (tracks) => {
  const updatedTracks = await Promise.all(
    tracks.map(async (track) => {
      try {
        const searchQuery = `${track.name}`;
        const videoId = await getYoutubeVideo(searchQuery);
        return { ...track, yt_video_id: videoId };
      } catch (err) {
        console.error("Error fetching YouTube video:", err);
        return { ...track, yt_video_id: null };
      }
    })
  );
  return updatedTracks;
};

export default function Library() {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    APIKit.get("me/playlists")
      .then((response) => setPlaylists(response?.data?.items || []))
      .catch((error) => console.error("Error fetching playlists:", error));
  }, []);

  
  const fetchPlaylistTracks = async (playlistId) => {
    try {
      const response = await APIKit.get(`playlists/${playlistId}/tracks`);
      const tracks = response?.data?.items || [];
      console.log("Fetched tracks:", tracks);

      const tracksWithPreview = tracks.map((trackItem) => ({
        name: trackItem.track.name,
        preview_url: trackItem.track.preview_url,
        artists: trackItem.track.artists,

        album: {
          name: trackItem.track.album.name,
          images: trackItem.track.album.images,
          artists: trackItem.track.album.artists
        },

        imageUrl : trackItem.track.album.images[0]?.url

      }));

      console.log("Tracks with Preview URL:", tracksWithPreview);

      const enhancedTracks = await enhanceTracksWithYoutube(tracksWithPreview);
      console.log("Enhanced Tracks with YouTube IDs:", enhancedTracks);

      navigate("/player", { state: { id: playlistId, tracks: enhancedTracks } });
    } catch (error) {
      console.error("Error fetching playlist tracks:", error);
    }
  };

  const playPlaylist = (id) => {
    fetchPlaylistTracks(id);
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
