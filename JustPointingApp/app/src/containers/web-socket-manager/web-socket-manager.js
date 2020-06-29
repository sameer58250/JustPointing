import Config from '../../config/config';

class WebSocketManager {

    pointingWebSocket;

    startWebSocket = (teamId, name, onMessageCallback) => {
        const webSocketUrl = Config.REACT_APP_WEB_SOCKET_URL;
        var url = webSocketUrl + "?teamId=" + teamId + "&name=" + name;
        if(this.pointingWebSocket){
            this.pointingWebSocket.onmessage = onMessageCallback;
            return;
        }
        this.pointingWebSocket = new WebSocket(url);
        this.pointingWebSocket.onopen = event => {
            console.log(event);
            console.log(this.pointingWebSocket);
        }
        this.pointingWebSocket.onmessage = onMessageCallback;
    };
}

export default WebSocketManager;