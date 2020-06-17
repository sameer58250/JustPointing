using Microsoft.AspNetCore.Http;
using System;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

namespace JustPointing.WebSocketManager
{
    public class SocketMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly SocketHandler _handler;

        public SocketMiddleware(RequestDelegate next, SocketHandler handler)
        {
            _next = next;
            _handler = handler;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            if (!context.WebSockets.IsWebSocketRequest)
            {
                return;
            }
            var socket = await context.WebSockets.AcceptWebSocketAsync();
            string teamId = context.Request.Query["teamId"];
            string name = context.Request.Query["name"];
            if (string.IsNullOrEmpty(teamId))
            {
                throw new Exception("Team id cannot be null or empty");
            }
            await _handler.OnConnected(socket, teamId, name);
            await Receive(socket, async (result, buffer) =>
            {
                if (result.MessageType == WebSocketMessageType.Text)
                {
                    await _handler.Receive(socket, result, buffer);
                }
                else if (result.MessageType == WebSocketMessageType.Close)
                {
                    await _handler.OnDisconnected(socket);
                }
            });
        }

        private async Task Receive( WebSocket socket, Action<WebSocketReceiveResult, byte[]> messageHandler)
        {
            var buffer = new byte[1024 * 6];
            while (socket.State == WebSocketState.Open)
            {
                var result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                messageHandler(result, buffer);
            }
        }
    }
}