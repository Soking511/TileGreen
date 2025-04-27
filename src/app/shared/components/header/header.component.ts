import {
  Component,
  Input,
  OnInit,
  HostListener,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ContactPopupService } from '../../../../services/contact-popup.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isScrolled = window.scrollY > 10;
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
