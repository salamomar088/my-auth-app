import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { IUsers } from '../../core/interfaces/user.interface';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: IUsers[] = [];
  loading = false;
  error: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;

    this.authService.getAllUsers().subscribe({
      next: (res: IUsers[] | any) => {
        const data = Array.isArray(res) ? res : res?.users ?? res?.data;
        this.users = data ?? [];
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err?.error?.message || 'Failed to load users';
        this.loading = false;
      },
    });
  }

  trackById(_: number, user: IUsers) {
    return user.id;
  }

  formatDate(value: any): string {
    if (!value) return '-';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleString();
  }
}
