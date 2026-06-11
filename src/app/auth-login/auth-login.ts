import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../services/auth.service';
import { TextField } from '../components/ui/text-field';

@Component({
  selector: 'app-auth-login',
  imports: [ReactiveFormsModule, TextField],
  templateUrl: './auth-login.html',
  styleUrl: './auth-login.css',
})
export class AuthLogin {
  private auth = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  protected readonly form = new FormGroup({ // L1O2G3
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  protected readonly isSubmitting = signal(false); // R7Q8T9
  protected readonly loginFailed = signal(false); // E1R2R3
  protected emailError(): string | null {
    const control = this.form.controls.email;

    if (!control.touched) {
      return null;
    }

    if (control.hasError('required')) {
      return "L'email est requis.";
    }

    if (control.hasError('email')) {
      return 'Adresse email invalide.';
    }

    return null;
  }

  protected passwordError(): string | null {
    const control = this.form.controls.password;
    return control.touched && control.hasError('required') ? 'Le mot de passe est requis.' : null;
  }

  protected submit(): void { // S7B8M9
    this.loginFailed.set(false);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue(); // C1R2D3
    this.isSubmitting.set(true);

    this.auth
      .login(email, password)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.form.reset();
          this.router.navigate(['/tracks']);
        },
        error: () => {
          this.isSubmitting.set(false);
          this.loginFailed.set(true);
        },
      });
  }
}
