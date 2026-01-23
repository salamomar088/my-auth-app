import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_ID_KEY = 'auth_user_id';

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
  setUserId(id: number): void {
    localStorage.setItem(this.USER_ID_KEY, String(id));
  }

  getUserId(): number | null {
    const value = localStorage.getItem(this.USER_ID_KEY);
    return value !== null ? Number(value) : null;
  }

  removeUserId(): void {
    localStorage.removeItem(this.USER_ID_KEY);
  }
}
