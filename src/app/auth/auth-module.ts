import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './auth.service';
import { Login } from './pages/login/login.component';
import { Register } from './pages/register/register.component';
import { AuthRoutingModule } from './auth-routing-module';

@NgModule({
  declarations: [Login, Register],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
})
export class AuthModule {}
