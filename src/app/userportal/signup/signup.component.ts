import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserinfoService } from '../../services/userinfo.service';
import { LoadChildren, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(
    private fb: FormBuilder,
    private userInfoService: UserinfoService,
    private router: Router,
    private apiService: ApiService,
    private loaderService: LoaderService
  ) {}

  customercare: string = 'customercare@stayeasyonline.com';

  email: string = '';
  contactNumber: string = '';
  focusOut = false;
  termsAndConditionCheck: boolean = false;
  onPopupClick: boolean = false;

  ngOnInit(): void {
    this.userInfoService.checkReload();

    this.email = this.userInfoService.getEmail;
    this.signupForm.patchValue({
      email: this.email,
    });
  }

  submitted = false;

  signupForm = this.fb.group({
    fullname: [
      '',
      [Validators.required], //, Validators.maxLength(25), Validators.minLength(3)
    ],
    email: [{ value: '', disabled: true }],
    countryCode: [{ value: '+91', disabled: true }],
    phone: ['', [Validators.pattern(/^([7-9][0-9]{9})$/)]],
    terms: [false, [Validators.requiredTrue]],
  });

  onSubmit() {
    this.loaderService.setLoadingState(true);
    this.submitted = true;
    const fullName = String(this.signupForm.get('fullname')?.value);
    const phone = this.signupForm.get('phone')?.value;
    const countryCode = String(this.signupForm.get('countryCode')?.value);
    const hotelId: string = '';
    if (phone) {
      this.contactNumber = countryCode?.concat(phone);
    }

    if (this.signupForm.valid) {
      this.apiService
        .registerOtp(this.contactNumber, this.email, fullName, hotelId)
        .subscribe({
          next: (res: any) => {
            if (res) {
              this.loaderService.setLoadingState(false);
              console.log('Registration successful!');
              // localStorage.setItem('name', fullName);
              // localStorage.setItem('number', contactNumber);
              // localStorage.setItem('email', this.email);
              sessionStorage.clear();
              sessionStorage.setItem('otpSession', 'otplogin');
              this.router.navigate(['otplogin']);
            }
          },
          error: (err: any) => {
            if (err?.status == 500) {
              this.loaderService.setLoadingState(false);
              console.log('error occures', err);
            }
          },
        });
      // this.userInfoService.userdata.fullname = name;
      // this.userInfoService.userdata.email = this.email;
    }

    if (this.signupForm.invalid) {
      this.loaderService.setLoadingState(false);
      return;
    }
  }

  boxFocus() {
    this.focusOut = true;
  }

  onTermsAndConditionToggle() {
    this.termsAndConditionCheck = !this.termsAndConditionCheck;
    this.signupForm.patchValue({
      terms: this.termsAndConditionCheck,
    });
  }

  termsAndConditionPopup() {
    this.onPopupClick = !this.onPopupClick;
  }
}
