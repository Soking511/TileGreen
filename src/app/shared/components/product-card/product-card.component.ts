import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="group flex flex-col p-4 sm:p-5 rounded-2xl border-2 border-[#E1DFDF] bg-white transition-all duration-300 transform "
    >
      <div class="relative aspect-[5/2] rounded-xl overflow-hidden mb-4">
        <img
          [src]="imageUrl"
          [alt]="title"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 "
          loading="lazy"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300"
        ></div>
      </div>
      <h3
        class="text-base sm:text-lg md:text-xl text-[#010D26] text-tile-md transition-colors duration-300 text-center"
      >
        {{ title }}
      </h3>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ProductCardComponent {
  @Input() imageUrl!: string;
  @Input() title!: string;
}
