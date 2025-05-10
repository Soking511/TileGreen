import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Router,
  NavigationEnd,
  RouterOutlet,
  NavigationStart,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { ContactUsPopComponent } from './shared/components/contact-us-pop/contact-us-pop.component';
import { ContactPopupService } from '../services/contact-popup.service';
import { SeoService } from '../services/seo.service';
import { Subscription, filter } from 'rxjs';
import { HeaderConfigService } from '../services/header-config.service';
import { PerformanceService } from '../services/performance.service';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ContactUsPopComponent,
    CommonModule,
    HeaderComponent,
    LoadingComponent,
  ],
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
  private readonly loadingService = inject(LoadingService);

  // Public properties accessed by the template
  protected isContactPopupOpen = false;
  protected isRouteLoading = false;
  protected headerConfig = this.headerConfigService.defaultConfig;

  // Private subscriptions
  private subscription = new Subscription();
  private isBrowser = isPlatformBrowser(this.platformId);
  private readonly baseUrl = 'https://tilegreen.org';

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
    // Handle all navigation events for loading indicator
    this.subscription.add(
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: any) => {
          if (event instanceof NavigationStart) {
            // Show loading indicator when navigation starts
            this.isRouteLoading = true;
          } else if (
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError
          ) {
            // Hide loading indicator when navigation ends (success, cancel, or error)
            this.isRouteLoading = false;

            if (event instanceof NavigationEnd) {
              // Update header config when navigation completes successfully
              this.updateHeaderConfig(event.url);
              
              // Update SEO metadata including canonical URLs
              this.updateSeoForRoute(event.url);
            }
          }
        })
    );

    // Set initial configuration based on current route
    this.updateHeaderConfig(this.router.url);
    this.updateSeoForRoute(this.router.url);
  }

  private updateHeaderConfig(url: string): void {
    this.headerConfig = this.headerConfigService.getConfigForRoute(url);
  }

  private updateSeoForRoute(url: string): void {
    // Create the canonical URL for the current route
    let canonicalPath = url;
    
    // Handle home page special case
    if (url === '/' || url === '/home') {
      canonicalPath = '';
    }
    
    // Create full canonical URL
    const canonicalUrl = `${this.baseUrl}${canonicalPath ? '/' + canonicalPath.replace(/^\//, '') : ''}`;
    
    // Set route-specific SEO data
    let title = 'TileGreen - Transforming Plastic Waste into Sustainable Building Materials';
    let description = 'TileGreen transforms plastic waste into eco-friendly circular building materials. Our innovative technology creates sustainable solutions for construction industry.';
    let keywords = 'green building materials, plastic recycling, sustainable construction, eco tiles, circular economy';
    
    // Customize SEO data based on route
    if (url.includes('technology')) {
      title = 'Technology - TileGreen';
      description = 'Discover TileGreen\'s innovative technology for transforming plastic waste into sustainable building materials.';
      keywords += ', recycling technology, green innovation';
    } else if (url.includes('applications')) {
      title = 'Applications - TileGreen';
      description = 'Explore applications of TileGreen\'s sustainable building materials across various construction projects.';
      keywords += ', building applications, sustainable architecture';
    } else if (url.includes('licenses')) {
      title = 'Licenses - TileGreen';
      description = 'Learn about TileGreen\'s licensing opportunities for our sustainable building materials technology.';
      keywords += ', technology licensing, business opportunities';
    } else if (url.includes('careers')) {
      title = 'Careers - TileGreen';
      description = 'Join TileGreen\'s team and be part of our mission to transform plastic waste into sustainable building materials.';
      keywords += ', green jobs, sustainability careers';
    } else if (url.includes('about')) {
      title = 'About - TileGreen';
      description = 'About TileGreen: Our mission, vision, and journey to transform plastic waste into sustainable building materials.';
      keywords += ', sustainability mission, green company';
    }
    
    // Update SEO metadata with the correct canonical URL
    this.seoService.updateMetadata({
      title,
      description,
      keywords,
      ogUrl: canonicalUrl,
      canonicalUrl,
    });
  }

  private initSeoDefaults(): void {
    // Set default SEO metadata for initial page load
    // This will be overridden when a route change occurs
    const canonicalUrl = `${this.baseUrl}`;
    
    this.seoService.updateMetadata({
      title: 'TileGreen - Transforming Plastic Waste into Sustainable Building Materials',
      description: 'TileGreen transforms plastic waste into eco-friendly circular building materials. Our innovative technology creates sustainable solutions for construction industry.',
      keywords: 'green building materials, plastic recycling, sustainable construction, eco tiles, circular economy',
      ogUrl: canonicalUrl,
      canonicalUrl,
    });
  }
}
