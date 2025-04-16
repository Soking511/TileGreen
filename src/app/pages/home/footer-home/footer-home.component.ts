import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer-home',
  imports: [NgStyle, NgClass],
  templateUrl: './footer-home.component.html',
  styleUrl: './footer-home.component.scss',
})
export class FooterHomeComponent {
  @Input() showFirstSection: boolean = false;
  @Input() firstSectionTitle: string | null = null;
  @Input() firstSectionDescription: string | null = null;
  @Input() firstSectionButtonText: string | null = null;
  @Input() textPosition: string | null = null;
  @Input() imagePath: string | null = null;


}
