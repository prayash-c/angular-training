import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { UserinfoService } from '../userinfo.service';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-otplogin',
  templateUrl: './otplogin.component.html',
  styleUrls: ['./otplogin.component.scss'],
})
export class OtploginComponent {
  constructor(
    private fb: FormBuilder,
    private userInfoService: UserinfoService,
    private router: Router,
    private apiservice: ApiService
  ) {}

  ngOnInit(): void {
    this.resendOtp();
  }

  submitted = false;
  email = localStorage.getItem('email') || this.userInfoService.getEmail;
  otp: string = '';
  otpArray = new Array(6).fill('');
  timeLeft: number = 0;
  interval: any = null;
  incorrectOtp: boolean = false;
  loading: boolean = false;

  otpForm = this.fb.group({
    otp: this.fb.array(
      this.otpArray.map((e) =>
        this.fb.control('', {
          validators: [Validators.required, Validators.maxLength(1)],
        })
      )
    ),
  });

  resendOtp() {
    this.timeLeft = 10;
    this.startTimer();
    this.apiservice.emailOtp(this.email).subscribe({
      next: (res: any) => {
        if (res) {
          console.log('OTP sent successfully!');
        }
      },
      error: (err: any) => {
        if (err?.status == 500) {
          console.log('Failed to send OTP.');
        }
      },
    });
  }

  startTimer() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.timeLeft = 5;
        }
        if (this.timeLeft == 0) {
          clearInterval(this.interval);
          this.interval = null;
        }
      }, 1000);
    }
  }

  getOtp() {
    this.otpForm.get('otp') as FormArray;
    const otpArray = (this.otpForm.get('otp') as FormArray).value;
    this.otp = otpArray.join('');
  }

  onSubmit() {
    this.loading = true;
    this.getOtp();
    this.validate(this.email, this.otp);
  }

  moveToNext(event: any, index: number) {
    const input = event.target;
    const value = input.value; // gives triggered key number
    if (value.length === 1 && index < this.otpArray.length - 1) {
      input.nextElementSibling?.focus(); // event.target.nextElementSibling
    }
    if (!event.target.nextElementSibling) {
      this.onSubmit();
      if (value) {
        // check for value in current input box
        input.value = ''; // replace with empty
        let prev = input.previousElementSibling as HTMLInputElement;
        while (prev) {
          // traverse and clear all sibling inputs
          prev.value = '';
          prev = prev.previousElementSibling as HTMLInputElement;
          prev?.focus();
        }
      }
    }
  }

  moveToPrev(event: any, index: number) {
    if (index > 0 && !(event.target as HTMLInputElement).value) {
      const prev = (event.target as HTMLElement)
        .previousElementSibling as HTMLInputElement;
      prev?.focus();
    }
  }

  validate(email: string, otp: string) {
    this.apiservice.validateOtp(email, otp).subscribe({
      next: (res: any) => {
        if (res) {
          this.loading = false;
          this.router.navigate(['home'], { replaceUrl: true });
        }
      },
      error: (err: any) => {
        this.loading = false;
        if (err?.status == 500) {
          if (err?.errorCode == 'APP_ERROR_1018') {
            // not working!!
          }
          this.incorrectOtp = true;
          console.log('Invalid Otp');
          // console.log('Something went wrong', err);
        }
      },
    });
  }
}
