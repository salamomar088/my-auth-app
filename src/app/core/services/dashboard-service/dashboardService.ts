import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import { UsersResponse } from '../../interfaces/user.interface';
import { DashboardVm } from '../../interfaces/dashboard.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private authService: AuthService) {}

  buildDashboard(): Observable<Omit<DashboardVm, 'visitsToday'>> {
    return this.authService.getAllUsers({ limit: 1000 }).pipe(
      map((resp: UsersResponse) => {
        const users = resp.data ?? [];
        const totalUsers = resp.count ?? users.length;

        const now = new Date();
        const last7Days: string[] = [];
        const last7Counts: number[] = [];

        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(now.getDate() - i);
          const label = d.toISOString().slice(5, 10);
          last7Days.push(label);

          const count = users.filter(
            (u) => new Date(u.createdAt).toISOString().slice(5, 10) === label
          ).length;

          last7Counts.push(count);
        }

        const mapByDay = new Map<string, number>();
        users.forEach((u) => {
          const day = new Date(u.createdAt).toISOString().slice(0, 10);
          mapByDay.set(day, (mapByDay.get(day) || 0) + 1);
        });

        const registrationsByDay = Array.from(mapByDay.entries())
          .map(([day, count]) => ({ day, count }))
          .sort((a, b) => (a.day < b.day ? -1 : 1));

        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);

        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);

        const usersThisWeek = users.filter((u) => new Date(u.createdAt) >= weekAgo).length;

        const usersThisMonth = users.filter((u) => new Date(u.createdAt) >= monthAgo).length;

        const recentUsers = [...users]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);

        return {
          totalUsers,
          recentUsers,
          registrationsByDay,
          registrationsLast7Days: last7Counts,
          last7DaysLabels: last7Days,
          usersThisWeek,
          usersThisMonth,
        };
      })
    );
  }

  getVisits(): Observable<any> {
    return this.authService['http'].get('http://localhost:8000/api/v1/visit');
  }
}
