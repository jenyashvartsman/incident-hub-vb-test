import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { UiBadgeComponent } from '../../../../shared/ui/badge/badge.component';
import { UiButtonComponent } from '../../../../shared/ui/button/button.component';
import { UiCardComponent } from '../../../../shared/ui/card/card.component';
import { IncidentSeverity, IncidentStatus } from '../../models/incident.model';
import { IncidentsService } from '../../services/incidents.service';

@Component({
  selector: 'app-incident-detail-page',
  standalone: true,
  imports: [DatePipe, RouterLink, UiBadgeComponent, UiButtonComponent, UiCardComponent],
  templateUrl: './incident-detail-page.component.html',
  styleUrl: './incident-detail-page.component.scss'
})
export class IncidentDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly incidentsService = inject(IncidentsService);

  protected readonly hasLoaded = this.incidentsService.hasLoaded;
  protected readonly isLoading = this.incidentsService.isLoading;
  private readonly incidentId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('incidentId') ?? '')),
    { initialValue: '' }
  );

  protected readonly incident = computed(() => {
    const incidentId = this.incidentId();
    return this.incidentsService.incidents().find((entry) => entry.id === incidentId);
  });

  public constructor() {
    this.incidentsService.load();
  }

  protected severityTone(severity: IncidentSeverity) {
    return this.incidentsService.severityTone(severity);
  }

  protected statusTone(status: IncidentStatus) {
    return this.incidentsService.statusTone(status);
  }

  protected goToCreateIncident(): void {
    void this.router.navigate(['/incidents/new']);
  }
}
