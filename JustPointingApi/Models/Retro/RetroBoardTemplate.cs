using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustPointingApi.Models.Retro
{
    public class RetroBoardTemplate
    {
        public int RetroBoardTemplateId { get; set; }
        public int TemplateOwnerId { get; set; }
        public string TemplateName { get; set; }
        public DateTime CreationDate { get; set; }
        public bool IsDefault { get; set; }
        public IList<RetroBoardTemplateColumn> TemplateColumns { get; set; }
        public IList<RetroBoardTemplateUser> TemplateUsers { get; set; }

        public RetroBoardTemplate()
        {
            TemplateColumns = new List<RetroBoardTemplateColumn>();
            TemplateUsers = new List<RetroBoardTemplateUser>();
        }
    }
}
