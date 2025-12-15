import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './auth.service';
import { Login } from './pages/login/login.component';
import { Register } from './pages/register/register.component';
import { Profile } from './pages/profile/profile.component';
import { Users } from './pages/users/users.component';

@NgModule({
  declarations: [Login, Register, Profile, Users],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [AuthService],
})
export class AuthModule {}
