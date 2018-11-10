using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using vega.Authorization;
using vega.Core;
using vega.Models;

namespace vega.Services
{
    public class AccountService : IAccountInterface
    {
        private readonly UserManager<Account> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountService(UserManager<Account> userManager, RoleManager<IdentityRole> roleManager)
        {
            this._userManager = userManager;
            this._roleManager = roleManager;
        }
        public async Task<ClaimsIdentity> Authenticate(string username, string password)
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

        public async Task<Account> Create(Account user, string password)
        {
            var result = await _userManager.CreateAsync(user, password);
            if (!result.Succeeded) 
                return null;
            //var role = _roleManager.Roles.Where(r => r.Name == "user");
            var resultRole = await _userManager.AddToRoleAsync(user, Roles.user.ToString());
            if (!resultRole.Succeeded)
                return null;
            var saveUser = await _userManager.Users.SingleOrDefaultAsync(u => u.UserName == user.UserName);
            return saveUser;
        }

        public async void Delete(string id)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.Id == id);
            await _userManager.DeleteAsync(user);
        }

        public async Task<IEnumerable<Account>> GetAll()
        {
            IEnumerable<Account> accounts = null;
            var roles = _roleManager.Roles.Select(r => r.Name).ToList();
            foreach (var role in roles) {
                var accountsForRole = await _userManager.GetUsersInRoleAsync(role);
                accounts.Concat(accountsForRole.AsEnumerable());
            }
            return accounts;
        }

        public async Task<Account> GetById(string id)
        {
            return await _userManager.Users.SingleOrDefaultAsync(a => a.Id == id);
        }
        

        public async void Update(Account user, string password = null)
        {
            var UpdateResult = await _userManager.UpdateAsync(user);

            if (UpdateResult.Succeeded)
                return;
            throw new Exception(String.Join(" ", UpdateResult.Errors));
        }
    }
}