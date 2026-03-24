import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

type ShellNavItem = {
  readonly label: string;
  readonly path: string;
};

@Component({
  selector: 'app-page-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './page-shell.component.html',
  styleUrl: './page-shell.component.scss'
})
export class PageShellComponent {
  protected readonly navItems: readonly ShellNavItem[] = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Incidents', path: '/incidents' },
    { label: 'Settings', path: '/settings' }
  ];
}
