import {
  Component,
  ElementRef,
  NgZone,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ViewportScroller } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-description-scroll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './description-scroll.component.html',
  styleUrl: './description-scroll.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '1000ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class DescriptionScrollComponent implements AfterViewInit, OnDestroy {
  @ViewChild('latestElement') latestElement: ElementRef | undefined;
  @ViewChildren('animatedText') textElements!: QueryList<ElementRef>;

  text: string[] = [
    'At TileGreen, we envision a different future',
    '—one of abundance and sustainability',
    'Our innovative materials enable us to',
    'build more, not less.',
    'With every new construction project',
    "using TileGreen's products, we seize",
    'the opportunity to create',
    'environmentally friendly solutions',
    'Join us in creating a greener, more sustainable future',
  ];
  currentIndex: number = 0;
  isAtEnd: boolean = false;
  isScrolling: boolean = false;
  scrollThrottleTime: number = 5; // Reduced throttle time for smoother scrolling
  lastScrollTime: number = Date.now() - 20;
  scrollToNextSection: boolean = false;
  animationResetFlag: boolean = false;
  private lastTouchY: number | null = null;
  private animations: gsap.core.Timeline[] = [];

  constructor(
    private el: ElementRef,
    private ngZone: NgZone,
    private viewportScroller: ViewportScroller
  ) {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Add non-passive wheel and touch event listeners in the constructor
    this.addNonPassiveEventListeners();
  }

  ngAfterViewInit() {
    // Initialize animations asynchronously to avoid blocking user interactions
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.initAnimations();
      }, 0); // Schedule animations to run after the view is stable
    });

    // Ensure the component is ready for interaction immediately
    this.isScrolling = false;
  }

  ngOnDestroy() {
    // Clean up all ScrollTrigger instances when component is destroyed
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    this.animations.forEach((timeline) => timeline.kill());
  }

  private initAnimations() {
    // Get all text elements after view init
    this.textElements.forEach((element, index) => {
      if (!element?.nativeElement) return;

      const textContent = element.nativeElement;

      // Create splitting effect for each line
      const lines = this.splitTextIntoLines(textContent);

      // Create animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textContent,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from(lines, {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
      });

      this.animations.push(tl);
    });
  }

  // Manually split text into lines (alternative to GSAP SplitText)
  private splitTextIntoLines(element: HTMLElement): HTMLElement[] {
    const originalText = element.innerText;
    element.innerHTML = '';

    const lines: HTMLElement[] = [];
    originalText.split('\n').forEach((line) => {
      const lineEl = document.createElement('div');
      lineEl.className = 'line-wrapper';
      lineEl.style.overflow = 'hidden';

      const innerSpan = document.createElement('span');
      innerSpan.className = 'line';
      innerSpan.textContent = line || ' ';
      innerSpan.style.display = 'block';

      lineEl.appendChild(innerSpan);
      element.appendChild(lineEl);
      lines.push(innerSpan);
    });

    return lines;
  }

  // Add non-passive event listeners programmatically instead of using @HostListener
  private addNonPassiveEventListeners(): void {
    // Component-level event listeners
    this.el.nativeElement.addEventListener(
      'wheel',
      this.onWheelEvent.bind(this),
      { passive: false }
    );
    this.el.nativeElement.addEventListener(
      'touchmove',
      this.onTouchMoveEvent.bind(this),
      { passive: false }
    );
    this.el.nativeElement.addEventListener(
      'touchstart',
      this.onTouchStartEvent.bind(this),
      { passive: true }
    );
    this.el.nativeElement.addEventListener(
      'touchend',
      this.onTouchEndEvent.bind(this),
      { passive: true }
    );

    // Window-level event listeners
    window.addEventListener('wheel', this.onWindowWheelEvent.bind(this), {
      passive: false,
    });
    window.addEventListener(
      'touchmove',
      this.onWindowTouchMoveEvent.bind(this),
      { passive: false }
    );
    window.addEventListener(
      'touchstart',
      this.onWindowTouchStartEvent.bind(this),
      { passive: true }
    );
    window.addEventListener('touchend', this.onWindowTouchEndEvent.bind(this), {
      passive: true,
    });
  }

  // Component-level wheel event handler
  private onWheelEvent(event: WheelEvent): void {
    // If we haven't reached the end of text content, prevent default scrolling
    if (!this.isAtEnd) {
      event.preventDefault();

      // Throttle scroll events for smoother transitions
      this.handleScrollEvent(event.deltaY);
    }
  }

  // Window-level wheel event handler
  private onWindowWheelEvent(event: WheelEvent): void {
    // Check if the event is within our component
    const componentRect = this.el.nativeElement.getBoundingClientRect();
    if (
      event.clientY >= componentRect.top &&
      event.clientY <= componentRect.bottom &&
      !this.isAtEnd
    ) {
      event.preventDefault();

      this.handleScrollEvent(event.deltaY);
    }
  }

  private handleScrollEvent(deltaY: number): void {
    const now = Date.now();

    // Ensure rapid scroll events are handled properly
    if (
      this.isScrolling ||
      now - this.lastScrollTime < this.scrollThrottleTime
    ) {
      return;
    }

    this.ngZone.run(() => {
      this.isScrolling = true;
      this.lastScrollTime = now;

      // Handle scroll down - increase index
      if (deltaY > 0) {
        this.increaseIndex();
        this.resetAnimations();
      }
      // Handle scroll up - decrease index
      else if (deltaY < 0) {
        this.decreaseIndex();
        this.resetAnimations();
      }

      // Reset scrolling flag using requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        this.isScrolling = false;
      });
    });
  }

  // Component-level touchmove event handler
  private onTouchMoveEvent(event: TouchEvent): void {
    if (!this.isAtEnd) {
      event.preventDefault();
      this.handleTouchMovement(event);
    }
  }

  // Window-level touchmove event handler
  private onWindowTouchMoveEvent(event: TouchEvent): void {
    // Check if the touch is within our component
    const componentRect = this.el.nativeElement.getBoundingClientRect();
    const touch = event.touches[0];
    if (
      touch.clientY >= componentRect.top &&
      touch.clientY <= componentRect.bottom &&
      !this.isAtEnd
    ) {
      event.preventDefault();
      this.handleTouchMovement(event);
    }
  }

  private handleTouchMovement(event: TouchEvent): void {
    if (this.lastTouchY === null) {
      this.lastTouchY = event.touches[0].clientY;
      return;
    }

    const currentTouchY = event.touches[0].clientY;
    const touchDeltaY = this.lastTouchY - currentTouchY;

    const now = Date.now();
    if (
      this.isScrolling ||
      now - this.lastScrollTime < this.scrollThrottleTime
    ) {
      return;
    }

    if (Math.abs(touchDeltaY) > 5) {
      // Reduced threshold for better responsiveness
      this.ngZone.run(() => {
        this.isScrolling = true;
        this.lastScrollTime = now;

        if (touchDeltaY > 0) {
          this.increaseIndex();
          this.resetAnimations();
        } else if (touchDeltaY < 0) {
          this.decreaseIndex();
          this.resetAnimations();
        }

        // Reset scrolling flag using requestAnimationFrame
        requestAnimationFrame(() => {
          this.isScrolling = false;
        });
      });
    }

    this.lastTouchY = currentTouchY;
  }

  // Component-level touchstart event handler
  private onTouchStartEvent(event: TouchEvent): void {
    this.lastTouchY = event.touches[0].clientY;
  }

  // Window-level touchstart event handler
  private onWindowTouchStartEvent(event: TouchEvent): void {
    const componentRect = this.el.nativeElement.getBoundingClientRect();
    const touch = event.touches[0];
    if (
      touch.clientY >= componentRect.top &&
      touch.clientY <= componentRect.bottom
    ) {
      this.lastTouchY = touch.clientY;
    }
  }

  // Component-level touchend event handler
  private onTouchEndEvent(): void {
    this.lastTouchY = null;
  }

  // Window-level touchend event handler
  private onWindowTouchEndEvent(): void {
    this.lastTouchY = null;
  }

  private increaseIndex(): void {
    if (this.currentIndex < this.text.length - 2) {
      this.currentIndex++;
      // Check if we've reached the end of the content
      if (this.currentIndex >= this.text.length - 2) {
        this.isAtEnd = true;
        this.scrollToNextSection = true;
      }
    }
  }

  private decreaseIndex(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      // We're no longer at the end if we scroll back up
      this.isAtEnd = false;
    }
  }

  // Reset animations by toggling animation flag
  private resetAnimations(): void {
    this.animationResetFlag = !this.animationResetFlag;
  }

  // Simplified the logic to make it more concise and follow the KISS principle
  private checkAndUpdateScrollPosition(): void {
    if (this.isAtEnd && this.scrollToNextSection) {
      this.scrollToNextSection = false;
      const targetElement =
        this.latestElement?.nativeElement ||
        this.el.nativeElement.nextElementSibling;
      targetElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
