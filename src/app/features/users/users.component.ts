import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { finalize, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { AuthService } from '../../core/services/auth.service';
import { AlertService } from '../../core/services/alert/alert';
import { LocalStorageService } from '../../core/services/storage/local-storage';

import { User, UsersResponse } from '../../core/interfaces/user.interface';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];

  loading = true;
  error: string | null = null;

  expandedUserId: number | null = null;

  searchTerm = '';
  createdAfter = '';

  currentUserId: number | null = null;

  private destroy$ = new Subject<void>();
  private search$ = new Subject<{ name: string; created_after: string }>();

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private alert: AlertService,
    private storage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.storage.getUserId();

    this.search$
      .pipe(
        debounceTime(450),
        distinctUntilChanged((a, b) => a.name === b.name && a.created_after === b.created_after),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.loadUsers();
      });

    // initial load
    this.triggerSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private triggerSearch(): void {
    this.search$.next({
      name: this.searchTerm.trim(),
      created_after: this.createdAfter,
    });
  }

  loadUsers(): void {
    this.error = null;
    this.loading = true;

    this.authService
      .getAllUsers({
        name: this.searchTerm.trim(),
        created_after: this.createdAfter,
      })
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (res: UsersResponse) => {
          this.users = res.data;
        },
        error: (err: unknown) => {
          let message = 'Failed to load users';

          if (err && typeof err === 'object' && 'message' in err) {
            message = String((err as { message?: string }).message);
          }

          this.error = message;
          this.users = [];
          this.alert.error(message);
        },
      });
  }

  // call this from input change
  onSearchChange(): void {
    this.triggerSearch();
  }

  toggleUser(id: number): void {
    this.expandedUserId = this.expandedUserId === id ? null : id;
  }

  trackById(_: number, user: User): number {
    return user.id;
  }

  formatDate(value: string | null): string {
    if (!value) return '-';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleString();
  }
}
