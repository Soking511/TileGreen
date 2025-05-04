import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FirstSectionComponent } from './first-section/first-section.component';
import { SecondSectionComponent } from './second-section/second-section.component';
import { ThirdSectionComponent } from './third-section/third-section.component';
import { FourthSectionComponent } from './fourth-section/fourth-section.component';
import { FifthSectionComponent } from './fifth-section/fifth-section.component';
import { FooterHomeComponent } from './footer-home/footer-home.component';
import { CaseStudiesSliderComponent } from '../../shared/components/case-studies-slider/case-studies-slider.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    FirstSectionComponent,
    SecondSectionComponent,
    ThirdSectionComponent,
    FourthSectionComponent,
    FooterHomeComponent,
    FifthSectionComponent,
    CaseStudiesSliderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  isLoading = true;

  ngOnInit(): void {
    // Simulate loading time or wait for data to be fetched
    setTimeout(() => {
      this.isLoading = false;
    }, 1000); // Show loader for 1 second
  }
}
