import { Component, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  useAnimation,
} from '@angular/animations';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { subtleRevealAnimation } from '../../../../services/site-animations.service';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss',
  animations: [
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
})
export class SectionHeaderComponent {
  @Input() title: string = '';
}
