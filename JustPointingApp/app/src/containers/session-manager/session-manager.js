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

export const ShowVotes = (sessionId) => {
    var url = BaseApiUrl()
        + "/Pointing/ShowVotes?teamId="
        + sessionId;
    return axios.post(url);
}

export const ClearVotes = (sessionId) => {
    var url = BaseApiUrl()
        + "/Pointing/ClearVotes?teamId="
        + sessionId;
return axios.post(url);
}

export const SetItemDescription = (sessionId, itemDescription) => {
    var url = BaseApiUrl()
        + "/Pointing/SetItemDescription?teamId="
        + sessionId
        + "&itemDescription="
        + itemDescription;
    return axios.post(url);
}

export const SetAdmin = (socketId) => {
    var url = BaseApiUrl()
        + "/User/SetAdmin?socketId="
        + socketId;
    return axios.post(url);
}

export const RemoveUser = (socketId) => {
    var url = BaseApiUrl()
        + "/User/RemoveUser?socketId="
        + socketId;
    return axios.post(url);
}

function BaseApiUrl(){
    return Config.REACT_APP_BASE_API_URL;
}