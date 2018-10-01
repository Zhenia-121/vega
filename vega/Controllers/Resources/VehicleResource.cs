
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using vega.Models;

namespace vega.Controllers.Resources
{
    public class VehicleResource
    {
        public int Id { get; set; }
        public KeyValuePairResource Model { get; set; }
        public ContactResource Contact { get; set; }
        public KeyValuePairResource Make { get; set; }
        public bool IsRegistered { get; set; }
        public DateTime LastUpdate { get; set; }
        public ICollection<KeyValuePairResource> Features { get; set; }
        VehicleResource(){
            Features = new Collection<KeyValuePairResource>();
        }

    }
}