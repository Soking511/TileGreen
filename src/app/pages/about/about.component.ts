import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FooterHomeComponent } from '../home/footer-home/footer-home.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { LogosComponent } from '../../shared/components/logos/logos.component';
import { DescriptionScrollComponent } from './description-scroll/description-scroll.component';
import { ApiService } from '../../../services/api.service';
import { CompaniesService } from '../../../services/companies.service';
import { CaseStudiesSliderComponent } from '../../shared/components/case-studies-slider/case-studies-slider.component';
import { SeoService } from '../../../services/seo.service';

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
  imports: [
    HeaderComponent,
    FooterHomeComponent,
    LogosComponent,
    DescriptionScrollComponent,
    CaseStudiesSliderComponent,
  ],
  templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit, OnDestroy {
  brandLogos = [
    { url: 'https://api-tilegreen.pulslytics.agency/media/images/logos/1.png', alt: 'Brand 1' },
    { url: 'https://api-tilegreen.pulslytics.agency/media/images/logos/2.png', alt: 'Brand 2' },
    { url: 'https://api-tilegreen.pulslytics.agency/media/images/logos/3.png', alt: 'Brand 3' },
    { url: 'https://api-tilegreen.pulslytics.agency/media/images/logos/4.png', alt: 'Brand 4' },
    { url: 'https://api-tilegreen.pulslytics.agency/media/images/logos/5.png', alt: 'Brand 5' },
    { url: 'https://api-tilegreen.pulslytics.agency/media/images/logos/6.png', alt: 'Brand 6' },
  ];

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
    // {
    //   id: 4,
    //   img: 'https://api-tilegreen.pulslytics.agency/media/images/slider/2.png',
    //   alt: 'Eco project 5',
    //   title: 'Coastal Cleanup Initiative',
    //   description:
    //     'Transforming ocean plastic into valuable building materials while cleaning up coastal environments.',
    //   category: 'Conservation',
    //   location: 'Manila, PH',
    // },
  ];

  recognitionLogos: RecognitionLogo[] = [
    {
      name: 'Sustainable Business Award',
      image: 'https://api-tilegreen.pulslytics.agency/media/images/about/logo-award1.png',
    },
    {
      name: 'Green Tech Innovation',
      image: 'https://api-tilegreen.pulslytics.agency/media/images/about/logo-award2.png',
    },
    {
      name: 'Eco Friendly Certification',
      image: 'https://api-tilegreen.pulslytics.agency/media/images/about/logo-award3.png',
    },
    {
      name: 'Environmental Excellence',
      image: 'https://api-tilegreen.pulslytics.agency/media/images/about/logo-award4.png',
    },
    {
      name: 'Circular Economy Leader',
      image: 'https://api-tilegreen.pulslytics.agency/media/images/about/logo-award5.png',
    },
    {
      name: 'Recycling Innovation Award',
      image: 'https://api-tilegreen.pulslytics.agency/media/images/about/logo-award6.png',
    },
    {
      name: 'Green Building Partner',
      image: 'https://api-tilegreen.pulslytics.agency/media/images/about/logo-award7.png',
    },
    {
      name: 'Sustainability Champion',
      image: 'https://api-tilegreen.pulslytics.agency/media/images/about/logo-award8.png',
    },
  ];

  currentIndex = 0;
  totalSlides = this.slides.length;
  slideInterval: any;
  private resizeTimeout: any;

  logosService = inject(CompaniesService);
  constructor(private apiService: ApiService, private seoService: SeoService) {}

  @HostListener('window:resize')
  onResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      // Just clear any resize-related caching if needed
    }, 150);
  }

  ngOnInit(): void {
    // Set SEO metadata for about page
    this.seoService.updateMetadata({
      title: 'About TileGreen - Our Mission and Innovation Story',
      description: 'Learn about TileGreen\'s mission to transform plastic waste into sustainable building materials. Our team is dedicated to environmental sustainability and innovative technology.',
      keywords: 'about TileGreen, green building materials, sustainability mission, eco-friendly innovation, plastic recycling technology',
      ogUrl: 'https://tilegreen.org/about',
      ogImage: 'https://api-tilegreen.pulslytics.agency/media/images/about/company-image.png'
    });

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
