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
        public SocketHandler(ConnectionManager connections)
        {
            Connections = connections;
        }
        public virtual async Task OnConnected(WebSocket socket, string key = "")
        {
            await Task.Run(() => Connections.AddSocketConnection(socket, key));
        }
        public virtual async Task OnDisconnected(WebSocket socket)
        {
            await Connections.RemoveSocketByIdAsync(Connections.GetSocketId(socket));
        }
        public async Task RemoveSocket(string socketId)
        {
            await Connections.RemoveSocketByIdAsync(socketId);
        }
        public async Task SendMessage(WebSocket socket, string msg)
        {
            if (socket.State != WebSocketState.Open)
            {
                return;
            }
            try { 
            await socket.SendAsync(new ArraySegment<byte>(Encoding.ASCII.GetBytes(msg), 0, msg.Length), 
                WebSocketMessageType.Text, true, CancellationToken.None);
            }
            catch(WebSocketException ex)
            {
            }
        }
        public async Task SendMessage(string id, string message)
        {
            try
            {
                var socket = Connections.GetSocket(id);
                if (socket != null)
                    await SendMessage(Connections.GetSocket(id), message);
            }
            catch (Exception ex)
            {

            }
        }
        public async Task SendMessageToAll(string message)
        {
            foreach (var con in Connections.GetAllConnections())
            {
                await SendMessage(con.Value, message);
            }
        }
        public async Task SendMessageToTeam(AgileTeam team)
        {
            var msg = JsonConvert.SerializeObject(team);
            if (team != null)
            {
                foreach (var user in team.Users)
                {
                    await SendMessage(user.SocketId, msg);
                }
                foreach(var observer in team.Observers)
                {
                    await SendMessage(observer.SocketId, msg);
                }
            }
        }
        public abstract Task Receive(WebSocket socket, WebSocketReceiveResult result, byte[] buffer);
    }
}
