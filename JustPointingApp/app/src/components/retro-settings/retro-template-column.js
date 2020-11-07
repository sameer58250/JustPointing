import "./retro-settings.css";
import React, { useState } from "react";

const RetroTemplateColumn = (props) => {
    const [editTemplateColumn, setEditTemplateColumn] = useState(false);

    const saveColumn = (e) => {
        if (e.key === "Enter") {
            if (e.target.value) {
                if (
                    props.templateColumn &&
                    props.templateColumn.retroTemplateColumnId
                ) {
                    props.templateColumn.retroTemplateColumnName =
                        e.target.value;
                    props.update && props.update(props.templateColumn);
                } else {
                    var column = { retroTemplateColumnName: e.target.value };
                    props.add && props.add(column);
                }
                e.target.value = "";
            } else {
                props.delete && props.delete(props.templateColumn);
            }
            setEditTemplateColumn(false);
        }
    };

    return (
        <div className="retro-template-column">
            {editTemplateColumn || !props.templateColumn ? (
                <div>
                    <input
                        type="text"
                        autoFocus
                        onKeyUp={saveColumn}
                        placeholder="Type name and press ENTER"
                        className="retro-template-column-input"
                        onBlur={() => setEditTemplateColumn(false)}
                        defaultValue={
                            props.templateColumn &&
                            props.templateColumn.retroTemplateColumnName
                        }></input>
                </div>
            ) : (
                props.templateColumn && (
                    <label
                        onClick={() => {
                            setEditTemplateColumn(true);
                        }}>
                        {props.templateColumn.retroTemplateColumnName}
                    </label>
                )
            )}
        </div>
    );
};

export default RetroTemplateColumn;
