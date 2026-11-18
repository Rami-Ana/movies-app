import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

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

export class Register {
  // Inyección de dependencias
  private registerFormBuilder = inject(FormBuilder);
    submitted = false;

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


  onSubmit(): void {

    this.submitted = true;

    if (this.registerForm.invalid) { return; }
    // this.registerForm.reset();// Registro correcto

    // Aquí irá Firebase más adelante:
    // this.authService.register(...)
  }

}
