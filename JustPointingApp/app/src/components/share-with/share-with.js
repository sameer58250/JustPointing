import React, { useState } from "react";
import Modal from "react-modal";
import "./share-with.css";
import CloseIcon from "@material-ui/icons/Cancel";
import ErrorView from "../error/error";
import { validateEmail } from "../../utils/validation-utils";
import { ShareBoard } from "../../containers/retro-manager/retro-manager";

const ShareWith = (props) => {
    const [error, setError] = useState("");
    const shareBoard = () => {
        var ele = document.getElementById("share-email-input");
        if (ele && ele.value) {
            if (validateEmail(ele.value.trim())) {
                ShareBoard(props.board.boardId, ele.value.trim()).then((res) => {
                    props.closeModal();
                    setError("");
                });
            } else {
                setError("Please enter valid email address");
            }
        } else {
            setError("Please enter email address");
        }
    };
    return (
        <Modal
            isOpen={props.isShareWithModalOpen}
            ariaHideApp={false}
            overlayClassName="share-with">
            <div className="share-with-container">
                <CloseIcon
                    className="share-with-close-icon"
                    onClick={props.closeModal}></CloseIcon>
                <input
                    type="text"
                    id="share-email-input"
                    placeholder="Please enter email address"
                    pattern="[0-9]"
                />
                <button onClick={shareBoard}>Share</button>
            </div>
            <ErrorView errorText={error}></ErrorView>
        </Modal>
    );
};

export default ShareWith;
