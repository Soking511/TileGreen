import { Component, inject } from '@angular/core';
import { LogosComponent } from "../../../shared/components/logos/logos.component";
import { ArticleService } from '../../../../services/article.service';

@Component({
  selector: 'app-second-section',
  imports: [LogosComponent],
  templateUrl: './second-section.component.html',
  styleUrls: ['./second-section.component.scss'],
})
export class SecondSectionComponent {
  brandLogos = [
    { url: 'assets/images/logos/1.png', alt: 'Brand 1' },
    { url: 'assets/images/logos/2.png', alt: 'Brand 2' },
    { url: 'assets/images/logos/3.png', alt: 'Brand 3' },
    { url: 'assets/images/logos/4.png', alt: 'Brand 4' },
    { url: 'assets/images/logos/5.png', alt: 'Brand 5' },
    { url: 'assets/images/logos/6.png', alt: 'Brand 6' },
  ];

  articleService = inject(ArticleService);
}
