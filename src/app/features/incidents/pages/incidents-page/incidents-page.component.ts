import { Component } from '@angular/core';

type IncidentListItem = {
  readonly title: string;
  readonly owner: string;
  readonly severity: 'High' | 'Medium';
  readonly status: 'Open' | 'Investigating' | 'Stable';
};

@Component({
  selector: 'app-incidents-page',
  standalone: true,
  templateUrl: './incidents-page.component.html',
  styleUrl: './incidents-page.component.scss'
})
export class IncidentsPageComponent {
  protected readonly incidents: readonly IncidentListItem[] = [
    {
      title: 'API latency spike',
      owner: 'Platform',
      severity: 'High',
      status: 'Investigating'
    },
    {
      title: 'Webhook retries delayed',
      owner: 'Integrations',
      severity: 'Medium',
      status: 'Open'
    },
    {
      title: 'Status page stale cache',
      owner: 'Infrastructure',
      severity: 'Medium',
      status: 'Stable'
    }
  ];
}
