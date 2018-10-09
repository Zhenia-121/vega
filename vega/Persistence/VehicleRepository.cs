using System;
using System.Collections.Generic;
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
        private readonly VegaDbContext Context;
        public VehicleRepository (VegaDbContext context) {
            Context = context;
        }

        public void Add(Vehicle vehicle)
        {
            Context.Vehicles.Add(vehicle);
        }

        public Task<Vehicle> GetVehicle(int id, bool includeRelated = true) {
            if(!includeRelated)
                return Context.Vehicles.FindAsync(id);

            return Context.Vehicles
            .Include(v => v.Model)
                .ThenInclude(m => m.Make)
            .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
            .SingleOrDefaultAsync(v => v.Id == id);
        }

        public Task<List<Vehicle>> GetAllVehicles(){
            return Context.Vehicles
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .ToListAsync();
        }
        public void Remove(Vehicle vehicle)
        {
            Context.Vehicles.Remove(vehicle);
        }
    }
}