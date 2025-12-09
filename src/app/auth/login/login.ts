import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth';
import { Router } from '@angular/router';
import { Alert } from '../../shared/alert';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  showPassword = false;
  showConfirm = false;
  loginForm!: FormGroup;
  submited = false;
  message: string = '';

  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alert: Alert
  ) {}

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submited = true;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const body = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.authService.login(body).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.alert.success(res.message || 'Login in successfully!');
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.error('Login Error:', err);
        this.alert.error(err.message || 'Invalid credentials. Try again.');
      },
    });
  }
}
