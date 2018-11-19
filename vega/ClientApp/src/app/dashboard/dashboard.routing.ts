import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { RootComponent } from './root/root.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  {
      path: 'dashboard',
      component: RootComponent, canActivate: [AuthGuard],

      children: [
       { path: 'home',  component: HomeComponent },
       { path: 'settings',  component: SettingsComponent },
       { path: '', redirectTo: './home' },
      ]
    }
]);
