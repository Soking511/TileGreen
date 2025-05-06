import {
  Component,
  Input,
  OnInit,
  HostListener,
  AfterViewInit,
  ElementRef,
  PLATFORM_ID,
  Inject,
  Renderer2,
} from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ContactPopupService } from '../../../../services/contact-popup.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Input() button1Text: string | null | undefined = null;
  @Input() button2Text: string | null | undefined = null;
  @Input() headTitle1: string | null | undefined = '';
  @Input() headTitle2: string | null | undefined = '';
  @Input() headTitle2_2: string | null | undefined = '';
  @Input() headTitle3: string | null | undefined = '';
  @Input() headTitleLibre: string | null | undefined = null;
  @Input() headTitle2Font: string | null | undefined = null;
  @Input() description1: string | null | undefined = '';
  @Input() description2: string | null | undefined = '';
  @Input() imagePath: string | null | undefined = null;
  @Input() navigateTo: string | null | undefined = null;

  currentPath: string = '/home';
  isMobileMenuOpen: boolean = false;
  isContactPopupOpen: boolean = false;
  isScrolled: boolean = false;
  isBrowser: boolean;
  navbarItems = [
    { name: 'Home', link: '/home' },
    { name: 'About', link: '/about' },
    { name: 'Technology', link: '/technology' },
    { name: 'Applications', link: '/applications' },
    { name: 'License', link: '/licenses' },
    { name: 'Careers', link: '/careers' },
  ];

  constructor(
    private contactPopupService: ContactPopupService,
    private router: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.isScrolled = window.scrollY > 10;
      this.preloadCriticalAssets();
    }

    this.router.events.subscribe(() => {
      this.currentPath = this.router.url;
    });
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      // Apply optimizations after view is initialized
      this.optimizeLcpElements();
      this.replaceStaticContentWhenReady();
    }
  }

  private preloadCriticalAssets(): void {
    // Inline critical CSS if possible
    const style = this.document.createElement('style');
    style.innerHTML = `
      /* Critical path CSS */
      #main-heading {
        font-family: 'Neue Haas Display', sans-serif;
        font-display: swap;
        opacity: 1 !important;
      }
      @font-face {
        font-family: 'Neue Haas Display';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/assets/fonts/NeueHaasDisplayRoman.ttf') format('truetype');
      }
    `;

    this.document.head.appendChild(style);

    // Preload header background image
    if (this.imagePath) {
      const imgPreload = new Image();
      imgPreload.fetchPriority = 'high';
      imgPreload.src = this.imagePath;

      // Use image decode API to handle image loading
      imgPreload.decode()
        .then(() => console.log('Header image decoded'))
        .catch(err => console.warn('Image decode error:', err));
    }
  }

  private replaceStaticContentWhenReady(): void {
    // Wait for hydration/JS to be ready, then replace static content with dynamic
    setTimeout(() => {
      const headingEl = this.elementRef.nativeElement.querySelector('#main-heading');
      if (headingEl) {
        // Show dynamic content and hide static placeholder
        const hiddenSpans = headingEl.querySelectorAll('span.hidden');
        const staticSpans = headingEl.querySelectorAll('span[style*="font-family"]');
        
        if (hiddenSpans.length > 0 && this.headTitle1) {
          staticSpans.forEach((span: Element) => {
            this.renderer.setStyle(span, 'display', 'none');
          });
          
          hiddenSpans.forEach((span: Element) => {
            this.renderer.removeClass(span, 'hidden');
          });
        }
      }
    }, 100); // Small delay to ensure framework hydration is complete
  }

  private optimizeLcpElements(): void {
    // Find the LCP heading element
    const lcpElements = this.elementRef.nativeElement.querySelectorAll(
      '[data-lcp-element="true"]'
    );

    if (lcpElements.length > 0) {
      // Use Intersection Observer to prioritize rendering when in viewport
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Mark this as highest priority when visible
              entry.target.setAttribute('importance', 'high');
              observer.disconnect(); // Stop observing once triggered
            }
          });
        },
        { threshold: 0.1 }
      );

      lcpElements.forEach((element: Element) => observer.observe(element));
    }
  }

  openContactPopup(event: Event): void {
    event.preventDefault();

    // Close mobile menu if it's open
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }

    // Use the service to open the popup
    this.contactPopupService.openPopup();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    // Prevent scrolling when menu is open
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu(): void {
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      document.body.style.overflow = '';
    }
  }

  @HostListener('document:keydown.escape')
  onKeydownHandler() {
    if (this.isMobileMenuOpen) {
      this.toggleMobileMenu();
    }
    this.contactPopupService.closePopup();
  }

  // Detect scroll event
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  isActive(route: string): boolean {
    if (route === '/home') {
      // Exact match for home route
      return this.router.url === route;
    }
    // Partial match for other routes
    return this.router.url.startsWith(route);
  }
}
