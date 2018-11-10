using System.Text;
using Microsoft.IdentityModel.Tokens;
using vega.Models;

namespace vega.Authorization
{
    public class AuthOptions
    {
        public string ISSUER { get; set; } // издатель токена
        public string AUDIENCE { get; set; } // потребитель токена
        public string KEY { get; set; }   // ключ для шифрации
        public int LIFETIME {get; set; } // время жизни токена - 1 минута
        // public static SymmetricSecurityKey GetSymmetricSecurityKey()
        // {
        //     return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        // }        
    }
}