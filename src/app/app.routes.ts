import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TechHomeComponent } from './pages/technology/tech-home/tech-home.component';
import { HomeAppsComponent } from './pages/applications/home-apps/home-apps.component';
import { HomeLicenseComponent } from './pages/liscence/home-liscence/home-liscence.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'technology',
    component: TechHomeComponent,
  },
  {
    path: 'applications',
    component: HomeAppsComponent,
  },
  {
    path: 'licenses',
    component: HomeLicenseComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
