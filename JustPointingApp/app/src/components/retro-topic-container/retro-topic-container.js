import "./retro-topic-container.css";
import React, { useState } from "react";
import SimpleCard from "../card/card";
import * as RetroManager from "../../containers/retro-manager/retro-manager";
import { findIndexArrayByAttr, removeFromArrayByAttr } from "../../utils/utils";
import { connect } from "react-redux";
import * as actions from "../../store/retro/retro-actions";
import AddIcon from "@material-ui/icons/Add";

const RetroTopicContainer = (props) => {
    const [isAddCardVisible, setIsAddCardVisible] = useState(true);
    const [isColumnEdit, setIsColumnEdit] = useState(false);

    var newRetroPoint = {
        retroPointUserId: props.userDetails.userId,
        retroPointText: "",
        creationDate: "",
        retroColumnId: props.columnId,
    };

    const addCard = (newPoint) => {
        if (!props.columnDetails.retroPoints) {
            props.columnDetails.retroPoints = [];
        }
        props.columnDetails.retroPoints.push(newPoint);
        var columnIndex = findIndexArrayByAttr(
            props.retroData,
            "columnId",
            props.columnDetails.columnId
        );
        props.retroData[columnIndex] = props.columnDetails;
        updateRetroColumns();
        setIsAddCardVisible(true);
    };

    const addCardClicked = () => {
        setIsAddCardVisible(false);
    };

    const cancelClicked = () => {
        setIsAddCardVisible(true);
    };

    const addRetroColumn = (e, columnId) => {
        if (e.key === "Enter") {
            if (e.target.value) {
                e.persist();
                if (columnId) {
                    var columnIndex = findIndexArrayByAttr(
                        props.retroData,
                        "columnId",
                        columnId
                    );
                    var column = props.retroData[columnIndex];
                    column.columnTitle = e.target.value;
                    RetroManager.UpdateRetroColumn(column).then(
                        (res) => {
                            updateRetroColumns();
                            e.target.blur();
                        },
                        (err) => {
                            console.log(err);
                        }
                    );
                } else {
                    var newColumn = {
                        columnTitle: e.target.value,
                        creationDate: new Date().toDateString(),
                        retroBoardId: props.selectedBoard.boardId,
                        RetroPoints: [],
                    };
                    props.retroData.push(newColumn);
                    RetroManager.AddRetroColumn(newColumn).then(
                        (res) => {
                            newColumn.columnId = res.data;
                            updateRetroColumns();
                        },
                        (err) => {
                            console.log(err);
                        }
                    );
                    e.target.value = "";
                }
            }
        }
    };

    const updateRetroColumns = () => {
        var retroDataCopy = props.retroData.slice();
        props.updateRetroData(retroDataCopy);
    };

    const deleteCard = (point) => {
        removeFromArrayByAttr(
            props.columnDetails.retroPoints,
            "retroPointId",
            point.retroPointId
        );
        updateRetroColumns();
    };

    return (
        <div className="retroTopicContainer">
            <div className="retroColumnHeader">
                {props.columnTitle && !isColumnEdit ? (
                    <label
                        className="retroColumnHeaderLabel"
                        onClick={() => {
                            setIsColumnEdit(true);
                        }}>
                        {props.columnTitle}
                    </label>
                ) : (
                    <input
                        type="text"
                        className="retroColumnHeaderInput"
                        defaultValue={props.columnTitle}
                        placeholder={
                            props.placeholder || "Click to add retro column"
                        }
                        autoFocus
                        onBlur={() => {
                            setIsColumnEdit(false);
                        }}
                        onKeyPress={(e) =>
                            addRetroColumn(e, props.columnId)
                        }></input>
                )}
            </div>
            {props.columnDetails &&
                props.columnDetails.retroPoints &&
                props.columnDetails.retroPoints.map((retroPoint) => (
                    <SimpleCard
                        key={retroPoint.retroPointId}
                        boardId={props.selectedBoard.boardId}
                        cardDetails={retroPoint}
                        deleteCard={deleteCard}
                        updateCard={updateRetroColumns}
                    />
                ))}
            {isAddCardVisible && props.columnDetails && (
                <div
                    title="Click to add point"
                    className="addCardButton"
                    onClick={addCardClicked}>
                    <AddIcon></AddIcon>
                </div>
            )}
            {!isAddCardVisible && (
                <SimpleCard
                    boardId={props.selectedBoard.boardId}
                    cardDetails={newRetroPoint}
                    addCard={addCard}
                    cancelAdd={cancelClicked}></SimpleCard>
            )}
        </div>
    );
};

function mapStateToProps(state) {
    return {
        retroData: state.RetroReducer.retroData,
        selectedBoard: state.RetroReducer.selectedBoard,
        userDetails: state.SessionReducer.userDetails,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateRetroData: (retroData) =>
            dispatch(actions.getRetroData(retroData)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RetroTopicContainer);
