import React, { useState } from "react";
import "./retro-boards.css";
import Menus from "../menus/board-menus";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";
import { NavLink } from "react-router-dom";
import SharePopup from "../share-with/share-with";

const Board = (props) => {
    const [showInput, setShowInput] = useState(false);
    const [openShareWith, setOpenShareWith] = useState(false);
    const createBoard = () => {
        var ele = document.getElementById("retro-board-input");
        if (ele.value) {
            if (!props.board.boardId) props.createBoard(ele.value);
            else {
                props.board.boardTitle = ele.value;
                props.updateBoard && props.updateBoard();
            }
            setShowInput(false);
        }
    };
    const cancelCreate = () => {
        props.cancelCreate && props.cancelCreate();
        setShowInput(false);
    };
    return (
        <div className="board">
            {props.showInput || showInput ? (
                <div>
                    <TextField
                        multiline
                        defaultValue={props.board.boardTitle}
                        variant="outlined"
                        className="board-input"
                        autoFocus
                        id="retro-board-input"></TextField>
                    <div className="board-icon">
                        <CheckIcon onClick={createBoard}></CheckIcon>
                        <CancelIcon onClick={cancelCreate}></CancelIcon>
                    </div>
                </div>
            ) : (
                <NavLink
                    to={"/retro/" + props.board.boardId}
                    activeClassName="is-active">
                    <div
                        onClick={props.selectBoard}
                        className="retro-board-title">
                        {props.board.boardTitle}
                    </div>
                </NavLink>
            )}
            {!props.showInput && (
                <div className="retro-board-menu">
                    <Menus
                        editItem={() => setShowInput(true)}
                        deleteItem={() => props.deleteBoard()}
                        shareItem={() => setOpenShareWith(true)}></Menus>
                </div>
            )}
            <SharePopup isShareWithModalOpen={openShareWith}
                closeModal={() => setOpenShareWith(false)}
                board={props.board}></SharePopup>
        </div>
    );
};

export default Board;
