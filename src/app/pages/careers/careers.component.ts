import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCareersComponent } from './form-careers/form-careers.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../services/api.service';

interface JobCategory {
  name: string;
  positions: JobPosition[];
}

interface JobPosition {
  title: string;
  description: string;
  expanded: boolean;
  requirements?: string[];
  responsibilities?: string[];
}

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, FormCareersComponent, ReactiveFormsModule],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss',
})
export class CareersComponent implements OnInit {
  jobCategories: JobCategory[] = [
    {
      name: 'Engineering & Manufacturing',
      positions: [
        {
          title: 'Mechanical Engineer',
          description: 'Design and optimize production machinery',
          expanded: false,
          requirements: [
            'B.S. in Mechanical Engineering or related field',
            'Experience with CAD software',
            'Knowledge of manufacturing processes',
          ],
          responsibilities: [
            'Design mechanical systems for plastic recycling',
            'Optimize machinery for efficiency and sustainability',
            'Collaborate with cross-functional teams',
          ],
        },
        {
          title: 'Automation Engineer',
          description:
            'Implement robotics and automation for scalable production',
          expanded: false,
          requirements: [
            'B.S. in Automation, Robotics, or related field',
            'Experience with industrial automation systems',
            'Programming skills (Python, C++, or similar)',
          ],
          responsibilities: [
            'Design and implement automation systems',
            'Program robotics for manufacturing processes',
            'Troubleshoot and optimize automated systems',
          ],
        },
        {
          title: 'Industrial Designer',
          description: 'Design modular and scalable manufacturing systems',
          expanded: false,
          requirements: [
            'Degree in Industrial Design or related field',
            'Experience with manufacturing processes',
            'Knowledge of sustainable design principles',
          ],
          responsibilities: [
            'Create ergonomic and efficient manufacturing layouts',
            'Design with sustainability and scalability in mind',
            'Work with engineering team to implement designs',
          ],
        },
      ],
    },
    {
      name: 'Business & Operations',
      positions: [
        {
          title: 'Operations Manager',
          description: 'Oversee production, logistics, and quality control.',
          expanded: false,
          requirements: [
            'B.S. in Operations Management or related field',
            'Experience managing manufacturing operations',
            'Strong leadership and communication skills',
          ],
          responsibilities: [
            'Manage day-to-day operations',
            'Ensure quality standards are met',
            'Optimize production efficiency',
          ],
        },
        {
          title: 'Product Manager',
          description:
            "Develop market strategies for TileGreen's materials and products.",
          expanded: false,
          requirements: [
            'B.S. in Marketing, Business, or related field',
            'Experience in product management',
            'Knowledge of sustainable products market',
          ],
          responsibilities: [
            'Develop product roadmaps',
            'Conduct market research',
            'Work with sales team to promote products',
          ],
        },
      ],
    },
  ];

  // Form popup control
  isFormPopupVisible = false;
  selectedJobTitle = '';

  // Form status flags
  formSubmitted = false;
  formSubmitSuccess = false;
  formSubmitError = false;
  formSubmitting = false;

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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Initialize component
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

    // Add class to prevent body scrolling
    document.body.classList.add('overflow-hidden');

    // Focus trap for accessibility
    // setTimeout(() => {
    //   const firstInput = document.querySelector('#position') as HTMLElement;
    //   firstInput?.focus();
    // }, 100);
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
