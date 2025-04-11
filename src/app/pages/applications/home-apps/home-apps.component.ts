import { Component } from '@angular/core';
import { FirstSectionAppsComponent } from "./first-section-apps/first-section-apps.component";

@Component({
  selector: 'app-home-apps',
  imports: [FirstSectionAppsComponent],
  templateUrl: './home-apps.component.html',
  styleUrl: './home-apps.component.scss'
})
export class HomeAppsComponent {

}
