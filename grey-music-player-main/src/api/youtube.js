
export const searchYouTube = async (query) => {
    const API_KEY = "AIzaSyD2ilK9Op8DwU0Bz9a0sWpc2Je5MofykRs";
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet&q=${encodeURIComponent(query)}` +
      `&key=${API_KEY}&type=video&maxResults=1`
    );
    const data = await res.json();
    return data.items?.[0]?.id?.videoId || null;
  };
  