import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ServiceAlert } from '../../../core/services/alert/alert';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  standalone: false,
})
export class Sidebar {
  open = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: ServiceAlert
  ) {}

  logout(): void {
    this.authService.logout();
    this.alert.info('You have been logged out');
    this.router.navigate(['/login']);
    this.open = false;
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
