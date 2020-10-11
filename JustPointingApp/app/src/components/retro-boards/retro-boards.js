import "./retro-boards.css";
import React, { useState } from "react";
import * as RetroManager from "../../containers/retro-manager/retro-manager";
import { connect } from "react-redux";
import * as actions from "../../store/retro/retro-actions";
import * as sessionActions from "../../store/session/session-actions";
import Board from "./board";
import { removeFromArrayByAttr } from "../../utils/utils";

const RetroBoards = (props) => {
    const [isCreateActive, setCreateBtnActive] = useState(false);
    const createBoard = (boardName) => {
        if (boardName) {
            var board = {
                boardTitle: boardName,
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
        }
    };
    const selectRetroBoard = (board) => {
        props.selectRetroBoard(board);
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

    const cancelCreate = () => {
        setCreateBtnActive(false);
    };

    const updateRetroBoard = (board) => {
        //http call is pending
        props.getRetroBoards(props.retroBoards);
        console.log(board);
    };

    const deleteRetroBoard = (boardId) => {
        RetroManager.DeleteRetroBoard(boardId, props.userDetails.userId).then(
            () => {
                removeFromArrayByAttr(props.retroBoards, "boardId", boardId);
                var boards = props.retroBoards.slice();
                props.getRetroBoards(boards);
                props.selectRetroBoard({});
            }
        );
    };
    return (
        <div className="retro-boards">
            {props.retroBoards.map((board, idx) => {
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
            })}
            {isCreateActive ? (
                <Board
                    showInput={true}
                    board={{}}
                    createBoard={createBoard}
                    cancelCreate={cancelCreate}></Board>
            ) : (
                <button onClick={() => setCreateBtnActive(true)}>
                    Create board
                </button>
            )}
        </div>
    );
};

function mapStateToProps(state) {
    return {
        retroBoards: state.RetroReducer.retroBoards,
        isUserLoggedIn: state.SessionReducer.isUserLoggedIn,
        userDetails: state.SessionReducer.userDetails,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getRetroData: (retroData) => dispatch(actions.getRetroData(retroData)),
        getRetroBoards: (boards) => dispatch(actions.getRetroBoards(boards)),
        selectRetroBoard: (board) => dispatch(actions.selectRetroBoard(board)),
        setError: (errorText) =>
            dispatch(sessionActions.create_session_failure(errorText)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RetroBoards);
