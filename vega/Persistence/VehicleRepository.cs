using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core;
using vega.DB;
using vega.Extensions;
using vega.Models;

namespace vega.Persistence
{
    public class VehicleRepository: IVehicleRepository
    {
        private readonly VegaDbContext context;
        public VehicleRepository (VegaDbContext context) {
            this.context = context;
        }

        public void Add(Vehicle vehicle)
        {
            context.Vehicles.Add(vehicle);
        }

        public Task<Vehicle> GetVehicle(int id, bool includeRelated = true) {
            if(!includeRelated)
                return context.Vehicles.FindAsync(id);

            return context.Vehicles
            .Include(v => v.Model)
                .ThenInclude(m => m.Make)
            .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
            .SingleOrDefaultAsync(v => v.Id == id);
        }

        public async Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery queryObject = null)
        {
            var result = new QueryResult<Vehicle>();
            var query = context.Vehicles
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .Include(v => v.Features)
                    .ThenInclude(f => f.Feature)
                .AsQueryable();
                
            if (queryObject.MakeId.HasValue)
                query = query.Where(v => v.Model.MakeId == queryObject.MakeId);
            
            if (queryObject.ModelId.HasValue)
                query = query.Where(v => v.Model.Id == queryObject.ModelId);

            var columnsMap = new  Dictionary<string, Expression<Func<Vehicle, object>>> () {
                ["contactName"] = v => v.ContactName,
                ["model"] = v => v.Model.Name,
                ["make"] = v => v.Model.Make.Name
            };

            query = query.ApplyOrdering(queryObject, columnsMap);
            result.totalItems = await query.CountAsync();

            query = query.Pagination(queryObject);
            result.Items = await query.ToListAsync();

            return result;
            // .ToListAsync();
        }
        
        public void Remove(Vehicle vehicle)
        {
            context.Vehicles.Remove(vehicle);
        }

    }
}