import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { JobCategory, JobPosition, JobDataService } from '../../../services/job-data.service';
import { FormCareersComponent } from "./form-careers/form-careers.component";

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

  constructor(private apiService: ApiService, private jobDataService: JobDataService) {}

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
      this.resume = input.files[0];
      this.fileUploaded = true;
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

          // Auto-close popup after successful submission
          setTimeout(() => {
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
          }, 3000);
        },
        (error) => {
          console.error('Error submitting form', error);
          this.formSubmitting = false;
          this.formSubmitError = true;
        }
      );
    } else {
      // Mark all form controls as touched to show validation errors
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
