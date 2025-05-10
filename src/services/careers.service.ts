import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { SweetAlertService } from './sweet-alert.service';

export interface JobApplicationResponse {
  success: boolean;
  message: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class CareersService {
  constructor(private apiService: ApiService, private sweetAlertService:SweetAlertService) {}

  submitJobApplication(
    formGroup: FormGroup,
    resume: File | null
  ): Observable<JobApplicationResponse> {
    if (!resume) {
      throw new Error('Resume file is required');
    }

    const formData = new FormData();

    // Add all form fields from form group
    Object.keys(formGroup.controls).forEach((key) => {
      const value = formGroup.get(key)?.value;
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    // Add the resume file
    formData.append('resume', resume, resume.name);

    // Submit the form data to the API
    return this.apiService.postFormData('/ApplyJob', formData).pipe(
      tap((response) => {
            this.sweetAlertService.success('title', 'Form Submitted Successfully');
        return response;
      }),
      catchError((error) => {
            this.sweetAlertService.error('title', 'Error submitting job application');
        return throwError(() => error);
      })
    );
  }

  validateJobApplication(
    formGroup: FormGroup,
    resume: File | null
  ): { valid: boolean; errorMessage?: string } {
    // Check if form is valid
    if (!formGroup.valid) {
      return {
        valid: false,
        errorMessage: 'Please fill in all required fields correctly',
      };
    }

    // Check if resume is present
    if (!resume) {
      return { valid: false, errorMessage: 'Please upload your resume' };
    }

    return { valid: true };
  }

  getJobPositions(): Observable<any> {
    return this.apiService.get<any>('JobPositions');
  }
}
