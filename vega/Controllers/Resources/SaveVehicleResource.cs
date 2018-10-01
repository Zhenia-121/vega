using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace vega.Controllers.Resources
{
    public class SaveVehicleResource
    {
         public int ModelId { get; set; }

        [Required]
        public ContactResource contact { get; set; }
  
        public bool IsRegistered { get; set; }
        public ICollection<int> Features { get; set; }

        SaveVehicleResource(){
            Features = new Collection<int>();
        }

    }
}