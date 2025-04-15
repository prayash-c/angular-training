import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserinfoService } from '../userinfo.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  ngOnDestory() {}

  submitted: boolean = false;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private emailService: UserinfoService,
    private router: Router,
    private apiservice: ApiService
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.loginForm.get('email')?.valid) {
      const email = String(this.loginForm.get('email')?.value);
      // check on api
      this.apiservice.emailOtp(email).subscribe({
        next: (res: any) => {
          this.loading = false;
          if (res) {
            this.emailService.setEmail(email);
            localStorage.setItem('email', email);
            this.router.navigate(['otplogin'], { replaceUrl: true });
          }
        },
        error: (err) => {
          this.loading = false;
          if (err?.status == 500) {
            this.emailService.setEmail(email);
            localStorage.setItem('email', email);
            this.router.navigate(['signup'], { replaceUrl: true });
          } else {
            console.log('Error while logging in, please try again later!');
          }
          console.log(err);
        },
      });
    }

    if (this.loginForm.invalid) {
      console.log('invalid input');
    }
  }
}
