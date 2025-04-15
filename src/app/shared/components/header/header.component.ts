import { Component, Input, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  @Input() headTitle3: string | null = null;
  @Input() description1: string | null = null;
  @Input() description2: string | null = null;
  @Input() imagePath: string | null = null;

  isMobileMenuOpen: boolean = false;
  navbarItems = [
    { name: 'About', link: '/about' },
    { name: 'Technology', link: '/technology' },
    { name: 'license', link: '/licenses' },
    { name: 'Applications', link: '/applications' },
    { name: 'Careers', link: '/careers' },
  ];
  constructor() {}

  ngOnInit(): void {
    // Initialization code
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
  }
}
