import { Component, OnDestroy, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { DatePipe } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

function notBlankValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value ?? '';
  return value.length > 0 && value.trim().length === 0 ? { blank: true } : null;
}

@Component({
  imports: [DatePipe, ReactiveFormsModule],
  selector: 'app-profile-page',
  styleUrl: './profile-page.css',
  templateUrl: './profile-page.html',
})
export class ProfilePage implements OnDestroy {

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private successTimeoutId: ReturnType<typeof setTimeout> | null = null;

  user = this.authService.user;

  submitted = false;
  submitting = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  profileForm = this.formBuilder.group({
    displayName: [
      this.user()?.displayName ?? '',
      [Validators.required, notBlankValidator, Validators.maxLength(50)],
    ],
  });

  async onSubmit(): Promise<void> {
    if (this.submitting()) { return; }
    this.submitted = true;
    if (this.profileForm.invalid) { return; }

    this.clearSuccessTimeout();
    this.successMessage.set('');
    this.errorMessage.set('');
    this.submitting.set(true);

    const displayName = this.profileForm.getRawValue().displayName?.trim();

    try {
      await this.authService.updateDisplayName(displayName!);
      this.successMessage.set('Perfil actualizado correctamente.');

      this.successTimeoutId = setTimeout(() => {
        this.successMessage.set('');
        this.successTimeoutId = null;
      }, 3000);
    } catch {
      this.errorMessage.set('No se ha podido actualizar el perfil.');
    } finally {
      this.submitting.set(false);
    }
  }

  async logout(): Promise<void> {
    this.clearSuccessTimeout();
    await this.authService.logout();
    await this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.clearSuccessTimeout();
  }

  private clearSuccessTimeout(): void {
    if (this.successTimeoutId !== null) {
      clearTimeout(this.successTimeoutId);
      this.successTimeoutId = null;
    }
  }

}