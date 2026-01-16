import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  standalone: false,
})
export class Sidebar {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
