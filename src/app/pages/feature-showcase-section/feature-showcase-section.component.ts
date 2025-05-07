import {
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { bounceInUpAnimation } from '../../../services/site-animations.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feature-showcase-section',
  animations: [
    trigger('bounceInUpAnimation', [
      state('*', style({ visibility: 'hidden' })),
      state('true', style({ visibility: 'visible' })),
      transition('* => true', useAnimation(bounceInUpAnimation)),
    ]),
  ],
  imports: [CommonModule],
  templateUrl: './feature-showcase-section.component.html',
  styleUrls: ['./feature-showcase-section.component.scss'],
})
export class FeatureShowcaseSectionComponent {
  @ViewChild('animateElement') animateElement?: ElementRef;
  @ViewChildren('animateElements') animateElements?: QueryList<ElementRef>;

  // Store animation states for each element
  public isInViewStates: boolean[] = [false, false, false];

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.debug(entry.isIntersecting);

          if (entry.isIntersecting && this.animateElements) {
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
