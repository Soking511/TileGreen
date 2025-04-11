import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { SectionHeaderComponent } from "../../shared/components/section-header/section-header.component";
import { IntroComponent } from "./intro/intro.component";
import { FirstSectionComponent } from "./first-section/first-section.component";
import { SecondSectionComponent } from "./second-section/second-section.component";
import { ThirdSectionComponent } from "./third-section/third-section.component";
import { FourthSectionComponent } from "./fourth-section/fourth-section.component";
import { FifthSectionComponent } from "./fifth-section/fifth-section.component";
import { FooterHomeComponent } from "./footer-home/footer-home.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, SectionHeaderComponent, IntroComponent, FirstSectionComponent, SecondSectionComponent, ThirdSectionComponent, FourthSectionComponent, FifthSectionComponent, FooterHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
