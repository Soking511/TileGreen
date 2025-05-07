import { Directive, ElementRef, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { AnimationObserverService, AnimationConfig } from '../../../services/animation-observer.service';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[animateOnScroll]',
  standalone: true,
  exportAs: 'animateOnScroll'
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  @Input() animationConfig: AnimationConfig = {};
  @Input() animationClass = 'animate';
  @Output() isInViewChange = new EventEmitter<boolean>();

  private destroy$ = new Subject<void>();
  private _isInView = false;

  constructor(
    private el: ElementRef,
    private animationObserver: AnimationObserverService
  ) {}

  get isInView(): boolean {
    return this._isInView;
  }

  ngOnInit() {
    const config: AnimationConfig = {
      threshold: 0.3,
      ...this.animationConfig
    };

    this.animationObserver
      .observe(this.el, config)
      .pipe(takeUntil(this.destroy$))
      .subscribe(isInView => {
        this._isInView = isInView;
        this.isInViewChange.emit(isInView);

        if (isInView) {
          this.el.nativeElement.classList.add(this.animationClass);
        } else if (!this.animationConfig.once) {
          this.el.nativeElement.classList.remove(this.animationClass);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.animationObserver.unobserve(this.el);
  }
}