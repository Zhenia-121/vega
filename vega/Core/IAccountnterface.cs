using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using vega.Models;

namespace vega.Core
{
    public interface IAccountInterface
    {
        Task<ClaimsIdentity> Authenticate(string username, string password);
        Task<IEnumerable<Account>> GetAll();
        Task<Account> GetById(string id);
        Task<Account> Create(Account user, string password);
        void Update(Account user, string password = null);
        void Delete(string id);
    }
}