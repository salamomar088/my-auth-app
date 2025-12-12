import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class Register {
  registerForm!: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  selectedImage!: File;
  submited = false;

  showPassword = false;
  showConfirm = false;
  message = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.selectedImage = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
      this.cd.detectChanges();
    };

    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.submited = true;

    if (this.registerForm.invalid) {
      Swal.fire('Error', 'Please fill all fields correctly.', 'error');
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
        Swal.fire('Success', 'Account created successfully!', 'success');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        Swal.fire('Registration Failed', err.error.message || 'Error Occured', 'error');
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
