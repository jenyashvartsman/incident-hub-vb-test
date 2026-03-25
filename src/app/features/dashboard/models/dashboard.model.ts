import { IncidentSeverity, IncidentStatus } from '../../../shared/models/incident.model';

export interface DashboardSummaryMetric {
  readonly label: string;
  readonly value: string;
  readonly hint: string;
  readonly tone: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
}

export interface DashboardRecentIncident {
  readonly id: string;
  readonly title: string;
  readonly service: string;
  readonly owner: string;
  readonly createdAt: string;
  readonly severity: IncidentSeverity;
  readonly status: IncidentStatus;
}
