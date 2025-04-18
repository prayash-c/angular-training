import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { userinfo } from 'src/app/api';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  updateProfileForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.updateProfileForm = this.fb.group({
      fullname: [
        '',
        [Validators.required], //, Validators.maxLength(25), Validators.minLength(3)
      ],
      email: [{ value: '', disabled: true }],
      countryCode: [{ value: '+91', disabled: true }],
      phone: ['', [Validators.pattern(/^([7-9][0-9]{9})$/)]],
      profilePicUrl: [''],
    });
  }

  userInfo: userinfo = {
    aboutMe: '',
    contact: '',
    email: '',
    id: 0,
    name: '',
    profilePicUrl: '',
  };

  collapse: boolean = true;

  ngOnInit(): void {
    this.updateProfileForm.patchValue({
      fullname: sessionStorage.getItem('name'),
      email: sessionStorage.getItem('email'),
      phone: sessionStorage.getItem('phone')?.replace('+91', ''),
    });
    this.userInfo.id = Number(sessionStorage.getItem('id'));
  }

  onProfileUpload(event: any) {
    console.log(event.target.files);
  }

  onSubmit() {
    this.userInfo.name = String(this.updateProfileForm.get('fullname')?.value);
    this.userInfo.email = String(this.updateProfileForm.get('email')?.value);
    const phone = this.updateProfileForm.get('phone')?.value;
    const countryCode = String(
      this.updateProfileForm.get('countryCode')?.value
    );
    if (phone) {
      this.userInfo.contact = countryCode?.concat(phone);
    }
    this.apiService
      .updateUserDetails(
        this.userInfo.aboutMe,
        this.userInfo.contact,
        this.userInfo.email,
        this.userInfo.id,
        this.userInfo.name,
        this.userInfo.profilePicUrl
      )
      .subscribe({
        next: (res: any) => {
          if (res) {
            console.log('profile updated!');
            this.router.navigate(['home']);
          }
        },
        error: (err: any) => {
          console.log('update failed!');
          console.log('error', err);
          this.router.navigate(['home']);
        },
      });
  }

  moreSettings() {
    this.collapse = !this.collapse;
  }

  logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['login'], { replaceUrl: true });
  }
}
