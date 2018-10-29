using System.Collections.Generic;
using vega.Models;

namespace vega.Persistence
{
    public class QueryResult<T>
    {
        public int totalItems { get; set; }

        public IEnumerable<T> Items { get; set; }

    }
}