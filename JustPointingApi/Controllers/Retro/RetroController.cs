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
        [HttpPost]
        [Route("AddRetroPoint")]
        public async Task<ActionResult<int>> AddRetroPoint([FromBody]RetroPoint retroPoint)
        {
            var pointId = await _retroService.AddRetroPoint(retroPoint);
            return Ok(pointId);
        }
        [HttpPost]
        [Route("AddRetroBoard")]
        public async Task<ActionResult<int>> AddRetroBoard([FromBody] RetroBoard board)
        {
            var boardId = await _retroService.AddRetroBoard(board);
            return Ok(boardId);
        }
        [HttpPost]
        [Route("AddRetroColumn")]
        public async Task<ActionResult<int>> AddRetroColumn([FromBody] RetroColumn column)
        {
            var columnId = await _retroService.AddRetroColumn(column);
            return Ok(columnId);
        }
        [HttpPut]
        [Route("UpdateRetroColumn")]
        public async Task UpdateRetroColumn([FromBody] RetroColumn column)
        {
            await _retroService.UpdateRetroColumn(column);
        }
        [HttpPut]
        [Route("UpdateRetroPoint")]
        public async Task UpdateRetroPoint([FromBody] RetroPoint point)
        {
            await _retroService.UpdateRetroPoint(point);
        }
        [HttpDelete]
        [Route("DeleteRetroPoint")]
        public async Task DeleteRetroPoint([FromBody] RetroPoint point)
        {
            await _retroService.DeleteRetroPoint(point);
        }
        [HttpDelete]
        [Route("DeleteRetroBoard")]
        public async Task DeleteRetroBoard(string boardId, [FromBody]int userId)
        {
            await _retroService.DeleteRetroBoard(boardId, userId);
        }
        [HttpPost]
        [Route("AddUserToBoard")]
        public async Task AddUserToBoard([FromQuery]string boardId, [FromQuery]string userEmail)
        {
            await _retroService.AddUserToBoard(boardId, userEmail);
        }
        [HttpGet]
        [Route("GetShareBoards")]
        public async Task<ActionResult<List<RetroBoard>>> GetShareBoards(int userId)
        {
            var res = await _retroService.GetSharedBoards(userId);
            return Ok(res);
        }
    }
}
