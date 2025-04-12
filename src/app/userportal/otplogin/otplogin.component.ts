import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-otplogin',
  templateUrl: './otplogin.component.html',
  styleUrls: ['./otplogin.component.scss'],
})
export class OtploginComponent {
  constructor(private fb: FormBuilder) {}

  submitted = false;
  email = 'john@email.com';
  otpArray = new Array(6);
  timerFlag: boolean = false;
  timeLeft: number = 0;
  interval: any = null;

  otpForm = this.fb.group({
    otp: ['', []],
  });

  onSubmit() {}

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
}
