import "./retro.css";
import React from "react";
import RetroTopicContainer from "../retro-topic-container/retro-topic-container";

const Retro = (props) => {
  return (
    <div className="retro">
      <RetroTopicContainer Topic="Start Doing" />
      <RetroTopicContainer Topic="Stop Doing" />
      <RetroTopicContainer Topic="Continue Doing" />
      <RetroTopicContainer Topic="Action Items" />
    </div>
  );
};

export default Retro;
