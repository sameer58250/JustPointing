import React, { useState } from "react";
import Modal from "react-modal";
import "./share-with.css";
import CloseIcon from "@material-ui/icons/Cancel";
import ErrorView from "../error/error";
import { validateEmail } from "../../utils/validation-utils";
import { ShareBoard } from "../../containers/retro-manager/retro-manager";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as AccountManager from "../../containers/session-manager/account";

const ShareWith = (props) => {
    const [error, setError] = useState("");
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [inputText, setInputText] = React.useState("");
    const [email, setEmail] = React.useState("");

    const shareBoard = () => {
        var inputEmail = email;
        if(!email){
            inputEmail = inputText;
        }
        if (inputEmail) {
            if (validateEmail(inputEmail.trim())) {
                ShareBoard(props.board.boardId, inputEmail.trim()).then((res) => {
                    //props.closeModal();
                    setEmail("");
                    setError("");
                });
            } else {
                setError("Please enter valid email address");
            }
        } else {
            setError("Please enter email address");
        }
    };
    React.useEffect(() => {
        let active = true;

        if (inputText.length < 3 || inputText.length > 3) {
            return undefined;
        }
        AccountManager.SearchUsers(inputText).then(
            (res) => {
                setOptions(
                    res.data.map((user) => {
                        return user.userEmail;
                    })
                );
            },
            () => {
                setOptions([]);
            }
        );

        return () => {
            active = false;
        };
    }, [inputText]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);
    return (
        <Modal
            isOpen={props.isShareWithModalOpen}
            ariaHideApp={false}
            overlayClassName="share-with">
            <div className="share-with-container">
                <CloseIcon
                    className="share-with-close-icon"
                    onClick={props.closeModal}></CloseIcon>
                <Autocomplete
                    id="asynchronous-demo"
                    freeSolo
                    value={email}
                    style={{ width: 300, marginTop: 13 }}
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    onChange={(e, v) => {
                        setEmail(v);
                    }}
                    onKeyUp={(e) => {
                        setInputText(e.target.value);
                    }}
                    getOptionLabel={(option) => option}
                    options={options}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Email"
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                            }}
                        />
                    )}
                />
                <button onClick={shareBoard}>Share</button>
            </div>
            <ErrorView errorText={error}></ErrorView>
        </Modal>
    );
};

export default ShareWith;
