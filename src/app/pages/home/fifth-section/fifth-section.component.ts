import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { SectionHeaderComponent } from "../../../shared/components/section-header/section-header.component";

@Component({
  selector: 'app-fifth-section',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SectionHeaderComponent],
  templateUrl: './fifth-section.component.html',
  styleUrl: './fifth-section.component.scss',
})
export class FifthSectionComponent implements OnInit, OnDestroy {
  slides = [
    // { id: 1, img: 'assets/images/slider/1.png', alt: 'Eco project 1' },
    { id: 2, img: 'assets/images/slider/2.png', alt: 'Featured eco project' },
    { id: 3, img: 'assets/images/slider/3.png', alt: 'Eco project 3' },
    { id: 4, img: 'assets/images/slider/1.png', alt: 'Eco project 4' }, // Reusing image for demo
  ];

  activeSlide = 0;
  totalSlides = this.slides.length;
  slideInterval: any;

  ngOnInit(): void {
    this.startSlideshow();
  }

  ngOnDestroy(): void {
    this.stopSlideshow();
  }

  startSlideshow(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  stopSlideshow(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  prevSlide(): void {
    this.activeSlide =
      this.activeSlide === 0 ? this.totalSlides - 1 : this.activeSlide - 1;
  }

  nextSlide(): void {
    this.activeSlide =
      this.activeSlide === this.totalSlides - 1 ? 0 : this.activeSlide + 1;
  }

  goToSlide(index: number): void {
    this.activeSlide = index;
  }

  isActive(index: number): boolean {
    return this.activeSlide === index;
  }

  handleImageError(event: any): void {
    console.error('Image failed to load:', event.target.src);
    // Optionally set a fallback image
    event.target.src = 'assets/images/placeholder.jpg';
  }
}
