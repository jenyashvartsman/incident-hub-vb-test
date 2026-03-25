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
import { IncidentSeverity, IncidentStatus } from '../../models/incident.model';
import { IncidentsService } from '../../services/incidents.service';

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
  private readonly incidentsService = inject(IncidentsService);

  protected readonly incidents = this.incidentsService.incidents;
  protected readonly isLoading = this.incidentsService.isLoading;
  protected readonly totalIncidents = this.incidentsService.totalIncidents;

  public constructor() {
    this.incidentsService.load();
  }

  protected openIncident(incidentId: string): void {
    void this.router.navigate(['/incidents', incidentId]);
  }

  protected goToCreateIncident(): void {
    void this.router.navigate(['/incidents/new']);
  }

  protected severityTone(severity: IncidentSeverity) {
    return this.incidentsService.severityTone(severity);
  }

  protected statusTone(status: IncidentStatus) {
    return this.incidentsService.statusTone(status);
  }
}
