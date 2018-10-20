using vega.Extensions;

namespace vega.Persistence
{
    public class VehicleQuery: IQueryObject
    {
        public int? MakeId { get; set; }

        public int? ModelId { get; set; }

        public string sortBy { get; set; }

        public bool isAscending { get; set; }
    }
}