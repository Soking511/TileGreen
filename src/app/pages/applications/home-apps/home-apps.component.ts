import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { FirstSectionAppsComponent } from './first-section-apps/first-section-apps.component';
import { FooterHomeComponent } from '../../home/footer-home/footer-home.component';
import { SeoService } from '../../../../services/seo.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home-apps',
  standalone: true,
  imports: [FirstSectionAppsComponent, FooterHomeComponent],
  templateUrl: './home-apps.component.html',
  styleUrls: ['./home-apps.component.scss'],
})
export class HomeAppsComponent {
  constructor(
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // Set SEO metadata for applications page
    this.seoService.updateMetadata({
      title:
        'TileGreen Applications - Innovative Sustainable Building Materials',
      description:
        "Discover the versatile applications of TileGreen's eco-friendly building materials made from recycled plastic. Our sustainable products offer durability, aesthetics, and environmental benefits.",
      keywords:
        'green building applications, sustainable construction materials, recycled plastic tiles, eco-friendly flooring, sustainable wall tiles, green building products',
      ogUrl: 'https://tilegreen.org/applications',
      ogImage: 'assets/images/applications-section/applications-hero.png',
    });
  }

  ngAfterViewInit(): void {
    // Add product structured data for better search results
    if (isPlatformBrowser(this.platformId)) {
      this.addProductStructuredData();
    }
  }

  private addProductStructuredData(): void {
    const productSchema = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: 'Re-PAC Sustainable Building Materials',
      description:
        'Eco-friendly building materials made from recycled plastic waste, offering durability, aesthetics, and environmental benefits for sustainable construction projects.',
      brand: {
        '@type': 'Brand',
        name: 'TileGreen',
      },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/PreOrder',
        price: '0',
        priceCurrency: 'USD',
        priceValidUntil: '2025-12-31',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '89',
      },
      image: [
        'https://tilegreen.org/assets/images/applications-section/applications-hero.png',
        'https://tilegreen.org/assets/images/applications-section/flooring-application.png',
        'https://tilegreen.org/assets/images/applications-section/wall-tiles-application.png',
      ],
      material: 'Recycled Plastic',
      isSustainableResourceConsumption: true,
    };

    // Create script element for JSON-LD
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(productSchema);
    this.document.head.appendChild(script);
  }
}
