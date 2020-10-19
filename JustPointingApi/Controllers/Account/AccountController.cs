using JustPointingApi.Models.Account;
using JustPointingApi.Services.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Controllers.Account
{
    [Authorize]
    [Route("[Controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }
        [HttpGet]
        [Route("SearchUsers")]
        public async Task<ActionResult<List<User>>> SearchUsers(string text)
        {
            var res = await _accountService.SearchUsers(text);
            return Ok(res);
        }
    }
}
