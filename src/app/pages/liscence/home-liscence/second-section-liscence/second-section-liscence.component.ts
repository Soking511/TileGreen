import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../../../services/api.service';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { IFaqItem } from '../../../../shared/interfaces/FaqInterface';
import { QaService } from '../../../../../services/qa.service';


// head-numbers
@Component({
  selector: 'app-second-section-liscence',
  imports: [NgFor, NgIf, ReactiveFormsModule, NgClass, ButtonComponent],
  templateUrl: './second-section-liscence.component.html',
  styleUrls: ['./second-section-liscence.component.scss'],
})
export class SecondSectionLiscenceComponent {
  // Form status flags
  formSubmitted = false;
  formSubmitSuccess = false;
  formSubmitError = false;
  formSubmitting = false;
  qaService = inject(QaService);
  contactForm = new FormGroup({
    full_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(5),
      Validators.maxLength(30),
    ]),
    company_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    position: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    industry: new FormControl('', [Validators.required]),
    country_region: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.maxLength(500)]
    ), // Message is optional
  });

  industries: string[] = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Media',
    'Energy',
    'Construction',
    'Other',
  ];
  selectedQa: IFaqItem | undefined;

  @ViewChild('questionSection') targetSection!: ElementRef;

  constructor(private apiService: ApiService) {}

  onSubmit() {
    if (this.contactForm.valid) {
      this.formSubmitting = true;
      this.formSubmitted = false;
      this.formSubmitSuccess = false;
      this.formSubmitError = false;

      this.apiService.post('/ContactUs', this.contactForm.value).subscribe(
        (response) => {
          console.log('Form submitted successfully', response);
          this.formSubmitting = false;
          this.formSubmitted = true;
          this.formSubmitSuccess = true;
          this.contactForm.reset();

          // Set default values after reset
          this.contactForm.get('industry')?.setValue('');
        },
        (error) => {
          console.error('Error submitting form', error);
          this.formSubmitting = false;
          this.formSubmitted = true;
          this.formSubmitError = true;
        }
      );
    } else {
      console.log('Form is invalid, marking fields as touched');
      // Improve user experience by marking all fields as touched to show errors
      this.markFormGroupTouched(this.contactForm);
    }
  }

  // Helper method to mark all controls as touched
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Helper method to check if a field is invalid and touched
  isFieldInvalid(fieldName: string): boolean {
    if (this.contactForm) {
      const field = this.contactForm.get(fieldName);
      return field ? field.invalid && (field.dirty || field.touched) : false;
    }
    return false;
  }

  // Helper method to check for specific field errors
  getFieldError(fieldName: string, errorType: string): boolean {
    const field = this.contactForm.get(fieldName);
    if (!field) return false;

    return field.touched && field.errors && field.errors[errorType];
  }

  toggleItem(item: IFaqItem): void {
    // selectedQa
    if (this.selectedQa === item) {
      this.selectedQa = undefined;
    } else {
      this.selectedQa = item;
    }
  }

  scrollToSection() {
    this.targetSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  
  getKeyBenefit(item: IFaqItem, index: number): string {
    return item.keyBenefits && item.keyBenefits.length > index
      ? item.keyBenefits[index]
      : '';
  }
}
