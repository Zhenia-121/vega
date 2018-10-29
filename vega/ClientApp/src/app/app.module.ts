import { PhotoService } from './services/photo.service';
import { AppErrorHandler } from './common/app-error-handler';
import { DataService } from './services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateVehicleComponent } from './components/create-vehicle/create-vehicle.component';
import { HttpModule, BrowserXhr } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { VehiclesListComponent } from './components/vehicles-list/vehicles-list.component';
import { PaginationComponent } from './components/shared/pagination.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';
import { VehiclesPhotosComponent } from './components/vehicles-photos/vehicles-photos.component';
import { BasicsVehicleComponent } from './components/basics-vehicle/basics-vehicle.component';
@NgModule({
  declarations: [
    AppComponent,
    CreateVehicleComponent,
    HomeComponent,
    VehiclesListComponent,
    PaginationComponent,
    ViewVehicleComponent,
    VehiclesPhotosComponent,
    BasicsVehicleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path: '', redirectTo: 'vehicles', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'vehicle/new', component: CreateVehicleComponent},
      {path: 'vehicle/edit/:id', component: CreateVehicleComponent},
      {path: 'vehicle/:id', component: ViewVehicleComponent},
      {path: 'vehicles', component: VehiclesListComponent},
      {path: '**', redirectTo: 'vehicles'}
//      {path: 'vehicle/:id', component: EditVehicleComponent}

    ])
  ],
  providers: [
    DataService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    PhotoService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
