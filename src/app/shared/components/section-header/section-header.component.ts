import {
  trigger,
  state,
  style,
  transition,
  useAnimation,
} from '@angular/animations';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { bounceInAnimation } from '../../../../services/site-animations.service';

@Component({
  selector: 'app-section-header',
  imports: [],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss',
  animations: [
    trigger('bounceInAnimation', [
      state('*', style({ visibility: 'hidden' })),
      state('true', style({ visibility: 'visible' })),
      transition('* => true', useAnimation(bounceInAnimation)),
    ]),
  ],
})
export class SectionHeaderComponent {
  @Input() title: string = '';
  // Capture a single element with the #animateElement template reference
  @ViewChild('animateElement') animateElement?: ElementRef;

  public isInView: boolean = false;

  ngAfterViewInit(): void {
    // Setting up an intersection observer that sets the isInView to 'true' once the element's 10% gets into the viewport
    // thus activating the animation trigger once, then unobserves the element
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.debug(entry.isIntersecting);

          if (entry.isIntersecting) {
            this.isInView = true; // This will trigger the animation

            // Unobserve the element after the animation is triggered
            if (this.animateElement) {
              observer.unobserve(this.animateElement.nativeElement);
            }
          }
        });
      },
      {
        threshold: 0.2, // Trigger only when at least 10% of the element is in view
      }
    );

    // Start observing the component's element that has #animateElement set
    if (this.animateElement) {
      observer.observe(this.animateElement.nativeElement);
    }
  }
}
