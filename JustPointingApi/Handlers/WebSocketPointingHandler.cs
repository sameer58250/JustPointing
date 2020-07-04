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
        private  StoryPointManager StoryPoint;
        private TeamsDataManager _dataManager;

        public WebSocketPointingHandler(ConnectionManager connections, TeamsDataManager dataManager, StoryPointManager storyPoint) : base(connections)
        {
            StoryPoint = storyPoint;
            _dataManager = dataManager;
        }

        public override async Task OnConnected(WebSocket socket, string teamId, string name)
        {
            await base.OnConnected(socket, teamId, name);
            var socketId = Connections.GetSocketId(socket);
            var obj = new { SocketId = socketId };
            await SendMessage(socket, JsonConvert.SerializeObject(obj));
            await SendMessageToTeam(_addToTeam(socketId, teamId, name));
        }
        public override async Task OnDisconnected(WebSocket socket)
        {
            string socketId = Connections.GetSocketId(socket);
            if (!string.IsNullOrWhiteSpace(socketId))
            {
                await base.OnDisconnected(socket);
                var team = _dataManager.GetTeamFromSocketId(socketId);
                team.RemoveUser(socketId);
                if (!team.GetAllUsers().Any())
                {
                    _dataManager.RemoveTeam(team.TeamId);
                }
                await SendMessageToTeam(team);
                StoryPoint.RemoveStoryPoint(socketId);
            }
        }

        public override async Task Receive(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            try
            {
                var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                var team = JsonConvert.DeserializeObject<AgileTeam>(message);
                await SendMessageToTeam(team);
            }
            catch (Exception ex)
            {
                throw new Exception("failed to receive websocket message", ex);
            }
        }

        private AgileTeam _addToTeam(string socketId, string teamId, string name)
        {
            try
            {
                var team = _dataManager.GetTeam(teamId);
                var user = new UserData(socketId, name);
                if (team == null)
                {
                    user.IsAdmin = true;
                    team = new AgileTeam(true);
                    team.TeamId = teamId;
                }
                team.AddUser(user);
                _dataManager.AddTeam(teamId, team);
                return team;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to add to the team", ex);
            }
        }
    }
}
