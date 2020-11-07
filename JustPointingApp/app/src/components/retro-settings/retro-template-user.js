import "./retro-settings.css";
import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";

const RetroTemplateUser = (props) => {
    return (
        <div className="retro-template-user">
            <div>
                {props.templateUser && (
                    <div>
                    <DeleteIcon
                        style={{"cursor":"pointer"}}
                        onClick={() =>
                            props.delete && props.delete(props.templateUser)
                        }></DeleteIcon>
                        <label className="retro-template-user-email">{props.templateUser.userEmail}</label>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RetroTemplateUser;