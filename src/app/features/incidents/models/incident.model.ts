export type IncidentSeverity = 'Critical' | 'High' | 'Medium' | 'Low';

export type IncidentStatus = 'Open' | 'Investigating' | 'Mitigated' | 'Stable';

export interface IncidentNote {
  readonly id: string;
  readonly author: string;
  readonly createdAt: string;
  readonly body: string;
}

export interface IncidentTimelineEntry {
  readonly id: string;
  readonly actor: string;
  readonly createdAt: string;
  readonly title: string;
  readonly detail: string;
}

export interface Incident {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly description: string;
  readonly service: string;
  readonly owner: string;
  readonly channel: string;
  readonly severity: IncidentSeverity;
  readonly status: IncidentStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly notes: readonly IncidentNote[];
  readonly timeline: readonly IncidentTimelineEntry[];
}

export interface CreateIncidentInput {
  title: string;
  summary: string;
  description: string;
  service: string;
  owner: string;
  channel: string;
  severity: IncidentSeverity;
}
