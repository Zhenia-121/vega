using System.Collections.Generic;
using vega.Models;

namespace vega.Controllers.Resources
{
    public class QueryResultResource<T>
    {
        public int totalItems { get; set; }

        public IEnumerable<T> Items { get; set; }   
    }
}