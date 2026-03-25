import { Injectable, computed, inject, signal } from '@angular/core';

import { CreateIncidentInput, Incident, IncidentSeverity, IncidentStatus } from '../models/incident.model';
import { IncidentsApiService } from '../data-access/incidents-api.service';

@Injectable()
export class IncidentsService {
  private readonly incidentsApiService = inject(IncidentsApiService);

  private readonly incidentsState = signal<readonly Incident[]>([]);
  private readonly loadingState = signal(false);
  private readonly loadedState = signal(false);

  public readonly incidents = this.incidentsState.asReadonly();
  public readonly isLoading = this.loadingState.asReadonly();
  public readonly hasLoaded = this.loadedState.asReadonly();
  public readonly totalIncidents = computed(() => this.incidents().length);

  public load(): void {
    if (this.loadingState() || this.loadedState()) {
      return;
    }

    this.loadingState.set(true);

    this.incidentsApiService.getIncidents().subscribe({
      next: (incidents) => {
        this.incidentsState.set(incidents);
        this.loadedState.set(true);
        this.loadingState.set(false);
      },
      error: () => {
        this.loadingState.set(false);
      }
    });
  }

  public createIncident(input: CreateIncidentInput): Incident {
    const now = new Date().toISOString();
    const incident: Incident = {
      id: this.buildId(input.title),
      title: input.title,
      summary: input.summary,
      description: input.description,
      service: input.service,
      owner: input.owner,
      channel: input.channel,
      severity: input.severity,
      status: 'Open',
      createdAt: now,
      updatedAt: now,
      notes: [
        {
          id: 'note-initial',
          author: input.owner,
          createdAt: now,
          body: 'Incident created from the frontend mock workflow.'
        }
      ],
      timeline: [
        {
          id: 'timeline-created',
          actor: input.owner,
          createdAt: now,
          title: 'Incident opened',
          detail: `Initial incident created in ${input.channel}.`
        }
      ]
    };

    this.incidentsState.update((incidents) => [incident, ...incidents]);
    this.loadedState.set(true);

    return incident;
  }

  public severityTone(severity: IncidentSeverity): 'danger' | 'warning' | 'neutral' {
    if (severity === 'Critical' || severity === 'High') {
      return 'danger';
    }

    if (severity === 'Medium') {
      return 'warning';
    }

    return 'neutral';
  }

  public statusTone(status: IncidentStatus): 'warning' | 'info' | 'success' {
    if (status === 'Open') {
      return 'warning';
    }

    if (status === 'Investigating') {
      return 'info';
    }

    return 'success';
  }

  private buildId(title: string): string {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48);

    return `${slug || 'incident'}-${this.incidents().length + 1}`;
  }
}
