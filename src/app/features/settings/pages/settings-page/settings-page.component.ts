import { Component } from '@angular/core';
import { UiCardComponent } from '../../../../shared/ui/card/card.component';
import { UiBadgeComponent } from '../../../../shared/ui/badge/badge.component';

@Component({
  selector: 'app-settings-page',
  imports: [UiBadgeComponent, UiCardComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  protected routingChannel = 'Email + Slack';
  protected escalationAlias = 'primary-oncall';
}
