import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactPopupService {
  // BehaviorSubject to track the state of the popup
  private isOpenSubject = new BehaviorSubject<boolean>(false);

  // Observable that components can subscribe to
  isOpen$ = this.isOpenSubject.asObservable();

  constructor() {}

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
}
