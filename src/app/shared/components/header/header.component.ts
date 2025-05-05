import {
  Component,
  Input,
  OnInit,
  HostListener,
  AfterViewInit,
  ElementRef,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  @Input() button1Text: string | null = null;
  @Input() button2Text: string | null = null;
  @Input() headTitle1: string | null = null;
  @Input() headTitle2: string | null = null;
  @Input() headTitle2_2: string | null = null;
  @Input() headTitle3: string | null = null;
  @Input() headTitleLibre: string | null = null;
  @Input() headTitle2Font: string | null = null;
  @Input() description1: string | null = null;
  @Input() description2: string | null = null;
  @Input() imagePath: string | null = null;
  @Input() navigateTo: string | null = null;

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
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.isScrolled = window.scrollY > 10;

    // Pre-initialize content to prevent content layout shifts
    if (this.isBrowser) {
      this.preOptimizeLcpElements();
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      // Apply optimizations after view is initialized
      this.optimizeLcpElements();
    }
  }

  private preOptimizeLcpElements(): void {
    // Pre-render text to prevent layout shifts
    if (
      this.headTitle1 ||
      this.headTitle2 ||
      this.headTitle3 ||
      this.headTitleLibre
    ) {
      // Force immediate parse of fonts to prevent layout shifts during rendering
      document.fonts.ready.then(() => {
        // Font loading completed, content should be stable
        console.log('Fonts loaded for LCP elements');
      });
    }

    // Optimize background image loading if it exists
    if (this.imagePath) {
      const img = new Image();
      img.fetchPriority = 'high';
      img.src = this.imagePath;
      img
        .decode()
        .then(() => {
          console.log('Header image decoded and ready for display');
        })
        .catch((err) => {
          console.warn('Image decoding error:', err);
        });
    }
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
