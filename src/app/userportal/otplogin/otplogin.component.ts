import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { UserinfoService } from '../../services/userinfo.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LoaderService } from 'src/app/loader/loader.service';

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
    private apiservice: ApiService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.userInfoService.checkReload();
    // this.resendOtp();
  }

  submitted = false;
  email: string = this.userInfoService.getEmail;
  otp: string = '';
  otpArray = new Array(6).fill('');
  timeLeft: number = 0;
  interval: any = null;
  incorrectOtp: boolean = false;

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
    this.loaderService.setLoadingState(true);
    this.getOtp();
    this.validate(this.email, this.otp);
  }

  moveToNext(event: any, index: number) {
    const input = event.target;
    const value = input?.value; // gives triggered key number
    if (
      value.length === 1 &&
      index < this.otpArray.length - 1 &&
      !isNaN(value)
    ) {
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
          localStorage.setItem('refreshToken', res.body.refreshToken);
          localStorage.setItem('accessToken', res.body.accessToken);
          localStorage.setItem('email', email);
          this.loaderService.setLoadingState(false);

          this.router.navigate(['home'], { replaceUrl: true });
        }
      },
      error: (err: any) => {
        this.loaderService.setLoadingState(false);
        console.log(err);
        if (err?.error?.errorCode == 'APP_ERROR_1018' && err?.status == 500) {
          this.incorrectOtp = true;
          console.log('Invalid Otp');
        } else {
          console.log('Something went wrong', err);
        }
      },
    });
  }
}
