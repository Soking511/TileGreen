import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-form-careers',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-careers.component.html',
  styleUrls: ['./form-careers.component.scss'],
})
export class FormCareersComponent {
  // Form status flags
  formSubmitted = false;
  formSubmitSuccess = false;
  formSubmitError = false;
  formSubmitting = false;

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
    second_name: new FormControl('', [
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

  resume: File | null = null;
  fileUploaded: boolean = false;

  constructor(private apiService: ApiService) {}

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Validate file type
      if (file.type === 'application/pdf') {
        this.resume = file;
        this.fileUploaded = true;
      } else {
        alert('Please upload a PDF file');
        input.value = ''; // Clear the input
        this.resume = null;
        this.fileUploaded = false;
      }
    }
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.positionForm.valid && this.resume) {
      this.formSubmitting = true;
      this.formSubmitSuccess = false;
      this.formSubmitError = false;

      // Create FormData object to send file along with form data
      const formData = new FormData();

      // Append all form fields
      Object.keys(this.positionForm.controls).forEach((key) => {
        formData.append(key, this.positionForm.get(key)?.value);
      });

      // Append resume file
      if (this.resume) {
        formData.append('resume', this.resume);
      }

      // Send form data to server
      this.apiService.postFormData('/ApplyJob', formData).subscribe(
        (response) => {
          console.log('Form submitted successfully', response);
          this.formSubmitting = false;
          this.formSubmitSuccess = true;

          // Scroll to the success message
          setTimeout(() => {
            const successMessage = document.querySelector('.success-message');
            successMessage?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }, 100);

          this.positionForm.reset();
          this.resume = null;
          this.fileUploaded = false;
        },
        (error) => {
          console.error('Error submitting form', error);
          this.formSubmitting = false;
          this.formSubmitError = true;

          // Scroll to the error message
          setTimeout(() => {
            const errorMessage = document.querySelector('.error-message');
            errorMessage?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }, 100);
        }
      );
    } else {
      // Mark all form controls as touched to show validation errors
      Object.keys(this.positionForm.controls).forEach((key) => {
        const control = this.positionForm.get(key);
        control?.markAsTouched();
      });

      // Find the first error and scroll to it
      setTimeout(() => {
        const firstError = document.querySelector('.text-red-500');
        firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }

  // Helper method to check for errors
  hasError(controlName: string, errorType: string): boolean {
    const control = this.positionForm.get(controlName);
    return !!(control?.touched && control?.hasError(errorType));
  }
}
