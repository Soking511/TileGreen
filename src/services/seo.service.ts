import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private baseUrl = 'https://tilegreen.org';

  constructor(private title: Title, private meta: Meta) {}

  /**
   * Sets page title and meta tags for SEO
   */
  updateMetadata({
    title = '',
    description = '',
    keywords = '',
    ogType = 'website',
    ogUrl = '',
    ogImage = 'https://api-tilegreen.pulslytics.agency/media/assets/images/cover.webp/',
    canonicalUrl = '',
  }: {
    title?: string;
    description?: string;
    keywords?: string;
    ogType?: string;
    ogUrl?: string;
    ogImage?: string;
    canonicalUrl?: string;
  }): void {
    // Update title
    if (title) {
      const fullTitle = `${title} | TileGreen`;
      this.title.setTitle(fullTitle);
      this.meta.updateTag({ property: 'og:title', content: fullTitle });
      this.meta.updateTag({ property: 'twitter:title', content: fullTitle });
    }

    // Update description
    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({
        property: 'twitter:description',
        content: description,
      });
    }

    // Update keywords
    if (keywords) {
      this.meta.updateTag({ name: 'keywords', content: keywords });
    }

    // Update OpenGraph/Twitter tags
    this.meta.updateTag({ property: 'og:type', content: ogType });

    if (ogUrl) {
      this.meta.updateTag({ property: 'og:url', content: ogUrl });
      this.meta.updateTag({ property: 'twitter:url', content: ogUrl });
    }

    if (ogImage) {
      this.meta.updateTag({ property: 'og:image', content: ogImage });
      this.meta.updateTag({ property: 'twitter:image', content: ogImage });
    }

    // Update canonical URL
    this.updateCanonicalUrl(canonicalUrl || ogUrl);
  }

  /**
   * Updates the canonical URL for the current page
   * @param path - The path segment of the URL (e.g., '/about', '/technology')
   */
  updateCanonicalUrl(path: string): void {
    // Remove any existing canonical links
    const existingCanonicalElement = document.querySelector('link[rel="canonical"]');
    if (existingCanonicalElement) {
      existingCanonicalElement.remove();
    }

    // Create a full URL - if path is already a full URL, use it directly
    const fullUrl = path.startsWith('http') ? path : `${this.baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
    
    // Create and add the canonical link
    const canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', fullUrl);
    document.head.appendChild(canonicalLink);
  }
}
