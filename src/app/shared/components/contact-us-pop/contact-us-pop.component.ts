import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IFaqItem } from '../../interfaces/FaqInterface';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-contact-us-pop',
  imports: [ReactiveFormsModule, NgIf, NgFor, CommonModule],
  templateUrl: './contact-us-pop.component.html',
  styleUrl: './contact-us-pop.component.scss',
  standalone: true,
})
export class ContactUsPopComponent {
  @Input() isOpen = false;
  @Output() closeEvent = new EventEmitter<void>();

  // Form status flags
  formSubmitted = false;
  formSubmitSuccess = false;
  formSubmitError = false;
  formSubmitting = false;

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
      Validators.maxLength(500),
    ]), // Message is optional
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

  faqItems: IFaqItem[] = [
    {
      question: 'What does licensing include?',
      answer:
        'Our licensing package includes full access to the TileGreen technology, ongoing technical support, marketing materials, and regular updates to our recycling processes.',

      keyBenefits: [
        'Exclusive access to patented recycling technology',
        'Comprehensive training and implementation support',
      ],
    },
    {
      question: 'How is TileGreen different from traditional recycling?',
      answer:
        'TileGreen utilizes a proprietary process that transforms waste materials into high-quality tiles, using 60% less energy than traditional recycling methods. We also incorporate circular economy principles by creating products rather than just processing waste.',

      keyBenefits: [
        '60% reduction in energy consumption',
        'Creates value-added products from waste materials',
      ],
    },
    {
      question: 'What are the investment requirements?',
      answer:
        'Investment requirements typically range from $100,000-$500,000 depending on the scale of operation. This covers equipment, training, initial marketing, and setup costs.',

      keyBenefits: [
        'Flexible investment options based on market size',
        'Typical ROI within 18-24 months',
      ],
    },
    {
      question: 'What regions are you prioritizing for licensing?',
      answer:
        'We are currently prioritizing North America, Western Europe, and Australia for licensing opportunities, with plans to expand to Southeast Asia and South America in the near future.',

      keyBenefits: [
        'Strategic market selection based on waste management infrastructure',
        'Targeted regions with strong sustainability initiatives',
      ],
    },
    {
      question: 'How long does the setup process take?',
      answer:
        'The typical setup process takes 3-6 months from signing the licensing agreement to full operational capacity, including equipment installation, staff training, and certification processes.',

      keyBenefits: [
        'Streamlined implementation with expert guidance',
        'Phased approach to minimize disruption to existing operations',
      ],
    },
  ];

  constructor(private apiService: ApiService) {}

  // Open the popup
  open() {
    this.isOpen = true;
    document.body.classList.add('overflow-hidden');
  }

  // Close the popup
  close() {
    this.isOpen = false;
    document.body.classList.remove('overflow-hidden');
    this.closeEvent.emit();
    // Reset form state when closing
    if (this.formSubmitted) {
      setTimeout(() => {
        this.formSubmitted = false;
        this.formSubmitSuccess = false;
        this.formSubmitError = false;
      }, 300);
    }
  }

  // Handle backdrop click to close modal unless clicking on the form
  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('popup-backdrop')) {
      this.close();
    }
  }

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
    // Close all other items when opening a new one
    // if (!item.isOpen) {
    //   this.faqItems.forEach((faqItem) => {
    //     if (faqItem !== item) {
    //       faqItem.isOpen = false;
    //     }
    //   });
    // }
    // item.isOpen = !item.isOpen;
  }

  getKeyBenefit(item: IFaqItem, index: number): string {
    return item.keyBenefits && item.keyBenefits.length > index
      ? item.keyBenefits[index]
      : '';
  }
}
