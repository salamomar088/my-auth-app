import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.componenet.scss'],
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
