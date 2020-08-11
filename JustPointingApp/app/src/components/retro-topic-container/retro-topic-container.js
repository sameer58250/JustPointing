import "./retro-topic-container.css";
import React, { useState, useEffect } from "react";
import SimpleCard from "../card/card";
import { Button, InputLabel } from "@material-ui/core";

const RetroTopicContainer = (props) => {
  const initialValue = [{ id: 0, value: " --- Select a State ---" }];
  const [stateOptions, setStateValues] = useState(initialValue);
  const [isAddCardVisible, setIsAddCardVisible] = useState(true);
  const [newCard, setNewCard] = useState("");

  const allowedState = [
    { id: 1, value: "Alabama" },
    { id: 2, value: "Georgia" },
    { id: 3, value: "Tennessee" },
  ];

  useEffect(() => {
    setStateValues(allowedState);
  }, []);

  const addCard = () => {
    console.log("click");
    setStateValues((stateOptions) => [
      ...stateOptions,
      { id: stateOptions.slice(-1)[0].id + 1, value: newCard },
    ]);
    setIsAddCardVisible(true);
  };

  const addCardClicked = () => {
    setIsAddCardVisible(false);
  };

  const cancelClicked = () => {
    setIsAddCardVisible(true);
  };

  const cardModified = (event) => {
    setNewCard(event.target.value);
  };

  return (
    <div className="retroTopicContainer">
      <div className="topicHeader">{props.Topic}</div>
      {stateOptions.map((state) => (
        <SimpleCard key={state.id} CardDetails={state.value} />
      ))}
      {isAddCardVisible && (
        <Button className="addCardButton" onClick={addCardClicked}>
          Add a Card
        </Button>
      )}
      {!isAddCardVisible && (
        <form className="newCardInput">
          <input type="text" className="inputField" onChange={cardModified} />
          <Button className="button" onClick={cancelClicked}>
            Cancel
          </Button>
          <Button className="button" onClick={addCard}>
            Add
          </Button>
        </form>
      )}
    </div>
  );
};

export default RetroTopicContainer;
