using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core;
using vega.DB;
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

        public Task<List<Vehicle>> GetAllVehicles(Filter filter = null)
        {

            var query = context.Vehicles
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .Include(v => v.Features)
                    .ThenInclude(f => f.Feature)
                .AsQueryable();

            if (filter.MakeId.HasValue)
                query = query.Where(v => v.Model.MakeId == filter.MakeId);
            return query.ToListAsync();
            // .ToListAsync();
        }
        public void Remove(Vehicle vehicle)
        {
            context.Vehicles.Remove(vehicle);
        }

    }
}