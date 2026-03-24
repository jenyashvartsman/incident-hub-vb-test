import { Routes } from '@angular/router';
import { PageShellComponent } from './core/layout/page-shell/page-shell.component';
import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page/dashboard-page.component';
import { IncidentsPageComponent } from './features/incidents/pages/incidents-page/incidents-page.component';
import { SettingsPageComponent } from './features/settings/pages/settings-page/settings-page.component';

export const routes: Routes = [
  {
    path: '',
    component: PageShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: DashboardPageComponent
      },
      {
        path: 'incidents',
        component: IncidentsPageComponent
      },
      {
        path: 'settings',
        component: SettingsPageComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
