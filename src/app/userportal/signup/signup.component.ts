import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserinfoService } from '../userinfo.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(private fb: FormBuilder, private emailService: UserinfoService) {}

  customercare: string = 'customercare@stayeasyonline.com';

  email: string = '';
  termsAndConditionCheck: boolean = false;
  onPopupClick: boolean = false;

  ngOnInit(): void {
    this.emailService.emittedEmail().subscribe((res) => {
      this.email = res;
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
    phone: ['', [Validators.required]],
    tc: [false, [Validators.requiredTrue]],
  });

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.valid) {
      console.log(this.emailService.getEmail);
      console.log('Signed in!');
    }
  }

  onTermsAndConditionToggle() {
    this.termsAndConditionCheck = !this.termsAndConditionCheck;
  }

  termsAndConditionPopup() {
    this.onPopupClick = !this.onPopupClick;
  }
}
