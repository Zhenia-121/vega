using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace vega.Models
{
    [Table("Features")]
    public class Feature
    {

        public Feature(int id, string name)
        {
            this.Id = id;
            this.Name = name;

        }
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public ICollection<VehicleFeature> VehicleFeatures { get; set; }

        Feature(){
            VehicleFeatures = new Collection<VehicleFeature>();
        }
    }
}