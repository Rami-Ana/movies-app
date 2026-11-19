import { Component, inject, signal } from '@angular/core';
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

  //¿El usuario ha intentado enviar el formulario?
  submitted = false;

  // ¿Estamos esperando una respuesta de Firebase?
  submitting = signal(false);


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
    // Guarda defensiva
    if (this.submitting()) {return;}

    this.submitted = true;

    if (this.registerForm.invalid) { return; }

    this.submitting.set(true);

    // Simulación temporal
    setTimeout(() => {
      this.submitting.set(false);
      console.log('Formulario válido');
    }, 2000);
  }

    // this.submitting.set(true);

    // try {

    //   await this.authService.register(
    //     email,
    //     password
    //   );

    // } finally {
    //   this.submitting.set(false);
    // }


    //------------------------------------
    // this.registerForm.reset();// Registro correcto

    // Aquí irá Firebase más adelante:
    // this.authService.register(...)

}
