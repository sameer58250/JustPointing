import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./card.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";
import * as RetroManager from "../../containers/retro-manager/retro-manager";

const useStyles = makeStyles({
    root: {
        marginLeft: "13px",
        marginTop: "6.5px",
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const SimpleCard = (props) => {
    const classes = useStyles();
    const [openInputBox, setOpenInputBox] = useState(false);
    useEffect(() => {
        if(!props.cardDetails.retroPointId){
            setOpenInputBox(true);
        }
    }, []);
    const updateRetroPoint = () => {
        var ele = document.getElementById("retro-point-input");
        if (ele.value) {
            props.cardDetails.retroPointText = ele.value;
            props.cardDetails.retroBoardId = props.boardId;
            RetroManager.UpdateRetroPoint(props.cardDetails).then(() => {
                props.updateCard();
                setOpenInputBox(false);
            });
        }
    };
    const addRetroPoint = () => {
        var ele = document.getElementById("retro-point-input");
        if (ele.value) {
            props.cardDetails.retroPointText = ele.value;
            props.cardDetails.creationDate = new Date().toDateString();
            props.cardDetails.retroBoardId = props.boardId;
            RetroManager.PostRetroPoint(props.cardDetails).then((resp) => {
                props.cardDetails.retroPointId = resp.data;
                props.addCard(props.cardDetails);
            });
        }
    };
    const deletePoint = () => {
        props.cardDetails.retroBoardId = props.boardId;
        RetroManager.DeleteRetroPoint(props.cardDetails).then(() => {
            props.deleteCard(props.cardDetails);
            setOpenInputBox(false);
        });
    };
    const cancelAddPoint = () => {
        if(props.cancelAdd){
            props.cancelAdd();
        }
        setOpenInputBox(false);
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                {openInputBox && (
                    <TextField
                        multiline
                        defaultValue={props.cardDetails.retroPointText}
                        variant="outlined"
                        autoFocus
                        id="retro-point-input"></TextField>
                )}
                <Typography variant="body2" component="p">
                    {!openInputBox && props.cardDetails.retroPointText}
                </Typography>
            </CardContent>
            <CardActions>
                {openInputBox && (
                    <CheckIcon
                        className="retro-point-icon"
                        onClick={
                            props.cardDetails.retroPointId
                                ? updateRetroPoint
                                : addRetroPoint
                        }></CheckIcon>
                )}
                {openInputBox && (
                    <CancelIcon
                        className="retro-point-icon"
                        onClick={cancelAddPoint}></CancelIcon>
                )}
                {!openInputBox && props.cardDetails.retroPointId && (
                    <EditIcon
                        className="retro-point-icon"
                        onClick={() => setOpenInputBox(true)}></EditIcon>
                )}
                {props.cardDetails.retroPointId && (
                    <DeleteIcon
                        className="retro-point-icon"
                        onClick={deletePoint}></DeleteIcon>
                )}
                <div className="retro-point-date">
                    {props.cardDetails.creationDate}
                </div>
            </CardActions>
        </Card>
    );
};

export default SimpleCard;
