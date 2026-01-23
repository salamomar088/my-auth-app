import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { ServiceAlert } from '../../../core/services/alert/alert';
import { LoginRequest } from '../../../core/interfaces/auth.interface';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class Login implements OnInit {
  showPassword = false;
  submited = false;
  message = '';

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private alert: ServiceAlert
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submited = true;

    if (this.loginForm.invalid) {
      this.alert.error('Please enter valid login details.');
      return;
    }

    const payload: LoginRequest = {
      email: this.form['email'].value,
      password: this.form['password'].value,
    };

    this.auth.login(payload).subscribe({
      next: () => {
        this.alert.success('Login successful. Welcome aboard!');
        this.router.navigate(['/profile']);
      },
      error: (err: unknown) => {
        let message = 'Error occurred';

        if (err && typeof err === 'object' && 'message' in err) {
          message = String((err as { message?: string }).message);
        }

        this.alert.error(message);
      },
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
