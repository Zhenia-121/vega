import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'account', loadChildren: './account/account.module#AccountModule'},
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/vehicles/list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}


  // { path: 'account', loadChildren: 'app/account/module#AccountModule' },
  // { path: 'vehicles', loadChildren: 'app/vehicles/module#VehiclesModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
