import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { LocalStorageService } from './storage/local-storage';
import { LoginRequest, LoginResponse, RegisterResponse } from '../interfaces/auth.interface';
import { UsersResponse } from '../interfaces/user.interface';
import { UserProfile } from '../interfaces/profile.interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = 'http://localhost:8000/api/v1';

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService,
  ) {}

  register(data: FormData): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.api}/auth/register`, data);
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.api}/auth/login`, credentials, {
        withCredentials: true,
      })
      .pipe(
        tap((res) => {
          if (res.token) this.storage.setToken(res.token);
        }),
      );
  }

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.api}/users/profile`);
  }

  getAllUsers(params?: {
    name?: string;
    limit?: number;
    created_after?: string;
  }): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${this.api}/users`, {
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
  refreshAccessToken(): Observable<{ status: number; token: string }> {
    return this.http.post<{ status: number; token: string }>(
      `${this.api}/auth/refresh`,
      {},
      { withCredentials: true },
    );
  }

  logoutServer(): Observable<{ status: number; message: string }> {
    return this.http.post<{ status: number; message: string }>(
      `${this.api}/auth/logout`,
      {},
      { withCredentials: true },
    );
  }
}
