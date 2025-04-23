import { Component } from '@angular/core';
import { SectionHeaderComponent } from "../../../shared/components/section-header/section-header.component";
import { ButtonComponent } from "../../../shared/components/button/button.component";

@Component({
  selector: 'app-first-section',
  imports: [SectionHeaderComponent, ButtonComponent],
  templateUrl: './first-section.component.html',
})
export class FirstSectionComponent {

}
