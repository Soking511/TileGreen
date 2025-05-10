import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ContactPopupService {
  // BehaviorSubject to track the state of the popup
  private isOpenSubject = new BehaviorSubject<boolean>(false);

  // Observable that components can subscribe to
  isOpen$ = this.isOpenSubject.asObservable();

  constructor(private apiService: ApiService) {}

  /**
   * Opens the contact popup
   */
  openPopup(): void {
    this.isOpenSubject.next(true);
    // Prevent scrolling when popup is open
    document.body.style.overflow = 'hidden';
  }
  /**
   * Closes the contact popup
   */
  closePopup(): void {
    this.isOpenSubject.next(false);
    // Re-enable scrolling when popup is closed
    document.body.style.overflow = '';
  }

  /**
   * Submits contact form data to the API
   * @param formData The contact form data to submit
   * @returns Observable of the API response
   */
  submitContactForm(formData: any): Observable<any> {
    return this.apiService.post('/ContactUs', formData);
  }
}
