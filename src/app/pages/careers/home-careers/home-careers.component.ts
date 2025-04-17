import { Component } from '@angular/core';
import { QaCareersComponent } from "../qa-careers/qa-careers.component";
import { CareersComponent } from "../careers.component";
import { FormCareersComponent } from "../form-careers/form-careers.component";
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterHomeComponent } from "../../home/footer-home/footer-home.component";

@Component({
  selector: 'app-home-careers',
  imports: [QaCareersComponent, CareersComponent, FormCareersComponent, HeaderComponent, FooterHomeComponent],
  templateUrl: './home-careers.component.html',
})
export class HomeCareersComponent {

}
