using JustPointing.Services;
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
        private readonly HomeService _homeService;
        public HomeController(HomeService homeService)
        {
            _homeService = homeService;
        }
        [Route("StartSession")]
        public async Task<ActionResult<string>> StartSession()
        {
            string id = await _homeService.CreateSession();
            return Ok(id);
        }
    }
}
