import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationObserverService {
  private observer: IntersectionObserver;

  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.dispatchEvent(new CustomEvent('elementInView'));
            this.observer.unobserve(target);
          }
        });
      },
      {
        threshold: 0.1
      }
    );
  }

  observe(element: ElementRef): void {
    if (element?.nativeElement) {
      this.observer.observe(element.nativeElement);
    }
  }

  unobserve(element: ElementRef): void {
    if (element?.nativeElement) {
      this.observer.unobserve(element.nativeElement);
    }
  }
}