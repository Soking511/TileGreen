import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { IntroComponent } from './intro/intro.component';
import { FirstSectionComponent } from './first-section/first-section.component';
import { SecondSectionComponent } from './second-section/second-section.component';
import { ThirdSectionComponent } from './third-section/third-section.component';
import { FourthSectionComponent } from './fourth-section/fourth-section.component';
import { FifthSectionComponent } from './fifth-section/fifth-section.component';
import { FooterHomeComponent } from './footer-home/footer-home.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    IntroComponent,
    FirstSectionComponent,
    SecondSectionComponent,
    ThirdSectionComponent,
    FourthSectionComponent,
    FifthSectionComponent,
    FooterHomeComponent,
    LoadingComponent,
    NgIf,
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
    }, 1000); // Show loader for 1.5 seconds
  }
}
