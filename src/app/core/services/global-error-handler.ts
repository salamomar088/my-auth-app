import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Alert } from './alert';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const alertService = this.injector.get(Alert);

    let message = 'An unexpected error occurred';

    if (error instanceof HttpErrorResponse) {
      message = error.error?.message || error.message || 'Server error occurred';
    } else if (error instanceof Error) {
      message = error.message;
    }

    alertService.error(message);
    console.error('Global Error:', error);
  }
}
