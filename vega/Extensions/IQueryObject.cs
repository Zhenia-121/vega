namespace vega.Extensions
{
    public interface IQueryObject
    {
         string sortBy { get; set; }
         bool isAscending { get; set; }
         int pageNumber { get; set; }
         int pageSize { get; set; }
    }
}