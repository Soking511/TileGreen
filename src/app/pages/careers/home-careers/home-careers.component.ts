import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterHomeComponent } from '../../home/footer-home/footer-home.component';
import { CareersComponent } from '../careers.component';

@Component({
  selector: 'app-home-careers',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterHomeComponent,
    CareersComponent,
  ],
  templateUrl: './home-careers.component.html',
})
export class HomeCareersComponent {
  // Method to handle smooth scrolling to openings section
  scrollToOpenings(): void {
    // Prevent default behavior of anchor links
    event?.preventDefault();

    // Find the element with id 'openings'
    const element = document.getElementById('openings');

    if (element) {
      // Scroll to the element with smooth behavior
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}
