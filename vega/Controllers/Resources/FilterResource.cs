namespace vega.Controllers.Resources
{
    public class FilterResource
    {
        public int? MakeId { get; set; }

        public string sortBy { get; set; }
        public bool isAscending { get; set; }
    }
}