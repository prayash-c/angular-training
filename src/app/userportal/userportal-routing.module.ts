import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { OtploginComponent } from './otplogin/otplogin.component';
import { authGuard } from '../auth/auth.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MeetingComponent } from './meeting/meeting.component';
import { RoomListComponent } from './meeting/room-list/room-list.component';
import { RoomReservationComponent } from './meeting/room-reservation/room-reservation.component';
import { RoomOrderSummaryComponent } from './meeting/room-order-summary/room-order-summary.component';

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
  {
    path: 'edit',
    component: EditProfileComponent,
    canActivate: [authGuard],
    data: {
      route: 'edit',
    },
  },
  {
    path: 'meeting',
    component: MeetingComponent,
    canActivate: [authGuard],
    data: {
      route: 'meeting',
    },
    children: [
      { path: '', component: RoomListComponent },
      { path: 'room-reservation', component: RoomReservationComponent },
      { path: 'room-order-summary', component: RoomOrderSummaryComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserportalRoutingModule {}
