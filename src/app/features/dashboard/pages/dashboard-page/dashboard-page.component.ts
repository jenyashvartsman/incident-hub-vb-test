import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { UiBadgeComponent } from '../../../../shared/ui/badge/badge.component';
import { UiCardComponent } from '../../../../shared/ui/card/card.component';
import {
  UiTableCellDirective,
  UiTableComponent,
  UiTableHeadDirective,
  UiTableRowDirective
} from '../../../../shared/ui/table/table.component';
import { IncidentSeverity, IncidentStatus } from '../../../../shared/models/incident.model';
import { DashboardStore } from '../../state/dashboard.store';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    DatePipe,
    UiBadgeComponent,
    UiCardComponent,
    UiTableCellDirective,
    UiTableComponent,
    UiTableHeadDirective,
    UiTableRowDirective
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {
  private readonly router = inject(Router);
  private readonly dashboardStore = inject(DashboardStore);

  protected readonly isLoading = this.dashboardStore.isLoading;
  protected readonly summaryMetrics = this.dashboardStore.summaryMetrics;
  protected readonly recentIncidents = this.dashboardStore.recentIncidents;

  public constructor() {
    this.dashboardStore.load();
  }

  protected openIncident(incidentId: string): void {
    void this.router.navigate(['/incidents', incidentId]);
  }

  protected severityTone(severity: IncidentSeverity) {
    return this.dashboardStore.severityTone(severity);
  }

  protected statusTone(status: IncidentStatus) {
    return this.dashboardStore.statusTone(status);
  }
}
