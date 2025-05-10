import { Component } from '@angular/core';
import {
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import {
  bounceInAnimation,
  fadeInLeftAnimation,
  fadeInRightAnimation,
  elegantFadeInAnimation,
  subtleRevealAnimation,
  softPulse,
} from '../../../../services/site-animations.service';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AnimateOnScrollDirective } from '../../../shared/directives/animate-on-scroll.directive';
import { NgOptimizedImage } from '@angular/common';
import { FeatureShowcaseSectionComponent } from '../feature-showcase-section/feature-showcase-section.component';

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
    trigger('elegantFadeInAnimation', [
      state('*', style({ visibility: 'hidden' })),
      state('true', style({ visibility: 'visible' })),
      transition(
        '* => true',
        useAnimation(elegantFadeInAnimation)
      ),
    ]),
    trigger('softPulse', [
      state('*', style({ visibility: 'hidden' })),
      state('true', style({ visibility: 'visible' })),
      transition(
        '* => true',
        useAnimation(softPulse)
      ),
    ]),
    trigger('subtleReveal', [
      state('*', style({ visibility: 'hidden' })),
      state('true', style({ visibility: 'visible' })),
      transition(
        '* => true',
        useAnimation(subtleRevealAnimation, {
          params: { duration: '0.7s', delay: '0.2s' },
        })
      ),
    ]),
  ],
  standalone: true,
  templateUrl: './first-section.component.html',
  styleUrls: ['./first-section.component.scss'],
  imports: [
    SectionHeaderComponent,
    FeatureShowcaseSectionComponent,
    ButtonComponent,
    AnimateOnScrollDirective,
    NgOptimizedImage,
  ],
})
export class FirstSectionComponent {}
