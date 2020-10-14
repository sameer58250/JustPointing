using JustPointing.WebSocketManager;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;

namespace JustPointingApi.Handlers
{
    public class RetroSocketHandler : SocketHandler
    {
        private IHttpContextAccessor _contextAccessor;
        public RetroSocketHandler(ConnectionManager connections) : base(connections)
        {
            _contextAccessor = new HttpContextAccessor();
        }

        public override async Task Receive(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            try
            {
                var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                await SendMessage(socket, message);
            }
            catch(Exception ex)
            {
                throw new Exception("failed to receive websocket message", ex);
            }
        }

        public override async Task OnConnected(WebSocket socket, string key = "")
        {
            var context = _contextAccessor.HttpContext;
            string userId = context.Request.Query["userId"];
            await base.OnConnected(socket, userId);
        }
    }
}
