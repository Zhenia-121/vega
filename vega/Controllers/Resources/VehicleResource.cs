
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using vega.Models;

namespace vega.Controllers.Resources
{
    public class VehicleResource
    {
        public int ModelId { get; set; }

        [Required]
        public Contact contact { get; set; }
  
        public bool IsRegistered { get; set; }
        public ICollection<int> Features { get; set; }

        VehicleResource(){
            Features = new Collection<int>();
        }

    }
}