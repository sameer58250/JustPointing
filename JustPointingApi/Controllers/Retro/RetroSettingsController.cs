using JustPointingApi.Models.Retro;
using JustPointingApi.Services.Retro;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Controllers.Retro
{
    [Authorize]
    [ApiController]
    [Route("[Controller]")]
    public class RetroSettingsController : ControllerBase
    {
        private readonly IRetroSettingsService _retroService;
        public RetroSettingsController(IRetroSettingsService retroService)
        {
            _retroService = retroService;
        }
        [HttpPost]
        [Route("AddRetroBoardTemplate")]
        public async Task<ActionResult<RetroBoardTemplate>> AddRetroBoardTemplate([FromBody]RetroBoardTemplate template)
        {
            return await _retroService.AddRetroBoardTemplate(template);
        }
        [HttpDelete]
        [Route("DeleteRetroBoardTemplate")]
        public async Task DeleteRetroBoardTemplate([FromBody]RetroBoardTemplate template)
        {
            await _retroService.DeleteRetroBoardTemplate(template);
        }
        [HttpPut]
        [Route("UpdateRetroBoardTemplateName")]
        public async Task UpdateRetroBoardTemplateName([FromBody]RetroBoardTemplate template)
        {
            await _retroService.UpdateRetroBoardTemplateName(template);
        }
        [HttpPost]
        [Route("SetDefaultTemplate")]
        public async Task SetDefaultTemplate([FromBody]RetroBoardTemplate template)
        {
            await _retroService.SetDefaultTemplate(template);
        }
        [HttpPost]
        [Route("AddRetroBoardTemplateColumn")]
        public async Task<ActionResult<RetroBoardTemplateColumn>> AddRetroBoardTemplateColumn([FromBody]RetroBoardTemplateColumn column)
        {
            var res = await _retroService.AddRetroBoardTemplateColumn(column);
            return Ok(res);
        }
        [HttpDelete]
        [Route("DeleteRetroBoardTemplateColumn")]
        public async Task DeleteRetroBoardTemplateColumn([FromBody]RetroBoardTemplateColumn column)
        {
            await _retroService.DeleteRetroBoardTemplateColumn(column);
        }
        [HttpPut]
        [Route("UpdateRetroBoardTemplateColumn")]
        public async Task UpdateRetroBoardTemplateColumn([FromBody]RetroBoardTemplateColumn column)
        {
            await _retroService.UpdateRetroBoardTemplateColumn(column);
        }

        [HttpPost]
        [Route("AddRetroBoardTemplateUser")]
        public async Task<ActionResult<RetroBoardTemplateUser>> AddRetroBoardTemplateUser([FromBody]RetroBoardTemplateUser templateUser)
        {
            var res = await _retroService.AddRetroBoardTemplateUser(templateUser);
            return Ok(res);
        }
        [HttpDelete]
        [Route("DeleteRetroBoardTemplateUser")]
        public async Task DeleteRetroBoardTemplateUser([FromBody]RetroBoardTemplateUser templateUser)
        {
            await _retroService.DeleteRetroBoardTemplateUser(templateUser);
        }
        [HttpGet]
        [Route("GetRetroBoardTemplates")]
        public async Task<ActionResult<List<RetroBoardTemplate>>> GetRetroBoardTemplates(int userId)
        {
            var res = await _retroService.GetRetroBoardTemplates(userId);
            return Ok(res);
        }
    }
}
