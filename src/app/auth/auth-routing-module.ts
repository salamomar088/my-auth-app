import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './pages/login/login.component';
import { Register } from './pages/register/register.component';
import { Profile } from './pages/profile/profile.component';
import { Users } from './pages/users/users.component';
import { AuthGuard } from './../core/guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'register',
        component: Register,
      },
      {
        path: 'profile',
        component: Profile,
        canActivate: [AuthGuard],
      },
      {
        path: 'users',
        component: Users,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
