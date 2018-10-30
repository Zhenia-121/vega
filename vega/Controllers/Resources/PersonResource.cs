using System.ComponentModel.DataAnnotations;

namespace vega.Controllers
{
    public class PersonResource
    {
        [Required]
        public string Username { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
}