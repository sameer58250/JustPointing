import "./retro-settings.css";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import RetroTemplate from "./retro-template";
import * as RetroActions from "../../store/retro/retro-actions";
import * as RetroSettingsManager from "../../containers/retro-manager/retro-settings-manager";

const RetroSettings = (props) => {
    const [openTemplateNameInput, setOpenTemplateNameInput] = useState(false);

    useEffect(() => {
        RetroSettingsManager.GetRetroBoardTemplates(
            props.userDetails.userId
        ).then((res) => {
            props.updateBoardTemplates(res.data);
        });
    }, []);

    const addBoardTemplate = (e) => {
        if (e.key === "Enter") {
            if (e.target.value) {
                var template = {
                    templateName: e.target.value,
                    templateOwnerId: props.userDetails.userId,
                };
                RetroSettingsManager.AddRetroBoardTemplate(template).then(
                    (res) => {
                        props.templates.push(res.data);
                        var newTemplates = props.templates.slice();
                        props.updateBoardTemplates(newTemplates);
                        setOpenTemplateNameInput(false);
                    }
                );
            }
        }
    };

    return (
        <div className="retro-settings">
            <div>
                <div className="retro-settings-heading">
                    <label>Default Retro Board Template</label>
                </div>
                <hr></hr>
                <div>
                    {openTemplateNameInput ? (
                        <div>
                            <input
                                type="text"
                                placeholder="Type name and press ENTER"
                                autoFocus
                                onKeyDown={addBoardTemplate}></input>
                            <button
                                onClick={() => setOpenTemplateNameInput(false)}>
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => setOpenTemplateNameInput(true)}>
                            Create Template
                        </button>
                    )}
                </div>
                <div>
                    {props.templates &&
                        props.templates.map(function (template) {
                            return (
                                <RetroTemplate
                                    key={template.retroBoardTemplateId}
                                    template={template}></RetroTemplate>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        templates: state.RetroReducer.retroBoardTemplates,
        userDetails: state.SessionReducer.userDetails,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateBoardTemplates: (templates) =>
            dispatch(RetroActions.getRetroBoardTemplates(templates)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RetroSettings);
