import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { DashboardService } from '../../../../core/services/dashboard-service/dashboardService';
import { DashboardVm } from '../../../../core/interfaces/dashboard.interface';
import { ChartOptions } from '../../../../core/interfaces/chart.interface';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  vm!: DashboardVm;
  loading = true;
  error = '';
  chartOptions!: ChartOptions;
  smallUsersChart!: ChartOptions;
  visitsChart!: ChartOptions;
  growthChart!: ChartOptions;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    forkJoin({
      stats: this.dashboardService.buildDashboard(),
      visit: this.dashboardService.getVisits(),
    }).subscribe({
      next: ({ stats, visit }) => {
        this.vm = {
          ...stats,
          visitsToday: visit.visits,
        };

        this.chartOptions = {
          series: [
            {
              name: 'Registrations',
              data: this.vm.registrationsByDay.map((d) => d.count),
            },
          ],
          chart: { type: 'area', height: 320, toolbar: { show: false } },
          xaxis: {
            categories: this.vm.registrationsByDay.map((d) => d.day),
          },
          dataLabels: { enabled: false },
          stroke: { curve: 'smooth' },
          title: { text: 'User Registrations', align: 'left' },
        };

        this.smallUsersChart = {
          series: [{ name: 'Users', data: [this.vm.totalUsers] }],
          chart: { type: 'bar', height: 200, toolbar: { show: false } },
          xaxis: { categories: ['Total Users'] },
          dataLabels: { enabled: false },
          stroke: { curve: 'smooth' },
          title: { text: 'Total Users', align: 'left' },
        };

        this.visitsChart = {
          series: [{ name: 'Visits', data: [this.vm.visitsToday] }],
          chart: { type: 'bar', height: 200, toolbar: { show: false } },
          xaxis: { categories: ['Today'] },
          dataLabels: { enabled: false },
          stroke: { curve: 'smooth' },
          title: { text: 'Visits Today', align: 'left' },
        };

        this.growthChart = {
          series: [
            {
              name: 'Users',
              data: [this.vm.usersThisWeek, this.vm.usersThisMonth],
            },
          ],
          chart: { type: 'bar', height: 200, toolbar: { show: false } },
          xaxis: { categories: ['This Week', 'This Month'] },
          dataLabels: { enabled: false },
          stroke: { curve: 'smooth' },
          title: { text: 'User Growth', align: 'left' },
        };

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load dashboard';
        this.loading = false;
      },
    });
  }
}
