import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { AuthenticationService } from 'src/app/services/auth-service.service';
import { first } from 'rxjs/operators';
import { copyStyles } from '@angular/animations/browser/src/util';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }
  ngOnInit() {
  }

  sendCredentials(credentials) {
    this.submitted = true;
    this.authenticationService.login(credentials.username, credentials.password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
        });
  }
}
