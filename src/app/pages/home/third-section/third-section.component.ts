import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { trigger, state, style, transition, useAnimation } from '@angular/animations';
import { bounceInUpAnimation } from '../../../../services/site-animations.service';

@Component({
  selector: 'app-third-section',
  imports: [SectionHeaderComponent],
  animations: [
    trigger('bounceInUpAnimation', [
      state('*', style({ visibility: 'hidden' })),
      state('true', style({ visibility: 'visible' })),
      transition('* => true', useAnimation(bounceInUpAnimation)),
    ]),
  ],
  templateUrl: './third-section.component.html',
  styleUrls: ['./third-section.component.scss'],
})
export class ThirdSectionComponent {

  isInViewStates: boolean[] = [];


  @ViewChild('animateElement') animateElement?: ElementRef;
  @ViewChildren('animateElements') animateElements?: QueryList<ElementRef>;


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
        threshold: 0.5, // Trigger only when at least 10% of the element is in view
      }
    );

    if (this.animateElements) {
      this.animateElements.forEach((el) => {
        observer.observe(el.nativeElement);
      });
    }
  }
}
