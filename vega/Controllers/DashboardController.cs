using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using vega.Core;

namespace vega.Controllers
{
    [Authorize]
    [Route("/api/dashboard")]
    public class DashboardController: Controller
    {
        private readonly ClaimsPrincipal _caller;
        private readonly IAccountService _service;

        public DashboardController(IAccountService service, IHttpContextAccessor httpContextAccessor)
        {
            this._caller = httpContextAccessor.HttpContext.User;
            this._service = service;
        }

    // GET api/dashboard/home
    [HttpGet]
    public async Task<IActionResult> Home()
    {
      // retrieve the user info
      //HttpContext.User
      var userId = _caller.Claims.Single(c => c.Type == "id");
        //   var customer = await _appDbContext.Customers.Include(c => c.Identity).SingleAsync(c => c.Identity.Id == userId.Value);
      var user = await _service.GetById(userId.Value);

      return new OkObjectResult(new
      {
        Message = "This is secure API and user data!",
        user.FirstName,
        user.LastName,
        user.PictureUrl,
      });
    }
    }
}