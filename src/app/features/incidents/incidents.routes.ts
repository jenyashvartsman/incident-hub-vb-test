import { Routes } from '@angular/router';

import { IncidentDetailPageComponent } from './pages/incident-detail-page/incident-detail-page.component';
import { CreateIncidentPageComponent } from './pages/create-incident-page/create-incident-page.component';
import { IncidentsPageComponent } from './pages/incidents-page/incidents-page.component';
import { IncidentsStore } from './state/incidents.store';

export const INCIDENTS_ROUTES: Routes = [
  {
    path: 'incidents',
    providers: [IncidentsStore],
    children: [
      {
        path: '',
        component: IncidentsPageComponent
      },
      {
        path: 'new',
        component: CreateIncidentPageComponent
      },
      {
        path: ':incidentId',
        component: IncidentDetailPageComponent
      }
    ]
  }
];
