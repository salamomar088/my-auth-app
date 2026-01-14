import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Register } from './auth/pages/register/register.component';
import { Login } from './auth/pages/login/login.component';
import { AuthGuard } from './core/guards/auth-guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users-module').then((m) => m.UsersModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile-module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
