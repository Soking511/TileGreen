import { Component, ViewChild, ElementRef, OnInit, ViewChildren, QueryList } from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { NgIf } from '@angular/common';
import { ProductExpansionSectionComponent } from "../../../product-expansion-section/product-expansion-section.component";
import { trigger, state, style, transition, useAnimation } from '@angular/animations';
import { slideInDownAnimation } from '../../../../../services/site-animations.service';

@Component({
  selector: 'app-first-section-apps',
  imports: [SectionHeaderComponent, ButtonComponent, NgIf, ProductExpansionSectionComponent],
  templateUrl: './first-section-apps.component.html',
  animations: [
    trigger('slideInDownAnimation', [
      state('*', style({ visibility: 'hidden' })),
      state('true', style({ visibility: 'visible' })),
      transition('* => true', useAnimation(slideInDownAnimation)),
    ]),
  ],
  styleUrls: ['./first-section-apps.component.scss'],
})
export class FirstSectionAppsComponent {
  @ViewChildren('animateElements') animateElements?: QueryList<ElementRef>;
  @ViewChild('videoPlayer') videoPlayer: ElementRef<HTMLVideoElement> | undefined;
  @ViewChild('animateElement') animateElement?: ElementRef;
  isInViewStates: boolean[] = [];
  videoLoaded = false;
  isPlaying = false;

  onVideoLoaded(): void {
    this.videoLoaded = true;
  }

  playVideo(): void {
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.play();
      this.isPlaying = true;
    }
  }

  // Listen for when video pauses
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

    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.addEventListener('pause', () => {
        this.isPlaying = false;
      });

      this.videoPlayer.nativeElement.addEventListener('play', () => {
        this.isPlaying = true;
      });
    }
  }
}
