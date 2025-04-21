import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { userinfo } from 'src/app/api';
import { Route, Router } from '@angular/router';
import { Binary } from '@angular/compiler';

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
  change: number = 1;
  checkIcon: boolean = false;
  picFilename: string = '';
  picFileSize: number = 0;
  picFileDim: string = '';
  picFileType: string = '';

  ngOnInit(): void {
    this.updateProfileForm.patchValue({
      fullname: sessionStorage.getItem('name'),
      email: sessionStorage.getItem('email'),
      phone: sessionStorage.getItem('phone')?.replace('+91', ''),
    });
    this.userInfo.id = Number(sessionStorage.getItem('id'));
    this.userInfo.profilePicUrl = sessionStorage.getItem('profilePicUrl');
  }

  onProfileUpload(event: any) {
    console.log(event.target.files, event.target.files[0]);
    if (event.target.files[0]) {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);

      if (
        formData &&
        event.target.files[0].size < 20000 &&
        (event.target.files[0].type === 'image/jpeg' || 'image/png')
      ) {
        this.apiService.uploadFile(formData).subscribe({
          next: (res: any) => {
            this.userInfo.profilePicUrl = res.url;
          },
          error: (err: any) => {
            console.log('error uploading file', err);
          },
        });

        this.picFilename = event.target.files[0].name.replace('.', '');
        this.picFileSize = event.target.files[0].size; // should be < 20000
        this.picFileType = event.target.files[0].type; // image/jpeg or image/png
        this.change = 1;
        this.checkIcon = true;
      } else {
        this.picFilename = '';
        this.picFileSize = 0;
        this.picFileType = '';
        this.change = 2;
        this.checkIcon = false;
      }
    }
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
    // this.userInfo.profilePicUrl = this.profilePic;

    this.apiService
      .updateUserDetails(
        this.userInfo.aboutMe,
        this.userInfo.contact,
        this.userInfo.email,
        this.userInfo.id,
        this.userInfo.name,
        String(this.userInfo.profilePicUrl)
      )
      .subscribe({
        next: (res: any) => {
          if (res) {
            console.log('profile updated!');
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

  navigateHome() {
    this.router.navigate(['home']);
  }

  logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['login'], { replaceUrl: true });
  }
}
