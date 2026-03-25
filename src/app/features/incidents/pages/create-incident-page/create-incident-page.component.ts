import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { UiButtonComponent } from '../../../../shared/ui/button/button.component';
import { UiCardComponent } from '../../../../shared/ui/card/card.component';
import { UiInputComponent } from '../../../../shared/ui/input/input.component';
import { CreateIncidentInput, IncidentSeverity } from '../../models/incident.model';
import { IncidentsService } from '../../services/incidents.service';

type CreateIncidentFormModel = CreateIncidentInput;

@Component({
  selector: 'app-create-incident-page',
  standalone: true,
  imports: [FormsModule, RouterLink, UiButtonComponent, UiCardComponent, UiInputComponent],
  templateUrl: './create-incident-page.component.html',
  styleUrl: './create-incident-page.component.scss'
})
export class CreateIncidentPageComponent {
  private readonly router = inject(Router);
  private readonly incidentsService = inject(IncidentsService);

  protected readonly severityOptions: readonly IncidentSeverity[] = [
    'Critical',
    'High',
    'Medium',
    'Low'
  ];

  protected readonly model: CreateIncidentFormModel = {
    title: '',
    summary: '',
    description: '',
    service: '',
    owner: '',
    channel: 'Slack #incident-room',
    severity: 'High'
  };

  protected showValidation = false;

  public constructor() {
    this.incidentsService.load();
  }

  protected submit(): void {
    this.showValidation = true;

    if (!this.isValid()) {
      return;
    }

    const incident = this.incidentsService.createIncident({
      title: this.model.title.trim(),
      summary: this.model.summary.trim(),
      description: this.model.description.trim(),
      service: this.model.service.trim(),
      owner: this.model.owner.trim(),
      channel: this.model.channel.trim(),
      severity: this.model.severity
    });

    void this.router.navigate(['/incidents', incident.id]);
  }

  private isValid(): boolean {
    return Boolean(
      this.model.title.trim() &&
        this.model.summary.trim() &&
        this.model.description.trim() &&
        this.model.service.trim() &&
        this.model.owner.trim() &&
        this.model.channel.trim()
    );
  }
}
