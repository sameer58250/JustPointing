﻿using JustPointing.Handlers;
using JustPointing.Models;
using JustPointing.WebSocketManager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Services
{
    public class UserService:IUserService
    {
        private readonly SocketHandler _socketHandler;
        private readonly TeamsDataManager _dataManager;
        private readonly StoryPointManager _storyPoints;
        public UserService(WebSocketPointingHandler socketHandler, TeamsDataManager dataManager, StoryPointManager storyPoints)
        {
            _socketHandler = socketHandler;
            _dataManager = dataManager;
            _storyPoints = storyPoints;
        }

        public async Task SetAdmin(string socketId)
        {
            var team = _dataManager.GetTeamFromSocketId(socketId);
            var user = team.GetUser(socketId);
            user.IsAdmin = true;
            await _socketHandler.SendMessageToTeam(team);
        }

        public async Task<UserData> RemoveUser(string socketId)
        {
            var team = _dataManager.GetTeamFromSocketId(socketId);
            _storyPoints.RemoveStoryPoint(socketId);
            var user = team.GetUser(socketId);
            if (user.IsAdmin)
            {
                throw new Exception("Cannot remove an admin.");
            }
            team.RemoveUser(socketId);
            await _socketHandler.RemoveSocket(socketId);
            await _socketHandler.SendMessageToTeam(team);
            return user;
        }
    }
}