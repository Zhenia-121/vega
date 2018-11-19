import { AccountService } from './../shared/services/account.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { RootComponent } from './root/root.component';
import { FormsModule } from '@angular/forms';
import { routing } from './dashboard.routing';
import { DashboardService } from './services/dashboard.service';
import { AuthGuard } from '../guards/auth.guard';

@NgModule({
  imports:
  [
    CommonModule,
    FormsModule,
    routing],
  declarations: [RootComponent, HomeComponent, SettingsComponent],
  exports:      [ ],
  providers: [DashboardService],
  // providers: [DashboardService, AuthGuard, AccountService]

})
export class DashboardModule { }
