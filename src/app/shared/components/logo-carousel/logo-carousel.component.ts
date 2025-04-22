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
  @Input() animationDuration: number = 5; // Default animation duration in seconds

  ngOnInit(): void {
    // Make sure we have logos to display
    if (!this.logos || this.logos.length === 0) {
      console.warn('No logos provided to the logo carousel component');
    }

    // Ensure animation duration is valid
    if (this.animationDuration <= 0) {
      this.animationDuration = 30;
      console.warn('Invalid animation duration, defaulting to 30 seconds');
    }
  }
}
