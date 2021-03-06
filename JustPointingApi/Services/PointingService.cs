﻿using JustPointing.Handlers;
using JustPointing.Models;
using JustPointing.WebSocketManager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Services
{
    public class PointingService : IPointingService
    {
        private readonly SocketHandler _socketHandler;
        private readonly TeamsDataManager _dataManager;
        private readonly StoryPointManager _storyPoints;
        public PointingService(WebSocketPointingHandler socketHandler, TeamsDataManager dataManager, StoryPointManager storyPoints)
        {
            _socketHandler = socketHandler;
            _dataManager = dataManager;
            _storyPoints = storyPoints;
        }
        public async Task ClearVotes(string teamId)
        {
            var team = _dataManager.GetTeam(teamId);
            foreach(var user in team.Users)
            {
                user.StoryPoint = string.Empty;
                user.HasPointed = false;
                _storyPoints.RemoveStoryPoint(user.SocketId);
            }
            team.IsShowEnabled = false;
            await _socketHandler.SendMessageToTeam(team);
        }

        public async Task ShowVotes(string teamId)
        {
            var team = _dataManager.GetTeam(teamId);
            team.IsShowEnabled = true;
            foreach(var user in team.Users)
            {
                user.StoryPoint = _storyPoints.GetStoryPoint(user.SocketId);
            }
            await _socketHandler.SendMessageToTeam(team);
        }

        public async Task CastVote(string socketId, string vote)
        {
            var team = _dataManager.GetTeamFromSocketId(socketId);
            if (team != null)
            {
                var user = team.GetUser(socketId);
                if (user != null)
                {
                    user.HasPointed = true;
                    _storyPoints.AddStoryPoint(socketId, vote);
                    if (team.IsShowEnabled)
                    {
                        user.StoryPoint = vote;
                    }
                }
                await _socketHandler.SendMessageToTeam(team);
            }
        }

        public async Task SetItemDescription(string teamId, string storyDescription)
        {
            var team = _dataManager.GetTeam(teamId);
            if (team != null)
            {
                team.StoryDescription = storyDescription;
                await _socketHandler.SendMessageToTeam(team);
            }
        }

        public async Task UpdateValidStoryPoints(string teamId, List<string> sizeList)
        {
            var team = _dataManager.GetTeam(teamId);
            if (team != null)
            {
                team.UpdateValidStoryPoints(sizeList);
                await _socketHandler.SendMessageToTeam(team);
            }
        }
    }
}
