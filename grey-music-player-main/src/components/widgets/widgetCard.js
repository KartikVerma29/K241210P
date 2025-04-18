import React from "react";
import "./widgetCard.css";
import WidgetEntry from "./widgetEntry";
import { IconContext } from "react-icons";
import { FiChevronRight } from "react-icons/fi";

export default function WidgetCard({ title, similar = [], featured = [], newRelease = [] }) {
  console.log("similar", similar, "featured", featured, "newRelease", newRelease);

  const renderEntries = () => {
    if (similar.length > 0) {
      return similar.map((artist) => (
        <WidgetEntry
          key={artist?.id || artist?.name}
          title={artist?.name}
          subtitle={`${artist?.followers?.total || 0} Followers`}
          image={artist?.images?.[2]?.url}
        />
      ));
    }

    if (featured.length > 0) {
      return featured.map((playlist) => (
        <WidgetEntry
          key={playlist?.id || playlist?.name}
          title={playlist?.name}
          subtitle={`${playlist?.tracks?.total || 0} Songs`}
          image={playlist?.images?.[0]?.url}
        />
      ));
    }

    if (newRelease.length > 0) {
      return newRelease.map((album) => (
        <WidgetEntry
          key={album?.id || album?.name}
          title={album?.name}
          subtitle={album?.artists?.[0]?.name || ""}
          image={album?.images?.[2]?.url}
        />
      ));
    }

    return null;
  };

  return (
    <div className="widgetcard-body">
      <p className="widget-title">{title}</p>
      {renderEntries()}
      <div className="widget-fade">
        <div className="fade-button">
          <IconContext.Provider value={{ size: "24px", color: "#c4d0e3" }}>
            <FiChevronRight />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}
