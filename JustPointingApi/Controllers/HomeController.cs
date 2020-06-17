using JustPointing.Services;
using JustPointingApi.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointing.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IHomeService _homeService;
        public HomeController(IHomeService homeService)
        {
            _homeService = homeService;
        }

        [Route("StartSession/{sessionId?}")]
        public async Task<ActionResult<string>> StartSession(string sessionId)
        {
            try
            {
                string id = await _homeService.CreateSession(sessionId);
                return Ok(id);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
