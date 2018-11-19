import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { RootComponent } from './root/root.component';
import { CreateVehicleComponent } from './create-vehicle/create-vehicle.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';


export const routing: ModuleWithProviders = RouterModule.forChild([
        {path: 'vehicles',
        component: RootComponent,
        children: [
            {path: 'new', component: CreateVehicleComponent, canActivate: [AuthGuard]},
            {path: 'edit/:id', component: CreateVehicleComponent, canActivate: [AuthGuard]},
            {path: 'view/:id', component: ViewVehicleComponent},
            {path: 'list', component: VehiclesListComponent}
          ]}
]);

