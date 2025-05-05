import { Component } from '@angular/core';
import { SectionHeaderComponent } from "../../../shared/components/section-header/section-header.component";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { FeatureShowcaseSectionComponent } from "../../feature-showcase-section/feature-showcase-section.component";

@Component({
  selector: 'app-first-section',
  imports: [SectionHeaderComponent, ButtonComponent, FeatureShowcaseSectionComponent],
  templateUrl: './first-section.component.html',
  styleUrls: ['./first-section.component.scss'],
})
export class FirstSectionComponent {

}
