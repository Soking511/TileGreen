import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FooterHomeComponent } from '../../../home/footer-home/footer-home.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
  keyBenefits?: string[];
}

@Component({
  selector: 'app-second-section-liscence',
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './second-section-liscence.component.html',
})
export class SecondSectionLiscenceComponent {
  contactForm: FormGroup | undefined;
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

  faqItems: FaqItem[] = [
    {
      question: 'What does licensing include?',
      answer:
        'Our licensing package includes full access to the TileGreen technology, ongoing technical support, marketing materials, and regular updates to our recycling processes.',
      isOpen: false,
      keyBenefits: [
        'Exclusive access to patented recycling technology',
        'Comprehensive training and implementation support',
      ],
    },
    {
      question: 'How is TileGreen different from traditional recycling?',
      answer:
        'TileGreen utilizes a proprietary process that transforms waste materials into high-quality tiles, using 60% less energy than traditional recycling methods. We also incorporate circular economy principles by creating products rather than just processing waste.',
      isOpen: false,
      keyBenefits: [
        '60% reduction in energy consumption',
        'Creates value-added products from waste materials',
      ],
    },
    {
      question: 'What are the investment requirements?',
      answer:
        'Investment requirements typically range from $100,000-$500,000 depending on the scale of operation. This covers equipment, training, initial marketing, and setup costs.',
      isOpen: false,
      keyBenefits: [
        'Flexible investment options based on market size',
        'Typical ROI within 18-24 months',
      ],
    },
    {
      question: 'What regions are you prioritizing for licensing?',
      answer:
        'We are currently prioritizing North America, Western Europe, and Australia for licensing opportunities, with plans to expand to Southeast Asia and South America in the near future.',
      isOpen: false,
      keyBenefits: [
        'Strategic market selection based on waste management infrastructure',
        'Targeted regions with strong sustainability initiatives',
      ],
    },
    {
      question: 'How long does the setup process take?',
      answer:
        'The typical setup process takes 3-6 months from signing the licensing agreement to full operational capacity, including equipment installation, staff training, and certification processes.',
      isOpen: false,
      keyBenefits: [
        'Streamlined implementation with expert guidance',
        'Phased approach to minimize disruption to existing operations',
      ],
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      companyName: ['', Validators.required],
      industry: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      region: ['', Validators.required],
      message: [''],
    });
  }

  onSubmit(): void {
    if (this.contactForm) {
      if (this.contactForm.valid) {
        console.log('Form submitted:', this.contactForm.value);
        // Add your API call or other form submission logic here
      } else {
        this.markFormGroupTouched(this.contactForm);
      }
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

  toggleItem(item: FaqItem): void {
    // Close all other items when opening a new one
    if (!item.isOpen) {
      this.faqItems.forEach((faqItem) => {
        if (faqItem !== item) {
          faqItem.isOpen = false;
        }
      });
    }
    item.isOpen = !item.isOpen;
  }

  getKeyBenefit(item: FaqItem, index: number): string {
    return item.keyBenefits && item.keyBenefits.length > index
      ? item.keyBenefits[index]
      : '';
  }
}
