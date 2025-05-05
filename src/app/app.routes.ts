import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Home - TileGreen',
    data: { preload: true }
  },
  {
    path: 'technology',
    loadComponent: () =>
      import('./pages/technology/tech-home/tech-home.component').then(
        (m) => m.TechHomeComponent
      ),
    title: 'Technology - TileGreen'
  },
  {
    path: 'applications',
    loadComponent: () =>
      import('./pages/applications/home-apps/home-apps.component').then(
        (m) => m.HomeAppsComponent
      ),
    title: 'Applications - TileGreen'
  },
  {
    path: 'licenses',
    loadComponent: () =>
      import('./pages/liscence/home-liscence/home-liscence.component').then(
        (m) => m.HomeLicenseComponent
      ),
    title: 'Licenses - TileGreen'
  },
  {
    path: 'careers',
    loadComponent: () =>
      import('./pages/careers/home-careers/home-careers.component').then(
        (m) => m.HomeCareersComponent
      ),
    title: 'Careers - TileGreen'
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
    title: 'About - TileGreen'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
