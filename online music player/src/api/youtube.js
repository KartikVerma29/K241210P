const youtubeCache = {};



export const searchYouTube = async (query) => {
  if (youtubeCache[query]) {
    return youtubeCache[query];}
  

    const API_KEY = "AIzaSyBRJi99fgRGDbrT5ggD6RVwNB1dsZPDia8";
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet&q=${encodeURIComponent(query)}` +
      `&key=${API_KEY}&type=video&maxResults=1`
    );
    const data = await res.json();
    const videoId = data.items?.[0]?.id?.videoId || null;
    youtubeCache[query] = videoId;
    return videoId
  };
  