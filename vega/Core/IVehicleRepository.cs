using System.Collections.Generic;
using System.Threading.Tasks;
using vega.Models;
using vega.Persistence;

namespace vega.Core
{
    public interface IVehicleRepository
    { 
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);

        Task<List<Vehicle>> GetVehicles(VehicleQuery filter);
        void Add(Vehicle vehicle);

        void Remove(Vehicle vehicle);
    }
}