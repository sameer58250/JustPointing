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
        public IList<UserData> Users { get; set; }
        public string StoryDescription { get; set; }
        public IList<string> ValidStoryPoints { get; set; }
        [JsonConstructor]
        public AgileTeam()
        {
        }
        public AgileTeam(bool IsDefaultPoints = true)
        {
            Users = new List<UserData>();
            ValidStoryPoints = new List<string>();
            if (IsDefaultPoints)
            {
                ValidStoryPoints = new List<string> { "0.5", "1", "2", "3", "5", "8", "13", "21", "34" };
            }
        }
        public void AddUser(UserData user)
        {
            Users.Add(user);
        }
        public UserData RemoveUser(string socketId)
        {
            var user = Users.FirstOrDefault(x => x.SocketId == socketId);
            if (user != null)
            {
                Users.Remove(user);
            }
            return user;
        }

        public UserData GetUser(string socketId)
        {
            return Users.FirstOrDefault(x => x.SocketId == socketId);
        }
        public IList<UserData> GetAllUsers()
        {
            return Users;
        }
        public void AddStoryPoint(string point)
        {
            if (!ValidStoryPoints.Contains(point))
            {
                ValidStoryPoints.Add(point);
            }
        }
        public string RemoveStoryPoint(string point)
        {
            if (ValidStoryPoints.Contains(point))
            {
                ValidStoryPoints.Remove(point);
            }
            return point;
        }
        public void UpdateValidStoryPoints(List<string> sizeList)
        {
            ValidStoryPoints = sizeList;
        }
    }
}
