import { AuthenticationService } from 'src/app/shared/services/auth-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Component } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpModule, BrowserXhr } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AccountModule } from './account/account.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { ConfigService } from './shared/utils/config.service';
import { AppErrorHandler } from './shared/errors-handler/app-error-handler';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AppRoutingModule } from './app.routing';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    PageNotFoundComponent,
  ],
  imports: [
    VehiclesModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    ConfigService,
    AuthenticationService,
    AuthGuard,
    { provide: ErrorHandler, useClass: AppErrorHandler }
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
