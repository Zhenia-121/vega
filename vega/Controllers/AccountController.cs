using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using vega.Authorization;
using vega.Controllers.Resources;
using vega.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using vega.Core;

namespace vega.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly IMapper _mapper;
        private readonly UserManager<Account> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IOptions<AuthOptions> _authOptions;
        private readonly IAccountService _accountService;

        public AccountController(IMapper mapper, UserManager<Account> userManager, RoleManager<IdentityRole> roleManager, IOptionsSnapshot<AuthOptions> options, IAccountService accountService)
        {

            this._mapper = mapper;
            this._userManager = userManager;
            this._roleManager = roleManager;
            this._authOptions = options;
            this._accountService = accountService;
        }
       
        [AllowAnonymous]
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> CreateAccount([FromBody] AccountResource newUser)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.ToList());

            var userIdentity = _mapper.Map<Account>(newUser);
            
            // var result = await _userManager.CreateAsync(userIdentity, newUser.Password);
            // if (!result.Succeeded) 
            //     return BadRequest(result.Errors);
            // //var role = _roleManager.Roles.Where(r => r.Name == "user");
            // await _userManager.AddToRoleAsync(userIdentity, Roles.user.ToString());
            // out IEnumerable<string> errors = null;

            var createdUser = await _accountService.Create(userIdentity, newUser.Password);
            if (createdUser.Item1 == null) {
                foreach (var error in createdUser.Item2)
                    ModelState.AddModelError(error.Key, error.Value);
                return BadRequest(this.ModelState);    
            }
            
            var resultUser = _mapper.Map<AccountResource>(createdUser.Item1);
            return Ok(resultUser);
        }
        [Authorize]
        [HttpGet]
        [Route("users")]
        public IEnumerable<Account> GetAccountAsync() {
            return  _accountService.GetAll() ;
        }

        [HttpGet("{id}")]
        public async Task<AccountResource> GetAccountById(string Id) {
            var account =  await _accountService.GetById(Id);
            return _mapper.Map<AccountResource>(account);
        }
        [AllowAnonymous]
        [Route("getlogin")]
        public IActionResult GetLogin()
        {
            return Ok($"Ваш логин: {User.Identity.Name}");
        }

        [HttpPost]
        [Route("login")]
        public async Task GetToken([FromBody] CredentialsResource person)
        {     
            if (!ModelState.IsValid)
                await Response.WriteAsync(string.Join("; ", ModelState.Values
                                        .SelectMany(x => x.Errors)
                                        .Select(x => x.ErrorMessage)));

            var username = person.UserName;
            var password = person.Password;

            // var identity = await GetIdentity(username, password);
            var identity = await _accountService.Authenticate(username, password);

            if (identity == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Invalid username or password." + username + password);
                return;
            }

            var encodedJwt = GenerateToken(identity);
            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name
            };
            // сериализация ответа
            Response.ContentType = "application/json";
            await Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
        }
        private string GenerateToken(ClaimsIdentity identity) {
            var now = DateTime.UtcNow;
            var key = Encoding.ASCII.GetBytes(_authOptions.Value.KEY);
            var jwt = new JwtSecurityToken(
                    issuer: _authOptions.Value.ISSUER,
                    audience: _authOptions.Value.AUDIENCE,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(_authOptions.Value.LIFETIME)),
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key) , SecurityAlgorithms.HmacSha256Signature));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            return encodedJwt;
        }        
    }
}