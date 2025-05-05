import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

interface ProductCard {
  imageUrl: string;
  title: string;
}

@Component({
  selector: 'app-product-expansion-section',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-expansion-section.component.html',
})
export class ProductExpansionSectionComponent {
  products: ProductCard[] = [
    {
      imageUrl:
        'https://api-tilegreen.pulslytics.agency/media/images/rectangle-12.png',
      title: 'Roofing tiles',
    },
    {
      imageUrl:
        'https://api-tilegreen.pulslytics.agency/media/images/rectangle-12-4.png',
      title: 'Outdoor Furniture',
    },
    {
      imageUrl:
        'https://api-tilegreen.pulslytics.agency/media/images/rectangle-12-3.png',
      title: 'Cladding Sheets',
    },
    {
      imageUrl:
        'https://api-tilegreen.pulslytics.agency/media/images/rectangle-12-2.png',
      title: 'Panels',
    },
  ];
}
