import React from 'react';
import './error.css';

const AppError = props => {
    return (
        <div className = "error">
            {
                props.errorText
                ? <p>{props.errorText}</p>
                :""
            }
        </div>
    )
}

export default AppError;