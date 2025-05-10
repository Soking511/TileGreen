import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AnimateOnScrollDirective } from '../../../shared/directives/animate-on-scroll.directive';
import { trigger, state, style, transition, useAnimation } from '@angular/animations';
import { flipInYAnimation } from '../../../../services/site-animations.service';
import { NgOptimizedImage } from '@angular/common';
import { ProductExpansionSectionComponent } from '../product-expansion-section/product-expansion-section.component';

@Component({
  selector: 'app-fourth-section',
  imports: [
    ButtonComponent,
    ProductExpansionSectionComponent,
    AnimateOnScrollDirective,
    NgOptimizedImage
  ],
  templateUrl: './fourth-section.component.html',
  styleUrls: ['./fourth-section.component.scss'],
  animations: [
    trigger('flipInYAnimation', [
      state('*', style({ visibility: 'hidden' })),
      state('true', style({ visibility: 'visible' })),
      transition('* => true', useAnimation(flipInYAnimation)),
    ]),
  ],
})
export class FourthSectionComponent {}
