import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  // Inyección de dependencias
  private registerFormBuilder  = inject(FormBuilder);

  // Formulario reactivo

registerForm = this.registerFormBuilder.group({
  email: ['', [Validators.required, Validators.email],
],
  password: ['', [Validators.required,Validators.minLength(8)]
],
  repeatPassword: ['', Validators.required]
});
}
