using JustPointing.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace JustPointing.WebSocketManager
{
    public abstract class SocketHandler
    {
        public ConnectionManager Connections;
        public TeamsDataManager DataManager;
        public SocketHandler(ConnectionManager connections, TeamsDataManager dataManager)
        {
            Connections = connections;
            DataManager = dataManager;
        }
        public virtual async Task OnConnected(WebSocket socket)
        {
            await Task.Run(() => Connections.AddSocketConnection(socket));
        }
        public virtual async Task OnDisconnected(WebSocket socket)
        {
            await Connections.RemoveSocketByIdAsync(Connections.GetSocketId(socket));
        }
        public async Task SendMessage(WebSocket socket, AgileTeam team)
        {
            if (socket.State != WebSocketState.Open)
            {
                return;
            }
            var msg = JsonConvert.SerializeObject(team);
            await socket.SendAsync(new ArraySegment<byte>(Encoding.ASCII.GetBytes(msg), 0, msg.Length), 
                WebSocketMessageType.Text, true, CancellationToken.None);
        }
        public async Task SendMessage(string id, AgileTeam team)
        {
            await SendMessage(Connections.GetSocket(id), team);
        }
        public async Task SendMessageToAll(AgileTeam team)
        {
            foreach(var con in Connections.GetAllConnections())
            {
                await SendMessage(con.Value, team);
            }
        }
        public async Task SendMessageToTeam(AgileTeam team)
        {
            foreach(var user in team.users)
            {
                await SendMessage(user.SocketId, team);
            }
        }
        public abstract Task Receive(WebSocket socket, WebSocketReceiveResult result, byte[] buffer);
    }
}
