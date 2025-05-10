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
import {
  CareersService,
  JobApplicationResponse,
} from '../../../services/careers.service';
import { FileUploadService } from '../../../services/file-upload.service';

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
    private jobDataService: JobDataService,
    private careersService: CareersService,
    private fileUploadService: FileUploadService
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
    } else if (result.errorMessage) {
      alert(result.errorMessage);
      this.fileUploaded = false;
      this.resume = null;
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
      this.formSubmitError = false;

      // Use the careers service to submit the form
      this.careersService
        .submitJobApplication(this.positionForm, this.resume)
        .subscribe({
          next: (response: JobApplicationResponse) => {
            this.formSubmitting = false;
            this.formSubmitSuccess = true;

            // Auto-close popup after 2 seconds
            setTimeout(() => this.handleFormSuccess(), 2000);
          },
          error: (error: any) => {
            this.formSubmitting = false;
            this.formSubmitError = true;
          },
        });
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
