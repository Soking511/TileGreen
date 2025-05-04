import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterHomeComponent } from '../../home/footer-home/footer-home.component';
import { CareersComponent } from '../careers.component';
import { SeoService } from '../../../../services/seo.service';

@Component({
  selector: 'app-home-careers',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterHomeComponent,
    CareersComponent,
  ],
  templateUrl: './home-careers.component.html',
})
export class HomeCareersComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    // Set SEO metadata for careers page
    this.seoService.updateMetadata({
      title: 'Careers at TileGreen - Join Our Sustainability Mission',
      description: 'Join TileGreen\'s team and help transform plastic waste into eco-friendly building materials. Explore career opportunities in green technology and sustainable construction.',
      keywords: 'TileGreen careers, sustainability jobs, green technology careers, eco-friendly company jobs, plastic recycling careers',
      ogUrl: 'https://tilegreen.org/careers',
      ogImage: 'assets/images/careers/team-image.png'
    });
  }

  // Method to handle smooth scrolling to openings section
  scrollToOpenings(): void {
    // Prevent default behavior of anchor links
    event?.preventDefault();

    // Find the element with id 'openings'
    const element = document.getElementById('openings');

    if (element) {
      // Scroll to the element with smooth behavior
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}
