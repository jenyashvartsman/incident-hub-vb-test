import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { UiButtonComponent } from '../../../../shared/ui/button/button.component';
import { UiCardComponent } from '../../../../shared/ui/card/card.component';
import {
  UiInputFieldSelectComponent,
  UiSelectOption
} from '../../../../shared/ui/input-field-select/input-field-select.component';
import { UiInputFieldTextComponent } from '../../../../shared/ui/input-field-text/input-field-text.component';
import { IncidentSeverity } from '../../models/incident.model';
import { IncidentsStore } from '../../state/incidents.store';

@Component({
  selector: 'app-create-incident-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    UiButtonComponent,
    UiCardComponent,
    UiInputFieldSelectComponent,
    UiInputFieldTextComponent
  ],
  templateUrl: './create-incident-page.component.html',
  styleUrl: './create-incident-page.component.scss'
})
export class CreateIncidentPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly incidentsStore = inject(IncidentsStore);

  protected readonly severityOptions: readonly UiSelectOption[] = [
    { label: 'Critical', value: 'Critical' },
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' }
  ];

  protected readonly form = this.formBuilder.nonNullable.group({
    title: ['', Validators.required],
    summary: ['', Validators.required],
    description: ['', Validators.required],
    service: ['', Validators.required],
    owner: ['', Validators.required],
    channel: ['Slack #incident-room', Validators.required],
    severity: ['High' as IncidentSeverity, Validators.required]
  });

  public constructor() {
    this.incidentsStore.load();
  }

  protected submit(): void {
    this.form.markAllAsTouched();
    this.markAllAsDirty();

    if (this.form.invalid) {
      return;
    }

    const value = this.form.getRawValue();
    const incident = this.incidentsStore.createIncident({
      title: value.title.trim(),
      summary: value.summary.trim(),
      description: value.description.trim(),
      service: value.service.trim(),
      owner: value.owner.trim(),
      channel: value.channel.trim(),
      severity: value.severity
    });

    void this.router.navigate(['/incidents', incident.id]);
  }

  private markAllAsDirty(): void {
    Object.values(this.form.controls).forEach((control) => control.markAsDirty());
  }
}
