import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { trigger, state, style, transition, useAnimation } from '@angular/animations';
import { elegantFadeInAnimation } from '../../../../services/site-animations.service';

@Component({
  selector: 'app-button',
  imports: [RouterLink, AnimateOnScrollDirective],
  standalone: true,
  animations:[
    trigger('elegantFadeInAnimation', [
      state('*', style({ visibility: 'hidden' })),
      state('true', style({ visibility: 'visible' })),
      transition(
        '* => true',
        useAnimation(elegantFadeInAnimation)
      ),
    ]),
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() buttonText: string = '';
  @Input() linkPath: string | null = null;
  @Input() withArrow: boolean = false;
  @Input() withAnimation: boolean = false;
  @Input() backgroundColor: string = 'white';
  @Input() backgroundColorHover: string = 'blue';
}