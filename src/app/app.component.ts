import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import {
  RouterOutlet,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.subscription = this.contactPopupService.isOpen$.subscribe((isOpen) => {
      this.isContactPopupOpen = isOpen;
      this.cdr.markForCheck();
    });

    // Add route change detection for loading indicator
    this.routerSubscription = this.router.events.subscribe((event) => {
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
      title:
        'TileGreen - Transforming Plastic Waste into Sustainable Building Materials',
      description:
        'TileGreen transforms plastic waste into eco-friendly circular building materials. Our innovative technology creates sustainable solutions for construction industry.',
      keywords:
        'green building materials, plastic recycling, sustainable construction, eco tiles, circular economy',
      ogUrl: 'https://tilegreen.org',
    });
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
}
