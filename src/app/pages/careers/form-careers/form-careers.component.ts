import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FileUploadService } from '../../../../services/file-upload.service';
import {
  CareersService,
  JobApplicationResponse,
} from '../../../../services/careers.service';

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
  fileErrorMessage: string | undefined;
  constructor(
    private fileUploadService: FileUploadService,
    private careersService: CareersService
  ) {}
  handleFileInput(event: Event): void {
    const result = this.fileUploadService.processFileInput(event);
    this.processFileResult(result);
  }

  handleFileDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const result = this.fileUploadService.processFileDrop(event);
    this.processFileResult(result);
  }

  private processFileResult(result: {
    file: File | null;
    errorMessage?: string;
  }): void {
    if (result.file) {
      this.resume = result.file;
      this.fileUploaded = true;
      this.fileErrorMessage = undefined;
    } else if (result.errorMessage) {
      this.fileErrorMessage = result.errorMessage;
      this.fileUploaded = false;
      this.resume = null;
      alert(result.errorMessage);
    }
  }
  onSubmit(): void {
    this.formSubmitted = true;

    // Use the careers service to validate the form
    const validation = this.careersService.validateJobApplication(
      this.positionForm,
      this.resume
    );

    if (validation.valid) {
      this.formSubmitting = true;
      this.formSubmitSuccess = false;
      this.formSubmitError = false; // Use the careers service to submit the form
      this.careersService
        .submitJobApplication(this.positionForm, this.resume)
        .subscribe({
          next: (response: JobApplicationResponse) => {
            this.formSubmitSuccess = true;
            this.scrollToElement('.success-message');
            this.resetForm();
          },
          error: (error: any) => {
            this.formSubmitting = false;
            this.formSubmitError = true;
            this.scrollToElement('.error-message');
          },
        });
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
    this.formSubmitting = false;
    this.fileUploaded = false;
    this.fileErrorMessage = undefined;
  }
}
