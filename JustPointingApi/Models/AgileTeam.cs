using JustPointingApi.Models;
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
        public AdminSettings AdminSettings { get; set; }
        public IList<Observer> Observers { get; set; }
        public DateTime CreationDate { get; set; }

        [JsonConstructor]
        public AgileTeam()
        {
        }
        public AgileTeam(bool IsDefaultPoints = true)
        {
            Users = new List<UserData>();
            ValidStoryPoints = new List<string>();
            AdminSettings = new AdminSettings();
            Observers = new List<Observer>();
            CreationDate = DateTime.Now;
            if (IsDefaultPoints)
            {
                ValidStoryPoints = new List<string> { "34", "21", "13", "8", "5", "3", "2", "1" };
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
        public void UpdateSettings(AdminSettings settings)
        {
            AdminSettings = settings;
        }
        public void AddObserver(string socketId, string name)
        {
            Observers.Add(new Observer(socketId, name));
        }
        public Observer GetObserver(string socketId)
        {
            return Observers.Where(x => x.SocketId == socketId).FirstOrDefault();
        }
        public Observer RemoveObserver(string socketId)
        {
            var obs = Observers.Where(x => x.SocketId == socketId).FirstOrDefault();
            if (obs !=null && Observers.Remove(obs))
                return obs;
            return null;
        }

        public IList<Observer> GetAllObservers()
        {
            return Observers;
        }
    }
}
