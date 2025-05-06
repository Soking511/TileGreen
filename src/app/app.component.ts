import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { ContactUsPopComponent } from './shared/components/contact-us-pop/contact-us-pop.component';
import { ContactPopupService } from '../services/contact-popup.service';
import { SeoService } from '../services/seo.service';
import { Subscription, filter } from 'rxjs';
import { HeaderConfigService } from '../services/header-config.service';
import { PerformanceService } from '../services/performance.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContactUsPopComponent, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  // Injected services using the new inject pattern
  private readonly router = inject(Router);
  private readonly contactPopupService = inject(ContactPopupService);
  private readonly seoService = inject(SeoService);
  private readonly headerConfigService = inject(HeaderConfigService);
  private readonly performanceService = inject(PerformanceService);
  private readonly platformId = inject(PLATFORM_ID);

  // Public properties accessed by the template
  protected isContactPopupOpen = false;
  protected isRouteLoading = false;
  protected headerConfig = this.headerConfigService.defaultConfig;

  // Private subscriptions
  private subscription = new Subscription();
  private isBrowser = isPlatformBrowser(this.platformId);

  ngOnInit(): void {
    this.initContactPopupListener();
    this.initRouteChangeListener();
    this.initSeoDefaults();

    if (this.isBrowser) {
      this.performanceService.optimizePageLoad();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected closeContactPopup(): void {
    this.contactPopupService.closePopup();
  }

  private initContactPopupListener(): void {
    this.subscription.add(
      this.contactPopupService.isOpen$.subscribe((isOpen) => {
        this.isContactPopupOpen = isOpen;
      })
    );
  }

  private initRouteChangeListener(): void {
    // Handle route loading state
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateHeaderConfig(event.url);
        this.isRouteLoading = false;
      });

    // Set initial configuration based on current route
    this.updateHeaderConfig(this.router.url);
  }

  private updateHeaderConfig(url: string): void {
    this.headerConfig = this.headerConfigService.getConfigForRoute(url);
  }

  private initSeoDefaults(): void {
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
}
