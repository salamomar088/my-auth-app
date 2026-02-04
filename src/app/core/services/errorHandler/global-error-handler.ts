import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertService } from '../alert/alert';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: unknown): void {
    const alertService = this.injector.get(AlertService);

    let message = 'An unexpected error occurred';

    if (error instanceof HttpErrorResponse) {
      message = error.error?.message || `Request failed with status ${error.status}`;
    } else if (error instanceof Error) {
      message = error.message;
    }

    alertService.error(message);
    console.error('Global Error:', error);
  }
}
