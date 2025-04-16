import React from "react";
import AlbumImage from "./albumImage";
import AlbumInfo from "./albumInfo";
import "./songCard.css";

export default function SongCard({ album }) {
  if (!album) return null;

  const imageUrl = album?.images?.[0]?.url;

  return (
    <div className="songCard-body flex">
      {imageUrl && <AlbumImage url={imageUrl} />}
      <AlbumInfo album={album} />
    </div>
  );
}
