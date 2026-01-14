import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class Alert {
  info(message: string) {
    Swal.fire({
      icon: 'info',
      title: 'Information',
      text: message,
      timer: 2000,
      showConfirmButton: true,
    });
  }
  success(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      timer: 2500,
      showConfirmButton: false,
    });
  }
  error(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      timer: 3000,
      showConfirmButton: true,
    });
  }
  warning(message: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Warning',
      text: message,
      timer: 2000,
      showConfirmButton: true,
    });
  }
}
