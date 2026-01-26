import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { ServiceAlert } from '../../../core/services/alert/alert';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class Register {
  registerForm!: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  selectedImage: File | null = null;
  submited = false;

  showPassword = false;
  showConfirm = false;
  message = '';
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private alert: ServiceAlert
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  get form() {
    return this.registerForm.controls;
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    this.selectedImage = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
      this.cd.detectChanges();
    };

    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    this.submited = true;
    this.errorMessage = null;

    if (this.form['name'].invalid) {
      this.errorMessage = 'Name is required';
      return;
    }

    if (this.form['email'].invalid) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    if (this.form['password'].invalid) {
      this.errorMessage = 'Password must be at least 8 characters';
      return;
    }

    if (this.form['confirmPassword'].invalid) {
      this.errorMessage = 'Please confirm your password';
      return;
    }

    if (this.registerForm.errors?.['passwordMismatch']) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const formData = new FormData();
    formData.append('name', this.form['name'].value);
    formData.append('email', this.form['email'].value);
    formData.append('password', this.form['password'].value);

    if (this.selectedImage) {
      formData.append('avatar', this.selectedImage);
    }

    this.auth.register(formData).subscribe({
      next: () => {
        this.alert.success('Registration successful. Please log in.');
        this.router.navigate(['/login']);
      },
      error: (err: unknown) => {
        let message = 'Registration failed';

        if (err && typeof err === 'object' && 'message' in err) {
          message = String((err as { message?: string }).message);
        }

        this.errorMessage = message;
      },
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
