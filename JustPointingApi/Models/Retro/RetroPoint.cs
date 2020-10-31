using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Models.Retro
{
    public class RetroPoint
    {
        public int RetroBoardId { get; set; }
        public int RetroPointId { get; set; }
        public int RetroPointUserId { get; set; }
        public string RetroPointOwnerEmail { get; set; }
        public string RetroPointText { get; set; }
        public DateTime CreationDate { get; set; }
        public int RetroColumnId { get; set; }
        public IList<RetroPointComment> RetroComments { get; set; }
    }
}
