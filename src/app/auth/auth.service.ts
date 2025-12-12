import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../core/interceptor/token.interceptor';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  register(data: FormData) {
    return this.http.post(`${this.api}/auth/register`, data);
  }

  login(payload: { email: string; password: string }) {
    return this.http.post<any>(`${this.api}/auth/login`, payload).pipe(
      tap((res) => {
        this.tokenService.setToken(res.token);
      })
    );
  }

  getProfile() {
    return this.http.get(`${this.api}/users/me`);
  }

  getAllUsers() {
    return this.http.get(`${this.api}/users`);
  }

  getToken() {
    return this.tokenService.getToken();
  }

  isAuthenticated() {
    return this.tokenService.isAuthenticated();
  }

  logout() {
    this.tokenService.clearToken();
  }
}
