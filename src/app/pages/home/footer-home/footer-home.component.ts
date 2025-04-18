import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-footer-home',
  imports: [NgClass, ReactiveFormsModule, NgIf, NgStyle],
  templateUrl: './footer-home.component.html',
})
export class FooterHomeComponent {
  @Input() showFirstSection: boolean = false;
  @Input() firstSectionTitle: string | null = null;
  @Input() firstSectionDescription: string | null = null;
  @Input() firstSectionButtonText: string | null = null;
  @Input() textPosition: string | null = null;
  @Input() imagePath: string | null = null;

  newLetterForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  // Form status flags
  formSubmitted = false;
  formSubmitSuccess = false;
  formSubmitError = false;
  formSubmitting = false;

  constructor(private apiService: ApiService) {}
  onSubmit() {
    if (this.newLetterForm.valid) {
      this.formSubmitting = true;
      this.formSubmitted = false;
      this.formSubmitSuccess = false;
      this.formSubmitError = false;

      this.apiService
        .post('/NewsletterFooter', this.newLetterForm.value)
        .subscribe(
          (response) => {
            console.log('Form submitted successfully', response);
            this.formSubmitting = false;
            this.formSubmitted = true;
            this.formSubmitSuccess = true;
            // Reset only the form fields, not the status
            this.newLetterForm.reset();

            // Reset success message after 5 seconds
            setTimeout(() => {
              this.formSubmitted = false;
            }, 5000);
          },
          (error) => {
            console.error('Error submitting form', error);
            this.formSubmitting = false;
            this.formSubmitted = true;
            this.formSubmitError = true;

            // Reset error message after 5 seconds
            setTimeout(() => {
              this.formSubmitted = false;
            }, 5000);
          }
        );
    } else {
      // Mark form controls as touched to show validation errors
      Object.keys(this.newLetterForm.controls).forEach((key) => {
        const control = this.newLetterForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
