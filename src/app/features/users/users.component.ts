import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { IUsers } from '../../core/interfaces/user.interface';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: IUsers[] = [];

  loading = true;
  error: string | null = null;

  expandedUserId: number | null = null;

  searchTerm = '';
  createdAfter = '';

  currentUserId: number | null = null;

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const tokenUser = sessionStorage.getItem('auth_user_id');
    this.currentUserId = tokenUser ? Number(tokenUser) : null;

    this.loadUsers();
  }

  loadUsers(): void {
    this.error = null;
    this.loading = true;

    this.authService
      .getAllUsers({
        name: this.searchTerm,
        created_after: this.createdAfter,
      })
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (res: any) => {
          const data = Array.isArray(res) ? res : res?.users ?? res?.data ?? [];

          this.users = data;
        },
        error: (err: any) => {
          this.error = err?.error?.message || err?.message || 'Failed to load users';

          this.users = [];
        },
      });
  }

  toggleUser(id: number): void {
    this.expandedUserId = this.expandedUserId === id ? null : id;
  }

  onSearchChange(): void {
    this.loadUsers();
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
