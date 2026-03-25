import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Incident } from '../models/incident.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentsApiService {
  private readonly httpClient = inject(HttpClient);

  public getIncidents() {
    return this.httpClient.get<readonly Incident[]>('assets/mock-data/incidents.json');
  }
}
