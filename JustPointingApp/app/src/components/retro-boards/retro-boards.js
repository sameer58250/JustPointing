import "./retro-boards.css";
import React, { useState, useEffect } from "react";
import * as RetroManager from "../../containers/retro-manager/retro-manager";
import { connect } from "react-redux";
import * as actions from "../../store/retro/retro-actions";
import * as sessionActions from "../../store/session/session-actions";
import Board from "./board";
import { removeFromArrayByAttr, findIndexArrayByAttr } from "../../utils/utils";
import { useHistory } from "react-router-dom";
import CollapseIcon from "@material-ui/icons/ChevronLeft";
import ExpandIcon from "@material-ui/icons/ChevronRight";
import SettingsIcon from "@material-ui/icons/Settings";
import { NavLink } from "react-router-dom";

const RetroBoards = (props) => {
    const History = useHistory();
    const [isCreateActive, setCreateBtnActive] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    useEffect(() => {
        if (props.selectedBoardIdFromURL) {
            var idx = findIndexArrayByAttr(
                props.retroBoards,
                "boardId",
                new Number(props.selectedBoardIdFromURL).valueOf()
            );
            if (idx !== -1) {
                selectRetroBoard(props.retroBoards[idx]);
            } else {
                History.replace("/retro/");
            }
        }
    }, [props.retroBoards.length]);

    const getBoardName = () => {
        return props.userDetails.name + ' ' +
        new Date(Date.now()).toLocaleDateString() + ' : ' +
        new Date(Date.now()).toLocaleTimeString()
    }

    const createBoard = () => {
            var board = {
                boardTitle: getBoardName(),              
                boardOwnerId: props.userDetails.userId,
                creationDate: new Date().toDateString(),
            };
            RetroManager.AddRetroBoard(board).then(
                (res) => {
                    board.boardId = res.data;
                    if (!props.retroBoards) {
                        props.retroBoards = [];
                    }
                    props.retroBoards.push(board);
                    props.getRetroBoards(props.retroBoards);
                    setCreateBtnActive(false);
                    props.setError("");
                },
                (err) => {
                    console.log(err);
                    props.setError(
                        "Failed to add retro board. Please try later."
                    );
                }
            );
    };
    const selectRetroBoard = (board) => {
        props.selectRetroBoard(board);
        RetroManager.GetBoardUsers(board.boardId).then((res) => {
            props.updateBoardUsers(res.data);
        });
        RetroManager.GetRetroColumns(board.boardId).then(
            (res) => {
                props.getRetroData(res.data);
                props.setError("");
            },
            (err) => {
                props.setError("Failed to fetch board details.");
                console.log(err);
            }
        );
    };

    const updateRetroBoard = (board) => {
        RetroManager.UpdateRetroBoard(board).then(() => {
            props.getRetroBoards(props.retroBoards);
        });
    };

    const deleteRetroBoard = (boardId) => {
        RetroManager.DeleteRetroBoard(boardId, props.userDetails.userId).then(
            () => {
                props.setError("");
                removeFromArrayByAttr(props.retroBoards, "boardId", boardId);
                var boards = props.retroBoards.slice();
                props.getRetroBoards(boards);
                if (boardId === props.selectedBoard.boardId)
                    props.selectRetroBoard({});
            },
            () => {
                props.setError("Failed to delete the board.");
            }
        );
    };
    return (
        <div className="retro-board-container" id="retro-board-container">
            <div>
                {isCollapsed ? (
                    <ExpandIcon
                        className="expand-collapse-icon"
                        onClick={() => {
                            document.getElementById(
                                "retro-board-container"
                            ).style.width = "26%";
                            document.getElementById(
                                "settings-icon"
                            ).style.float = "right";
                            setIsCollapsed(false);
                        }}></ExpandIcon>
                ) : (
                    <CollapseIcon
                        className="expand-collapse-icon"
                        onClick={() => {
                            document.getElementById(
                                "retro-board-container"
                            ).style.width = "auto";
                            document.getElementById(
                                "settings-icon"
                            ).style.float = "none";
                            setIsCollapsed(true);
                        }}></CollapseIcon>
                )}
                <NavLink
                    to={"/retro/settings"}
                    id="settings-icon"
                    className="settings-icon">
                    <div>
                        <SettingsIcon></SettingsIcon>
                    </div>
                </NavLink>
            </div>
            {!isCollapsed && (
                <div className="retro-boards">
                    <button onClick={() => {
                        createBoard();
                        setCreateBtnActive(true)
                    }}>
                        Create board
                    </button>
                    <label className="retro-board-heading">My boards</label>
                    {props.retroBoards.map((board, idx) => {
                        if (props.userDetails.userId === board.boardOwnerId) {
                            return (
                                <Board
                                    key={idx}
                                    board={board}
                                    selectBoard={() => selectRetroBoard(board)}
                                    updateBoard={() => updateRetroBoard(board)}
                                    deleteBoard={() =>
                                        deleteRetroBoard(board.boardId)
                                    }></Board>
                            );
                        }
                    })}
                    <label className="retro-board-heading">Shared boards</label>
                    {props.retroBoards.map((board, idx) => {
                        if (props.userDetails.userId !== board.boardOwnerId) {
                            return (
                                <Board
                                    key={idx}
                                    board={board}
                                    selectBoard={() => selectRetroBoard(board)}
                                    updateBoard={() => updateRetroBoard(board)}
                                    deleteBoard={() =>
                                        deleteRetroBoard(board.boardId)
                                    }></Board>
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
};

function mapStateToProps(state) {
    return {
        retroBoards: state.RetroReducer.retroBoards,
        userDetails: state.SessionReducer.userDetails,
        selectedBoard: state.RetroReducer.selectedBoard,
        selectedBoardIdFromURL: state.RetroReducer.selectedBoardId,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getRetroData: (retroData) => dispatch(actions.getRetroData(retroData)),
        getRetroBoards: (boards) => dispatch(actions.getRetroBoards(boards)),
        selectRetroBoard: (board) => dispatch(actions.selectRetroBoard(board)),
        setError: (errorText) =>
            dispatch(sessionActions.create_session_failure(errorText)),
        updateBoardUsers: (users) => dispatch(actions.updateBoardUsers(users)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RetroBoards);
