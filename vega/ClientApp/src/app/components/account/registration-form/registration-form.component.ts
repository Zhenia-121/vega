import { AuthenticationService } from './../../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountRegistration } from 'src/app/models/account-registration';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  errors: string;
  isRequesting: boolean;
  submitted = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }
  registerUser({ value, valid }: { value: AccountRegistration, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.authService.register(value.email, value.password, value.firstName, value.lastName)
        .subscribe(
          result => {
            if (result) {
              this.router.navigate(['/login'], { queryParams: { brandNew: true, email: value.email } });
            }
          },
          errors => this.errors = errors,
          () => this.isRequesting = false);
    }
  }
}
