import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CommonToastr {
  constructor(private toastr: ToastrService) {}

  toastrSuccess(message: string) {
    this.toastr.success(message, '', {
      timeOut: 3000,
      positionClass: 'toast-top-left',
      tapToDismiss: true,
      easing: 'ease-in',
      easeTime: 300,
    });
  }

  toastrError(message: string) {
    this.toastr.error(message, '', {
      timeOut: 3000,
      positionClass: 'toast-top-left',
      tapToDismiss: true,
      easing: 'ease-in',
      easeTime: 300,
    });
  }
}
