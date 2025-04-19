import { Component, inject } from '@angular/core';
import { LogoCarouselComponent } from '../logo-carousel/logo-carousel.component';
import { CompaniesService } from '../../../../services/companies.service';

@Component({
  selector: 'app-logos',
  imports: [LogoCarouselComponent],
  templateUrl: './logos.component.html',
  styleUrl: './logos.component.scss',
})
export class LogosComponent {
  logosService = inject(CompaniesService)
  constructor() {}

}
