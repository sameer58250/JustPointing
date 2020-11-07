using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Models.Retro
{
    public class RetroBoardTemplateUser
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserEmail { get; set; }
        public int RetroBoardTemplateId { get; set; }
    }
}
