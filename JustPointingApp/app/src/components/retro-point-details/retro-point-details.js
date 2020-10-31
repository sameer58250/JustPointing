import "./retro-point-details.css";
import React, { useState } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import * as retroActions from "../../store/retro/retro-actions";
import CloseIcon from "@material-ui/icons/Cancel";
import * as RetroManager from "../../containers/retro-manager/retro-manager";
import * as Utils from "../../utils/utils";
import Comment from "./retro-comment";

const RetroPointDetails = (props) => {
    const addComment = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (e.target && e.target.value) {
                var comment = {
                    commentOwnerId: props.userDetails.userId,
                    retroPointId: props.selectedRetroPoint.retroPointId,
                    retroColumnId: props.selectedRetroPoint.retroColumnId,
                    commentText: e.target.value,
                    retroBoardId: props.selectedBoard.boardId,
                };
                RetroManager.AddRetroPointComment(comment).then((res) => {
                    if (!props.selectedRetroPoint.retroComments) {
                        props.selectedRetroPoint.retroComments = [];
                    }
                    props.selectedRetroPoint.retroComments.push(res.data);
                    var retroPoint = JSON.parse(
                        JSON.stringify(props.selectedRetroPoint)
                    );
                    props.selectRetroPoint(retroPoint);
                    var commentEle = document.getElementById(
                        "retro-point-comment"
                    );
                    if (commentEle) {
                        commentEle.value = "";
                    }
                });
            }
        }
    };
    const updateComment = (comment) => {
        comment.retroBoardId = props.selectedBoard.boardId;
        RetroManager.UpdateRetroPointComment(comment).then((res) => {
            var idx = Utils.findIndexArrayByAttr(
                props.selectedRetroPoint.retroComments,
                "commentId",
                comment.commentId
            );
            if (idx !== -1) {
                props.selectedRetroPoint.retroComments[idx] = comment;
                var retroPoint = JSON.parse(
                    JSON.stringify(props.selectedRetroPoint)
                );
                props.selectRetroPoint(retroPoint);
            }
        });
    };
    const deleteComment = (comment) => {
        comment.retroBoardId = props.selectedBoard.boardId;
        RetroManager.DeleteRetroPointComment(comment).then((res) => {
            Utils.removeFromArrayByAttr(
                props.selectedRetroPoint.retroComments,
                "commentId",
                comment.commentId
            );
            var retroPoint = JSON.parse(
                JSON.stringify(props.selectedRetroPoint)
            );
            props.selectRetroPoint(retroPoint);
        });
    };

    return (
        <div className="retro-point-details">
            <Modal
                isOpen={props.isRetroPointModalOpen}
                overlayClassName="retro-point-details-modal"
                onRequestClose={() => props.openCloseModal(false)}
                ariaHideApp={false}>
                <div>
                    <CloseIcon
                        className="retro-detail-close-icon"
                        onClick={() => props.openCloseModal(false)}
                    />
                    <div className="retro-details-title">
                        {props.selectedRetroPoint.retroPointText}
                    </div>
                    <div className="retro-details-text">
                        <b>Created on:</b>{" "}
                        {props.selectedRetroPoint.creationDate}
                    </div>
                    <div className="retro-details-text">
                        <b>Created by:</b>{" "}
                        {props.selectedRetroPoint.retroPointOwnerEmail}
                    </div>
                    <div>
                        <label className="retro-details-text">
                            <b>Comments:</b>
                        </label>
                        {props.selectedRetroPoint.retroComments &&
                            props.selectedRetroPoint.retroComments.map(
                                (comment, index) => {
                                    return (
                                        <Comment
                                            comment={comment}
                                            updateComment={updateComment}
                                            deleteComment={deleteComment}
                                            key={comment.commentId}></Comment>
                                    );
                                }
                            )}
                        <textarea
                            id="retro-point-comment"
                            className="retro-point-comment-input"
                            placeholder="Enter your comment and press ENTER"
                            onKeyDown={addComment}></textarea>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        isRetroPointModalOpen: state.RetroReducer.isRetroPointModalOpen,
        selectedRetroPoint: state.RetroReducer.selectedRetroPoint,
        userDetails: state.SessionReducer.userDetails,
        selectedBoard: state.RetroReducer.selectedBoard,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        openCloseModal: (isOpen) =>
            dispatch(retroActions.openCloseRetroPointModal(isOpen)),
        selectRetroPoint: (point) =>
            dispatch(retroActions.selectRetroPoint(point)),
        updateRetroData: (retroData) =>
            dispatch(retroActions.getRetroData(retroData)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RetroPointDetails);
