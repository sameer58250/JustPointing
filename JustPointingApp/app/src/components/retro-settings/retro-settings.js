import "./retro-settings.css";
import React, { useState } from "react";
import { connect } from "react-redux";

const RetroSettings = (props) => {
    const [openColumnInput, setOpenColumnInput] = useState(false);

    const addDefaultColumn = (e) => {
        if (e.key === "Enter") {
            if (e.target.value) {
                setOpenColumnInput(false);
            }
        }
    };

    return (
        <div className="retro-settings">
            <div>
                <div className="retro-settings-heading">
                    <label>Default Retro Board Template</label>
                </div>
                <div>
                    <label>Default Columns:</label>
                    {openColumnInput ? (
                        <div>
                            <input
                                type="text"
                                placeholder="Type name and press ENTER"
                                onKeyDown={addDefaultColumn}></input>
                            <button onClick={() => setOpenColumnInput(false)}>
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => setOpenColumnInput(true)}>
                            Add column
                        </button>
                    )}
                </div>
            </div>
            <hr></hr>
            <div>
                <div className="retro-settings-heading">
                    <label>Retro Teams</label>
                </div>
                <div>
                    <button>Create team</button>
                </div>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(RetroSettings);
