import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { AuthenticationService } from 'src/app/shared/services/auth-service.service';
import { first } from 'rxjs/operators';
import { copyStyles } from '@angular/animations/browser/src/util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  isRequesting: boolean;
  submitted = false;
  returnUrl: string;
  errors = '';
  brandNew: boolean;
  credentials = { username: '', password: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService) { }
  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(
      (param: any) => {
         this.brandNew = param['brandNew'];
         this.credentials.username = param['username'];
      });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
  }
  sendCredentials(credentials) {
    this.submitted = true;
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    console.log('pass :', credentials.password);
    console.log('uname :', credentials.username);
    this.authService.login(credentials.username, credentials.password)
      .finally(() => this.isRequesting = true)
      .pipe(first())
      .subscribe(
        data => {
            console.log('data received');
            console.log('returnUrl:' + this.returnUrl);
            this.router.navigate([this.returnUrl || '/dashboard/home']);
        },
        errors => {
          this.errors = errors;
        });
  }

}
