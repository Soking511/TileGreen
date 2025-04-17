import { Component } from '@angular/core';
import { FirstSectionAppsComponent } from "./first-section-apps/first-section-apps.component";
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterHomeComponent } from "../../home/footer-home/footer-home.component";

@Component({
  selector: 'app-home-apps',
  imports: [FirstSectionAppsComponent, HeaderComponent, FooterHomeComponent],
  templateUrl: './home-apps.component.html',
})
export class HomeAppsComponent {

}
