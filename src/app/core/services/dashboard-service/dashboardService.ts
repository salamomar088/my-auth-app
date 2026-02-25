// dashboard.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DashboardTotalUsersResponse,
  DashboardAreaChartResponse,
  DashboardRegistrationsLast7DaysResponse,
  DashboardUsersThisWeekResponse,
  DashboardUsersThisMonthResponse,
} from '../../interfaces/dashboard.interface';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly baseUrl = 'http://localhost:8000/api/v1/dashboard';

  constructor(private http: HttpClient) {}

  getTotalUsers() {
    return this.http.get<DashboardTotalUsersResponse>(`${this.baseUrl}/total-users`);
  }

  getRegistrationsLast7Days() {
    return this.http.get<DashboardRegistrationsLast7DaysResponse>(
      `${this.baseUrl}/registrations-last-7-days`,
    );
  }

  getVisitsLast7Days() {
    return this.http.get<DashboardAreaChartResponse>(`${this.baseUrl}/visits-last-7-days`);
  }

  getUsersThisWeek() {
    return this.http.get<DashboardUsersThisWeekResponse>(`${this.baseUrl}/users-this-week`);
  }

  getUsersThisMonth() {
    return this.http.get<DashboardUsersThisMonthResponse>(`${this.baseUrl}/users-this-month`);
  }
}
