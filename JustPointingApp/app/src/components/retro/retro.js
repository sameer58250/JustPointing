import "./retro.css";
import React, { useEffect } from "react";
import * as RetroManager from "../../containers/retro-manager/retro-manager";
import { connect } from "react-redux";
import * as actions from "../../store/retro/retro-actions";
import * as sessionActions from "../../store/session/session-actions";
import RetroBoards from "../retro-boards/retro-boards";
import LoginView from "../app-login/app-login";
import AppError from "../error/error";
import { Route } from "react-router-dom";
import BoardDetails from "../retro-topic-container/retro-board-details";

const Retro = (props) => {
    useEffect(() => {
        props.openLoginPopup(false);
        props.setError("");
        if (props.isUserLoggedIn) {
            GetRetroBoardsOfUser(props.userDetails.userId);
        }
    }, [props.isUserLoggedIn]);

    const GetRetroBoardsOfUser = (userId) => {
        var boards = [];
        RetroManager.GetRetroBoardsOfUser(userId).then(
            (res) => {
                boards = boards.concat(res.data);
                props.getRetroBoards(boards);
            },
            (err) => {
                console.log(err);
            }
        );
        RetroManager.GetSharedBoards(userId)
        .then((res) => {
            boards = boards.concat(res.data);
            props.getRetroBoards(boards);
        })
    };

    return props.isUserLoggedIn ? (
        <div>
            <div className="retro">
                <RetroBoards />
                <Route
                    path={["/retro/:id", "/retro/"]}
                    render={(props) => (
                        <BoardDetails {...props}></BoardDetails>
                    )}></Route>
            </div>
            <div style={{ textAlign: "center" }}>
                <AppError errorText={props.error}></AppError>
            </div>
        </div>
    ) : (
        <LoginView
            openLoginPopup={!props.isUserLoggedIn}
            loginCallback={()=>{}}></LoginView>
    );
};

function mapStateToProps(state) {
    return {
        isUserLoggedIn: state.SessionReducer.isUserLoggedIn,
        userDetails: state.SessionReducer.userDetails,
        error: state.SessionReducer.sessionError,
        retroBoards: state.RetroReducer.retroBoards,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getRetroBoards: (boards) => dispatch(actions.getRetroBoards(boards)),
        openLoginPopup: (openLogin) =>
            dispatch(sessionActions.open_login_popup(openLogin)),
        setError: (errorText) =>
            dispatch(sessionActions.create_session_failure(errorText)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Retro);
