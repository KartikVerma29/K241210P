
export const searchYouTube = async (query) => {
    const API_KEY = process.env.REACT_APP_YT_API_KEY;
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet&q=${encodeURIComponent(query)}` +
      `&key=${API_KEY}&type=video&maxResults=1`
    );
    const data = await res.json();
    return data.items?.[0]?.id?.videoId || null;
  };
  