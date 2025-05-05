import { Component, OnInit } from '@angular/core';
import { FirstSectionTechComponent } from "../first-section-tech/first-section-tech.component";
import { SecondSectionTechComponent } from "../second-section-tech/second-section-tech.component";
import { FooterHomeComponent } from "../../home/footer-home/footer-home.component";
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { SeoService } from "../../../../services/seo.service";

@Component({
  selector: 'app-tech-home',
  standalone: true,
  imports: [FirstSectionTechComponent, SecondSectionTechComponent, FooterHomeComponent, HeaderComponent],
  templateUrl: './tech-home.component.html',
  styleUrls: ['./tech-home.component.scss'],
})
export class TechHomeComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    // Set SEO metadata for technology page
    this.seoService.updateMetadata({
      title: 'Our Green Technology - Innovative Plastic Recycling Process',
      description: "Discover TileGreen's proprietary technology that transforms plastic waste into high-quality, sustainable building materials. Learn about our eco-friendly manufacturing process.",
      keywords: 'green technology, plastic recycling technology, sustainable manufacturing, eco-friendly process, circular building materials',
      ogUrl: 'https://tilegreen.org/technology',
      ogImage: 'assets/images/technology/tech-process.png'
    });
  }
}
