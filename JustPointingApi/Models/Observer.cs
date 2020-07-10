using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Models
{
    public class Observer
    {
        public string SocketId { get; set; }
        public bool IsAdmin { get; set; }
        public string Name { get; set; }

        public Observer(string socketId, string name)
        {
            SocketId = socketId;
            Name = name;
            IsAdmin = false;
        }
    }
}
