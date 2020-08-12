import "./retro.css";
import React, { useEffect, useState } from "react";
import RetroTopicContainer from "../retro-topic-container/retro-topic-container";
import * as RetroManager from "../../containers/retro-manager/retro-manager";
import { connect } from "react-redux";
import * as actions from "../../store/retro/retro-actions";

const Retro = (props) => {
  useEffect(() => {
    RetroManager.GetRetroColumns(1).then((resp) =>
      props.getRetroData(resp.data)
    );
  }, []);
  return (
    <div className="retro">
      {props.retroData &&
        props.retroData.map((details) => (
          <RetroTopicContainer
            key={details.columnId}
            columnTitle={details.columnTitle}
            columnId={details.columnId}
            columnDetails={details}
            cardDetails={details.retroPoints}
            updateRetroData={props.getRetroData}
            fullRetroData={props.retroData}
          />
        ))}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    retroData: state.RetroReducer.retroData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRetroData: (retroData) => dispatch(actions.getRetroData(retroData)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Retro);
