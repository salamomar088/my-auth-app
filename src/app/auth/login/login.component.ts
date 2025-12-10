import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

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

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

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
      Swal.fire('Error', 'Please enter valid login details.', 'error');
      return;
    }

    this.auth
      .login({
        email: this.form['email'].value!,
        password: this.form['password'].value!,
      })
      .subscribe({
        next: () => {
          Swal.fire('Welcome!', 'Login successful.', 'success');
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          Swal.fire('Login Failed', err.error.message || 'Invalid credentials', 'error');
        },
      });
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
