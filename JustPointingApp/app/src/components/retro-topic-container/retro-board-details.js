import React, { useEffect, useState } from "react";
import RetroTopicContainer from "./retro-topic-container";
import { connect } from "react-redux";
import * as actions from "../../store/retro/retro-actions";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ShareView from "../share-with/share-with";

const RetroDetails = (props) => {
    useEffect(() => {
        if (props.match.params.id) {
            props.selectBoardIdFromURL(props.match.params.id);
        } else {
            props.selectBoardIdFromURL("");
            props.selectBoard({});
        }
    }, []);

    const [openShareWith, setOpenShareWith] = useState(false);

    const openShareModal = () => {
        setOpenShareWith(true);
    };

    return props.selectedBoard && props.selectedBoard.boardId ? (
        <div className="retro-detail-container">
            <div className="selected-board-title">
                <label>{props.selectedBoard.boardTitle}</label>
                <PersonAddIcon
                    className="retro-board-share-icon"
                    onClick={openShareModal}></PersonAddIcon>
            </div>
            <ShareView
                isShareWithModalOpen={openShareWith}
                closeModal={() => setOpenShareWith(false)}
                board={props.selectedBoard}></ShareView>
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
            Please select a board from left pane.
        </div>
    );
};

function mapStateToProps(state) {
    return {
        retroData: state.RetroReducer.retroData,
        selectedBoard: state.RetroReducer.selectedBoard,
        boardIdFromURL: state.RetroReducer.selectedBoardId,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getRetroData: (boardData) => dispatch(actions.getRetroData(boardData)),
        selectBoardIdFromURL: (boardId) =>
            dispatch(actions.selectBoardIdFromURL(boardId)),
        selectBoard: (board) => dispatch(actions.selectRetroBoard(board)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RetroDetails);
