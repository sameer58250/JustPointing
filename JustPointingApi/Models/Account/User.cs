using System;
using System.Security.Cryptography;
using System.Text;

namespace JustPointingApi.Models.Account
{
    public class User
    {
        public string UserEmail { get; set; }
        public int UserId { get; set; }
        public string Password { private get; set; }
        public DateTime CreationDate { get; set; }
        public string SHA256Password
        {
            get
            {
                return _convertToSHA256();
            }
        }

        private string _convertToSHA256()
        {
            if (!String.IsNullOrEmpty(Password))
            {
                using SHA256 mySHA256 = SHA256.Create();
                var bytePass = mySHA256.ComputeHash(Encoding.UTF8.GetBytes(Password));
                return Convert.ToBase64String(bytePass);
            }
            else
            {
                return string.Empty;
            }
        }
    }
}
