import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { IUsers } from '../../core/interfaces/user.interface';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: IUsers;
  loading = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadProfile();
  }
  loadProfile(): void {
    this.loading = true;
    this.error = null;
    this.authService.getProfile().subscribe({
      next: (res: IUsers | any) => {
        this.user = res;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Failed to load profile';
        this.loading = false;
      },
    });
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
