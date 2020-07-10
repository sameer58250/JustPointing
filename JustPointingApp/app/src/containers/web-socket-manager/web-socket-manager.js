import Config from '../../config/config';
import axios from 'axios';

class WebSocketManager {

    pointingWebSocket;

    startWebSocket = (teamId, name, role, onMessageCallback, onCloseCallback) => {
        const webSocketUrl = Config.REACT_APP_WEB_SOCKET_URL;
        var url = webSocketUrl + "?teamId=" + teamId + "&name=" + name + "&role=" + role;
        if(this.pointingWebSocket){
            this.pointingWebSocket.onmessage = onMessageCallback;
            return;
        }
        this.pointingWebSocket = new WebSocket(url);
        this.pointingWebSocket.onopen = event => {
            console.log(this.pointingWebSocket);
        }
        this.pointingWebSocket.onmessage = onMessageCallback;
        this.pointingWebSocket.onclose = onCloseCallback;
    };
}

export default WebSocketManager;