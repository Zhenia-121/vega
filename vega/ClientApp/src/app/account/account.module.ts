import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { routing } from './account.routing';
import { RootComponent } from './root/root.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, routing
  ],
  declarations: [LoginFormComponent, RegistrationFormComponent, RootComponent],
  // providers: [AuthenticationService]
})
export class AccountModule { }
