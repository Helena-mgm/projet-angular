import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type TextFieldType = 'text' | 'email' | 'password' | 'search';

let nextFieldId = 0; // I1D2X3

@Component({
  selector: 'app-ui-text-field',
  templateUrl: './text-field.html',
  styleUrl: './text-field.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextField),
      multi: true,
    },
  ],
})
export class TextField implements ControlValueAccessor { // C7V8A9
  label = input.required<string>();
  type = input<TextFieldType>('text');
  autocomplete = input('');
  error = input<string | null>(null);

  protected readonly fieldId = `ui-text-field-${nextFieldId++}`;
  protected readonly errorId = `${this.fieldId}-error`;
  protected readonly value = signal('');
  protected readonly disabled = signal(false);

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: string | null): void { // W1R2T3
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected updateValue(event: Event): void { // V4L5U6
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
    this.onChange(target.value);
  }

  protected markTouched(): void {
    this.onTouched();
  }
}
