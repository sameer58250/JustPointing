using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointing.Models
{
    public class TeamsDataManager
    {
        public Dictionary<string, AgileTeam> AllTeams { get; set; }
        public TeamsDataManager()
        {
            AllTeams = new Dictionary<string, AgileTeam>();
        }
        public void AddTeam(string teamId, AgileTeam team)
        {
            if(AllTeams.ContainsKey(teamId))
            {
                AllTeams[teamId] = team;
            }
            else
            {
                AllTeams.Add(teamId, team);
            }
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
                var user = t.Value.users.FirstOrDefault(x => x.SocketId == socketId);
                if(user != null)
                {
                    team = t.Value;
                }
            }
            return team;
        }
    }
}
