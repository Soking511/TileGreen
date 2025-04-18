import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [RouterLink, NgClass],
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() buttonText: string = '';
  @Input() linkPath: string | null = null;
  @Input() withArrow: boolean = false;
  @Input() withAnimation: boolean = false;
  @Input() backgroundColor: string = 'white';
  @Input() backgroundColorHover: string = 'blue';
}