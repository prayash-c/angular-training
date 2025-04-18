import { Component, OnInit } from '@angular/core';
import { UserinfoService } from '../userinfo.service';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { userinfo } from 'src/app/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private userAuthService: UserinfoService,
    private router: Router,
    private apiService: ApiService
  ) {}

  userInfo: userinfo = {
    aboutMe: '',
    contact: '',
    email: '',
    id: 0,
    name: '',
    profilePicUrl: '',
  };

  name = '';
  email = '';
  phone = '';

  ngOnInit(): void {
    sessionStorage.clear();
    this.apiService.getUserDetails().subscribe({
      next: (res: any) => {
        this.userInfo.id = res.id;
        this.userInfo.name = res.name;
        this.userInfo.email = res.email;
        this.userInfo.contact = res.contact;
        console.log('user details', res);

        this.name = this.userInfo.name;
        this.email = this.userInfo.email;
        this.phone = this.userInfo.contact;
      },
      error: (error: any) => {
        console.log('error getting user details', error);
      },
    });
  }

  edit() {
    sessionStorage.clear();
    sessionStorage.setItem('name', this.userInfo.name);
    sessionStorage.setItem('email', this.userInfo.email);
    sessionStorage.setItem('phone', this.userInfo.contact);
    sessionStorage.setItem('id', String(this.userInfo.id));
    this.router.navigate(['edit']);
  }
}
