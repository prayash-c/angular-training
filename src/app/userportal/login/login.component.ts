import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserinfoService } from '../../services/userinfo.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  ngOnInit() {
    sessionStorage.clear();
  }

  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userInfoService: UserinfoService,
    private router: Router,
    private apiservice: ApiService,
    private loaderService: LoaderService
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    this.submitted = true;
    this.loaderService.setLoadingState(true);
    if (this.loginForm.valid) {
      const email = String(this.loginForm.get('email')?.value);
      // check on api
      this.apiservice.emailOtp(email).subscribe({
        next: (res: any) => {
          this.loaderService.setLoadingState(false);
          if (res) {
            this.userInfoService.setEmail(email);
            sessionStorage.setItem('otpSession', 'otplogin');
            this.router.navigate(['otplogin']);
          }
        },
        error: (err) => {
          this.loaderService.setLoadingState(false);
          if (err?.status == 500) {
            this.userInfoService.setEmail(email);
            sessionStorage.setItem('signupSession', 'signup');
            this.router.navigate(['signup']);
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
