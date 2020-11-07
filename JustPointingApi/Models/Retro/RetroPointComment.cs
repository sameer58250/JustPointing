﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Models.Retro
{
    public class RetroPointComment
    {
        public int CommentId { get; set; }
        public int RetroPointId { get; set; }
        public int RetroColumnId { get; set; }
        public int RetroBoardId { get; set; }
        public int CommentOwnerId { get; set; }
        public string CommentOwnerEmail { get; set; }
        public string CommentText { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
