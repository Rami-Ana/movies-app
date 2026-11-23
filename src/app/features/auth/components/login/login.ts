import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import { FirebaseError } from 'firebase/app';

import authErrors from '../../../../core/data/auth-errors.json';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute,); 

  submitted = false;
  submitting = signal(false);
  errorMessage = signal('');

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email],],
    password: ['', [Validators.required]]
  });

  async onSubmit(): Promise<void> {

    if (this.submitting()) { return; }
    this.submitted = true;

    if (this.loginForm.invalid) { return; }

    this.errorMessage.set('');
    this.submitting.set(true);

    const { email, password } = this.loginForm.getRawValue();

    try {
      await this.authService.login(email!, password!);
      this.loginForm.reset();
      this.submitted = false;

      const returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
      const isInternalRoute =
        returnUrl?.startsWith('/') && !returnUrl.startsWith('//');

      if (returnUrl && isInternalRoute) {
        await this.router.navigateByUrl(returnUrl,);
      } else {
        await this.router.navigate(['/movies']);
      }

    } catch (error) {
      const messages: Record<string, string> = authErrors;
      const code =
        error instanceof FirebaseError
          ? error.code
          : 'default';

      this.errorMessage.set(
        messages[code] ?? messages['default']
      );
    } finally {
      this.submitting.set(false);
    }
  }
}

