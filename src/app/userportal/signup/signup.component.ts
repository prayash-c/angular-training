import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserinfoService } from '../userinfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(
    private fb: FormBuilder,
    private userInfoService: UserinfoService,
    private router: Router
  ) {}

  customercare: string = 'customercare@stayeasyonline.com';

  email: string = '';
  termsAndConditionCheck: boolean = false;
  onPopupClick: boolean = false;

  ngOnInit(): void {
    this.userInfoService.emittedEmail.subscribe({
      next: (res: any) => {
        this.email = res;
      },
    });
    this.signupForm.patchValue({
      email: this.email,
    });
  }

  submitted = false;

  signupForm = this.fb.group({
    fullname: [
      '',
      [Validators.required, Validators.maxLength(25), Validators.minLength(3)],
    ],
    email: [{ value: '', disabled: true }],
    countryCode: [{ value: '+91', disabled: true }],
    phone: ['', [Validators.pattern(/^([7-9][0-9]{9})$/)]],
  });

  onSubmit() {
    this.submitted = true;
    const name = String(this.signupForm.get('fullname')?.value);
    const phone = this.signupForm.get('phone')?.value || null;
    const countryCode = this.signupForm.get('countryCode')?.value || null;
    if (this.signupForm.valid) {
      console.log(this.userInfoService.getEmail);
      console.log(name, 'Signed in!');
      console.log(countryCode, phone);
      // this.userInfoService.userdata.fullname = name;
      // this.userInfoService.userdata.email = this.email;
      localStorage.setItem('name', name);
      localStorage.setItem('email', this.email);
      this.router.navigate(['home']);
    }
  }

  onTermsAndConditionToggle() {
    this.termsAndConditionCheck = !this.termsAndConditionCheck;
  }

  termsAndConditionPopup() {
    this.onPopupClick = !this.onPopupClick;
  }
}
