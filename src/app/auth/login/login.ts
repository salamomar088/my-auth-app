import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth';
import { Router } from '@angular/router';

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
    private router: Router
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
        this.message = 'Login successful!';
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.error('Login Error:', err);
        this.message = 'Invalid credentials. Try again.';
      },
    });
  }
}
