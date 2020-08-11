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
    public class RetroController : ControllerBase
    {
        private readonly IRetroService _retroService;
        public RetroController(IRetroService retroService)
        {
            _retroService = retroService;
        }

        [HttpGet]
        [Route("GetRetroBoardsOfUser")]
        public async Task<ActionResult<List<RetroBoard>>> GetRetroBoardsOfUser(int userId)
        {
            var boards = await _retroService.GetRetroBoardsOfUser(userId);
            return Ok(boards);
        }
        [HttpGet]
        [Route("GetRetroColumns")]
        public async Task<ActionResult<RetroColumn>> GetRetroColumns(int boardId)
        {
            var columns = await _retroService.GetRetroBoardDetails(boardId);
            return Ok(columns);
        }
    }
}
