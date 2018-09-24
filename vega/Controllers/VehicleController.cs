using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.DB;
using vega.Models;
using vega.Controllers.Resources;
using System.Threading.Tasks;

namespace vega.Controllers
{
    [Route("api/vehicle")]
    public class VehicleController : Controller
    {
        private readonly VegaDbContext _context;
        private readonly IMapper mapper;

        public VehicleController(VegaDbContext context, IMapper mapper)
        {
            _context = context;
            this.mapper = mapper;
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id) {

            var result = await _context.Vehicles.SingleOrDefaultAsync(v => v.Id == id);
            if (result == null) {
                return NotFound();
            } else {
                var res = mapper.Map<Vehicle, VehicleResource>(result);
                return Ok(res);
            }
        }

        //create
        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] VehicleResource vehicle)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var newVehicle = mapper.Map<VehicleResource, Vehicle>(vehicle);
            newVehicle.LastUpdate = DateTime.Now;
            
            await _context.Vehicles.AddAsync(newVehicle);
            _context.SaveChanges();
            
            var res = mapper.Map<Vehicle,VehicleResource> (newVehicle);
            return Ok(res);
        }

        //update
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] VehicleResource vehicleResource) {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var updateVehicle = await _context.Vehicles.Include(v => v.VehicleFeatures).SingleOrDefaultAsync(v => v.Id == id);
            if(updateVehicle == null)
                return NotFound();

            updateVehicle = mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            updateVehicle.LastUpdate = DateTime.Now;
            await _context.SaveChangesAsync();

            var res = mapper.Map<Vehicle, VehicleResource>(updateVehicle);

            return Ok(res);
        }
        
        
        //delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id){

            var result = await _context.Vehicles.FindAsync(id); // SingleOrDefaultAsync(v => v.Id == id);

            if (result == null) {
                return NotFound();
            } else {
                _context.Vehicles.Remove(result);
                await _context.SaveChangesAsync();

                return Ok(id);
            }
        }





    }
}