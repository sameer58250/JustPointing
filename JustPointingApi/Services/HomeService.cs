using JustPointing.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointing.Services
{
    public class HomeService
    {
        public TeamsDataManager DataManager;
        public HomeService(TeamsDataManager dataManager)
        {
            DataManager = dataManager;
        }
        public async Task<string> CreateSession()
        {
            string sessionId = _createSessionId();
            var team = new AgileTeam(true) { TeamId = sessionId };
            await Task.Run(() => DataManager.AddTeam(sessionId, team));
            return sessionId;
        }
        private string _createSessionId()
        {
            var random = new Random();
            return random.Next(10000, 99999).ToString();
        }
    }
}
