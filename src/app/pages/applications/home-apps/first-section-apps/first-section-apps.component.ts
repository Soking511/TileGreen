import { Component } from '@angular/core';
import { SectionHeaderComponent } from "../../../../shared/components/section-header/section-header.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";

@Component({
  selector: 'app-first-section-apps',
  imports: [SectionHeaderComponent, ButtonComponent],
  templateUrl: './first-section-apps.component.html',
})
export class FirstSectionAppsComponent {

}
