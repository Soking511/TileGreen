import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';

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
  imports: [CommonModule, HeaderComponent, SectionHeaderComponent],
  templateUrl: './fifth-section.component.html',
  styleUrl: './fifth-section.component.scss',
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
    {
      id: 4,
      img: 'assets/images/slider/2.png',
      alt: 'Eco project 5',
      title: 'Coastal Cleanup Initiative',
      description:
        'Transforming ocean plastic into valuable building materials while cleaning up coastal environments.',
      category: 'Conservation',
      location: 'Manila, PH',
    },
  ];

  currentIndex = 0;
  totalSlides = this.slides.length;
  slideInterval: any;
  visibleSlides = 1;
  private resizeTimeout: any;

  constructor() {
    this.setVisibleSlides();
  }

  @HostListener('window:resize')
  onResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.setVisibleSlides();
    }, 150); // Throttle resize
  }

  ngOnInit(): void {
    // Only start slideshow if slides are visible
    setTimeout(() => this.startSlideshow(), 0);
  }

  ngOnDestroy(): void {
    this.stopSlideshow();
  }

  setVisibleSlides(): void {
    // Set number of visible slides based on screen width
    if (window.innerWidth >= 1024) {
      this.visibleSlides = 3; // Desktop
    } else if (window.innerWidth >= 768) {
      this.visibleSlides = 2; // Tablet
    } else {
      this.visibleSlides = 1; // Mobile
    }
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
    this.stopSlideshow(); // Stop autoplay when user interacts
    this.currentIndex =
      this.currentIndex === 0
        ? Math.max(0, this.totalSlides - this.visibleSlides)
        : Math.max(0, this.currentIndex - 1);
  }

  nextSlide(): void {
    const maxIndex = Math.max(0, this.totalSlides - this.visibleSlides);
    this.currentIndex =
      this.currentIndex >= maxIndex ? 0 : this.currentIndex + 1;
  }

  goToSlide(index: number): void {
    this.stopSlideshow(); // Stop autoplay when user interacts
    this.currentIndex = Math.min(
      index,
      Math.max(0, this.totalSlides - this.visibleSlides)
    );
  }

  isActive(index: number): boolean {
    return (
      index >= this.currentIndex &&
      index < this.currentIndex + this.visibleSlides
    );
  }

  isNearActive(index: number): boolean {
    // Check if the slide is just outside the visible range (for scaling effect)
    return (
      index === this.currentIndex - 1 ||
      index === this.currentIndex + this.visibleSlides
    );
  }

  handleImageError(event: any): void {
    console.error('Image failed to load:', event.target.src);
    // Set a fallback image
    event.target.src = 'assets/images/placeholder.jpg';
  }

  trackBySlide(index: number, item: SlideItem) {
    return item.id;
  }
}
