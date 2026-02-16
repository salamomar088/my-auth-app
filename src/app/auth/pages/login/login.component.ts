import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../core/services/alert/alert';
import { LoginRequest } from '../../../core/interfaces/auth.interface';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showPassword = false;
  submited = false;
  message = '';
  errorMessage: string | null = null;

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private alert: AlertService,
    private cdr: ChangeDetectorRef
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
    this.errorMessage = null;

    if (this.loginForm.invalid) {
      if (this.form['email'].errors) {
        this.errorMessage = 'Please enter a valid email address';
      } else if (this.form['password'].errors) {
        this.errorMessage = 'Password is required';
      }
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
 this.auth.register(formData).subscribe({
  next: () => {
    this.alert.success('Registration successful. Please log in.');
    this.router.navigate(['/login']);
  },

  error: (err: unknown) => {
    let message = 'Registration failed';

    if (
      err &&
      typeof err === 'object' &&
      'error' in err &&
      typeof (err as any).error === 'object' &&
      (err as any).error !== null &&
      'message' in (err as any).error
    ) {
      message = String((err as any).error.message);
    }

    this.errorMessage = message;
    this.cdr.detectChanges();
  }
});

  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
