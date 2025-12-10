import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  register(data: FormData) {
    return this.http.post(`${this.api}/auth/register`, data);
  }

  login(payload: { email: string; password: string }) {
    return this.http.post(`${this.api}/auth/login`, payload);
  }

  getProfile() {
    return this.http.get(`${this.api}/users/me`);
  }

  getAllUsers() {
    return this.http.get(`${this.api}/users`);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
