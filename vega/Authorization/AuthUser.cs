namespace vega.Authorization
{
    public class AuthUser
    {
        public string UserName { get; set; }

        public string Password { get; set; }

        public string[] Roles { get; set; }
    }
}