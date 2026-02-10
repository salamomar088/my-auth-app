import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert/alert';
import { LocalStorageService } from '../../../core/services/storage/local-storage';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  standalone: false,
})
export class SidebarComponent {
  isOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertService,
    private storage: LocalStorageService
  ) {}

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }
  closeSidebar() {
    this.isOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.alert.info('You have been logged out');
    this.router.navigate(['/login']);
    this.isOpen = false;
  }

  isLoggedIn(): boolean {
    return this.storage.isAuthenticated();
  }
}
