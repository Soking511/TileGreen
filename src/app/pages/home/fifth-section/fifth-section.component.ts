import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { LinkedPersonComponent } from '../../../shared/components/linked-person/linked-person.component';
import { AnimateOnScrollDirective } from '../../../shared/directives/animate-on-scroll.directive';
import { trigger, state, style, transition, useAnimation } from '@angular/animations';
import { bounceInAnimation } from '../../../../services/site-animations.service';

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
  imports: [
    CommonModule,
    SectionHeaderComponent,
    ButtonComponent,
    LinkedPersonComponent,
    AnimateOnScrollDirective,
    NgOptimizedImage
  ],
  templateUrl: './fifth-section.component.html',
  styleUrls: ['./fifth-section.component.scss'],
  animations: [
    trigger('bounceInAnimation', [
      state('*', style({ visibility: 'hidden' })),
      state('true', style({ visibility: 'visible' })),
      transition('* => true', useAnimation(bounceInAnimation)),
    ]),
  ],
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
      img: 'https://api-tilegreen.pulslytics.agency/media/images/slider/2.png',
      alt: 'Featured eco project',
      title: 'Plastic Waste Recycling Center',
      description:
        'Converting plastic waste into durable, eco-friendly tiles for sustainable construction projects.',
      category: 'Recycling',
      location: 'Amsterdam, NL',
    },
    {
      id: 2,
      img: 'https://api-tilegreen.pulslytics.agency/media/images/slider/3.png',
      alt: 'Eco project 3',
      title: 'Urban Green Buildings',
      description:
        'Implementing TileGreen materials in urban architecture to reduce carbon footprint and enhance sustainability.',
      category: 'Architecture',
      location: 'Barcelona, ES',
    },
    {
      id: 3,
      img: 'https://api-tilegreen.pulslytics.agency/media/images/slider/1.png',
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
    event.target.src = 'https://api-tilegreen.pulslytics.agency/media/images/placeholder.jpg';
  }

  trackBySlide(index: number, item: SlideItem) {
    return item.id;
  }
}
