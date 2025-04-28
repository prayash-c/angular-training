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
import { MeetingComponent } from './meeting/meeting.component';
import { RoomListComponent } from './meeting/room-list/room-list.component';
import { RoomReservationComponent } from './meeting/room-reservation/room-reservation.component';
import { RoomOrderSummaryComponent } from './meeting/room-order-summary/room-order-summary.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    HomeComponent,
    OtploginComponent,
    EditProfileComponent,
    MeetingComponent,
    RoomListComponent,
    RoomReservationComponent,
    RoomOrderSummaryComponent,
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
