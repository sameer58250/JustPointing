using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointing.Models
{
    [Serializable]
    public class AgileTeam
    {
        public string TeamId { get; set; }
        public bool IsShowEnabled { get; set; }
        public IList<UserData> users { get; set; }
        public string StoryDescription { get; set; }
        public IList<double> ValidStoryPoints { get; set; }
        [JsonConstructor]
        public AgileTeam()
        {
        }
        public AgileTeam(bool IsDefaultPoints)
        {
            if (IsDefaultPoints)
            {
                ValidStoryPoints = new List<double> { 0.5, 1, 2, 3, 5, 8, 13, 21, 34 };
            }
        }
        public void AddUser(UserData user)
        {
            users.Add(user);
        }
        public UserData RemoveUser(string socketId)
        {
            var user = users.FirstOrDefault(x => x.SocketId == socketId);
            users.Remove(user);
            return user;
        }
        public IList<UserData> GetAllUsers()
        {
            return users;
        }
        public void AddStoryPoint(double point)
        {
            if (!ValidStoryPoints.Contains(point))
            {
                ValidStoryPoints.Add(point);
            }
        }
        public double RemoveStoryPoint(double point)
        {
            if (ValidStoryPoints.Contains(point))
            {
                ValidStoryPoints.Remove(point);
            }
            return point;
        }
    }
}
