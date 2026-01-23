import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { ServiceAlert } from '../../core/services/alert/alert';
import { UserProfile } from '../../core/interfaces/profile.interface';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: UserProfile | null = null;
  loading = true;
  error: string | null = null;
  showImage = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private alert: ServiceAlert
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.error = null;

    this.authService.getProfile().subscribe({
      next: (res: UserProfile) => {
        this.user = res;

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: unknown) => {
        let message = 'Failed to load profile';

        if (err && typeof err === 'object' && 'message' in err) {
          message = String((err as { message?: string }).message);
        }

        this.error = message;
        this.alert.error(message);
        this.loading = false;
      },
    });
  }

  openImage(): void {
    if (this.user?.hasProfileImage) {
      this.showImage = true;
    }
  }

  logout(): void {
    this.authService.logout();
    this.alert.info('You have been logged out');
    this.router.navigate(['/auth/login']);
  }
}
