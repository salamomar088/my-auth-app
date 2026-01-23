import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loadingService/loading';
import { LocalStorageService } from '../services/storage/local-storage';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService, private storage: LocalStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();

    const token = this.storage.getToken();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }

  setToken(token: string): void {
    this.storage.setToken(token);
  }

  clearToken(): void {
    this.storage.removeToken();
  }

  isAuthenticated(): boolean {
    return this.storage.isAuthenticated();
  }
}
