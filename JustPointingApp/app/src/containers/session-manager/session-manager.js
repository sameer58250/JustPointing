import React from 'react';
import Config from '../../config/config';
import axios from 'axios';

export const StartSession = sessionId => {

    var url = BaseApiUrl() + '/Home/StartSession' + (sessionId ? '/' + sessionId : '');

    return axios.get(url);
}

export const CastVote = (socketId, voteValue) => {

    var url = BaseApiUrl()
        + "/Pointing/CastVote?socketId="
        + socketId + "&vote="
        + voteValue;

    return axios.post(url);
}

function BaseApiUrl(){
    return Config.REACT_APP_BASE_API_URL;
}