import { Injectable } from '@angular/core';

export interface HeaderConfig {
  imagePath?: string | null;
  headTitle1?: string | null;
  headTitle2?: string | null;
  headTitle3?: string | null;
  description1?: string | null;
  button1Text?: string | null;
  navigateTo?: string | null;
  // Optional properties with default values
  headTitle2_2?: string | null;
  headTitleLibre?: string | null;
  headTitle2Font?: string | null;
  description2?: string | null;
  button2Text?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class HeaderConfigService {
  readonly defaultConfig: HeaderConfig = {};

  // Routes configuration map
  private readonly routeConfigs: Record<string, HeaderConfig> = {
    home: {
      headTitle1: 'Innovating ',
      headTitle2: ' technology',
      headTitle3: 'to transform our world',
      description1:
        'Green Technologies to transform plastic waste into circular green building materials, Pioneering the future ',
      button1Text: 'Discover Our Technology',
      button2Text: "Let's Talk",
      imagePath:
        'https://api-tilegreen.pulslytics.agency/media/images/cover.webp/',
      navigateTo: '/technology',
    },
    technology: {
      headTitle1: 'Innovating a Greener',
      headTitle3: ' Tomorrow',
      description1:
        "we're paving the way for a greener and more sustainable future",
      button2Text: "Let's Talk",
      imagePath:
        'https://api-tilegreen.pulslytics.agency/media/images/header/TGBackground3.webp/',
    },
    applications: {
      headTitle1: 'Sustainable Construction',
      headTitle3: 'Starts with Re-PAC',
      description1:
        'We ensure a greener future for construction through our innovative technology',
      button2Text: "Let's Talk",
      imagePath:
        'https://api-tilegreen.pulslytics.agency/media/images/header/TGBackground2.webp',
    },
    careers: {},
    licenses: {
      headTitle1: "Bring TileGreen's",
      headTitle2: 'Technology',
      headTitle3: 'to Your Market',
      description1:
        'Turn unrecyclable plastic into high-performance, carbon-negative',
      imagePath:
        'https://api-tilegreen.pulslytics.agency/media/images/header/TGBackground1.webp',
      description2:
        'building materials. Explore our exclusive licensing opportunities',
      button2Text: 'Express Interest',
    },
    about: {},
  };

  /**
   * Gets the header configuration for a specific route
   * @param url The current URL
   * @returns The header configuration for the route
   */
  getConfigForRoute(url: string): HeaderConfig {
    if (url === '/' || url.includes('/home')) {
      return this.routeConfigs['home'];
    } else if (url.includes('/technology')) {
      return this.routeConfigs['technology'];
    } else if (url.includes('/applications')) {
      return this.routeConfigs['applications'];
    } else if (url.includes('/careers')) {
      return this.routeConfigs['careers'];
    } else if (url.includes('/licenses')) {
      return this.routeConfigs['licenses'];
    } else if (url.includes('/about')) {
      return this.routeConfigs['about'];
    } else {
      return this.routeConfigs['home'];
    }
    return this.defaultConfig;
  }
}
