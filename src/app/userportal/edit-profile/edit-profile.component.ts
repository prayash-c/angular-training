import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { userinfo } from 'src/app/api';
import { Route, Router } from '@angular/router';
import { LoaderService } from 'src/app/loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { CommonToastr } from 'src/app/toastr/common.toastr';
import { UserinfoService } from '../userinfo.service';

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
    private router: Router,
    private loaderService: LoaderService,
    private commonToastr: CommonToastr
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

  // loadingState: boolean = true;

  // getLoading() {
  //   this.loaderService.loadingEvent.subscribe({
  //     next: (res: boolean) => {
  //       this.loadingState = res;
  //     },
  //   });
  // }

  collapse: boolean = true;
  change: number = 1;
  checkIcon: boolean = false;
  picFilename: string = '';
  picFileSize: number = 0;
  picFileDim: string = '';
  picFileType: string = '';

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  fetchUserDetails() {
    this.loaderService.setLoadingState(true);

    this.apiService.getUserDetails().subscribe({
      next: (res: any) => {
        this.userInfo.id = res.id;
        this.userInfo.profilePicUrl = res.profilePictureUrl;
        this.updateProfileForm.patchValue({
          fullname: res.name,
          email: res.email,
          phone: res.contact?.replace('+91', ''),
        });

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

  onProfileUpload(event: any) {
    console.log(event.target.files, event.target.files[0]);
    if (event.target.files[0]) {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);

      this.checkImgDimension(event.target.files[0]).then((ImgDimOk) => {
        if (
          ImgDimOk &&
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
          if (!ImgDimOk) {
            this.commonToastr.toastrError('Invalid Image Dimensions');
          } else if (event.target.files[0].size > 20000) {
            this.commonToastr.toastrError('Image size is too large');
          } else {
            this.commonToastr.toastrError('Invalid Image Format');
          }
          this.picFilename = '';
          this.picFileSize = 0;
          this.picFileType = '';
          this.change = 2;
          this.checkIcon = false;
        }
      });
    }
  }

  checkImgDimension(file: File): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e: any) => {
        img.src = e.target.result;

        img.onload = () => {
          const width = img.width;
          const height = img.height;

          if (width <= 100 && height <= 100) {
            resolve(true);
          } else {
            resolve(false);
          }
        };
      };

      reader.readAsDataURL(file);
    });
  }

  onSubmit() {
    this.loaderService.setLoadingState(true);
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
            this.loaderService.setLoadingState(false);
            this.commonToastr.toastrSuccess('User updated successfully');
            this.fetchUserDetails();
            console.log('profile updated!');
          }
        },
        error: (err: any) => {
          this.loaderService.setLoadingState(false);
          this.commonToastr.toastrError('Update Failed!');
          console.log('update failed!');
          console.log('error', err);
          this.navigateHome();
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
