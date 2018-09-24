using Newtonsoft.Json;


namespace vega.Controllers.Resources
{
    public class FeatureResource
    {
        [JsonProperty(PropertyName="id")]
        public int Id { get; set; }

        [JsonProperty(PropertyName="name")]
        public string Name { get; set; }
    }
}