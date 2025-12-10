import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { Register } from './register/register.component';
import { Login } from './login/login.component';
import { Profile } from './profile/profile.component';
import { Users } from './users/users.component';

@NgModule({
  declarations: [Register, Login, Profile, Users],
  imports: [CommonModule, ReactiveFormsModule],
})
export class AuthModule {}
