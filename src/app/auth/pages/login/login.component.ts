import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ServiceAlert } from '../../../core/services/alert/alert';

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
  loginForm: any;

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

  onSubmit() {
    this.submited = true;

    if (this.loginForm.invalid) {
      this.alert.error('Please enter valid login details.');
      return;
    }

    this.auth
      .login({
        email: this.form['email'].value!,
        password: this.form['password'].value!,
      })
      .subscribe({
        next: () => {
          this.alert.success('Login successful. Welcome aboard!');
          this.router.navigate(['/profile']);
        },
        error: (err: any) => {
          this.alert.error(err.error?.message || 'Error occurred');
        },
      });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
