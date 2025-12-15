import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = 'http://localhost:8000/api/v1';
  private readonly STORAGE_KEY = 'auth_token';

  constructor(private http: HttpClient) {}

  register(data: FormData) {
    return this.http.post(`${this.api}/auth/register`, data);
  }

  login(credentials: any) {
    return this.http.post<any>(`${this.api}/auth/login`, credentials).pipe(
      tap((res) => {
        if (res?.token) {
          this.setToken(res.token);
        }
      })
    );
  }

  getProfile() {
    return this.http.get(`${this.api}/users/profile`);
  }

  getAllUsers() {
    return this.http.get(`${this.api}/users`);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.STORAGE_KEY);
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem(this.STORAGE_KEY);
  }

  logout(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
  }
  private setToken(token: string): void {
    sessionStorage.setItem(this.STORAGE_KEY, token);
  }
}
