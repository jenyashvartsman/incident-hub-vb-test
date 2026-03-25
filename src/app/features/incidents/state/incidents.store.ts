import { computed, inject, Signal } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

import {
  CreateIncidentInput,
  Incident,
  IncidentSeverity,
  IncidentStatus
} from '../models/incident.model';
import { IncidentsApiService } from '../data-access/incidents-api.service';

type IncidentsState = {
  incidents: readonly Incident[];
  isLoading: boolean;
  hasLoaded: boolean;
};

const initialState: IncidentsState = {
  incidents: [],
  isLoading: false,
  hasLoaded: false
};

export const IncidentsStore = signalStore(
  withState(initialState),
  withComputed(({ incidents }) => ({
    totalIncidents: computed(() => incidents().length)
  })),
  withMethods((store, incidentsApiService = inject(IncidentsApiService)) => ({
    load(): void {
      if (store.isLoading() || store.hasLoaded()) {
        return;
      }

      patchState(store, { isLoading: true });

      incidentsApiService.getIncidents().subscribe({
        next: (incidents) => {
          patchState(store, {
            incidents,
            hasLoaded: true,
            isLoading: false
          });
        },
        error: () => {
          patchState(store, { isLoading: false });
        }
      });
    },
    createIncident(input: CreateIncidentInput): Incident {
      const now = new Date().toISOString();
      const incident: Incident = {
        id: buildId(input.title, store.incidents()),
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

      patchState(store, (state) => ({
        incidents: [incident, ...state.incidents],
        hasLoaded: true
      }));

      return incident;
    },
    incidentById(incidentId: Signal<string>) {
      return computed(() => store.incidents().find((incident) => incident.id === incidentId()));
    },
    severityTone(severity: IncidentSeverity): 'danger' | 'warning' | 'neutral' {
      if (severity === 'Critical' || severity === 'High') {
        return 'danger';
      }

      if (severity === 'Medium') {
        return 'warning';
      }

      return 'neutral';
    },
    statusTone(status: IncidentStatus): 'warning' | 'info' | 'success' {
      if (status === 'Open') {
        return 'warning';
      }

      if (status === 'Investigating') {
        return 'info';
      }

      return 'success';
    }
  }))
);

function buildId(title: string, incidents: readonly Incident[]): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);

  return `${slug || 'incident'}-${incidents.length + 1}`;
}
