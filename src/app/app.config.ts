import {
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
  PreloadingStrategy,
  PreloadAllModules,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';


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
      // withPreloading(PreloadAllModules)
      withPreloading(SelectivePreloadingStrategy) // Only preload marked routes
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
  ],
};
