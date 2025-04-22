import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { ButtonComponent } from "../../../shared/components/button/button.component";

interface SlideItem {
  id: number;
  img: string;
  alt: string;
  title?: string;
  description?: string;
  category?: string;
  location?: string;
}

@Component({
  selector: 'app-fifth-section',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, ButtonComponent],
  templateUrl: './fifth-section.component.html',
  styles: [
    `
      @keyframes fadeIn {
        from {
          opacity: 0.5;
          transform: scale(0.98);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      .animate-fadeIn {
        animation: fadeIn 0.5s ease-out forwards;
      }
    `,
  ],
})
export class FifthSectionComponent implements OnInit, OnDestroy {
  slides: SlideItem[] = [
    {
      id: 1,
      img: 'assets/images/slider/2.png',
      alt: 'Featured eco project',
      title: 'Plastic Waste Recycling Center',
      description:
        'Converting plastic waste into durable, eco-friendly tiles for sustainable construction projects.',
      category: 'Recycling',
      location: 'Amsterdam, NL',
    },
    {
      id: 2,
      img: 'assets/images/slider/3.png',
      alt: 'Eco project 3',
      title: 'Urban Green Buildings',
      description:
        'Implementing TileGreen materials in urban architecture to reduce carbon footprint and enhance sustainability.',
      category: 'Architecture',
      location: 'Barcelona, ES',
    },
    {
      id: 3,
      img: 'assets/images/slider/1.png',
      alt: 'Eco project 4',
      title: 'Community Waste Management',
      description:
        'Empowering communities to collect and repurpose plastic waste through our innovative technology.',
      category: 'Community',
      location: 'Nairobi, KE',
    },
  ];

  currentIndex = 0;
  totalSlides = this.slides.length;
  slideInterval: any;
  private resizeTimeout: any;

  constructor() {}

  @HostListener('window:resize')
  onResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      // Just clear any resize-related caching if needed
    }, 150);
  }

  ngOnInit(): void {
    setTimeout(() => this.startSlideshow(), 0);
  }

  ngOnDestroy(): void {
    this.stopSlideshow();
  }

  startSlideshow(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopSlideshow(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  // Essential methods for the slider
  getCurrentSlide(): SlideItem | null {
    return this.slides[this.currentIndex] || null;
  }

  getPrevSlide(): SlideItem | null {
    if (this.slides.length <= 1) return null;
    const prevIndex =
      this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
    return this.slides[prevIndex] || null;
  }

  getNextSlide(): SlideItem | null {
    if (this.slides.length <= 1) return null;
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    return this.slides[nextIndex] || null;
  }

  prevSlide(): void {
    this.stopSlideshow();
    this.currentIndex =
      this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  handleImageError(event: any): void {
    event.target.src = 'assets/images/placeholder.jpg';
  }

  trackBySlide(index: number, item: SlideItem) {
    return item.id;
  }
}
