import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from './storage/local-storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient, private storage: LocalStorageService) {}

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

  getAllUsers(params?: { name?: string; limit?: number; created_after?: string }) {
    return this.http.get(`${this.api}/users`, {
      params: {
        ...(params?.name ? { name: params.name } : {}),
        ...(params?.limit ? { limit: params.limit } : {}),
        ...(params?.created_after ? { created_after: params.created_after } : {}),
      },
    });
  }

  getToken(): string | null {
    return this.storage.getToken();
  }

  isAuthenticated(): boolean {
    return this.storage.isAuthenticated();
  }

  logout(): void {
    this.storage.removeToken();
  }

  private setToken(token: string): void {
    this.storage.setToken(token);
  }
}
