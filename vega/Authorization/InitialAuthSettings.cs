using System.Collections.Generic;

namespace vega.Authorization
{
    //
    public class InitialAuthSettings
    {
        public List<string> Roles { get; set; }

        public List<AuthUser> Users { get; set; }
    }
}