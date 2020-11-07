using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Models.Retro
{
    public class RetroColumn
    {
        public int ColumnId { get; set; }
        public string ColumnTitle { get; set; }
        public DateTime CreationDate { get; set; }
        public int RetroBoardId { get; set; }
        public List<RetroPoint> RetroPoints { get; set; }
        public RetroColumn()
        {
            RetroPoints = new List<RetroPoint>();
        }
    }
}
