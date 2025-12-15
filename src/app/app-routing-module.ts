import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Register } from './auth/pages/register/register.component';
import { Login } from './auth/pages/login/login.component';
import { Profile } from './auth/pages/profile/profile.component';
import { Users } from './auth/pages/users/users.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
