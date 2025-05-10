import { NgClass, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { ContactPopupService } from '../../../../services/contact-popup.service';

@Component({
  selector: 'app-footer-home',
  imports: [NgClass, ReactiveFormsModule, NgIf],
  templateUrl: './footer-home.component.html',
  styleUrls: ['./footer-home.component.scss'],
})
export class FooterHomeComponent implements OnInit {
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

  constructor(
    private apiService: ApiService,
    private contactPopupService: ContactPopupService
  ) {}

  ngOnInit(): void {
    // Any initialization logic
  }

  // Open contact popup using the service
  openContactPopup(event: Event): void {
    event.preventDefault();
    this.contactPopupService.openPopup();
  }

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
