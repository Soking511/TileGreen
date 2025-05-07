import { Component } from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import {
  trigger,
  state,
  style,
  transition,
  useAnimation,
} from '@angular/animations';
import { bounceInAnimation, fadeInLeftAnimation, fadeInRightAnimation } from '../../../../../services/site-animations.service';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-first-section-liscence',
  imports: [SectionHeaderComponent, AnimateOnScrollDirective],
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
  templateUrl: './first-section-liscence.component.html',
  styleUrls: ['./first-section-liscence.component.scss'],
})
export class FirstSectionLiscenceComponent {}
