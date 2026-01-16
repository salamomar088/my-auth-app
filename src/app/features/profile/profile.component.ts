import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { IUsers } from '../../core/interfaces/user.interface';
import { ChangeDetectorRef } from '@angular/core';

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
    private cdr: ChangeDetectorRef
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
        this.error = err.error?.message || 'Failed to load profile';
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
    this.router.navigate(['/auth/login']);
  }
}
