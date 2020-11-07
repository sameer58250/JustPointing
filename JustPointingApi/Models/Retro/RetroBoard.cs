using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Models.Retro
{
    public class RetroBoard
    {
        public int BoardId { get; set; }
        public int BoardOwnerId { get; set; }
        public string BoardTitle { get; set; }
        public DateTime? CreationDate { get; set; }
    }
}
