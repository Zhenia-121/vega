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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { VehiclesListComponent } from './components/vehicles-list/vehicles-list.component';
import { PaginationComponent } from './components/shared/pagination.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ErrorInterceptor } from './components/helpers/error.interceptor';
import { JwtInterceptor } from './components/helpers/jwt.interceptor';
import { AuthGuard } from './guards/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    CreateVehicleComponent,
    HomeComponent,
    VehiclesListComponent,
    PaginationComponent,
    ViewVehicleComponent,
    LoginFormComponent
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
      {path: 'vehicle/new', component: CreateVehicleComponent, canActivate: [AuthGuard]},
      {path: 'vehicle/edit/:id', component: CreateVehicleComponent, canActivate: [AuthGuard]},
      {path: 'vehicle/:id', component: ViewVehicleComponent},
      {path: 'vehicles', component: VehiclesListComponent},
      {path: 'login', component: LoginFormComponent},
      {path: '**', redirectTo: 'vehicles'}
//      {path: 'vehicle/:id', component: EditVehicleComponent}

    ])
  ],
  providers: [
    DataService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    PhotoService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
