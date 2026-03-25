import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  HostBinding,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Directive({
  selector: '[uiTableHead]',
  standalone: true
})
export class UiTableHeadDirective {
  @HostBinding('class.ui-table__head')
  protected readonly hostClass = true;
}

@Directive({
  selector: '[uiTableRow]',
  standalone: true
})
export class UiTableRowDirective {
  @HostBinding('class.ui-table__row')
  protected readonly hostClass = true;
}

@Directive({
  selector: '[uiTableCell]',
  standalone: true
})
export class UiTableCellDirective {
  @HostBinding('class.ui-table__cell')
  protected readonly hostClass = true;

  @Input() public label = '';

  @HostBinding('attr.data-label')
  protected get dataLabel(): string | null {
    return this.label || null;
  }
}

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiTableComponent {
  @Input() public columns = '1fr';

  @HostBinding('style.--ui-table-columns')
  protected get tableColumns(): string {
    return this.columns;
  }
}
