import {
  Component,
  ElementRef,
  NgZone,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ViewportScroller } from '@angular/common';

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
export class DescriptionScrollComponent implements AfterViewInit {
  @ViewChild('latestElement') latestElement: ElementRef | undefined;
  @ViewChildren('textElement') textElements: QueryList<ElementRef> | undefined;

  text: string[] = [
    'At TileGreen, we envision a different future',
    '—one of abundance and sustainability',
    ' ',
    'Our innovative materials enable us to',
    'build more, not less.',
    ' ',
    'With every new construction project',
    ' ',
    "using TileGreen's products, we seize",
    'the opportunity to create',
    'environmentally friendly solutions',
    ' ',
    'Join us in creating a greener, more sustainable future', // Fixed typo "creative" -> "creating"
  ];
  currentIndex: number = 0;
  isAtEnd: boolean = false;
  isScrolling: boolean = false;
  scrollThrottleTime: number = 10; // ms between scroll actions
  lastScrollTime: number = 0;
  scrollToNextSection: boolean = false;
  animationResetFlag: boolean = false;

  constructor(
    private el: ElementRef,
    private ngZone: NgZone,
    private viewportScroller: ViewportScroller
  ) {
    // Add non-passive wheel and touch event listeners in the constructor
    this.addNonPassiveEventListeners();
  }

  ngAfterViewInit() {
    // Initial setup
    this.checkAndUpdateScrollPosition();
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

      // Throttle scroll events for smoother transitions
      this.handleScrollEvent(event.deltaY);
    }
  }

  private handleScrollEvent(deltaY: number): void {
    const now = Date.now();
    if (
      this.isScrolling ||
      now - this.lastScrollTime < this.scrollThrottleTime
    ) {
      return;
    }

    // Run the scroll handling in NgZone to ensure proper change detection
    this.ngZone.run(() => {
      this.isScrolling = true;
      this.lastScrollTime = now;

      // Handle scroll down - increase index
      if (deltaY > 0) {
        this.increaseIndex();
        // Trigger animation reset
        this.resetAnimations();
      }
      // Handle scroll up - decrease index
      else if (deltaY < 0) {
        this.decreaseIndex();
        // Trigger animation reset
        this.resetAnimations();
      }

      // Scroll to the current index element

      // Reset scrolling flag after animation completes and check for scroll position update
      setTimeout(() => {
        this.isScrolling = false;
        // this.checkAndUpdateScrollPosition();
      }, this.scrollThrottleTime);
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
    // We need to track the touch direction to determine if it's up or down
    if (this.lastTouchY === null) {
      this.lastTouchY = event.touches[0].clientY;
      return;
    }

    const currentTouchY = event.touches[0].clientY;
    const touchDeltaY = this.lastTouchY - currentTouchY;

    // Only handle touch movements if we're not currently animating
    // and it's been long enough since the last scroll
    const now = Date.now();
    if (
      this.isScrolling ||
      now - this.lastScrollTime < this.scrollThrottleTime
    ) {
      return;
    }

    // Use a minimum threshold to avoid accidental swipes
    if (Math.abs(touchDeltaY) > 10) {
      this.ngZone.run(() => {
        this.isScrolling = true;
        this.lastScrollTime = now;

        // Scrolling down (touch moving up)
        if (touchDeltaY > 0) {
          this.increaseIndex();
          this.resetAnimations();
        }
        // Scrolling up (touch moving down)
        else if (touchDeltaY < 0) {
          this.decreaseIndex();
          this.resetAnimations();
        }

        // Scroll to the current index element

        // Reset scrolling flag after animation completes and check for scroll position update
        setTimeout(() => {
          this.isScrolling = false;
          this.checkAndUpdateScrollPosition();
        }, this.scrollThrottleTime);
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

  private lastTouchY: number | null = null;

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
