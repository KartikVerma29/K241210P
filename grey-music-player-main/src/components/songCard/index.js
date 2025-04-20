import React from "react";
import AlbumImage from "./albumImage";
import AlbumInfo from "./albumInfo";
import "./songCard.css";

export default function SongCard({ album }) {
  if (!album) return null;
  console.log("Album Data:", album);
  const imageUrl = album?.images?.[0]?.url;
  console.log("Album Image URL:", imageUrl);


  return (
    <div className="songCard-body flex">
      {imageUrl && <AlbumImage url={imageUrl} />}
      <AlbumInfo album={album} />
    </div>
  );
}
