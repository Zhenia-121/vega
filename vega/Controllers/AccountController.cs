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
        private readonly IAccountInterface _accountService;

        public AccountController(IMapper mapper, UserManager<Account> userManager, RoleManager<IdentityRole> roleManager, IOptionsSnapshot<AuthOptions> options, IAccountInterface accountService)
        {

            this._mapper = mapper;
            this._userManager = userManager;
            this._roleManager = roleManager;
            this._authOptions = options;
            this._accountService = accountService;
        }
       
        [AllowAnonymous]
        [HttpPost]
        [Route("registration")]
        public async Task<IActionResult> CreateAccount([FromBody] AccountResource newUser)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.ToList());

            var userIdentity = _mapper.Map<Account>(newUser);
            
            var result = await _userManager.CreateAsync(userIdentity, newUser.Password);
            if (!result.Succeeded) 
                return BadRequest(result.Errors);
            //var role = _roleManager.Roles.Where(r => r.Name == "user");
            await _userManager.AddToRoleAsync(userIdentity, Roles.user.ToString());
            
            return Ok(userIdentity);
        }
        [Authorize]
        [HttpGet]
        [Route("users")]
        public async Task<List<Account>> GetAccountAsync() {
            // var adminAccounts = await _userManager.GetUsersInRoleAsync("user");
            var userAccount = await _userManager.GetUsersInRoleAsync("user");

            // var result = adminAccounts.ToList();
            // result.AddRange(userAccount.ToList());
            return await Task.FromResult(userAccount.ToList());
        } 

        [AllowAnonymous]
        [Route("getlogin")]
        public IActionResult GetLogin()
        {
            return Ok($"Ваш логин: {User.Identity.Name}");
        }

        [HttpGet]
        [Route("roles")]
        public IActionResult GetRoles() {
            var roles =  _roleManager.Roles.Select(ir => new {Id = ir.Id, Name = ir.Name}).ToList();
            return Ok(roles);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public async Task GetToken([FromBody] CredentialsResource person)
        {     
            if  (!ModelState.IsValid)
                await Response.WriteAsync(string.Join("; ", ModelState.Values
                                        .SelectMany(x => x.Errors)
                                        .Select(x => x.ErrorMessage)));

            var username = person.UserName;
            var password = person.Password;

            var identity = await GetIdentity(username, password);

            if (identity == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Invalid username or password." + username + password);
                return;
            }
            var now = DateTime.UtcNow;
            var key = Encoding.ASCII.GetBytes(_authOptions.Value.KEY);
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: _authOptions.Value.ISSUER,
                    audience: _authOptions.Value.AUDIENCE,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(_authOptions.Value.LIFETIME)),
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key) , SecurityAlgorithms.HmacSha256Signature));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name
            };

            // сериализация ответа
            Response.ContentType = "application/json";
            await Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
        }

        private async Task<ClaimsIdentity> GetIdentity(string username, string password)
        {
            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
                return await Task.FromResult<ClaimsIdentity>(null);

            var userToVerify = _userManager.Users.FirstOrDefault(x => x.UserName == username);
            if (userToVerify == null) 
                return await Task.FromResult<ClaimsIdentity>(null); 
            
            
            if (await _userManager.CheckPasswordAsync(userToVerify, password))
            {
                var roles = await _userManager.GetRolesAsync(userToVerify);
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, userToVerify.UserName),
                };
                if (roles.Contains("admin"))
                    claims.Add(new Claim(ClaimsIdentity.DefaultRoleClaimType, "admin"));
                else
                    claims.Add(new Claim(ClaimsIdentity.DefaultRoleClaimType, "user"));

                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return await Task.FromResult<ClaimsIdentity>(claimsIdentity);
            }

            // если пользователя не найдено
            return await Task.FromResult<ClaimsIdentity>(null);;
        }

    }
}