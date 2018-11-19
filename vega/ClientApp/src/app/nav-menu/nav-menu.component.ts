import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../shared/services/auth-service.service';
import { logging } from 'protractor';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  subscription: Subscription;
  constructor(private authService: AuthenticationService) {
    this.subscription = this.authService.authNavStatus$.subscribe(status => { this.isLoggedIn = status;
      console.log(`loggen in succesfully, status: ${this.isLoggedIn}`);
     } );
  }

  ngOnInit() {
    // this.isLoggedIn = false;
  }
  logout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
}
