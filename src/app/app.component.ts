import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { ContactUsPopComponent } from './shared/components/contact-us-pop/contact-us-pop.component';
import { ContactPopupService } from '../services/contact-popup.service';
import { Subscription } from 'rxjs';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContactUsPopComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TileGreen';
  isContactPopupOpen = false;
  isRouteLoading = false;
  isBrowser: boolean;
  private subscription: Subscription | null = null;
  private routerSubscription: Subscription | null = null;

  constructor(
    private contactPopupService: ContactPopupService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.subscription = this.contactPopupService.isOpen$.subscribe(
      (isOpen) => {
        this.isContactPopupOpen = isOpen;
        this.cdr.markForCheck();
      }
    );

    // Add route change detection for loading indicator
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isRouteLoading = true;
        this.cdr.markForCheck();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        setTimeout(() => {
          this.isRouteLoading = false;
          this.cdr.markForCheck();
        }, 300); // Short delay to ensure the animation is visible
      }
    });

    // Set default SEO tags
    this.seoService.updateMetadata({
      title: 'TileGreen - Transforming Plastic Waste into Sustainable Building Materials',
      description: 'TileGreen transforms plastic waste into eco-friendly circular building materials. Our innovative technology creates sustainable solutions for construction industry.',
      keywords: 'green building materials, plastic recycling, sustainable construction, eco tiles, circular economy',
      ogUrl: 'https://tilegreen.org'
    });

    if (this.isBrowser) {
      // Optimize LCP loading
      this.optimizeLcpLoading();

      // Report LCP performance metric after load
      this.measureLcpPerformance();
    }
  }

  ngOnDestroy() {
    // Clean up subscriptions when component is destroyed
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  closeContactPopup() {
    this.contactPopupService.closePopup();
  }

  private optimizeLcpLoading(): void {
    // Preload critical assets
    this.preloadCriticalFonts();

    // Prioritize LCP element rendering
    setTimeout(() => {
      const lcpElements = document.querySelectorAll('[data-lcp-element="true"]');
      if (lcpElements.length > 0) {
        lcpElements.forEach(element => {
          // Add priority to LCP element
          this.renderer.setAttribute(element, 'importance', 'high');
        });
      }
    }, 0);
  }

  private preloadCriticalFonts(): void {
    const criticalFonts = [
      'assets/fonts/NeueHaasDisplayBold.ttf',
      'assets/fonts/Inter_18pt-Regular.ttf',
      'assets/fonts/LibreBaskerville-Italic.ttf'
    ];

    criticalFonts.forEach(fontUrl => {
      // Create font preload link for critical fonts
      const link = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'rel', 'preload');
      this.renderer.setAttribute(link, 'href', fontUrl);
      this.renderer.setAttribute(link, 'as', 'font');
      this.renderer.setAttribute(link, 'type', 'font/ttf');
      this.renderer.setAttribute(link, 'crossorigin', 'anonymous');
      this.renderer.appendChild(document.head, link);
    });
  }

  private measureLcpPerformance(): void {
    // Only measure in production or if specifically enabled
    if (window.location.hostname !== 'localhost') {
      // Use Performance Observer to monitor LCP
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];

          // Log LCP timing (could send to analytics in production)
          console.log('LCP:', lastEntry.startTime, 'ms');
        });

        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      }
    }
  }
}
