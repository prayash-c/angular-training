import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserportalRoutingModule } from './userportal-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OtploginComponent } from './otplogin/otplogin.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    HomeComponent,
    OtploginComponent
  ],
  imports: [
    CommonModule,
    UserportalRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class UserportalModule { }
