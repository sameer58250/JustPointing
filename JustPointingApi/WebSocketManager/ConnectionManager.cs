using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

namespace JustPointing.WebSocketManager
{
    public class ConnectionManager
    {
        private ConcurrentDictionary<string, WebSocket> _connections = new ConcurrentDictionary<string, WebSocket>();

        public WebSocket GetSocket(string id)
        {
            return _connections.FirstOrDefault(x => x.Key == id).Value;
        }
        public ConcurrentDictionary<string, WebSocket> GetAllConnections()
        {
            return _connections;
        }
        public string GetSocketId(WebSocket socket)
        {
            return _connections.FirstOrDefault(x => x.Value == socket).Key;
        }
        public async Task RemoveSocketByIdAsync(string id)
        {
            try
            {
                WebSocket socket;
                _connections.TryRemove(id, out socket);
                if (socket != null && socket.State == WebSocketState.Open)
                    await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, "socket connection closed", CancellationToken.None);
            }
            catch (Exception ex)
            {

            }
        }
        public void AddSocketConnection(WebSocket socket)
        {
            string guid = _generateSocketId();
            while(!_connections.TryAdd(guid, socket))
            {
                guid = _generateSocketId();
            }
        }
        private string _generateSocketId()
        {
            return Guid.NewGuid().ToString("N");
        }
    }
}
