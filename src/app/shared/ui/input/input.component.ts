import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextInputId = 0;

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiInputComponent implements ControlValueAccessor {
  @Input() public label = '';
  @Input() public placeholder = '';
  @Input() public hint = '';
  @Input() public type: 'text' | 'email' | 'password' | 'search' | 'number' = 'text';
  @Input() public autocomplete = 'off';
  @Input() public readonly = false;
  @Input() public required = false;
  @Input() public set id(value: string) {
    this.inputId = value || this.defaultId;
  }

  @Output() public readonly valueChange = new EventEmitter<string>();

  public value = '';
  public disabled = false;
  protected inputId = '';

  private readonly defaultId = `ui-input-${nextInputId++}`;
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

  protected handleInput(event: Event): void {
    const nextValue = (event.target as HTMLInputElement).value;
    this.value = nextValue;
    this.onChange(nextValue);
    this.valueChange.emit(nextValue);
  }

  protected handleBlur(): void {
    this.onTouched();
  }
}
