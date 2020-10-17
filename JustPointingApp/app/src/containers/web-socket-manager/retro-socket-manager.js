import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as retroActions from "../../store/retro/retro-actions";
import * as retroManager from "../retro-manager/retro-manager";
import Config from "../../config/config";

const RetroSocketManager = (props) => {
    var retroSocket;
    const selectedBoardRef = useRef(props.selectedBoard);

    useEffect(() => {
        if (props.userId) {
            startRetroSocket(props.userId);
        }
    }, []);

    useEffect(() => {
        selectedBoardRef.current = props.selectedBoard;
    }, [props.selectedBoard]);

    const startRetroSocket = (userId) => {
        var url = Config.REACT_APP_RETRO_SOCKET_URL + "?userId=" + userId;
        if (!retroSocket) {
            retroSocket = new WebSocket(url);
            retroSocket.onmessage = onMessage;
            retroSocket.onclose = onClose;
            console.log(retroSocket);
        }
    };

    const onMessage = (message) => {
        var data = JSON.parse(message.data);
        switch (data.action) {
            case "BoardAdded":
                refreshBoards(props.userId);
                break;
            case "BoardUpdated":
                break;
            case "BoardDetailsUpdated":
                refreshBoardDetails(data.boardid);
                break;
            default:
                break;
        }
    };

    const onClose = (closeInfo) => {};

    const refreshBoards = (userId) => {
        var boards = [];
        retroManager.GetRetroBoardsOfUser(userId).then((res) => {
            boards = boards.concat(res.data);
            props.getRetroBoards(boards);
        });
        retroManager.GetSharedBoards(userId).then((res) => {
            boards = boards.concat(res.data);
            props.getRetroBoards(boards);
        });
    };

    const refreshBoardDetails = (boardId) => {
        if (boardId === selectedBoardRef.current.boardId) {
            retroManager.GetRetroColumns(boardId).then((res) => {
                props.getRetroData(res.data);
            });
        }
    };
    return <div></div>;
};

function mapStateToProps(state) {
    return {
        selectedBoard: state.RetroReducer.selectedBoard,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getRetroBoards: (boards) =>
            dispatch(retroActions.getRetroBoards(boards)),
        getRetroData: (boardDetails) =>
            dispatch(retroActions.getRetroData(boardDetails)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RetroSocketManager);
