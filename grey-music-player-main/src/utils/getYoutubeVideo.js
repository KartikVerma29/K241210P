import axios from "axios";

const getYoutubeVideo = async (query) => {
  const apiKey = "AIzaSyD2ilK9Op8DwU0Bz9a0sWpc2Je5MofykRs";
  const url = `https://www.googleapis.com/youtube/v3/search`;
  
  console.log("YouTube API Key:", apiKey);
  console.log("seaqrch query:", query);

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

    console.log("YouTube API Response:", data);

    return data.items[0]?.id?.videoId || null;
  } catch (err) {
    console.error("YouTube API Error:", err);
    return null;
  }
};

export default getYoutubeVideo;
