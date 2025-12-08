import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api/v1/auth';

  constructor(private http: HttpClient) {}

  register(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, formData);
  }
  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
  getprofile() {
    return this.http.get('http://localhost:8000/api/v1/users/profile');
  }
  getAllUsers() {
    return this.http.get('http://localhost:8000/api/v1/users/profile');
  }
}
