import { Component } from '@angular/core';
import { CareersComponent } from "../careers.component";
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterHomeComponent } from "../../home/footer-home/footer-home.component";

@Component({
  selector: 'app-home-careers',
  imports: [CareersComponent, HeaderComponent, FooterHomeComponent],
  templateUrl: './home-careers.component.html',
})
export class HomeCareersComponent {

}
