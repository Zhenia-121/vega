import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationAccount } from 'src/app/shared/models/registration-account';
import { AuthenticationService } from 'src/app/shared/services/auth-service.service';

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
  registerUser({ value, valid }: { value: RegistrationAccount, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.authService.register(value)
        .subscribe(
          result => {
            if (result) {
              this.router.navigate(['/login'], { queryParams: { brandNew: true, username: value.usernName } });
            }
          },
          errors => this.errors = errors,
          () => this.isRequesting = false);
    }
  }
}
