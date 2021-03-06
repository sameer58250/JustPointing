﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointing.Models
{
    public class UserData
    {
        public UserData(string socketId, string name)
        {
            SocketId = socketId;
            Name = name;
            IsAdmin = false;
            HasPointed = false;
            StoryPoint = string.Empty;
        }
        public string SocketId { get; set; }
        public string Name { get; set; }
        public bool IsAdmin { get; set; }
        public bool HasPointed { get; set; }
        public string StoryPoint { get; set; }
    }
}
