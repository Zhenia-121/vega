using FluentValidation;
using vega.Controllers.Resources;

namespace vega.Models.Validations
{
    public class RegistrationModelValidator: AbstractValidator<AccountResource>
    {
        public RegistrationModelValidator()
        {
            RuleFor(vm => vm.Email).NotEmpty().WithMessage("Email cannot be empty");
            RuleFor(vm => vm.Password).NotEmpty().WithMessage("Password cannot be empty");
            RuleFor(vm => vm.FirstName).NotEmpty().WithMessage("FirstName cannot be empty");
            RuleFor(vm => vm.LastName).NotEmpty().WithMessage("LastName cannot be empty");
        }
    }
}