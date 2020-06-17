﻿using JustPointing.Models;
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
        public virtual async Task OnConnected(WebSocket socket, string teamId, string name)
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
            try { 
            var msg = JsonConvert.SerializeObject(team);
            await socket.SendAsync(new ArraySegment<byte>(Encoding.ASCII.GetBytes(msg), 0, msg.Length), 
                WebSocketMessageType.Text, true, CancellationToken.None);
            }
            catch(WebSocketException ex)
            {
            }
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
            if (team != null)
            {
                foreach (var user in team.Users)
                {
                    await SendMessage(user.SocketId, team);
                }
            }
        }
        public abstract Task Receive(WebSocket socket, WebSocketReceiveResult result, byte[] buffer);
    }
}