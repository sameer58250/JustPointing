using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointing.Models
{
    public class UserStoryPoint
    {
        public Dictionary<string,double> StoryPoints { get; set; }

        public void AddStoryPoint(string socketId, double point)
        {
            double existingPoint;
            if(StoryPoints.TryGetValue(socketId, out existingPoint))
            {
                StoryPoints[socketId] = point;
            }
            else
            {
                StoryPoints.Add(socketId, point);
            }
        }
        public double RemoveStoryPoint(string socketId)
        {
            double existingPoint;
            StoryPoints.Remove(socketId, out existingPoint);
            return existingPoint;
        }
        public double GetStoryPoint(string socketId)
        {
            double existingPoint = 0;
            StoryPoints.TryGetValue(socketId, out existingPoint);
            return existingPoint;
        }
    }
}
