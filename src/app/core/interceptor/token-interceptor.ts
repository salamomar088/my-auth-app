import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';

import { LoadingService } from '../services/loadingService/loading';
import { LocalStorageService } from '../services/storage/local-storage';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    private storage: LocalStorageService,
    private auth: AuthService,
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.show();

    const token = this.storage.getToken();
    const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

    return next.handle(authReq).pipe(
      catchError((err: unknown) => {
        if (!(err instanceof HttpErrorResponse)) {
          return throwError(() => err);
        }

        const isRefreshCall = req.url.includes('/auth/refresh');
        if (isRefreshCall) {
          this.storage.removeToken();
          return throwError(() => err);
        }

        if (err.status === 401) {
          return this.auth.refreshAccessToken().pipe(
            switchMap((res) => {
              if (res?.token) {
                this.storage.setToken(res.token);

                const retryReq = req.clone({
                  setHeaders: { Authorization: `Bearer ${res.token}` },
                });

                return next.handle(retryReq);
              }

              this.storage.removeToken();
              return throwError(() => err);
            }),
            catchError((refreshErr) => {
              this.storage.removeToken();
              return throwError(() => refreshErr);
            }),
          );
        }

        return throwError(() => err);
      }),
      finalize(() => this.loadingService.hide()),
    );
  }
}
