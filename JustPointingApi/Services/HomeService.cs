using JustPointing.Models;
using JustPointingApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointing.Services
{
    public class HomeService : IHomeService
    {
        private readonly TeamsDataManager _dataManager;
        private const int _minSessionId = 10000;
        public HomeService(TeamsDataManager dataManager)
        {
            _dataManager = dataManager;
        }
        public async Task<string> CreateSession(string sessionId)
        {
            if (string.IsNullOrEmpty(sessionId))
            {
                sessionId = _createSessionId();
                var team = new AgileTeam(true) { TeamId = sessionId };
                await Task.Run(() => _dataManager.AddTeam(sessionId, team));
            }
            else if (_dataManager.GetTeam(sessionId) == null)
            {
                throw new Exception("Session does not exists.");
            }
            return sessionId;
        }
        private string _createSessionId()
        {
            return (_dataManager.AllTeams.Count + _minSessionId + 1).ToString();
        }
    }
}
