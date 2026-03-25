import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { UiBadgeComponent } from '../../../../shared/ui/badge/badge.component';
import { UiButtonComponent } from '../../../../shared/ui/button/button.component';
import {
  UiTableCellDirective,
  UiTableComponent,
  UiTableHeadDirective,
  UiTableRowDirective
} from '../../../../shared/ui/table/table.component';
import { IncidentSeverity, IncidentStatus } from '../../../../shared/models/incident.model';
import { IncidentsStore } from '../../state/incidents.store';

@Component({
  selector: 'app-incidents-page',
  standalone: true,
  imports: [
    DatePipe,
    UiBadgeComponent,
    UiButtonComponent,
    UiTableCellDirective,
    UiTableComponent,
    UiTableHeadDirective,
    UiTableRowDirective
  ],
  templateUrl: './incidents-page.component.html',
  styleUrl: './incidents-page.component.scss'
})
export class IncidentsPageComponent {
  private readonly router = inject(Router);
  private readonly incidentsStore = inject(IncidentsStore);

  protected readonly incidents = this.incidentsStore.incidents;
  protected readonly isLoading = this.incidentsStore.isLoading;
  protected readonly totalIncidents = this.incidentsStore.totalIncidents;

  public constructor() {
    this.incidentsStore.load();
  }

  protected openIncident(incidentId: string): void {
    void this.router.navigate(['/incidents', incidentId]);
  }

  protected goToCreateIncident(): void {
    void this.router.navigate(['/incidents/new']);
  }

  protected severityTone(severity: IncidentSeverity) {
    return this.incidentsStore.severityTone(severity);
  }

  protected statusTone(status: IncidentStatus) {
    return this.incidentsStore.statusTone(status);
  }
}
