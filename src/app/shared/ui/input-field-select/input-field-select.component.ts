import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type UiSelectOption = {
  readonly label: string;
  readonly value: string;
};

let nextSelectFieldId = 0;

@Component({
  selector: 'app-input-field-select',
  standalone: true,
  templateUrl: './input-field-select.component.html',
  styleUrl: './input-field-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiInputFieldSelectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiInputFieldSelectComponent implements ControlValueAccessor {
  @Input() public label = '';
  @Input() public hint = '';
  @Input() public name = '';
  @Input() public required = false;
  @Input() public options: readonly UiSelectOption[] = [];
  @Input() public set id(value: string) {
    this.inputId = value || this.defaultId;
  }

  @Output() public readonly valueChange = new EventEmitter<string>();

  public value = '';
  public disabled = false;
  protected inputId = '';

  private readonly defaultId = `ui-input-field-select-${nextSelectFieldId++}`;
  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  public constructor() {
    this.inputId = this.defaultId;
  }

  public writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  protected handleChange(event: Event): void {
    const nextValue = (event.target as HTMLSelectElement).value;
    this.value = nextValue;
    this.onChange(nextValue);
    this.valueChange.emit(nextValue);
  }

  protected handleBlur(): void {
    this.onTouched();
  }
}
