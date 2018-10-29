using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core;
using vega.DB;
using vega.Models;

namespace vega.Persistence
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly VegaDbContext context;

        public PhotoRepository(VegaDbContext context){
            this.context = context;
        }
        public async Task<IEnumerable<Photo>> GetPhoto(int vehicleId) => await context.Photos.Where(p => p.VehicleId == vehicleId).ToListAsync();
    }
}