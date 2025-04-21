import { Component, OnInit } from '@angular/core';
import { UserinfoService } from '../userinfo.service';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { userinfo } from 'src/app/api';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private apiService: ApiService,
    public loader: LoaderService
  ) {}

  loadingState: boolean = true;

  userInfo: userinfo = {
    aboutMe: '',
    contact: '',
    email: '',
    id: 0,
    name: '',
    profilePicUrl: null,
  };

  ngOnInit(): void {
    sessionStorage.clear();
    this.loader.loadingEvent.subscribe({
      next: (res: boolean) => {
        this.loadingState = res;
      },
    });
    this.fetchUserDetails();
  }

  fetchUserDetails() {
    this.loader.setLoadingState(true);

    this.apiService.getUserDetails().subscribe({
      next: (res: any) => {
        this.userInfo.id = res.id;
        this.userInfo.name = res.name;
        this.userInfo.email = res.email;
        this.userInfo.contact = res.contact;
        this.userInfo.profilePicUrl = res.profilePictureUrl;

        console.log('user details', res);

        this.loader.setLoadingState(false);
      },
      error: (err: any) => {
        if (err.status === 401) {
          console.log('Token Expired!');
        }
        console.log('error getting user details', err);
      },
    });
  }

  edit() {
    sessionStorage.clear();
    sessionStorage.setItem('name', this.userInfo.name);
    sessionStorage.setItem('email', this.userInfo.email);
    sessionStorage.setItem('phone', this.userInfo.contact);
    sessionStorage.setItem('id', String(this.userInfo.id));
    sessionStorage.setItem('profilePicUrl', this.userInfo.profilePicUrl ?? '');
    this.router.navigate(['edit']);
  }
}
