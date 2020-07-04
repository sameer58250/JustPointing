import React from 'react';
import './settings.css';
import ValidItemSize from './valid-item-size';
import SizingControl from './sizing-controls';


const Settings = props => {
    return (
        <div className = "settings">
            <ValidItemSize/>
            <SizingControl/>
        </div>
    )
}

export default Settings;