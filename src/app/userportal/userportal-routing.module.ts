import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { OtploginComponent } from './otplogin/otplogin.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "home", component: HomeComponent},
  {path: "otplogin", component: OtploginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserportalRoutingModule { }
