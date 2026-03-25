import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

type ShellNavItem = {
  readonly label: string;
  readonly path: string;
};

type ThemeOption = {
  readonly label: string;
  readonly value: 'dark' | 'light';
};

@Component({
  selector: 'app-page-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './page-shell.component.html',
  styleUrl: './page-shell.component.scss'
})
export class PageShellComponent {
  protected readonly themeOptions: readonly ThemeOption[] = [
    { label: 'Dark', value: 'dark' },
    { label: 'Light', value: 'light' }
  ];
  protected readonly navItems: readonly ShellNavItem[] = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Incidents', path: '/incidents' },
    { label: 'Settings', path: '/settings' }
  ];
  protected readonly activeTheme = signal<'dark' | 'light'>(this.resolveInitialTheme());

  public constructor() {
    this.applyTheme(this.activeTheme());
  }

  protected setTheme(theme: 'dark' | 'light'): void {
    if (theme === this.activeTheme()) {
      return;
    }

    this.activeTheme.set(theme);
    this.applyTheme(theme);
  }

  private applyTheme(theme: 'dark' | 'light'): void {
    document.documentElement.dataset['theme'] = theme;
    localStorage.setItem('incident-hub-theme', theme);
  }

  private resolveInitialTheme(): 'dark' | 'light' {
    const storedTheme = localStorage.getItem('incident-hub-theme');

    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
}
