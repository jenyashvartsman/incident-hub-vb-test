import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextTextFieldId = 0;

@Component({
  selector: 'app-input-field-text',
  standalone: true,
  templateUrl: './input-field-text.component.html',
  styleUrl: './input-field-text.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiInputFieldTextComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiInputFieldTextComponent implements ControlValueAccessor {
  @Input() public label = '';
  @Input() public placeholder = '';
  @Input() public hint = '';
  @Input() public name = '';
  @Input() public type: 'text' | 'email' | 'password' | 'search' | 'number' = 'text';
  @Input() public autocomplete = 'off';
  @Input() public readonly = false;
  @Input() public required = false;
  @Input() public multiline = false;
  @Input() public rows = 4;
  @Input() public set id(value: string) {
    this.inputId = value || this.defaultId;
  }

  @Output() public readonly valueChange = new EventEmitter<string>();

  public value = '';
  public disabled = false;
  protected inputId = '';

  private readonly defaultId = `ui-input-field-text-${nextTextFieldId++}`;
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
    const nextValue = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
    this.value = nextValue;
    this.onChange(nextValue);
    this.valueChange.emit(nextValue);
  }

  protected handleBlur(): void {
    this.onTouched();
  }
}
