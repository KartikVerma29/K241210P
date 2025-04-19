import axios from "axios";

const getYoutubeVideo = async (query) => {
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/search`;
  
  try {
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

    return data.items[0]?.id?.videoId || null;
  } catch (err) {
    console.error("YouTube API Error:", err);
    return null;
  }
};

export default getYoutubeVideo;
