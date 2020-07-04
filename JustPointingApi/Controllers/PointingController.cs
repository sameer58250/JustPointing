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
        [HttpPost]
        public async Task CastVote(string socketId, string vote)
        {
            await _pointingService.CastVote(socketId, vote);
        }

        [Route("ClearVotes")]
        [HttpPost]
        public async Task ClearVotes(string teamId)
        {
            await _pointingService.ClearVotes(teamId);
        }

        [Route("ShowVotes")]
        [HttpPost]
        public async Task ShowVotes(string teamId)
        {
            await _pointingService.ShowVotes(teamId);
        }

        [Route("SetItemDescription")]
        [HttpPost]
        public async Task SetItemDescription(string teamId, string itemDescription)
        {
            await _pointingService.SetItemDescription(teamId, itemDescription);
        }

        [Route("UpdateValidStoryPoints")]
        [HttpPost]
        public async Task UpdateValidStoryPoints([FromQuery]string teamId, [FromBody]List<string> sizeList)
        {
            await _pointingService.UpdateValidStoryPoints(teamId, sizeList);
        }
    }
}
