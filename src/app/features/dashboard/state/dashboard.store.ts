import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

import { IncidentsApiService } from '../../../shared/data-access/incidents-api.service';
import { Incident, IncidentSeverity, IncidentStatus } from '../../../shared/models/incident.model';
import { DashboardRecentIncident, DashboardSummaryMetric } from '../models/dashboard.model';

type DashboardState = {
  incidents: readonly Incident[];
  isLoading: boolean;
  hasLoaded: boolean;
};

const INITIAL_STATE: DashboardState = {
  incidents: [],
  isLoading: false,
  hasLoaded: false,
};

const LAST_7_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;

export const DashboardStore = signalStore(
  withState(INITIAL_STATE),
  withComputed(({ incidents }) => ({
    totalIncidents: computed(() => incidents().length),
    activeIncidents: computed(
      () =>
        incidents().filter(
          (incident) => incident.status === 'Open' || incident.status === 'Investigating',
        ).length,
    ),
    createdLast7Days: computed(() => {
      const now = Date.now();
      return incidents().filter(
        (incident) => now - new Date(incident.createdAt).getTime() <= LAST_7_DAYS_IN_MS,
      ).length;
    }),
    summaryMetrics: computed<readonly DashboardSummaryMetric[]>(() => [
      {
        label: 'Total incidents',
        value: String(incidents().length),
        hint: 'All incidents currently in the mock dataset.',
        tone: 'info',
      },
      {
        label: 'Active incidents',
        value: String(
          incidents().filter(
            (incident) => incident.status === 'Open' || incident.status === 'Investigating',
          ).length,
        ),
        hint: 'Incidents still requiring ongoing response attention.',
        tone: 'warning',
      },
      {
        label: 'Created in last 7 days',
        value: String(
          incidents().filter(
            (incident) => Date.now() - new Date(incident.createdAt).getTime() <= LAST_7_DAYS_IN_MS,
          ).length,
        ),
        hint: 'Recently generated incidents across the workspace.',
        tone: 'success',
      },
    ]),
    recentIncidents: computed<readonly DashboardRecentIncident[]>(() =>
      [...incidents()]
        .sort(
          (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
        )
        .slice(0, 5)
        .map((incident) => ({
          id: incident.id,
          title: incident.title,
          service: incident.service,
          owner: incident.owner,
          createdAt: incident.createdAt,
          severity: incident.severity,
          status: incident.status,
        })),
    ),
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
            isLoading: false,
          });
        },
        error: () => {
          patchState(store, { isLoading: false });
        },
      });
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
    },
  })),
);
