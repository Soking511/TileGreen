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
      this.validateAndProcessFile(input.files[0]);
    }
  }

  handleFileDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.validateAndProcessFile(event.dataTransfer.files[0]);
    }
  }

  private validateAndProcessFile(file: File): void {
    // Check file type
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      alert('File size must be less than 5MB');
      return;
    }

    this.resume = file;
    this.fileUploaded = true;
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.positionForm.valid && this.resume) {
      this.formSubmitting = true;
      this.formSubmitSuccess = false;
      this.formSubmitError = false;

      const formData = new FormData();

      Object.keys(this.positionForm.controls).forEach((key) => {
        formData.append(key, this.positionForm.get(key)?.value);
      });

      if (this.resume) {
        formData.append('resume', this.resume, this.resume.name);
      }

      this.apiService.postFormData('/ApplyJob', formData).subscribe(
        (response) => {
          console.log('Form submitted successfully', response);
          this.formSubmitting = false;
          this.formSubmitSuccess = true;
          this.scrollToElement('.success-message');
          this.resetForm();
        },
        (error) => {
          console.error('Error submitting form', error);
          this.formSubmitting = false;
          this.formSubmitError = true;
          this.scrollToElement('.error-message');
        }
      );
    } else {
      this.markFormGroupTouched();
      this.scrollToElement('.text-red-500');
    }
  }

  // Helper method to check for errors
  hasError(controlName: string, errorType: string): boolean {
    const control = this.positionForm.get(controlName);
    return !!(control?.touched && control?.hasError(errorType));
  }

  // Helper method to scroll to elements
  private scrollToElement(selector: string): void {
    setTimeout(() => {
      const element = document.querySelector(selector);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  // Helper method to mark all form controls as touched
  private markFormGroupTouched(): void {
    Object.keys(this.positionForm.controls).forEach((key) => {
      this.positionForm.get(key)?.markAsTouched();
    });
  }

  // Helper method to reset the form
  private resetForm(): void {
    this.positionForm.reset();
    this.resume = null;
    this.fileUploaded = false;
  }
}
