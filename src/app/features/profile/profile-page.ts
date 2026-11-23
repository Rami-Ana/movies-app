import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [DatePipe, ReactiveFormsModule,],
  selector: 'app-profile-page',
  styleUrl: './profile-page.css',
  templateUrl: './profile-page.html',
})
export class ProfilePage {

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder); 

  user = this.authService.user;

  submitted = false;
  submitting = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  profileForm = this.formBuilder.group({
    displayName: [this.user()?.displayName ?? '',
    [Validators.required, Validators.maxLength(50),],
    ],
  });


  async onSubmit(): Promise<void> {

    if (this.submitting()) { return; }
    this.submitted = true;
    if (this.profileForm.invalid) { return; }

    this.successMessage.set('');
    this.errorMessage.set('');
    this.submitting.set(true);

    const displayName =
      this.profileForm
        .getRawValue()
        .displayName
        ?.trim();

    try {
      await this.authService.updateDisplayName(displayName!,);
      this.successMessage.set('Perfil actualizado correctamente.',);
    } catch {
      this.errorMessage.set('No se ha podido actualizar el perfil.');
    } finally { this.submitting.set(false); }
  }

}
