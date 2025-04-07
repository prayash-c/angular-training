import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  width=window.innerWidth/2;
  height=window.innerHeight;
  
  @HostListener('window:resize')
  onResize() {
    this.setImageSize();
  }

  setImageSize() {
    this.width=window.innerWidth/2;
    this.height=window.innerHeight;
  }
  
  
loginForm = new FormGroup({
  email: new FormControl('', Validators.required)
});;

onSubmit(){
  
}
}
