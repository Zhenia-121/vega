using FluentValidation;
using vega.Controllers.Resources;

namespace vega.Models.Validations
{
    public class CredentialsModelValidator: AbstractValidator<CredentialsResource>
    {
         public CredentialsModelValidator()
        {
            RuleFor(vm => vm.UserName).NotEmpty().WithMessage("Username cannot be empty");
            RuleFor(vm => vm.Password).NotEmpty().WithMessage("Password cannot be empty");
            RuleFor(vm => vm.Password).Length(6, 12).WithMessage("Password must be between 6 and 12 characters");
        }
    }
}