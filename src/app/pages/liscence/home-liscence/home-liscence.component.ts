import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { FirstSectionLiscenceComponent } from './first-section-liscence/first-section-liscence.component';
import { SecondSectionLiscenceComponent } from './second-section-liscence/second-section-liscence.component';
import { FooterHomeComponent } from '../../home/footer-home/footer-home.component';
import { SeoService } from '../../../../services/seo.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home-liscence',
  standalone: true,
  imports: [
    FirstSectionLiscenceComponent,
    SecondSectionLiscenceComponent,
    FooterHomeComponent,
  ],
  templateUrl: './home-liscence.component.html',
  styleUrls: ['./home-liscence.component.scss'],
})
export class HomeLicenseComponent implements OnInit, AfterViewInit {
  constructor(
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // Set SEO metadata for licenses page
    this.seoService.updateMetadata({
      title: 'Licensing Opportunities - Partner with TileGreen',
      description:
        'Explore licensing opportunities with TileGreen to transform plastic waste into sustainable building materials in your region. Join our global network of eco-friendly construction partners.',
      keywords:
        'TileGreen licensing, sustainable building materials license, eco-friendly construction partnership, green technology licensing, plastic recycling business opportunity',
      ogUrl: 'https://tilegreen.org/licenses',
      ogImage:
        'https://api-tilegreen.pulslytics.agency/media/images/license-section/license-hero.png',
    });
  }

  ngAfterViewInit(): void {
    // Add business opportunity structured data for better search results
    if (isPlatformBrowser(this.platformId)) {
      this.addLicensingStructuredData();
    }
  }

  private addLicensingStructuredData(): void {
    const licensingSchema = {
      '@context': 'https://schema.org/',
      '@type': 'BusinessOpportunity',
      name: 'TileGreen Sustainable Building Materials Licensing Program',
      description:
        'Partner with TileGreen to license our proprietary technology for transforming plastic waste into eco-friendly building materials in your region.',
      provider: {
        '@type': 'Organization',
        name: 'TileGreen',
        url: 'https://tilegreen.org',
      },
      offers: {
        '@type': 'Offer',
        category: 'Green Technology Licensing',
        availability: 'https://schema.org/InStock',
        businessFunction: 'https://purl.org/goodrelations/v1#LeaseOut',
      },
      potentialAction: {
        '@type': 'ContactAction',
        name: 'Contact for Licensing Information',
        url: 'https://tilegreen.org/licenses#contact',
      },
      audience: {
        '@type': 'BusinessAudience',
        audienceType:
          'Construction companies, Manufacturers, Sustainability-focused businesses',
      },
      keywords: [
        'green technology licensing',
        'sustainable building materials',
        'plastic waste recycling',
        'eco-friendly construction',
        'circular economy',
      ],
    };

    // Create script element for JSON-LD
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(licensingSchema);
    this.document.head.appendChild(script);
  }
}
