import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { IUsers } from '../../core/interfaces/user.interface';
import { ServiceAlert } from '../../core/services/alert/alert';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: IUsers | null = null;
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
      next: (res: any) => {
        this.user = {
          id: res.id,
          name: res.name || res.fullname,
          email: res.email,
          hasProfileImage: res.hasProfileImage === true,
          profileImage: res.profileImage || res.profile_picture,
        };

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        const message = err.error?.message || 'Failed to load profile';
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
