import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { forkJoin } from 'rxjs';

import { DashboardService } from '../../../../core/services/dashboard-service/dashboardService';
import { DashboardVm } from '../../../../core/interfaces/dashboard.interface';
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
  chartOptions!: ChartOptions;
  smallUsersChart!: ChartOptions;
  visitsChart!: ChartOptions;
  growthChart!: ChartOptions;

  constructor(
    private dashboardService: DashboardService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef
  ) {}

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
            categories: this.vm.registrationsByDay.map((d) => d.day),
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

        this.smallUsersChart = {
          series: [this.vm.totalUsers],
          chart: {
            type: 'radialBar',
            height: 240,
            toolbar: { show: false },
          },
          plotOptions: {
            radialBar: {
              hollow: { size: '72%' },
              track: {
                background: 'rgba(255,255,255,0.05)',
              },
              dataLabels: {
                name: { show: false },
                value: {
                  formatter: () => this.vm.totalUsers.toString(),
                  fontSize: '30px',
                  fontWeight: 700 as any,
                  color: '#1dbbd3',
                },
              },
            },
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              gradientToColors: ['#cc00ff'],
              stops: [0, 100],
            },
          },
          labels: ['Users'],
        } as unknown as ChartOptions;

        this.visitsChart = {
          series: [
            {
              name: 'Visits',
              data: [this.vm.visitsToday],
            },
          ],
          chart: {
            type: 'bar',
            height: 180,
            toolbar: { show: false },
            animations: {
              enabled: true,
              speed: 600,
            },
          },
          plotOptions: {
            bar: {
              borderRadius: 6,
              columnWidth: '50%',
            },
          },
          xaxis: {
            categories: ['Today'],
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
          tooltip: {
            theme: 'dark',
          },
          dataLabels: { enabled: false },
        } as unknown as ChartOptions;

        this.growthChart = {
          series: [
            {
              name: 'This Week',
              type: 'column',
              data: [this.vm.usersThisWeek],
            },
            {
              name: 'This Month',
              type: 'line',
              data: [this.vm.usersThisMonth],
            },
          ],
          chart: {
            type: 'line',
            height: 220,
            toolbar: { show: false },
          },
          stroke: {
            width: [0, 3],
            curve: 'smooth',
          },
          plotOptions: {
            bar: {
              borderRadius: 7,
              columnWidth: '45%',
            },
          },
          grid: {
            borderColor: 'rgba(255,255,255,0.05)',
          },
          xaxis: {
            categories: ['Users'],
            labels: { style: { colors: '#ffffff' } },
          },
          yaxis: {
            min: 0,
            labels: { style: { colors: '#ffffff' } },
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              gradientToColors: ['#cc66ff', '#22d3ee'],
              stops: [0, 100],
            },
          },
          tooltip: {
            theme: 'dark',
          },
          dataLabels: { enabled: false },
        } as unknown as ChartOptions;

        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
          this.cdr.detectChanges();
        });

        this.loading = false;
      },
      error: () => {
        this.alertService.error('Failed to load dashboard');
        this.loading = false;
      },
    });
  }
}
