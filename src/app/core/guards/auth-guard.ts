import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly STORAGE_KEY = 'auth_token';

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem(this.STORAGE_KEY);

    if (token) {
      return true;
    }

    this.router.navigate(['/auth/login']);
    return false;
  }
}
