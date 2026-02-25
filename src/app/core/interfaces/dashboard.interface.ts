export interface DashboardTotalUsersResponse {
  status: number;
  totalUsers: number;
}
export interface DashboardAreaChartResponse {
  status: number;
  categories: string[];
  series: Array<{
    name: string;
    data: number[];
  }>;
}
export interface DashboardRegistrationsLast7DaysResponse {
  status: number;
  last7DaysLabels: string[];
  registrationsLast7Days: number[];
}
export interface DashboardUsersThisWeekResponse {
  status: number;
  usersThisWeek: number;
}
export interface DashboardUsersThisMonthResponse {
  status: number;
  usersThisMonth: number;
}
export interface DashboardVm {
  totalUsers: number;

  visitsToday: number;

  usersThisWeek: number;
  usersThisMonth: number;

  recentUsers: any[];
  registrationsByDay: any[];

  registrationsLast7Days: number[];
  last7DaysLabels: string[];
}
