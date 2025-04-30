import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICompany } from '../../interfaces/companiesInterface';

@Component({
  selector: 'app-logo-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo-carousel.component.html',
  styleUrls: ['./logo-carousel.component.scss'],
})
export class LogoCarouselComponent implements OnInit {
  @Input() logos: ICompany[] = [];
  @Input() animationDuration: number = 30; // Default animation duration in seconds

  ngOnInit(): void {
    // Calculate optimal animation duration based on number of logos
    if (this.logos.length > 0) {
      // Adjust speed based on number of logos, with a minimum duration
      const calculatedDuration = Math.max(20, this.logos.length * 4);
      this.animationDuration = calculatedDuration;
    }

    if (this.animationDuration <= 0) {
      this.animationDuration = 30;
      console.warn('Invalid animation duration, defaulting to 30 seconds');
    }
  }
}
