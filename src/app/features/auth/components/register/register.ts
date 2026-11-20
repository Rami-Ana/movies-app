import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import { FirebaseError } from 'firebase/app';

import authErrors from '../../../../core/data/auth-errors.json';

function passwordsMatchValidator(
  control: AbstractControl,
): ValidationErrors | null {

  const password = control.get('password')?.value;
  const repeatPassword = control.get('repeatPassword')?.value;

  if (!password || !repeatPassword) { return null; }
  if (password !== repeatPassword) {
    return { passwordsMismatch: true, };
  }
  return null;
}
@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})


export class Register {// REGISTER: Estado de la pantalla
  // Contiene: submitted, submitting, errorMessage y registerForm

  private registerFormBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  submitted = false;//¿El usuario ha intentado enviar el formulario?


  submitting = signal(false);// ¿Estamos esperando una respuesta de Firebase?
  errorMessage = signal(''); //si falla firebase


  // Formulario reactivo
  registerForm = this.registerFormBuilder.group({
    email: ['', [Validators.required, Validators.email],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]
    ],
    repeatPassword: ['', Validators.required]
  },
    { validators: passwordsMatchValidator, }
  );


  async onSubmit(): Promise<void> {// ¿Qué ocurre al pulsar Registrar? Gestion pantalla

    // Evita envíos duplicados mientras Firebase responde
    if (this.submitting()) { return; }

    // Activa la visualización de errores del formulario
    this.submitted = true;

     // Detiene el proceso si el formulario no es válido
    if (this.registerForm.invalid) { return; }

    // Limpia errores anteriores y activa el estado de carga
    this.errorMessage.set(''); //error firebase
    this.submitting.set(true);

    // Obtiene los datos necesarios para el registro
    const { email, password } = this.registerForm.getRawValue();

    try {
      // Crea el usuario en Firebase
      await this.authService.register(email!, password!);

      // Limpia el formulario tras un registro correcto
      this.registerForm.reset();
      this.submitted = false;

      // Redirige al catálogo de películas
      await this.router.navigate(['/movies']);
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
      // Reactiva el botón independientemente del resultado
      this.submitting.set(false);
    }
  }
}
