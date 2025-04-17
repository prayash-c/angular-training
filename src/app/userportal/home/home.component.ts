import { Component, OnInit } from '@angular/core';
import { UserinfoService } from '../userinfo.service';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private userAuthService: UserinfoService,
    private router: Router,
    private apiService: ApiService
  ) {}

  name: string = '';
  email: string = '';
  phone: string = '';
  id: string = '';
  profilePicUrl: string = '';
  aboutMe: string = '';

  ngOnInit(): void {
    sessionStorage.clear();
    this.apiService.getUserDetails().subscribe({
      next: (res: any) => {
        this.name = res.name;
        this.email = res.email;
        this.phone = res.contact;
        console.log('user details', res);
      },
      error: (error: any) => {
        console.log('error getting user details', error);
      },
    });
  }

  logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.clear();
    this.router.navigate(['login'], { replaceUrl: true });
  }

  update() {
    this.apiService
      .updateUserDetails(
        (this.aboutMe = ''),
        this.phone,
        this.email,
        (this.id = ''),
        this.name,
        (this.profilePicUrl = '')
      )
      .subscribe({
        next: (res: any) => {
          if (res) {
            console.log('profile updated!');
          }
        },
        error: (err: any) => {
          console.log('error', err);
        },
      });
  }
}
