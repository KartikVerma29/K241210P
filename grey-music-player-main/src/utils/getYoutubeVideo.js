import axios from "axios";

const youtubeCache = {};
let queryCache = 0;
const QUERY_LIMIT = 500;

const getYoutubeVideo = async (query) => {
  if (youtubeCache[query]) {
    return youtubeCache[query];
  }
  if (queryCache >= QUERY_LIMIT) {
    console.log("Query limit reached. Returning null.");
    return null;
  }
  const apiKey = "AIzaSyBRJi99fgRGDbrT5ggD6RVwNB1dsZPDia8";
  const url = `https://www.googleapis.com/youtube/v3/search`;
  
  // console.log("YouTube API Key:", apiKey);
  // console.log("seaqrch query:", query);

  try {
    queryCache++;
    const { data } = await axios.get(url, {
      params: {
        part: "snippet",
        maxResults: 1,
        q: query,
        key: apiKey,
        type: "video",
        videoEmbeddable: "true",
      },
    });

    // console.log("YouTube API Response:", data);
    const videoId = data.items[0]?.id?.videoId || null;
    youtubeCache[query] = videoId;

    return videoId;
  } catch (err) {
    console.error("YouTube API Error:", err);
    return null;
  }
};

export default getYoutubeVideo;
