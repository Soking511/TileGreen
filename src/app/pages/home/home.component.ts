import { Component, OnInit } from '@angular/core';
import { FirstSectionComponent } from './first-section/first-section.component';
import { SecondSectionComponent } from './second-section/second-section.component';
import { ThirdSectionComponent } from './third-section/third-section.component';
import { FourthSectionComponent } from './fourth-section/fourth-section.component';
import { FifthSectionComponent } from './fifth-section/fifth-section.component';
import { FooterHomeComponent } from './footer-home/footer-home.component';
import { CaseStudiesSliderComponent } from '../../shared/components/case-studies-slider/case-studies-slider.component';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FirstSectionComponent,
    SecondSectionComponent,
    ThirdSectionComponent,
    FourthSectionComponent,
    FooterHomeComponent,
    FifthSectionComponent,
    CaseStudiesSliderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  isLoading = true;

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    // Set SEO metadata for home page
    this.seoService.updateMetadata({
      title: 'Innovative Green Building Materials from Recycled Plastic',
      description:
        'TileGreen transforms plastic waste into eco-friendly building materials. Our sustainable technology creates durable construction materials with minimal environmental impact.',
      keywords:
        'green building materials, recycled plastic tiles, sustainable construction, eco-friendly materials, plastic waste recycling',
      ogUrl: 'https://tilegreen.org/home',
      ogImage:
        'https://api-tilegreen.pulslytics.agency/media/images/cover.webp/',
    });

    // Simulate loading time or wait for data to be fetched
    setTimeout(() => {
      this.isLoading = false;
    }, 1000); // Show loader for 1 second
  }
}
