import { Component, OnInit } from '@angular/core';
import { UserinfoService } from '../../services/userinfo.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { userinfo } from 'src/app/models/api';
import { LoaderService } from 'src/app/loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { CommonToastr } from 'src/app/toastr/common.toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private apiService: ApiService,
    public loaderService: LoaderService,
    private commonToastr: CommonToastr
  ) {}

  loadingState: boolean = true;

  getLoading() {
    this.loaderService.loadingEvent.subscribe({
      next: (res: boolean) => {
        this.loadingState = res;
      },
    });
  }

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
    this.commonToastr.toastrSuccess('logged in successfully!');
    this.fetchUserDetails();
    this.getLoading();
  }

  fetchUserDetails() {
    this.loaderService.setLoadingState(true);

    this.apiService.getUserDetails().subscribe({
      next: (res: any) => {
        this.userInfo.id = res.id;
        this.userInfo.name = res.name;
        this.userInfo.email = res.email;
        this.userInfo.contact = res.contact;
        this.userInfo.profilePicUrl = res.profilePictureUrl;

        this.loaderService.setLoadingState(false);
      },
      error: (err: any) => {
        this.loaderService.setLoadingState(false);
        if (err.status === 401) {
          console.log('Token Expired!');
        }
        console.log('error getting user details', err);
      },
    });
  }

  edit() {
    this.router.navigate(['edit']);
  }

  meeting() {
    this.router.navigate(['meeting']);
  }
}
