import { Component } from '@angular/core';
import { FirstSectionTechComponent } from "../first-section-tech/first-section-tech.component";
import { SecondSectionTechComponent } from "../second-section-tech/second-section-tech.component";
import { FooterHomeComponent } from "../../home/footer-home/footer-home.component";
import { HeaderComponent } from "../../../shared/components/header/header.component";

@Component({
  selector: 'app-tech-home',
  imports: [FirstSectionTechComponent, SecondSectionTechComponent, FooterHomeComponent, HeaderComponent],
  templateUrl: './tech-home.component.html',
})
export class TechHomeComponent {

}
