import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ElementRef,
  HostListener,
  ViewChild,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface CaseStudy {
  company: string;
  title: string;
  description: string;
  imagePath: string;
  logo: string;
}

@Component({
  selector: 'app-case-studies-slider',
  templateUrl: './case-studies-slider.component.html',
  styleUrls: ['./case-studies-slider.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class CaseStudiesSliderComponent implements OnInit, OnDestroy {
  @ViewChild('sliderContainer') sliderContainer!: ElementRef;

  caseStudies: CaseStudy[] = [
    {
      company: 'Henkel',
      title: 'Sustainable Outdoor Flooring',
      description:
        'TileGreen supplied interlocking tiles for Henkel, showcasing "Henkel Green". This enhanced the facility\'s exterior and emphasized sustainability.',
      imagePath:
        'https://api-tilegreen.pulslytics.agency/media/images/slider/1.png/',
      logo: 'https://api-tilegreen.pulslytics.agency/media/images/slider/logos/henkel-logo-standalone-svg.png/',
    },
    {
      company: 'Sodic',
      title: 'Branded Walkway Installation',
      description:
        'TileGreen installed interlocking tiles for SODIC, integrating the logo into the landscape. This pavement enhances identity, ensuring durability and aesthetic appeal in a desert setting.',
      imagePath:
        'https://api-tilegreen.pulslytics.agency/media/images/slider/2.png/',
      logo: 'https://api-tilegreen.pulslytics.agency/media/images/slider/logos/SODIC_Logo_Teal_RGB.png/',
    },
    {
      company: 'Sodic',
      title: 'Branded Walkway Installation',
      description:
        'TileGreen and SODIC completed a sustainable paving project with 675 m² of eco-friendly tiles made from recycled plastic, saving 2,893 kg of plastic and 12 million liters of water.',
      imagePath:
        'https://api-tilegreen.pulslytics.agency/media/images/slider/5.webp/',
      logo: 'https://api-tilegreen.pulslytics.agency/media/images/slider/logos/SODIC_Logo_Teal_RGB.png/',
    },
    {
      company: 'Redcon',
      title: 'Sustainable Branded Walkway',
      description:
        'TileGreen and Redcon built an eco-friendly walkway with colorful tiles. The pathway features grass-filled joints for drainage, bordered by gravel and greenery, highlighting Redcon’s sustainable design.',
      imagePath:
        'https://api-tilegreen.pulslytics.agency/media/images/slider/4.png/',
      logo: 'https://api-tilegreen.pulslytics.agency/media/images/slider/logos/Mask group.png/',
    },
  ];

  currentIndex = 0;
  private isBrowser: boolean;

  // Scroll hijacking properties
  isScrollHijackEnabled = true;
  isInView = false;
  stopSpamming=false;
  private observer: IntersectionObserver | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
    }
  }

  ngOnDestroy(): void {
    // Clean up observers
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  get totalCaseStudies(): number {
    return this.caseStudies.length;
  }

  // Override next/prev slide methods
  nextSlide(): void {
    // Change the slide and restore visibility
    if ( this.stopSpamming ) return;
    this.stopSpamming=true;
    if ( this.currentIndex + 1 < this.caseStudies.length) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    setTimeout(() => {
      this.stopSpamming=false;
    }, 150);
  }

  prevSlide(): void {
    if ( this.stopSpamming ) return;
    this.stopSpamming=true;

    if ( this.currentIndex - 1 >= 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.caseStudies.length - 1;
    }
    setTimeout(() => {
      this.stopSpamming=false;
    }, 150);
  }

  goToSlide(index: number): void {
    if (
      index >= 0 &&
      index < this.caseStudies.length &&
      index !== this.currentIndex
    ) {
      // Change the slide and restore visibility
      this.currentIndex = index;
    }
  }

  // Touch event handlers for mobile swipe
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    if (!this.isBrowser || !this.isInView) return;

    this.touchStartX = event.touches[0].clientX;
    this.isSwiping = true;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (!this.isBrowser || !this.isInView || !this.isSwiping) return;

    this.touchEndX = event.touches[0].clientX;
    const distance = this.touchEndX - this.touchStartX;

    // Determine swipe direction for visual feedback
    this.swipeDirection = distance > 0 ? 'right' : 'left';
  }

  @HostListener('touchend')
  onTouchEnd(): void {
    if (!this.isBrowser || !this.isInView || !this.isSwiping) return;

    const distance = this.touchEndX - this.touchStartX;
    const isSwipe = Math.abs(distance) > this.minSwipeDistance;

    if (isSwipe) {
      if (distance > 0) {
        // Swipe right - go to previous slide
        this.prevSlide();
      } else {
        // Swipe left - go to next slide
        this.nextSlide();
      }
    }

    // Reset touch tracking
    this.isSwiping = false;
    this.swipeDirection = null;
  }

  // Touch handling variables
  private touchStartX = 0;
  private touchEndX = 0;
  private minSwipeDistance = 50; // Minimum distance required for a swipe
  private isSwiping = false;
  private swipeDirection: 'left' | 'right' | null = null;


}
