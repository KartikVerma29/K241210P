import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "8065d3363f134aa687436320d7165f6d";
const redirectUri = "https://e8e0-202-89-79-43.ngrok-free.app/callback";
const scopes = [
  "user-read-private",
  "user-read-email",
  "user-read-playback-state",
  "user-modify-playback-state",
  "streaming",
  "playlist-read-private",
];

// 🔑 Login URL
export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`

// 🔁 Axios instance
const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/"
});

// 🔐 Set token on all requests
export const setClientToken = (token) => {
  apiClient.interceptors.request.use(function (config) {
    if (!token) {
      console.error("No token available! Please authenticate.");
      return config;
    }
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

// ❗ Optional response handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 404) {
      console.error("404 error: Resource not found", error.response.data);
    }
    return Promise.reject(error);
  }
);

// 🎵 Web Playback SDK Player
let player;

export const loadSpotifyPlayer = (token, onReadyCallback) => {
  window.onSpotifyWebPlaybackSDKReady = () => {
    player = new window.Spotify.Player({
      name: "My Spotify Player",
      getOAuthToken: cb => cb(token),
      volume: 0.8
    });

    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      onReadyCallback(device_id);
    });

    player.addListener('initialization_error', ({ message }) => {
      console.error('Initialization Error:', message);
    });

    player.addListener('authentication_error', ({ message }) => {
      console.error('Authentication Error:', message);
    });

    player.addListener('account_error', ({ message }) => {
      console.error('Account Error:', message);
    });

    player.addListener('playback_error', ({ message }) => {
      console.error('Playback Error:', message);
    });

    player.connect();
  };

  const script = document.createElement("script");
  script.src = "https://sdk.scdn.co/spotify-player.js";
  script.async = true;
  document.body.appendChild(script);
};

export const getSpotifyPlayer = () => player;
export default apiClient;
