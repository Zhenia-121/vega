import { PaginationComponent } from './../shared/utils/pagination.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RootComponent } from './root/root.component';
import { FormsModule } from '@angular/forms';
import { routing } from './vehicles.routing';
import { CreateVehicleComponent } from './create-vehicle/create-vehicle.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { DataService } from './services/data.service';
import { AuthGuard } from '../guards/auth.guard';
import { PhotoService } from './services/photo.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    RootComponent,
    CreateVehicleComponent,
    VehiclesListComponent,
    ViewVehicleComponent,
    PaginationComponent
  ],
  providers: [
    DataService,
    PhotoService
  ]
})
export class VehiclesModule { }
