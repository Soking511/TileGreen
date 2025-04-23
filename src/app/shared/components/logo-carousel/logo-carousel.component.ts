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
  @Input() animationDuration: number = 1; // Default animation duration in seconds

  ngOnInit(): void {
    if (this.animationDuration <= 0) {
      this.animationDuration = 10;
      console.warn('Invalid animation duration, defaulting to 30 seconds');
    }
  }
}
