import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserportalRoutingModule } from './userportal-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OtploginComponent } from './otplogin/otplogin.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    HomeComponent,
    OtploginComponent,
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    UserportalRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
})
export class UserportalModule {}
