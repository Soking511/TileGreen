import { Component, ViewChild, ElementRef } from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { NgIf } from '@angular/common';
import { trigger, state, style, transition, useAnimation } from '@angular/animations';
import { slideInDownAnimation } from '../../../../../services/site-animations.service';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';
import { ProductExpansionSectionComponent } from "../../../home/product-expansion-section/product-expansion-section.component";

@Component({
  selector: 'app-first-section-apps',
  imports: [SectionHeaderComponent, ButtonComponent, NgIf, AnimateOnScrollDirective, ProductExpansionSectionComponent],
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
  @ViewChild('videoPlayer') videoPlayer: ElementRef<HTMLVideoElement> | undefined;
  videoLoaded = false;
  isPlaying = false;

  onVideoLoaded(): void {
    this.videoLoaded = true;
  }

  playVideo(): void {
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.play();
      this.videoPlayer.nativeElement.currentTime = 0.2;
      this.isPlaying = true;
    }
  }

}
