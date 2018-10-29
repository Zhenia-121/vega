using System;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using vega.Controllers.Resources;
using vega.Core;
using vega.Models;
using vega.Persistence;
using System.Drawing;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Options;

namespace vega.Controllers
{
    [Route("api/vehicle/{vehicleId}/photo")]
    public class PhotoController : Controller
    {
        private readonly IHostingEnvironment appEnvironment;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly IOptionsSnapshot<PhotoSettings> photoSettings;

        private readonly IPhotoRepository photoRepository;

        public PhotoController(IHostingEnvironment appEnvironment,
            IVehicleRepository repository, 
            IUnitOfWork unitOfWork, 
            IMapper mapper, 
            IOptionsSnapshot<PhotoSettings> options,
            IPhotoRepository photoRepository)
        {

            this.mapper = mapper;
            this.photoSettings = options;
            this.photoRepository = photoRepository;
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.appEnvironment = appEnvironment;
        }
        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            if (file == null)
                return BadRequest("There wasn't file");

            if (!photoSettings.Value.isSupported(file.FileName))
                return BadRequest("Invalid file type");
            if (file.Length > photoSettings.Value.MaxBytes)
                return BadRequest("Max file size limit was exceeded");
            if (file.Length == 0)
                return BadRequest("Empty file");

            var vehicle = repository.GetVehicle(vehicleId, includeRelated: false).Result;
            if (vehicle == null)
                return NotFound();

            var path = Path.Combine(appEnvironment.WebRootPath, "uploads");
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

            if(!Directory.Exists(path))
                Directory.CreateDirectory(path);

            var fullPath = Path.Combine(path, fileName);
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var newPhoto = new Photo { FileName = fileName };
            vehicle.Photos.Add(newPhoto);
            await unitOfWork.Complete();

            return Ok(mapper.Map<PhotoResource>(newPhoto));
        }
        [HttpGet]
        public async Task<IEnumerable<PhotoResource>> GetPhoto(int vehicleId)
        {
            var photo = await photoRepository.GetPhoto(vehicleId);
            return mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photo);
        }
    }
}