using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Services
{
    public interface IHomeService
    {
        Task<string> CreateSession(string sessionId);
    }
}
