import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-description-scroll',
  standalone: true,
  templateUrl: './description-scroll.component.html',
  styleUrl: './description-scroll.component.scss',
})
export class DescriptionScrollComponent {
  text: string[] = [
    'At TileGreen, we envision a different future',
    '—one of abundance and sustainability',
    ' ',
    'Our innovative materials enable us to',
    'build more, not less.',
    ' ',
    'With every new construction project',
    "using TileGreen's products, we seize",
    'the opportunity to create',
    'environmentally friendly solutions',
    ' ',
    'Join us in creative a greener, more sustainable future',
  ];
  currentIndex: number = 0;
  isAtEnd: boolean = false;

  constructor(private el: ElementRef) {}

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    // If we haven't reached the end of text content, prevent default scrolling
    if (!this.isAtEnd) {
      event.preventDefault();

      // Handle scroll down - increase index
      if (event.deltaY > 0) {
        this.increaseIndex();
      }
      // Handle scroll up - decrease index
      else if (event.deltaY < 0) {
        this.decreaseIndex();
      }
    }
  }

  // Apply the same listener to window events to catch all scrolls
  @HostListener('window:wheel', ['$event'])
  onWindowWheel(event: WheelEvent): void {
    // Check if the event is within our component
    const componentRect = this.el.nativeElement.getBoundingClientRect();
    if (
      event.clientY >= componentRect.top &&
      event.clientY <= componentRect.bottom &&
      !this.isAtEnd
    ) {
      event.preventDefault();

      // Handle scroll down - increase index
      if (event.deltaY > 0) {
        this.increaseIndex();
      }
      // Handle scroll up - decrease index
      else if (event.deltaY < 0) {
        this.decreaseIndex();
      }
    }
  }

  // Handle touch events for mobile devices
  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (!this.isAtEnd) {
      event.preventDefault();
      this.handleTouchMovement(event);
    }
  }

  @HostListener('window:touchmove', ['$event'])
  onWindowTouchMove(event: TouchEvent): void {
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

    // Scrolling down (touch moving up)
    if (touchDeltaY > 0) {
      this.increaseIndex();
    }
    // Scrolling up (touch moving down)
    else if (touchDeltaY < 0) {
      this.decreaseIndex();
    }

    this.lastTouchY = currentTouchY;
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('window:touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    const componentRect = this.el.nativeElement.getBoundingClientRect();
    const touch = event.touches[0];
    if (
      touch.clientY >= componentRect.top &&
      touch.clientY <= componentRect.bottom
    ) {
      this.lastTouchY = touch.clientY;
    }
  }

  @HostListener('touchend', ['$event'])
  @HostListener('window:touchend', ['$event'])
  onTouchEnd(): void {
    this.lastTouchY = null;
  }

  private lastTouchY: number | null = null;

  private increaseIndex(): void {
    if (this.currentIndex < this.text.length - 2) {
      this.currentIndex++;
      // Check if we've reached the end of the content
      if (this.currentIndex >= this.text.length - 2) {
        this.isAtEnd = true;
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
}
