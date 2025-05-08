import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import {
  JobCategory,
  JobPosition,
  JobDataService,
} from '../../../services/job-data.service';
import { FormCareersComponent } from './form-careers/form-careers.component';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormCareersComponent],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss',
})
export class CareersComponent implements OnInit {
  jobCategories: JobCategory[] = [];

  // Form popup control
  isFormPopupVisible = false;
  selectedJobTitle = '';

  // Form status flags
  formSubmitted = false;
  formSubmitSuccess = false;
  formSubmitError = false;
  formSubmitting = false;

  // Add a property to track when the form component should be loaded
  formComponentLoaded = false;

  positionForm = new FormGroup({
    position_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
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

  constructor(
    private apiService: ApiService,
    private jobDataService: JobDataService
  ) {}

  ngOnInit(): void {
    // Load job data from service
    this.jobCategories = this.jobDataService.getJobCategories();
  }

  toggleJobExpansion(position: JobPosition): void {
    position.expanded = !position.expanded;
  }

  applyForJob(jobTitle: string): void {
    this.selectedJobTitle = jobTitle;
    this.positionForm.patchValue({
      position_name: jobTitle,
    });
    this.showFormPopup();
  }

  showFormPopup(): void {
    this.isFormPopupVisible = true;
    // Reset form state when showing the popup
    this.formSubmitted = false;
    this.formSubmitSuccess = false;
    this.formSubmitError = false;
    this.fileUploaded = false;
    this.resume = null;

    // Lazy load the form component when needed
    this.formComponentLoaded = true;

    document.body.classList.add('overflow-hidden');
  }

  hideFormPopup(): void {
    this.isFormPopupVisible = false;
    document.body.classList.remove('overflow-hidden');
  }

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

          // Auto-close popup after 3 seconds
          setTimeout(() => this.handleFormSuccess(), 2000);
        },
        (error) => {
          console.error('Error submitting form', error);
          this.formSubmitting = false;
          this.formSubmitError = true;
        }
      );
    } else {
      Object.keys(this.positionForm.controls).forEach((key) => {
        const control = this.positionForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  // Helper method to handle successful form submission
  private handleFormSuccess(): void {
    if (this.formSubmitSuccess) {
      this.hideFormPopup();

      // Reset form after popup is closed
      setTimeout(() => {
        this.positionForm.reset();
        this.resume = null;
        this.fileUploaded = false;
        this.formSubmitted = false;
      }, 300);
    }
  }

  // Helper method to check for errors
  hasError(controlName: string, errorType: string): boolean {
    const control = this.positionForm.get(controlName);
    return !!(control?.touched && control?.hasError(errorType));
  }
}
