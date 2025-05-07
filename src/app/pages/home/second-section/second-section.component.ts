import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { LogosComponent } from "../../../shared/components/logos/logos.component";
import { ArticleService } from '../../../../services/article.service';
import { trigger, state, style, transition, useAnimation } from '@angular/animations';
import { fadeInRightAnimation } from '../../../../services/site-animations.service';

@Component({
  selector: 'app-second-section',
  imports: [LogosComponent],
  templateUrl: './second-section.component.html',
  styleUrls: ['./second-section.component.scss'],
  animations: [
    trigger('fadeInRightAnimation', [
      state('*', style({ visibility: 'hidden' })),
      state('true', style({ visibility: 'visible' })),
      transition('* => true', useAnimation(fadeInRightAnimation)),
    ]),
  ],
})
export class SecondSectionComponent {
  brandLogos = [
    { url: 'https://api-tilegreen.pulslytics.agency/media/images/logos/1.png', alt: 'Brand 1' },
    { url: 'https://api-tilegreen.pulslytics.agency/media/images/logos/2.png', alt: 'Brand 2' },
    { url: 'https://api-tilegreen.pulslytics.agency/media/images/logos/3.png', alt: 'Brand 3' },
    { url: 'https://api-tilegreen.pulslytics.agency/media/images/logos/4.png', alt: 'Brand 4' },
    { url: 'https://api-tilegreen.pulslytics.agency/media/images/logos/5.png', alt: 'Brand 5' },
    { url: 'https://api-tilegreen.pulslytics.agency/media/images/logos/6.png', alt: 'Brand 6' },
  ];

  articleService = inject(ArticleService);

  @ViewChild('animateElement') animateElement?: ElementRef;

  isInView: boolean = false;

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.debug(entry.isIntersecting);

          if (entry.isIntersecting) {
            this.isInView = true;

            if (this.animateElement) {
              observer.unobserve(this.animateElement.nativeElement);
            }
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (this.animateElement) {
      observer.observe(this.animateElement.nativeElement);
    }
  }

}
