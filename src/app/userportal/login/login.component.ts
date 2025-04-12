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
  email: string = '';

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
    if (this.loginForm.valid) {
      this.email = this.loginForm.get('email')?.value || '';
      // check on api
      // this.apiservice.emailOtp(this.email).subscribe(
      //   (res) => {
      //     this.loading = false;
      //     if(res){
      //       this.router.navigate(['otplogin']);
      //     }
      //   },
      //   (err) => {
      //     this.loading = false;
      //     if(err?.status == 500){
      //     this.router.navigate(['signup']);
      //     } else{
      //     console.log("Error while logging in, please try again later!")
      //     }
      //     console.log('error');
      //   }
      // );

      const checkEmail = new Observable((emailObv) => {
        this.emailService.emailExistObsv.subscribe((val) => {
          if (val) {
            emailObv.next(true);
          } else {
            emailObv.next(false);
          }
        });
      });

      this.loading = true;
      checkEmail.subscribe({
        next: (val: any) => {
          if (val) {
            this.emailService.setEmail(this.email);
            this.router.navigate(['signup']);
          } else {
            this.router.navigate(['home']);
          }
        },
      });
    }

    if (this.loginForm.invalid) {
      console.log('invalid input');
    }
  }
}
