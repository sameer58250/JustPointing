using JustPointingApi.Models.Retro;
using JustPointingApi.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Controllers
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
            if (loginRes == null)
            {
                //create user
                loginRes = await _loginService.CreateUser(email);
            }
            if (loginRes == null)
            {
                return NotFound("User not found.");
            }
            return Ok(loginRes);
        }
    }
}
