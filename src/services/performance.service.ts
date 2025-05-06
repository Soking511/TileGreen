import {
  Injectable,
  inject,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PerformanceService {
  private renderer: Renderer2;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Optimizes page load performance
   */
  optimizePageLoad(): void {
    if (!this.isBrowser) return;

    this.preloadCriticalFonts();
    this.optimizeLcpElements();
  }

  /**
   * Preloads critical fonts for better performance
   */
  private preloadCriticalFonts(): void {
    const criticalFonts = [
      'assets/fonts/NeueHaasDisplayRoman.ttf',
      'assets/fonts/LibreBaskerville-Italic.ttf',
      'assets/fonts/NeueHaasDisplayMediu.ttf',
    ];

    criticalFonts.forEach((fontUrl) => {
      const link = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'rel', 'preload');
      this.renderer.setAttribute(link, 'href', fontUrl);
      this.renderer.setAttribute(link, 'as', 'font');
      this.renderer.setAttribute(link, 'type', 'font/ttf');
      this.renderer.setAttribute(link, 'crossorigin', 'anonymous');
      this.renderer.appendChild(document.head, link);
    });
  }

  /**
   * Optimizes Largest Contentful Paint elements
   */
  private optimizeLcpElements(): void {
    setTimeout(() => {
      const lcpElements = document.querySelectorAll(
        '[data-lcp-element="true"]'
      );

      if (lcpElements.length > 0) {
        lcpElements.forEach((element) => {
          this.renderer.setAttribute(element, 'importance', 'high');
        });
      }
    }, 0);
  }
}
