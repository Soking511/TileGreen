import { Component, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  useAnimation,
} from '@angular/animations';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { bounceInAnimation } from '../../../../services/site-animations.service';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [AnimateOnScrollDirective],
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
}
