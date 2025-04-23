import {
  Component,
  Input,
  OnInit,
  HostListener,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { ContactUsPopComponent } from '../contact-us-pop/contact-us-pop.component';
import { ContactPopupService } from '../../../../services/contact-popup.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent, ContactUsPopComponent],
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
  navbarItems = [
    { name: 'About', link: '/about' },
    { name: 'Technology', link: '/technology' },
    { name: 'License', link: '/licenses' },
    { name: 'Applications', link: '/applications' },
    { name: 'Careers', link: '/careers' },
  ];
  private imagePreloaded = false;

  constructor(
    private el: ElementRef,
    private contactPopupService: ContactPopupService
  ) {}

  ngOnInit(): void {
    // Preload image if specified
    if (this.imagePath) {
      const img = new Image();
      img.src = this.imagePath;
      img.onload = () => {
        this.imagePreloaded = true;
      };
    }

    // Initialize scroll state
    this.isScrolled = window.scrollY > 10;
  }

  ngAfterViewInit(): void {
    // Any post-render initialization
  }

  // Add contact popup handler that uses the service
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

  // Close mobile menu when clicking on a link
  closeMobileMenu(): void {
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      document.body.style.overflow = '';
    }
  }

  // Close menu when escape key is pressed
  @HostListener('document:keydown.escape')
  onKeydownHandler() {
    if (this.isMobileMenuOpen) {
      this.toggleMobileMenu();
    }
    // Also close contact popup using the service
    this.contactPopupService.closePopup();
  }

  // Detect scroll event
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }
}
