import "./retro-topic-container.css";
import React, { useState, useEffect } from "react";
import SimpleCard from "../card/card";
import { Button, InputLabel } from "@material-ui/core";
import * as RetroManager from "../../containers/retro-manager/retro-manager";
import { findIndexArrayByAttr } from "../../utils/utils";

const RetroTopicContainer = (props) => {
  const [isAddCardVisible, setIsAddCardVisible] = useState(true);
  const [newCard, setNewCard] = useState("");

  const addCard = () => {
    console.log("click");
    var date = new Date();
    var retroPointDate = date.toLocaleDateString;
    var newRetroPoint = {
      // retroPointId: props.cardDetails.slice(-1)[0].retroPointId + 1,
      retroPointUserId: props.cardDetails.slice(-1)[0].retroPointUserId,
      retroPointText: newCard,
      creationDate: retroPointDate,
      retroColumnId: props.cardDetails.slice(-1)[0].retroColumnId,
    };
    var newCardDetails;
    RetroManager.PostRetroPoint(newRetroPoint).then((resp) => {
      debugger;
      newRetroPoint.retroPointId = resp.data;
      props.cardDetails.push(newRetroPoint);
      var columnIndex = findIndexArrayByAttr(
        props.fullRetroData,
        "columnId",
        props.columnDetails.columnId
      );
      props.fullRetroData[columnIndex].retroPoints = props.cardDetails;
      props.updateRetroData(props.fullRetroData);
      RetroManager.GetRetroColumns(1).then((resp) =>
        props.updateRetroData(resp.data)
      );
    });

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
      <div className="topicHeader">{props.columnTitle}</div>
      {props.cardDetails &&
        props.cardDetails.map((retroPoint) => (
          <SimpleCard
            key={retroPoint.retroPointId}
            cardDetails={retroPoint.retroPointText}
          />
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

// function mapStateToProps(state) {
//   return {
//     retroData: state.RetroReducer.retroData,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     getRetroData: (retroData) => dispatch(actions.getRetroData(retroData)),
//   };
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(RetroTopicContainer);

export default RetroTopicContainer;
