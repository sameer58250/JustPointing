import "./retro.css";
import React, { useEffect, useState } from "react";
import * as RetroManager from "../../containers/retro-manager/retro-manager";
import { connect } from "react-redux";
import * as actions from "../../store/retro/retro-actions";
import * as sessionActions from "../../store/session/session-actions";
import RetroBoards from "../retro-boards/retro-boards";
import AppError from "../error/error";
import { Route } from "react-router-dom";
import BoardDetails from "../retro-topic-container/retro-board-details";
import RetroSocketManager from "../../containers/web-socket-manager/retro-socket-manager";
import RetroSettingView from "../retro-settings/retro-settings";
import { LoginUser } from "../../containers/session-manager/account";
import { Cookies } from "react-cookie";

const Retro = (props) => {
    var cookies = new Cookies();
    const [isUserAuthenticated, setUserAuthenticated] = useState(false);

    useEffect(() => {
        props.openLoginPopup(false);
        props.openLoginPopup(true);
        props.setError("");
        if (props.isUserLoggedIn) {
            props.openLoginPopup(false);
            GetRetroBoardsOfUser(props.userDetails.userId);
        }
    }, [props.isUserLoggedIn]);

    useEffect(() => {
        loginViaUrl();
    },[])

    const loginViaUrl = () => {
        var queryStrings = window.location.search?.substring(1).split("&");
        var email, guid;
        queryStrings.forEach(element => {
            if(element){
                var values = element.split("=");
                if(values && values[0].toLocaleLowerCase()==="email"){
                    email = values[1];
                }
                else if(values && values[0].toLocaleLowerCase()==="token"){
                    guid = values[1];
                }
            }
        });
        if(email && guid){
            LoginUser({ userEmail: email, UserGuid: guid }).then(
                (res) => {
                    props.openLoginPopup(false);
                    GetRetroBoardsOfUser(res.data.userId);
                    props.userDetails.userId = res.data.userId;
                    var token = "Basic " + btoa(email + ":" + guid);
                    cookies.set("token", token);
                    setUserAuthenticated(true);
                }
            );
        }
    }

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
        RetroManager.GetSharedBoards(userId).then((res) => {
            boards = boards.concat(res.data);
            props.getRetroBoards(boards);
        });
    };

    return (props.isUserLoggedIn || isUserAuthenticated) && (
        <div>
            <RetroSocketManager userId={props.userDetails.userId} />
            <div className="retro">
                <RetroBoards />
                <Route
                    path="/retro/settings/"
                    render={(props) => (
                        <RetroSettingView {...props}></RetroSettingView>
                    )}></Route>
                <Route
                    path={["/retro/:id(\\d+)", "/retro/"]}
                    exact
                    render={(props) => (
                        <BoardDetails {...props}></BoardDetails>
                    )}></Route>
            </div>
            <div style={{ textAlign: "center" }}>
                <AppError errorText={props.error}></AppError>
            </div>
        </div>
    )
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
