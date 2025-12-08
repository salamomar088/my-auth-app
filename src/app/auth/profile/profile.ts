import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class Profile implements OnInit {
  user: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getprofile().subscribe({
      next: (res) => {
        this.user = res;
        console.log('Profile loaded:', res);
      },
      error: (err) => {
        console.error('Profile load error:', err);
      },
    });
  }
}
