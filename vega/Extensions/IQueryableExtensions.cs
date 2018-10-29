using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace vega.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> ApplyOrdering<T> (
            this IQueryable<T> query,
            IQueryObject queryObject, 
            Dictionary<string, Expression<Func<T, object>>> columnsMap) 
        {
            if (!String.IsNullOrWhiteSpace(queryObject.sortBy) && columnsMap.ContainsKey(queryObject.sortBy))
            {
                return  queryObject.isAscending ? 
                    query.OrderBy(columnsMap[queryObject.sortBy]) :
                    query.OrderByDescending(columnsMap[queryObject.sortBy]);
            }
            else return query;

        }
        public static IQueryable<T> Pagination<T>(
            this IQueryable<T> query,
            IQueryObject queryObject)
        {
            if (queryObject.pageNumber > 0 && queryObject.pageSize != 0)  
                return query.Skip(queryObject.pageSize * (queryObject.pageNumber-1)).Take(queryObject.pageSize);
            if (queryObject.pageSize == 0)
                return query;
            return query.Take(queryObject.pageSize);
        }
    }
}