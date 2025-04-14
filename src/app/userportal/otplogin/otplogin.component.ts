import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { UserinfoService } from '../userinfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otplogin',
  templateUrl: './otplogin.component.html',
  styleUrls: ['./otplogin.component.scss'],
})
export class OtploginComponent {
  constructor(
    private fb: FormBuilder,
    private userInfoService: UserinfoService,
    private router: Router
  ) {}

  submitted = false;
  email = this.userInfoService.getEmail;
  otpArray = new Array(6).fill('');
  timerFlag: boolean = false;
  timeLeft: number = 0;
  interval: any = null;

  otpForm = this.fb.group({
    otp: this.fb.array(
      this.otpArray.map((e) =>
        this.fb.control('', {
          validators: [Validators.required, Validators.maxLength(1)],
        })
      )
    ),
  });

  onSubmit() {
    this.otpForm.get('otp') as FormArray;
    const otpAll = (this.otpForm.get('otp') as FormArray).value;
    console.log(otpAll);
    const otpToString = otpAll.join('');
    console.log(Number(otpToString));
    localStorage.setItem('email', this.email);
    this.router.navigate(['home']);
  }

  timer() {
    this.timerFlag = true;
    this.timeLeft = 5;
    this.startTimer();
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

  moveToNext(event: any, index: number) {
    const input = event.target;
    const value = input.value; // gives triggered key number
    if (value.length === 1 && index < this.otpArray.length - 1) {
      input.nextElementSibling?.focus(); // event.target.nextElementSibling
    }
  }

  moveToPrev(event: any, index: number) {
    if (index > 0 && !(event.target as HTMLInputElement).value) {
      const prev = (event.target as HTMLElement)
        .previousElementSibling as HTMLInputElement;
      prev?.focus();
    }
  }
}
