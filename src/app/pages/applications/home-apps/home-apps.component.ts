import { Component } from '@angular/core';
import { FirstSectionAppsComponent } from "./first-section-apps/first-section-apps.component";
import { HeaderComponent } from "../../../shared/components/header/header.component";

@Component({
  selector: 'app-home-apps',
  imports: [FirstSectionAppsComponent, HeaderComponent],
  templateUrl: './home-apps.component.html',
  styleUrl: './home-apps.component.scss'
})
export class HomeAppsComponent {

}
