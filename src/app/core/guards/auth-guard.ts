import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from '../services/storage/local-storage';
import { ServiceAlert } from '../services/alert/alert';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private storage: LocalStorageService,
    private router: Router,
    private alert: ServiceAlert
  ) {}

  canActivate(): boolean {
    if (this.storage.isAuthenticated()) {
      return true;
    }

    this.alert.warning('Please login to continue...');
    this.router.navigate(['/auth/login']);
    return false;
  }
}
