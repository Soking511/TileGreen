import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactUsPopComponent } from './shared/components/contact-us-pop/contact-us-pop.component';
import { ContactPopupService } from '../services/contact-popup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContactUsPopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TileGreen';
  isContactPopupOpen = false;
  private subscription: Subscription | null = null;

  constructor(private contactPopupService: ContactPopupService) {}

  ngOnInit() {
    this.subscription = this.contactPopupService.isOpen$.subscribe(
      (isOpen) => (this.isContactPopupOpen = isOpen)
    );

    this.subscription = this.contactPopupService.isOpen$.subscribe(
      (isOpen) => (this.isContactPopupOpen = isOpen)
    );
  }

  ngOnDestroy() {
    // Clean up subscription when component is destroyed
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  closeContactPopup() {
    this.contactPopupService.closePopup();
  }
}
