import "./retro.css";
import React, { useEffect, useState } from "react";
import RetroTopicContainer from "../retro-topic-container/retro-topic-container";
import * as RetroManager from "../../containers/retro-manager/retro-manager";
import { connect } from "react-redux";
import * as actions from "../../store/retro/retro-actions";
import * as sessionActions from "../../store/session/session-actions";
import RetroBoards from "../retro-boards/retro-boards";
import LoginView from "../app-login/app-login";
import AppError from "../error/error";

const Retro = (props) => {
    useEffect(() => {
        props.openLoginPopup(false);
        props.setError("");
        if (props.isUserLoggedIn) {
            GetRetroBoardsOfUser(props.userDetails.userId);
        }
    }, []);

    const GetRetroBoardsOfUser = (userId) => {
        console.log("callback execued");
        RetroManager.GetRetroBoardsOfUser(userId).then(
            (res) => {
                props.getRetroBoards(res.data);
            },
            (err) => {
                console.log(err);
            }
        );
    };

    return props.isUserLoggedIn ? (
        <div>
            <div className="retro">
                <RetroBoards />
                {props.selectedBoard && props.selectedBoard.boardId ? (
                    <div className="retro-detail-container">
                        <div className="selected-board-title">
                            <label>{props.selectedBoard.boardTitle}</label>
                        </div>
                        <div className="board-content">
                            {props.retroData &&
                                props.retroData.map((details) => (
                                    <RetroTopicContainer
                                        key={details.columnId}
                                        columnTitle={details.columnTitle}
                                        columnId={details.columnId}
                                        columnDetails={details}
                                    />
                                ))}
                            <RetroTopicContainer />
                        </div>
                    </div>
                ) : (
                    <div className="select-retro-board">
                        Please select board from left pane.
                    </div>
                )}
            </div>
            <div style={{ textAlign: "center" }}>
                <AppError errorText={props.error}></AppError>
            </div>
        </div>
    ) : (
        <LoginView
            openLoginPopup={!props.isUserLoggedIn}
            loginCallback={GetRetroBoardsOfUser}></LoginView>
    );
};

function mapStateToProps(state) {
    return {
        retroData: state.RetroReducer.retroData,
        isUserLoggedIn: state.SessionReducer.isUserLoggedIn,
        userDetails: state.SessionReducer.userDetails,
        selectedBoard: state.RetroReducer.selectedBoard,
        error: state.SessionReducer.sessionError,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getRetroData: (retroData) => dispatch(actions.getRetroData(retroData)),
        getRetroBoards: (boards) => dispatch(actions.getRetroBoards(boards)),
        openLoginPopup: (openLogin) =>
            dispatch(sessionActions.open_login_popup(openLogin)),
        setError: (errorText) =>
            dispatch(sessionActions.create_session_failure(errorText)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Retro);
