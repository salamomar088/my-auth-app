import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private lastMessage: string | null = null;
  private lastShownAt = 0;
  private DUPLICATE_WINDOW = 2000; // ms

  private show(
    icon: SweetAlertIcon,
    title: string,
    message: string,
    timer: number,
    showConfirmButton = false
  ): void {
    const now = Date.now();

    if (this.lastMessage === message && now - this.lastShownAt < this.DUPLICATE_WINDOW) {
      return;
    }

    this.lastMessage = message;
    this.lastShownAt = now;

    Swal.fire({
      icon,
      title,
      text: message,
      timer,
      showConfirmButton,
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: true,
    });
  }

  success(message: string): void {
    this.show('success', 'Success', message, 2200, false);
  }

  info(message: string): void {
    this.show('info', 'Information', message, 2000, false);
  }

  warning(message: string): void {
    this.show('warning', 'Warning', message, 2600, true);
  }

  error(message: string): void {
    this.show('error', 'Error', message, 3500, true);
  }
}
