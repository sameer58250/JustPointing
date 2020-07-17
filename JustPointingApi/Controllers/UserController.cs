using JustPointing.Models;
using JustPointingApi.Models;
using JustPointingApi.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Controllers
{
    [Route("[Controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [Route("SetAdmin")]
        [HttpPost]
        public async Task SetAdmin(string socketId)
        {
            await _userService.SetAdmin(socketId);
        }

        [Route("RemoveUser")]
        [HttpPost]
        public async Task<ActionResult<UserData>> RemoveUser(string socketId)
        {
            var user = await _userService.RemoveUser(socketId);
            return Ok(user);
        }

        [Route("UpdateSettings")]
        [HttpPost]
        public async Task UpdateSettings(string teamId, [FromBody]AdminSettings settings)
        {
            await _userService.UpdateSettings(teamId, settings);
        }
    }
}
