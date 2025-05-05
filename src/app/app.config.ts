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
  PreloadingStrategy,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

// Enable production mode if we're not in development
if (!isDevMode()) {
  enableProdMode();
}

// Custom preloading strategy to only preload routes with preload: true flag
@Injectable({ providedIn: 'root' })
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preload(route: any, load: () => Observable<any>): Observable<any> {
    return route.data?.preload === true ? load() : of(null);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', // enable position restoration
      }),
      withPreloading(SelectivePreloadingStrategy) // Only preload marked routes
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
  ], 
};
