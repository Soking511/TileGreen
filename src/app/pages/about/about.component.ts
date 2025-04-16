import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FooterHomeComponent } from '../home/footer-home/footer-home.component';
import { HeaderComponent } from '../../shared/components/header/header.component';

interface SlideItem {
  id: number;
  img: string;
  alt: string;
  title?: string;
  description?: string;
  category?: string;
  location?: string;
}

interface RecognitionLogo {
  name: string;
  image: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HeaderComponent, FooterHomeComponent, NgFor, NgIf],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit, OnDestroy {
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

  recognitionLogos: RecognitionLogo[] = [
    {
      name: 'Sustainable Business Award',
      image: 'assets/images/about/logo-award1.png',
    },
    {
      name: 'Green Tech Innovation',
      image: 'assets/images/about/logo-award2.png',
    },
    {
      name: 'Eco Friendly Certification',
      image: 'assets/images/about/logo-award3.png',
    },
    {
      name: 'Environmental Excellence',
      image: 'assets/images/about/logo-award4.png',
    },
    {
      name: 'Circular Economy Leader',
      image: 'assets/images/about/logo-award5.png',
    },
    {
      name: 'Recycling Innovation Award',
      image: 'assets/images/about/logo-award6.png',
    },
    {
      name: 'Green Building Partner',
      image: 'assets/images/about/logo-award7.png',
    },
    {
      name: 'Sustainability Champion',
      image: 'assets/images/about/logo-award8.png',
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
    this.startSlideshow();
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
