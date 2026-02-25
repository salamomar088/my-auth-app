import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { forkJoin } from 'rxjs';

import { DashboardService } from '../../../../core/services/dashboard-service/dashboardService';
import {
  DashboardVm,
  DashboardAreaChartResponse,
  DashboardRegistrationsLast7DaysResponse,
} from '../../../../core/interfaces/dashboard.interface';
import { ChartOptions } from '../../../../core/interfaces/chart.interface';
import { AlertService } from '../../../../core/services/alert/alert';

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

  chartOptions!: ChartOptions; // Registrations (Area)
  visitsChart!: ChartOptions; // Visits (Bar)
  growthChart!: ChartOptions; // Growth (Bar)

  constructor(
    private dashboardService: DashboardService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    forkJoin({
      total: this.dashboardService.getTotalUsers(),
      reg7: this.dashboardService.getRegistrationsLast7Days(),
      visits7: this.dashboardService.getVisitsLast7Days(),
      week: this.dashboardService.getUsersThisWeek(),
      month: this.dashboardService.getUsersThisMonth(),
    }).subscribe({
      next: ({ total, reg7, visits7, week, month }) => {
        const registrationsRes = reg7 as DashboardRegistrationsLast7DaysResponse;

        const registrationsChart = {
          status: registrationsRes.status,
          categories: registrationsRes.last7DaysLabels ?? [],
          series: [
            {
              name: 'Registrations',
              data: registrationsRes.registrationsLast7Days ?? [],
            },
          ],
        };

        const visitsChartData = visits7 as DashboardAreaChartResponse;

        const todayVisits =
          visitsChartData.series?.[0]?.data?.[visitsChartData.series[0].data.length - 1] ?? 0;

        this.vm = {
          totalUsers: total.totalUsers,

          visitsToday: todayVisits,

          recentUsers: [],
          registrationsByDay: [],

          registrationsLast7Days: registrationsChart.series[0].data,
          last7DaysLabels: registrationsChart.categories,

          usersThisWeek: week.usersThisWeek ?? 0,
          usersThisMonth: month.usersThisMonth ?? 0,
        };

        this.chartOptions = {
          series: registrationsChart.series,
          chart: {
            type: 'area',
            height: 320,
            toolbar: { show: false },
            zoom: { enabled: false },
            foreColor: '#ffffff',
            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 700,
            },
          },
          colors: ['#7c3aed'],
          xaxis: {
            categories: registrationsChart.categories,
            axisBorder: { show: false },
            axisTicks: { show: false },
          },
          grid: {
            borderColor: 'rgba(255,255,255,0.05)',
            strokeDashArray: 30,
          },
          stroke: {
            curve: 'smooth',
            width: 3,
            colors: ['#cc00ff'],
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              gradientToColors: ['#cc00ff'],
              opacityFrom: 0.35,
              opacityTo: 0.02,
              stops: [0, 100],
            },
          },
          dataLabels: { enabled: false },
          tooltip: {
            theme: 'dark',
            style: {
              fontSize: '12px',
              fontFamily: 'inherit',
            },
          },
          title: {},
        } as ChartOptions;

        this.visitsChart = {
          series: visitsChartData.series,
          chart: {
            type: 'bar',
            height: 180,
            toolbar: { show: false },
            animations: { enabled: true, speed: 600 },
          },
          plotOptions: {
            bar: {
              borderRadius: 6,
              columnWidth: '50%',
            },
          },
          xaxis: {
            categories: visitsChartData.categories,
            labels: { style: { colors: '#ffffff' } },
          },
          grid: {
            borderColor: 'rgba(255,255,255,0.06)',
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              gradientToColors: ['#cc00ff'],
              stops: [0, 100],
            },
          },
          tooltip: { theme: 'dark' },
          dataLabels: { enabled: false },
        } as unknown as ChartOptions;

        this.growthChart = {
          series: [
            {
              name: 'Users',
              data: [this.vm.usersThisWeek, this.vm.usersThisMonth],
            },
          ],
          chart: {
            type: 'bar',
            height: 220,
            toolbar: { show: false },
            animations: { enabled: true, speed: 600 },
          },
          plotOptions: {
            bar: {
              borderRadius: 8,
              columnWidth: '45%',
            },
          },
          xaxis: {
            categories: ['This Week', 'This Month'],
            labels: { style: { colors: '#ffffff' } },
          },
          grid: {
            borderColor: 'rgba(255,255,255,0.06)',
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              gradientToColors: ['#cc00ff'],
              stops: [0, 100],
            },
          },
          dataLabels: { enabled: false },
          tooltip: { theme: 'dark' },
        } as unknown as ChartOptions;

        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
          this.cdr.detectChanges();
        });

        this.loading = false;
      },
      error: (err) => {
        console.error('Dashboard load failed:', err);
        this.alertService.error('Failed to load dashboard');
        this.loading = false;
      },
    });
  }
}
