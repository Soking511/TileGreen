import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FeatureShowcaseSectionComponent } from '../../feature-showcase-section/feature-showcase-section.component';
import {
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import {
  fadeInLeftAnimation,
  fadeInRightAnimation,
  bounceInAnimation,
} from '../../../../services/site-animations.service';

@Component({
  selector: 'app-first-section',
  animations: [
    trigger('fadeInLeftAnimation', [
      state('*', style({ visibility: 'hidden' })),
      state('true', style({ visibility: 'visible' })),
      transition('* => true', useAnimation(fadeInLeftAnimation)),
    ]),
    trigger('fadeInRightAnimation', [
      state('*', style({ visibility: 'hidden' })),
      state('true', style({ visibility: 'visible' })),
      transition('* => true', useAnimation(fadeInRightAnimation)),
    ]),
    trigger('bounceInAnimation', [
      state('*', style({ visibility: 'hidden' })),
      state('true', style({ visibility: 'visible' })),
      transition('* => true', useAnimation(bounceInAnimation)),
    ]),
  ],
  imports: [
    SectionHeaderComponent,
    ButtonComponent,
    FeatureShowcaseSectionComponent,
  ],
  standalone: true,
  templateUrl: './first-section.component.html',
  styleUrls: ['./first-section.component.scss'],
})
export class FirstSectionComponent {
  @ViewChild('animateElement') animateElement?: ElementRef;
  @ViewChildren('animateElements') animateElements?: QueryList<ElementRef>;

  // Store animation states for each element
  public isInViewStates: boolean[] = [];

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
