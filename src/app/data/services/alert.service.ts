import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private router: Router) {}

  tryToRegister(msg: string, tpy: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });

      Toast.fire({
        icon: tpy,
        title: msg
      });
    });
  }

  errorDialog(text: string) {
    Swal.fire({
      icon: 'error',
      title: text
    });
  }

}
