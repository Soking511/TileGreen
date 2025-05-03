import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  enableProdMode,
} from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

// Enable production mode if we're not in development
if (!isDevMode()) {
  enableProdMode();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', // enable position restoration
      }),
      withPreloading(PreloadAllModules) // Preload all lazy-loaded modules
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
  ],
};
