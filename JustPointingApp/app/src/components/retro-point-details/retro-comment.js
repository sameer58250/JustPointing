import "./retro-point-details.css";
import React, { useState } from "react";

const RetroComment = (props) => {
    const [isInputOpen, setIsInputOpen] = useState(false);

    const updateComment = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (e.target.value) {
                props.comment.commentText = e.target.value;
                props.updateComment && props.updateComment(props.comment);
            } else {
                props.deleteComment &&
                    props.deleteComment(props.comment);
            }
            setIsInputOpen(false);
        }
    };

    return (
        <div className="retro-point-comment" key={props.comment.commentId}>
            <div className="retro-point-comment-text">
                {isInputOpen ? (
                    <textarea
                        className="retro-point-comment-input retro-point-comment-update"
                        defaultValue={props.comment.commentText}
                        autoFocus
                        onKeyDown={updateComment}
                        onBlur={() => setIsInputOpen(false)}></textarea>
                ) : (
                    <label onClick={() => setIsInputOpen(true)}>
                        {props.comment.commentText}
                    </label>
                )}
            </div>
            <div className="retro-point-comment-owner">
                <label>{props.comment.commentOwnerEmail}</label>
                <label className="retro-point-comment-date">{props.comment.creationDate}</label>
            </div>
        </div>
    );
};

export default RetroComment;
