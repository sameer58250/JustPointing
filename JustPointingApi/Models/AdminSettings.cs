using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Runtime.Serialization;

namespace JustPointingApi.Models
{
    public class AdminSettings
    {
        [JsonConverter(typeof(StringEnumConverter))]
        public setting ShowVoteSetting { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public setting ResetVoteSetting { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public setting EditSizeListSetting { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public setting ControlUserSetting { get; set; }

        public AdminSettings()
        {
            ShowVoteSetting = setting.All;
            ResetVoteSetting = setting.OnlyAdmin;
            EditSizeListSetting = setting.All;
            ControlUserSetting = setting.OnlyAdmin;
        }
    }

    public enum setting
    {
        [EnumMember(Value = "OnlyAdmin")]
        OnlyAdmin,
        [EnumMember(Value = "All")]
        All
    }
}
