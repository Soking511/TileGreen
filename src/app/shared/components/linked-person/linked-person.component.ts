import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-linked-person',
  imports: [],
  templateUrl: './linked-person.component.html',
  styleUrl: './linked-person.component.scss'
})
export class LinkedPersonComponent {
  @Input() link='';
  @Input() name='';
}
