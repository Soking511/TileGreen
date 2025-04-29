import { Component } from '@angular/core';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { ProductExpansionSectionComponent } from "../../product-expansion-section/product-expansion-section.component";

@Component({
  selector: 'app-fourth-section',
  imports: [ButtonComponent, ProductExpansionSectionComponent],
  templateUrl: './fourth-section.component.html',
})
export class FourthSectionComponent {

}
