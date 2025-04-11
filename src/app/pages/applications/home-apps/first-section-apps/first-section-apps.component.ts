import { Component } from '@angular/core';
import { SectionHeaderComponent } from "../../../../shared/components/section-header/section-header.component";
import { FooterHomeComponent } from "../../../home/footer-home/footer-home.component";

@Component({
  selector: 'app-first-section-apps',
  imports: [SectionHeaderComponent, FooterHomeComponent],
  templateUrl: './first-section-apps.component.html',
  styleUrl: './first-section-apps.component.scss'
})
export class FirstSectionAppsComponent {

}
