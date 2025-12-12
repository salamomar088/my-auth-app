import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private token: string | null = null;
  private readonly STORAGE_KEY = 'auth_token';

  constructor() {
    this.loadTokenFromStorage();
  }

  private loadTokenFromStorage(): void {
    const storedToken = sessionStorage.getItem(this.STORAGE_KEY);
    if (storedToken) {
      this.token = storedToken;
    }
  }

  setToken(token: string): void {
    this.token = token;
    sessionStorage.setItem(this.STORAGE_KEY, token);
  }

  getToken(): string | null {
    return this.token;
  }

  clearToken(): void {
    this.token = null;
    sessionStorage.removeItem(this.STORAGE_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
