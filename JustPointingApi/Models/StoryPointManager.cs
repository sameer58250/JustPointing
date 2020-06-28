using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointing.Models
{
    public class StoryPointManager
    {
        public Dictionary<string,string> StoryPoints { get; set; }

        public StoryPointManager()
        {
            StoryPoints = new Dictionary<string, string>();
        }

        public void AddStoryPoint(string socketId, string point)
        {
            string existingPoint;
            if(StoryPoints.TryGetValue(socketId, out existingPoint))
            {
                StoryPoints[socketId] = point;
            }
            else
            {
                StoryPoints.Add(socketId, point);
            }
        }
        public string RemoveStoryPoint(string socketId)
        {
            string existingPoint;
            StoryPoints.Remove(socketId, out existingPoint);
            return existingPoint;
        }
        public string GetStoryPoint(string socketId)
        {
            string existingPoint = "0";
            StoryPoints.TryGetValue(socketId, out existingPoint);
            return existingPoint;
        }
    }
}
