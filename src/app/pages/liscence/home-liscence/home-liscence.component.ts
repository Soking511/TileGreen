import { Component } from '@angular/core';
import { FirstSectionLiscenceComponent } from "./first-section-liscence/first-section-liscence.component";
import { SecondSectionLiscenceComponent } from "./second-section-liscence/second-section-liscence.component";
import { HeaderComponent } from "../../../shared/components/header/header.component";

@Component({
  selector: 'app-home-liscence',
  imports: [FirstSectionLiscenceComponent, SecondSectionLiscenceComponent, HeaderComponent],
  templateUrl: './home-liscence.component.html',
  styleUrl: './home-liscence.component.scss'
})
export class HomeLicenseComponent {

}
