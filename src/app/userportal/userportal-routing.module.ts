import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { OtploginComponent } from './otplogin/otplogin.component';
import { authGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
    data: {
      route: 'login',
    },
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [authGuard],
    data: {
      route: 'signup',
    },
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    data: {
      route: 'home',
    },
  },
  {
    path: 'otplogin',
    component: OtploginComponent,
    canActivate: [authGuard],
    data: {
      route: 'otplogin',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserportalRoutingModule {}
