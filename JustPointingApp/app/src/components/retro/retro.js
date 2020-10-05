import "./retro.css";
import React, { useEffect, useState } from "react";
import RetroTopicContainer from "../retro-topic-container/retro-topic-container";
import * as RetroManager from "../../containers/retro-manager/retro-manager";
import { connect } from "react-redux";
import * as actions from "../../store/retro/retro-actions";
import RetroBoards from "../retro-boards/retro-boards";
import Modal from "react-modal";
import LoginView from '../login/login';

const Retro = (props) => {
  useEffect(() => {
    RetroManager.GetRetroColumns(1).then((resp) =>
      props.getRetroData(resp.data)
    );
  }, []);

  return (
    props.isUserLoggedIn
    ?
    <div className="retro">
      <RetroBoards></RetroBoards>
        <div className="board-content">
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
  </div>
  :
  <Modal isOpen = {!props.isUserLoggedIn} ariaHideApp={false} overlayClassName="login-modal">
    <LoginView/>
  </Modal>
  );
};

function mapStateToProps(state) {
  return {
    retroData: state.RetroReducer.retroData,
    isUserLoggedIn: state.SessionReducer.isUserLoggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRetroData: (retroData) => dispatch(actions.getRetroData(retroData))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Retro);
