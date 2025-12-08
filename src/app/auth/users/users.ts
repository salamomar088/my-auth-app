import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth';

@Component({
  selector: 'app-users',
  templateUrl: './users.html',
  styleUrls: ['./users.scss'],
})
export class Users implements OnInit {
  users: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res;
        console.log('Users:', res);
      },
      error: (err) => {
        console.error('Users load error:', err);
      },
    });
  }
}
