import {
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { Component } from '@angular/core';
import { bounceInUpAnimation } from '../../../services/site-animations.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-feature-showcase-section',
  standalone: true,
  animations: [
    trigger('bounceInUpAnimation', [
      state('*', style({ visibility: 'hidden' })),
      state('true', style({ visibility: 'visible' })),
      transition('* => true', useAnimation(bounceInUpAnimation)),
    ]),
  ],
  imports: [CommonModule, AnimateOnScrollDirective, NgOptimizedImage],
  templateUrl: './feature-showcase-section.component.html',
  styleUrls: ['./feature-showcase-section.component.scss'],
})
export class FeatureShowcaseSectionComponent {
  // No more animation state variables needed since we're using the directive
}
