import React from 'react';
import Config from '../../config/config';

export default class WebSocketManager {

    pointingWebSocket;

    teamsData = {};

    constructor(teamId, name){
        const webSocketUrl = Config.REACT_APP_WEB_SOCKET_URL;
        var url = webSocketUrl + "?teamId=" + teamId + "&name=" + name;
        this.pointingWebSocket = new WebSocket(url);
        this.pointingWebSocket.onmessage = message => {
            this.teamsData = message.data;
            console.log(this.teamsData);
        }
    }
}