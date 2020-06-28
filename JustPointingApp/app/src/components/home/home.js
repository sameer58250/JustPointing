import React, { useState } from 'react';
import './home.css';
import Config from '../../config/config';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export const Home = props =>{

    const baseUrl = Config.REACT_APP_BASE_API_URL;
    const history = useHistory();

    const startSession = () => {
        var sessionId;
        axios.get(baseUrl+'/Home/StartSession')
        .then(response => {
            sessionId = response.data;
            history.replace('/' + sessionId);
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div className = "home">
            <button onClick = {startSession}>Start Session</button>
        </div>
    )
}