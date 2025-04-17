import { Component } from '@angular/core';
import { SectionHeaderComponent } from "../../../shared/components/section-header/section-header.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-first-section',
  imports: [SectionHeaderComponent, RouterLink],
  templateUrl: './first-section.component.html',
})
export class FirstSectionComponent {

}
