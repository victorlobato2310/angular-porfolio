import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = signal(true);
  errorMessage = signal('');
  private routerService = inject(Router);
  private formBuilder = inject(NonNullableFormBuilder);
  form: FormGroup = this.formBuilder.group({
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.control('', [Validators.required]),
  });

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  updateErrorMessage() {
    if (this.form.controls['email'].hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.form.controls['email'].hasError('email')) {
      this.errorMessage.set('invalid email');
    } else {
      this.errorMessage.set('');
    }
  }

  goToHomePage(){
    this.routerService.navigate(['/']);
  }
}
