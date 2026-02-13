import { User } from './user.interface';

export interface RegistrationDay {
  day: string;
  count: number;
}

export interface DashboardVm {
  totalUsers: number;
  visitsToday: number;
  recentUsers: User[];

  registrationsByDay: RegistrationDay[];

  registrationsLast7Days: number[];
  last7DaysLabels: string[];

  usersThisWeek: number;
  usersThisMonth: number;
}
