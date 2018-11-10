using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using vega.Models;

namespace vega.Authorization
{
    //класс для инициализации начальных значений для пользователей приложения админ и т.д.
    public class AccountInitializer
    {
        public static async Task InitializeAsync(UserManager<Account> userManager,  RoleManager<IdentityRole> roleManager, IOptions<InitialAuthSettings> options) {
            if (options == null)
                {
                    System.Console.WriteLine("null options");
                    return;
                }
            foreach (var role in options.Value.Roles) {
                if ( await roleManager.FindByNameAsync(role) == null)
                    await roleManager.CreateAsync(new IdentityRole { Name = role});
            }
            foreach (var user in options.Value.Users) {
                if (await userManager.FindByNameAsync(user.UserName) == null) {
                    var newUser = new Account { UserName = user.UserName};
                    IdentityResult result =  await userManager.CreateAsync(newUser, user.Password);
                    if (result.Succeeded){
                        foreach(var userRole in user.Roles) 
                        {
                            if (await roleManager.FindByNameAsync(userRole) == null)
                                await roleManager.CreateAsync(new IdentityRole { Name = userRole});
                            await userManager.AddToRoleAsync(newUser, userRole);
                        }

                    }
                        
                }
                    
            }

        }
    }
}