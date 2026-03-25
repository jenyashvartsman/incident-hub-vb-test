import { Component } from '@angular/core';

import { UiBadgeComponent } from '../../../../shared/ui/badge/badge.component';
import { UiCardComponent } from '../../../../shared/ui/card/card.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [UiBadgeComponent, UiCardComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {}
