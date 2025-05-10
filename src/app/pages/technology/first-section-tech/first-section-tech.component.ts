import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FeatureShowcaseSectionComponent } from '../../home/feature-showcase-section/feature-showcase-section.component';

@Component({
  selector: 'app-first-section-tech',
  imports: [FeatureShowcaseSectionComponent, NgOptimizedImage],
  templateUrl: './first-section-tech.component.html',
  styleUrl: './first-section-tech.component.scss'
})
export class FirstSectionTechComponent {

}
