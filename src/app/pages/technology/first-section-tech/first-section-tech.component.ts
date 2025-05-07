import { Component } from '@angular/core';
import { FeatureShowcaseSectionComponent } from "../../feature-showcase-section/feature-showcase-section.component";
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-first-section-tech',
  imports: [FeatureShowcaseSectionComponent, NgOptimizedImage],
  templateUrl: './first-section-tech.component.html',
  styleUrl: './first-section-tech.component.scss'
})
export class FirstSectionTechComponent {

}
