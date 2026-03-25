import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiButtonComponent {
  @Input() public variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  @Input() public size: 'sm' | 'md' = 'md';
  @Input() public type: 'button' | 'submit' | 'reset' = 'button';
  @Input() public disabled = false;
  @Input() public fullWidth = false;
}
