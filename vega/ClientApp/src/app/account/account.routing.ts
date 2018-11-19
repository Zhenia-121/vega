import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RootComponent } from './root/root.component';


export const routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: RootComponent,
    children: [
      { path: 'register', component: RegistrationFormComponent},
      { path: 'login', component: LoginFormComponent}
  ]
}
]);
