using JustPointing.Models;
using JustPointing.WebSocketManager;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;

namespace JustPointing.Handlers
{
    public class WebSocketPointingHandler : SocketHandler
    {
        public UserStoryPoint StoryPoint;
        public WebSocketPointingHandler(ConnectionManager connections, 
            TeamsDataManager dataManager,
            UserStoryPoint storyPoint) : base(connections, dataManager)
        { 
            StoryPoint = storyPoint;
        }

        public override async Task OnConnected(WebSocket socket)
        {
            await base.OnConnected(socket);
        }
        public override async Task OnDisconnected(WebSocket socket)
        {
            await base.OnDisconnected(socket);
            string socketId = Connections.GetSocketId(socket);
            var team = DataManager.GetTeamFromSocketId(socketId);
            team.RemoveUser(socketId);
            if (!team.GetAllUsers().Any())
            {
                DataManager.RemoveTeam(team.TeamId);
            }
            await SendMessageToTeam(team);
            StoryPoint.RemoveStoryPoint(socketId);
        }

        public override async Task Receive(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
            await SendMessageToTeam(JsonConvert.DeserializeObject<AgileTeam>(message));
        }
    }
}
