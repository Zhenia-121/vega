using System.Collections.Generic;
using System.Collections.ObjectModel;
using Newtonsoft.Json;

namespace vega.Controllers.Resources
{
    public class MakeResource
    {

        [JsonProperty(PropertyName="id")]      
         public int Id { get; set; }

        [JsonProperty(PropertyName="name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName="models")]
        public ICollection<ModelResource> Models { get; set; }

        public MakeResource()
        {
            Models = new Collection<ModelResource>();
        }
    }
}