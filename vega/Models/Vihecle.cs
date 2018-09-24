using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace vega.Models
{
    [Table("Vehicles")]
    public class Vehicle
    {        
        public int Id { get; set; }
        public string Make { get; set; }

        [Required]
        public Model Model { get; set; }

        public int ModelId { get; set; }
        [Required]
        [StringLength(255)]
        public string ContactName { get; set; }

        [Required]
        [StringLength(255)]
        public string ContactPhone { get; set; }

        [EmailAddress]
        public string ContactEmail { get; set; }
        public bool IsRegistered { get; set; }
        public DateTime LastUpdate { get; set; }
        public ICollection<VehicleFeature> VehicleFeatures { get; set; }

        public Vehicle(){
            VehicleFeatures = new Collection<VehicleFeature>();
        }
    }
}