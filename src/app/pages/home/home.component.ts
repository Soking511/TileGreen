import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { SectionHeaderComponent } from "../../shared/components/section-header/section-header.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, SectionHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
