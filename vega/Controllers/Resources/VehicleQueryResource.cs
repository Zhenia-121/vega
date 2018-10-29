namespace vega.Controllers.Resources
{
    public class VehicleQueryResource
    {
        public int? MakeId { get; set; }
        public string sortBy { get; set; }
        public bool isAscending { get; set; }
        public int pageNumber { get; set ; }
        public int pageSize { get; set ; }
    }
}