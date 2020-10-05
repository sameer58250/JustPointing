using JustPointingApi.Models.Retro;
using JustPointingApi.Services.Retro;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Controllers.Retro
{
    [ApiController]
    [Route("[Controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;
        public LoginController(ILoginService loginService)
        {
            _loginService = loginService;
        }
        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<RetroBoardUser>> Login([FromBody]string email)
        {
            var loginRes = await _loginService.Login(email);
            if (loginRes != null)
            {
                return Ok(loginRes);
            }
            else
            {
                return NotFound("User not found.");
            }
        }
    }
}
