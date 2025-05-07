import {
  Component,
} from '@angular/core';
import {
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { bounceInAnimation, fadeInLeftAnimation, fadeInRightAnimation } from '../../../../services/site-animations.service';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { FeatureShowcaseSectionComponent } from '../../feature-showcase-section/feature-showcase-section.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AnimateOnScrollDirective } from '../../../shared/directives/animate-on-scroll.directive';
import { NgOptimizedImage } from '@angular/common';

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
  standalone: true,
  templateUrl: './first-section.component.html',
  styleUrls: ['./first-section.component.scss'],
  imports: [
    SectionHeaderComponent,
    FeatureShowcaseSectionComponent,
    ButtonComponent,
    AnimateOnScrollDirective,
    NgOptimizedImage
  ],
})
export class FirstSectionComponent {
}
