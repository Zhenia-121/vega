import { AppErrorHandler } from './common/app-error-handler';
import { DataService } from './services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateVehicleComponent } from './components/create-vehicle/create-vehicle.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { VehiclesListComponent } from './components/vehicles-list/vehicles-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateVehicleComponent,
    HomeComponent,
    VehiclesListComponent
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
      {path: 'vehicle/:id', component: CreateVehicleComponent},
      {path: 'vehicles', component: VehiclesListComponent},
      {path: '**', redirectTo: 'vehicles'}
//      {path: 'vehicle/:id', component: EditVehicleComponent}

    ])
  ],
  providers: [
    DataService,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
