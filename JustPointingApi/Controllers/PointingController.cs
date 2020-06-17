using JustPointingApi.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class PointingController:ControllerBase
    {
        private readonly IPointingService _pointingService;
        public PointingController(IPointingService pointingService)
        {
            _pointingService = pointingService;
        }

        [Route("CastVote")]
        public async Task CastVote(string socketId, string vote)
        {
            await _pointingService.CastVote(socketId, vote);
        }

        [Route("ClearVotes")]
        public async Task ClearVotes(string teamId)
        {
            await _pointingService.ClearVotes(teamId);
        }

        [Route("ShowVotes")]
        public async Task ShowVotes(string teamId)
        {
            await _pointingService.ShowVotes(teamId);
        }
    }
}
