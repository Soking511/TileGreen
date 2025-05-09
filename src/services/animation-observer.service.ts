import { Injectable, ElementRef, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

export interface AnimationConfig {
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AnimationObserverService {
  private observers: Map<string, IntersectionObserver> = new Map();
  private defaultConfig: AnimationConfig = {
    threshold: 0.6,
    once: true,
    rootMargin: '0px',
  };

  constructor(private ngZone: NgZone) {}

  observe(element: ElementRef, config: AnimationConfig = {}): Subject<boolean> {
    const mergedConfig = { ...this.defaultConfig, ...config };
    const subject = new Subject<boolean>();
    const observerKey = this.getObserverKey(mergedConfig);

    let observer = this.observers.get(observerKey);

    if (!observer) {
      observer = this.createObserver(mergedConfig);
      this.observers.set(observerKey, observer);
    }

    if (element?.nativeElement) {
      observer.observe(element.nativeElement);
      (element.nativeElement as HTMLElement).__animationSubject = subject;
    }

    return subject;
  }

  unobserve(element: ElementRef): void {
    if (element?.nativeElement) {
      const nativeElement = element.nativeElement as HTMLElement;
      if (nativeElement.__animationSubject) {
        nativeElement.__animationSubject.complete();
        delete nativeElement.__animationSubject;
      }

      this.observers.forEach((observer) => {
        observer.unobserve(nativeElement);
      });
    }
  }

  private createObserver(config: AnimationConfig): IntersectionObserver {
    return new IntersectionObserver(
      (entries) => {
        this.ngZone.run(() => {
          entries.forEach((entry) => {
            const target = entry.target as HTMLElement;
            const subject = target.__animationSubject as Subject<boolean>;

            if (subject) {
              subject.next(entry.isIntersecting);

              if (config.once && entry.isIntersecting) {
                this.unobserve(new ElementRef(target));
              }
            }
          });
        });
      },
      {
        threshold: config.threshold,
        rootMargin: config.rootMargin,
      }
    );
  }

  private getObserverKey(config: AnimationConfig): string {
    return `${config.threshold}-${config.once}-${config.rootMargin}`;
  }
}
