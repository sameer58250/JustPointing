import "./retro-settings.css";
import React, { useState } from "react";
import { connect } from "react-redux";
import TemplateUser from "./retro-template-user";
import TemplateColumn from "./retro-template-column";
import ExpandIcon from "@material-ui/icons/ExpandMore";
import CollapseIcon from "@material-ui/icons/ExpandLess";
import * as RetroSettingsManager from "../../containers/retro-manager/retro-settings-manager";
import * as RetroActions from "../../store/retro/retro-actions";
import * as Utils from "../../utils/utils";
import * as ValidationUtils from "../../utils/validation-utils";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import * as AccountManager from "../../containers/session-manager/account";

const RetroTemplate = (props) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [inputText, setInputText] = React.useState("");
    const [email, setEmail] = React.useState("");
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

    const [editTemplateName, setEditTemplateName] = useState(false);
    const [expandTemplate, setExpandTemplate] = useState(false);

    const saveTemplate = (e) => {
        if (e.key === "Enter") {
            if (e.target.value) {
                props.template.templateName = e.target.value;
                RetroSettingsManager.UpdateRetroBoardTemplateName(
                    props.template
                ).then(() => {
                    var idx = Utils.findIndexArrayByAttr(
                        props.templates,
                        "retroBoardTemplateId",
                        props.template.retroBoardTemplateId
                    );
                    setEditTemplateName(false);
                    if (idx !== -1) {
                        props.templates[idx] = props.template;
                        var newTemplates = props.templates.slice();
                        props.updateBoardTemplates(newTemplates);
                    }
                });
            } else {
                RetroSettingsManager.DeleteRetroBoardTemplate(
                    props.template
                ).then(() => {
                    Utils.removeFromArrayByAttr(
                        props.templates,
                        "retroBoardTemplateId",
                        props.template.retroBoardTemplateId
                    );
                    var newTemplates = props.templates.slice();
                    props.updateBoardTemplates(newTemplates);
                });
            }
        }
    };
    const setDefaultTemplate = (e) => {
        RetroSettingsManager.SetDefaultTemplate(props.template).then(() => {
            props.templates.forEach((template) => {
                template.isDefault = false;
            });
            var idx = Utils.findIndexArrayByAttr(
                props.templates,
                "retroBoardTemplateId",
                props.template.retroBoardTemplateId
            );
            setEditTemplateName(false);
            if (idx !== -1) {
                props.templates[idx].isDefault = true;
                var newTemplates = props.templates.slice();
                props.updateBoardTemplates(newTemplates);
            }
        });
    };

    const addColumn = (column) => {
        column.retroBoardTemplateId = props.template.retroBoardTemplateId;
        RetroSettingsManager.AddRetroBoardTemplateColumn(column).then((res) => {
            var idx = Utils.findIndexArrayByAttr(
                props.templates,
                "retroBoardTemplateId",
                column.retroBoardTemplateId
            );
            if (idx !== -1) {
                if (!props.templates[idx].templateColumns)
                    props.templates[idx].templateColumns = [];
                props.templates[idx].templateColumns.push(res.data);
                var newTemplates = props.templates.slice();
                props.updateBoardTemplates(newTemplates);
            }
        });
    };

    const updateColumn = (column) => {
        RetroSettingsManager.UpdateRetroBoardTemplateColumn(column).then(
            (res) => {
                var idx = Utils.findIndexArrayByAttr(
                    props.templates,
                    "retroBoardTemplateId",
                    column.retroBoardTemplateId
                );
                if (idx !== -1) {
                    var colIdx = Utils.findIndexArrayByAttr(
                        props.templates[idx].templateColumns,
                        "retroTemplateColumnId",
                        column.retroTemplateColumnId
                    );
                    if (colIdx !== -1) {
                        props.templates[idx].templateColumns[colIdx] = column;
                    }
                    var newTemplates = props.templates.slice();
                    props.updateBoardTemplates(newTemplates);
                }
            }
        );
    };
    const deleteColumn = (column) => {
        RetroSettingsManager.DeleteRetroBoardTemplateColumn(column).then(
            (res) => {
                var idx = Utils.findIndexArrayByAttr(
                    props.templates,
                    "retroBoardTemplateId",
                    column.retroBoardTemplateId
                );
                if (idx !== -1) {
                    Utils.removeFromArrayByAttr(
                        props.templates[idx].templateColumns,
                        "retroTemplateColumnId",
                        column.retroTemplateColumnId
                    );
                    var newTemplates = props.templates.slice();
                    props.updateBoardTemplates(newTemplates);
                }
            }
        );
    };

    const addUser = (e) => {
        if (e.key === "Enter") {
            if (ValidationUtils.validateEmail(email)) {
                RetroSettingsManager.AddRetroBoardTemplateUser({
                    userEmail: email,
                    retroBoardTemplateId: props.template.retroBoardTemplateId,
                }).then((res) => {
                    var idx = Utils.findIndexArrayByAttr(
                        props.templates,
                        "retroBoardTemplateId",
                        props.template.retroBoardTemplateId
                    );
                    if (idx !== -1) {
                        if (!props.templates[idx].templateUsers)
                            props.templates[idx].templateUsers = [];
                        props.templates[idx].templateUsers.push(res.data);
                        var newTemplates = props.templates.slice();
                        props.updateBoardTemplates(newTemplates);
                    }
                    setInputText("");
                    setEmail("");
                });
            }
        }
    };
    const deleteUser = (user) => {
        RetroSettingsManager.DeleteRetroBoardTemplateUser(user).then(() => {
            var idx = Utils.findIndexArrayByAttr(
                props.templates,
                "retroBoardTemplateId",
                props.template.retroBoardTemplateId
            );
            if (idx !== -1) {
                Utils.removeFromArrayByAttr(props.templates[idx].templateUsers, "id", user.id);
                var newTemplates = props.templates.slice();
                props.updateBoardTemplates(newTemplates);
            }
        })
    };

    return (
        <div className="retro-template">
            {props.template && (
                <div>
                    <div className="retro-template-header">
                        {editTemplateName ? (
                            <input
                                type="text"
                                autoFocus
                                defaultValue={props.template.templateName}
                                onKeyUp={saveTemplate}
                                onBlur={() =>
                                    setEditTemplateName(false)
                                }></input>
                        ) : (
                            <label onClick={() => setEditTemplateName(true)}>
                                {props.template.templateName}
                                {props.template.isDefault ? (
                                    <b> (Default)</b>
                                ) : (
                                    ""
                                )}
                            </label>
                        )}
                        <div className="retro-template-icon">
                            {expandTemplate ? (
                                <CollapseIcon
                                    onClick={() =>
                                        setExpandTemplate(false)
                                    }></CollapseIcon>
                            ) : (
                                <ExpandIcon
                                    onClick={() =>
                                        setExpandTemplate(true)
                                    }></ExpandIcon>
                            )}
                        </div>
                        <div className="retro-template-actions">
                            <label onClick={setDefaultTemplate}>
                                Set as default
                            </label>
                        </div>
                    </div>
                    {expandTemplate && (
                        <div className="retro-template-content">
                            <b>Columns:</b>
                            {props.template.templateColumns &&
                                props.template.templateColumns.map(function (
                                    column
                                ) {
                                    return (
                                        <TemplateColumn
                                            key={column.retroTemplateColumnId}
                                            add={addColumn}
                                            update={updateColumn}
                                            delete={deleteColumn}
                                            templateColumn={
                                                column
                                            }></TemplateColumn>
                                    );
                                })}
                            <TemplateColumn
                                add={addColumn}
                                update={updateColumn}
                                delete={deleteColumn}></TemplateColumn>
                            <hr></hr>
                            <b>Users:</b>
                            {props.template.templateUsers &&
                                props.template.templateUsers.map(function (
                                    user
                                ) {
                                    return (
                                        <TemplateUser
                                            key={user.id}
                                            templateUser={user}
                                            delete={deleteUser}></TemplateUser>
                                    );
                                })}
                            <Autocomplete
                                id="asynchronous-demo"
                                freeSolo
                                value={email}
                                style={{ width: 300, marginTop: 13 }}
                                open={open}
                                className="retro-template-user-input"
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
                                        onKeyUp={addUser}
                                        InputProps={{
                                            ...params.InputProps,
                                        }}
                                    />
                                )}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

function mapStateToProps(state) {
    return {
        templates: state.RetroReducer.retroBoardTemplates,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateBoardTemplates: (templates) =>
            dispatch(RetroActions.getRetroBoardTemplates(templates)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RetroTemplate);
