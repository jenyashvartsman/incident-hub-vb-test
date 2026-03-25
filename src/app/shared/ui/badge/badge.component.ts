import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiBadgeComponent {
  @Input() public tone: 'neutral' | 'info' | 'success' | 'warning' | 'danger' = 'neutral';
}
