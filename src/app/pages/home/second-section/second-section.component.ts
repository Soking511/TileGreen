import { Component, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { LogosComponent } from "../../../shared/components/logos/logos.component";
import { ArticleService } from '../../../../services/article.service';
import { trigger, state, style, transition, useAnimation } from '@angular/animations';
import { fadeInLeftAnimation, fadeInRightAnimation } from '../../../../services/site-animations.service';

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
    trigger('fadeInLeftAnimation', [
      state('*', style({ visibility: 'hidden' })),
      state('true', style({ visibility: 'visible' })),
      transition('* => true', useAnimation(fadeInLeftAnimation)),
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
  @ViewChildren('animateElements') animateElements?: QueryList<ElementRef>;

  // Store animation states for each element
  isInViewStates: boolean[] = [];

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.debug(entry.isIntersecting);

          if (entry.isIntersecting && this.animateElements) {
            // Find the index of the element and mark it as 'true' in the isInViewsStates boolean array
            const index = this.animateElements
              .toArray()
              .findIndex((el) => el.nativeElement === entry.target);
            if (index !== -1) {
              this.isInViewStates[index] = true; // This will trigger the animation for the related element

              // Stop observing this element
              observer.unobserve(entry.target); // unobserve the related element after the animation has triggered
            }
          }
        });
      },
      {
        threshold: 0.2, // Trigger only when at least 10% of the element is in view
      }
    );

    if (this.animateElements) {
      this.animateElements.forEach((el) => {
        observer.observe(el.nativeElement);
      });
    }
  }

}
