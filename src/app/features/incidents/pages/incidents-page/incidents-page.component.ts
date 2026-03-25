import { Component } from '@angular/core';

import { UiBadgeComponent } from '../../../../shared/ui/badge/badge.component';
import {
  UiTableCellDirective,
  UiTableComponent,
  UiTableHeadDirective,
  UiTableRowDirective
} from '../../../../shared/ui/table/table.component';

type IncidentListItem = {
  readonly title: string;
  readonly owner: string;
  readonly severity: 'High' | 'Medium';
  readonly status: 'Open' | 'Investigating' | 'Stable';
};

@Component({
  selector: 'app-incidents-page',
  standalone: true,
  imports: [
    UiBadgeComponent,
    UiTableCellDirective,
    UiTableComponent,
    UiTableHeadDirective,
    UiTableRowDirective
  ],
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
