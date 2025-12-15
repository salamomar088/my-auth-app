import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  private readonly STORAGE_KEY = 'auth_token';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem(this.STORAGE_KEY);

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req);
  }
  setToken(token: string): void {
    sessionStorage.setItem(this.STORAGE_KEY, token);
  }

  clearToken(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem(this.STORAGE_KEY);
  }
}
