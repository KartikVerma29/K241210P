import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "57ec545da9ef4d239a8efd565a192315";
const redirectUri = "http://localhost:3000";

const scopes = [
  "user-read-private",
  "user-read-email",
  "user-read-playback-state",
  "user-modify-playback-state",
  "streaming",
  "playlist-read-private",
];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/"
});


export const setClientToken = (token) => {
  apiClient.interceptors.request.use(function (config) {
    if (!token) {
      console.error("No token available! Please authenticate.");
      return config;
    }

    
    // console.log("Requesting URL:", config.url);
    // console.log("Using token:", token);

    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};


apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 404) {
      console.error("404 error: Resource not found", error.response.data);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
