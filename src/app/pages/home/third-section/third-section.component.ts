import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  useAnimation,
} from '@angular/animations';
import { bounceInUpAnimation } from '../../../../services/site-animations.service';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { AnimateOnScrollDirective } from '../../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-third-section',
  standalone: true,
  imports: [SectionHeaderComponent, AnimateOnScrollDirective],
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
export class ThirdSectionComponent {}
