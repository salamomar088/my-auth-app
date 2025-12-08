import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Register } from './register/register';
import { ReactiveFormsModule } from '@angular/forms';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { Users } from './users/users';

@NgModule({
  declarations: [Register, Login, Profile, Users],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [Register],
})
export class AuthModule {}
