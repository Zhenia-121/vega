import { Account } from './../../shared/models/account';
import { ConfigService } from './../../shared/utils/config.service';
import { tokenName } from '@angular/compiler';
import { AccountService } from './../../shared/services/account.service';
import { Component, OnInit } from '@angular/core';
import { HomeDetails } from '../models/HomeInterface';
import { DashboardService } from '../services/dashboard.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id: string;
  homeDetails: Account;
  tokenName: string;

  constructor(private accountService: AccountService, configService: ConfigService) {
    this.tokenName = configService.getTokenName();
    const helper = new JwtHelperService();
    if (localStorage.getItem(this.tokenName)) {
      const userInfo = helper.decodeToken(JSON.parse(localStorage.getItem(this.tokenName)).access_token);
      this.id = userInfo.id;
    }  else { this.id = '0'; }

  }

  ngOnInit() {

    // this.dashboardService.getHomeDetails()
    // .subscribe((homeDetails: HomeDetails) => {
    //   this.homeDetails = homeDetails;
    // },
    // error => {
    //   // this.notificationService.printErrorMessage(error);
    // });

    this.accountService.getById(this.id).subscribe(user => {
      console.log(user);
      this.homeDetails =  user;
    });
  }
}
