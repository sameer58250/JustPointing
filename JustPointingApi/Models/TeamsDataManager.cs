using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointing.Models
{
    public class TeamsDataManager
    {
        public ConcurrentDictionary<string, AgileTeam> AllTeams { get; set; }
        public TeamsDataManager()
        {
            AllTeams = new ConcurrentDictionary<string, AgileTeam>();
        }
        public void AddTeam(string teamId, AgileTeam team)
        {
            AllTeams.AddOrUpdate(teamId, team, (key, value) => { return team; });
        }
        public AgileTeam RemoveTeam(string teamId)
        {
            AgileTeam existingTeam;
            AllTeams.Remove(teamId, out existingTeam);
            return existingTeam;
        }
        public AgileTeam GetTeam(string teamId)
        {
            AgileTeam existingTeam;
            AllTeams.TryGetValue(teamId, out existingTeam);
            return existingTeam;
        }
        public AgileTeam GetTeamFromSocketId(string socketId)
        {
            AgileTeam team = null;
            foreach(var t in AllTeams)
            {
                var user = t.Value.Users.FirstOrDefault(x => x.SocketId == socketId);
                var observer = t.Value.Observers.FirstOrDefault(x => x.SocketId == socketId);
                if(user != null)
                {
                    team = t.Value;
                }
                else if (observer != null)
                {
                    team = t.Value;
                }
            }
            return team;
        }
    }
}
