using System.Collections.Generic;
using System.Threading.Tasks;
using vega.Models;

namespace vega.Core
{
    public interface IVehicleRepository
    { 
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);

        Task<List<Vehicle>> GetAllVehicles();
        void Add(Vehicle vehicle);

        void Remove(Vehicle vehicle);
    }
}