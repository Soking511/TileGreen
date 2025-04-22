import { NgClass, NgFor } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-description-scroll',
  imports: [NgClass, NgFor],
  templateUrl: './description-scroll.component.html',
  styleUrl: './description-scroll.component.scss',
})
export class DescriptionScrollComponent {
  fullText: string[] = [];
  visibleLinesCount: number = 3; // يبدأ بثلاث سطور
  scrollTriggered = false;

  ngOnInit() {
    const paragraph = `
      Tile Green is a leading company in the field of sustainable construction.
      We offer a wide range of eco-friendly tile solutions.
      Our products combine design, functionality, and environmental responsibility.
      Designed with the latest technologies.
      Aimed at reducing the carbon footprint.
      Delivering high-end, modern aesthetics.
      With a dedicated team of experts.
      Constantly innovating to protect the planet.
      Join us to reshape the future of construction.
    `;

    this.fullText = paragraph.trim().split('\n').map(line => line.trim());
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const bottomReached = (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 50;

    if (bottomReached && this.visibleLinesCount < this.fullText.length) {
      this.visibleLinesCount += 2;
    }
  }

  get visibleLines(): string[] {
    return this.fullText.slice(0, this.visibleLinesCount);
  }
}
