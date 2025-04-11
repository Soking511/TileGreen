import { Component } from '@angular/core';
import { FirstSectionTechComponent } from "../first-section-tech/first-section-tech.component";
import { SecondSectionTechComponent } from "../second-section-tech/second-section-tech.component";
import { SectionHeaderComponent } from "../../../shared/components/section-header/section-header.component";
import { FooterHomeComponent } from "../../home/footer-home/footer-home.component";

@Component({
  selector: 'app-tech-home',
  imports: [FirstSectionTechComponent, SecondSectionTechComponent, SectionHeaderComponent, FooterHomeComponent],
  templateUrl: './tech-home.component.html',
  styleUrl: './tech-home.component.scss'
})
export class TechHomeComponent {

}
