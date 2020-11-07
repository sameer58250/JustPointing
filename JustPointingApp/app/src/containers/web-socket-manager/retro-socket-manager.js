import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as retroActions from "../../store/retro/retro-actions";
import * as retroManager from "../retro-manager/retro-manager";
import Config from "../../config/config";

const RetroSocketManager = (props) => {
    var retroSocket;
    const selectedBoardRef = useRef(props.selectedBoard);
    const selectedPointRef = useRef(props.selectedRetroPoint);

    useEffect(() => {
        if (props.userId) {
            startRetroSocket(props.userId);
        }
    }, []);

    useEffect(() => {
        selectedPointRef.current = props.selectedRetroPoint;
    }, [props.selectedRetroPoint]);

    useEffect(() => {
        selectedBoardRef.current = props.selectedBoard;
    }, [props.selectedBoard]);

    const startRetroSocket = (userId) => {
        var url = Config.REACT_APP_RETRO_SOCKET_URL + "?userId=" + userId;
        if (!retroSocket) {
            retroSocket = new WebSocket(url);
            retroSocket.onmessage = onMessage;
            retroSocket.onclose = onClose;
        }
    };

    const onMessage = (message) => {
        var data = JSON.parse(message.data);
        switch (data.action) {
            case "BoardAdded":
                refreshBoards(props.userId);
                break;
            case "BoardUpdated":
                refreshBoards(props.userId);
                break;
            case "BoardDetailsUpdated":
                refreshBoardDetails(data.boardid);
                break;
            case "BoardUserAdded":
                refreshBoardUsers(data.boardid);
                break;
            case "RetroCommentsModified":
                break;
            default:
                break;
        }
    };

    const onClose = (closeInfo) => {};

    function refreshBoards(userId) {
        var boards = [];
        retroManager.GetRetroBoardsOfUser(userId).then((res) => {
            boards = boards.concat(res.data);
            props.getRetroBoards(boards);
        });
        retroManager.GetSharedBoards(userId).then((res) => {
            boards = boards.concat(res.data);
            props.getRetroBoards(boards);
        });
    }

    function refreshBoardDetails(boardId) {
        if (boardId === selectedBoardRef.current.boardId) {
            retroManager.GetRetroColumns(boardId).then((res) => {
                props.getRetroData(res.data);
                refreshSelectedRetroPoint(res.data);
            });
        }
    }

    function refreshSelectedRetroPoint(boardData) {
        if (boardData) {
            for (var i = 0; i < boardData.length; i++) {
                if (
                    boardData[i].columnId ===
                    selectedPointRef.current.retroColumnId
                ) {
                    var retroPoints = boardData[i].retroPoints;
                    if (retroPoints) {
                        for (var j = 0; j < retroPoints.length; j++) {
                            if (
                                retroPoints[j].retroPointId ===
                                selectedPointRef.current.retroPointId
                            ) {
                                props.updateSelectedRetroPoint(retroPoints[j]);
                                return;
                            }
                        }
                    }
                }
            }
            props.updateSelectedRetroPoint({});
            props.openClosePointModal(false);
        }
    }

    function refreshBoardUsers(boardId) {
        if (boardId === selectedBoardRef.current.boardId) {
            retroManager.GetBoardUsers(boardId).then((res) => {
                props.updateBoardUsers(res.data);
            });
        }
    }
    return <div></div>;
};

function mapStateToProps(state) {
    return {
        selectedBoard: state.RetroReducer.selectedBoard,
        selectedRetroPoint: state.RetroReducer.selectedRetroPoint,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getRetroBoards: (boards) =>
            dispatch(retroActions.getRetroBoards(boards)),
        getRetroData: (boardDetails) =>
            dispatch(retroActions.getRetroData(boardDetails)),
        updateBoardUsers: (users) =>
            dispatch(retroActions.updateBoardUsers(users)),
        updateSelectedRetroPoint: (point) =>
            dispatch(retroActions.selectRetroPoint(point)),
        openClosePointModal: (isOpen) =>
            dispatch(retroActions.openCloseRetroPointModal(isOpen)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RetroSocketManager);
