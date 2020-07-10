using JustPointing.Models;
using JustPointing.WebSocketManager;
using JustPointingApi.Models;
using Microsoft.AspNetCore.Http;
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
        private IHttpContextAccessor _contextAccessor;

        public WebSocketPointingHandler(ConnectionManager connections, TeamsDataManager dataManager, StoryPointManager storyPoint) : base(connections)
        {
            StoryPoint = storyPoint;
            _dataManager = dataManager;
            _contextAccessor = new HttpContextAccessor();
        }

        public override async Task OnConnected(WebSocket socket)
        {
            await base.OnConnected(socket);
            var context = _contextAccessor.HttpContext;
            string teamId = context.Request.Query["teamId"];
            string name = context.Request.Query["name"];
            string role = context.Request.Query["role"];
            if (string.IsNullOrEmpty(teamId))
            {
                throw new Exception("Team id cannot be null or empty");
            }
            var socketId = Connections.GetSocketId(socket);
            var obj = new { SocketId = socketId };
            await SendMessage(socket, JsonConvert.SerializeObject(obj));
            AgileTeam team = null;
            if (role == "Observer")
            {
                team = _addAsObserver(socketId, teamId, name);
            }
            else
            {
                team = _addToTeam(socketId, teamId, name);
            }
            await SendMessageToTeam(team);
        }
        public override async Task OnDisconnected(WebSocket socket)
        {
            string socketId = Connections.GetSocketId(socket);
            if (!string.IsNullOrWhiteSpace(socketId))
            {
                await base.OnDisconnected(socket);
                var team = _dataManager.GetTeamFromSocketId(socketId);
                team.RemoveUser(socketId);
                team.RemoveObserver(socketId);
                if (!team.GetAllUsers().Any())
                {
                    team.IsShowEnabled = false;
                }
                if (!team.GetAllUsers().Any() && !team.GetAllObservers().Any())
                {
                    _dataManager.RemoveTeam(team.TeamId);
                }
                await SendMessageToTeam(team);
                StoryPoint.RemoveStoryPoint(socketId);
                _removeUnusedSessions(1);
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
                    team = new AgileTeam(true);
                    team.TeamId = teamId;
                }
                team.IsShowEnabled = false;
                team.AddUser(user);
                _dataManager.AddTeam(teamId, team);
                return team;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to add to the team", ex);
            }
        }

        private AgileTeam _addAsObserver(string socketId, string teamId, string name)
        {
            try
            {
                var team = _dataManager.GetTeam(teamId);
                if(team == null)
                {
                    team = new AgileTeam(true);
                }
                team.AddObserver(socketId, name);
                return team;
            }
            catch(Exception ex)
            {
                throw new Exception("Failed to add to the team", ex);
            }
        }

        private void _removeUnusedSessions(int expirationTimeInHours)
        {
            var allTeams = _dataManager.AllTeams.Values;
            foreach(var team in allTeams)
            {
                var currentDate = DateTime.Now;
                var diff = (currentDate - team.CreationDate).TotalHours;
                if(diff > (double)expirationTimeInHours)
                {
                    _dataManager.RemoveTeam(team.TeamId);
                }
            }
        }
    }
}
