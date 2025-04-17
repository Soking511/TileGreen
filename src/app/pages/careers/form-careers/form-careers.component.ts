import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterHomeComponent } from '../../home/footer-home/footer-home.component';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-form-careers',
  standalone: true,
  imports: [FooterHomeComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './form-careers.component.html',
})
export class FormCareersComponent {
  positionForm = new FormGroup({
    position_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    first_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    last_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    phone_number: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(15),
      Validators.pattern(/^\d+$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  resumeFile: File | null = null;
  fileUploaded: boolean = false;
  formSubmitted: boolean = false;

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.resumeFile = input.files[0];
      this.fileUploaded = true;
    }
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.positionForm.valid && this.resumeFile) {

      this.positionForm.reset();
      this.resumeFile = null;
      this.fileUploaded = false;
      this.formSubmitted = false;
    } else {
      Object.keys(this.positionForm.controls).forEach((key) => {
        const control = this.positionForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  // Helper method to check for errors
  hasError(controlName: string, errorType: string): boolean {
    const control = this.positionForm.get(controlName);
    return !!(control?.touched && control?.hasError(errorType));
  }
}
