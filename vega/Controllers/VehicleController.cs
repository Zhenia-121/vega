using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.DB;
using vega.Models;
using vega.Controllers.Resources;
using System.Threading.Tasks;
using vega.Core;
using System.Collections.Generic;

namespace vega.Controllers
{
    [Route("api/vehicle")]
    public class VehicleController : Controller
    {
        private readonly IMapper mapper;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public VehicleController(IMapper mapper, IVehicleRepository repository, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetVehicles(){
            var allVehicles = await repository.GetAllVehicles();
            var result = mapper.Map<List<Vehicle>, List<VehicleResource>>(allVehicles);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id) {

            var result = await repository.GetVehicle(id);
            
            if (result == null) {
                return NotFound();
            } else {
                var res = mapper.Map<Vehicle, VehicleResource>(result);
                return Ok(res);
            }
        }

        //create
        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] SaveVehicleResource vehicle)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var newVehicle = mapper.Map<SaveVehicleResource, Vehicle>(vehicle);
            newVehicle.LastUpdate = DateTime.Now;
            
            repository.Add(newVehicle);
            await unitOfWork.Complete();

            newVehicle = await repository.GetVehicle(newVehicle.Id);

            var res = mapper.Map<Vehicle, VehicleResource> (newVehicle);
            return Ok(res);
        }

        //update
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle([FromBody] SaveVehicleResource vehicleResource, int id) {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var updateVehicle = await repository.GetVehicle(id);
            if(updateVehicle == null)
                return NotFound();

            mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource, updateVehicle);
            updateVehicle.LastUpdate = DateTime.Now;
            
            await unitOfWork.Complete();

            updateVehicle = await repository.GetVehicle(updateVehicle.Id);

            var res = mapper.Map<Vehicle, VehicleResource>(updateVehicle);

            return Ok(res);
        }
        
        
        //delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id){

            var deletingVehicle = await repository.GetVehicle(id); // SingleOrDefaultAsync(v => v.Id == id);

            if (deletingVehicle == null) {
                return NotFound();
            } else {
                repository.Remove(deletingVehicle);
                await unitOfWork.Complete();

                return Ok(id);
            }
        }





    }
}