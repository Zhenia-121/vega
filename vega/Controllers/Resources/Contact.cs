using System.ComponentModel.DataAnnotations;

namespace vega.Controllers.Resources
{
    public class Contact
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Phone { get; set; }

        public string Email { get; set; }
    }
}