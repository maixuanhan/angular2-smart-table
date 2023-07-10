import {Column} from './column';
import {Row} from './row';

export class Cell {

  newValue: string;
  private cachedValue: string;
  private cachedPreparedValue: string;

  constructor(protected value: string, protected row: Row, protected column: Column) {
    this.newValue = value;
    this.cachedValue = value;
    this.cachedPreparedValue = this.getPreparedValue();
  }

  getColumn(): Column {
    return this.column;
  }

  getRow(): Row {
    return this.row;
  }

  /**
   * Gets the value (after post-processing with valuePrepareFunction).
   */
  getValue(): string {
    if (this.cachedValue === this.value) return this.cachedPreparedValue;
    this.cachedPreparedValue = this.getPreparedValue();
    this.cachedValue = this.value;
    return this.cachedPreparedValue;
  }

  protected getPreparedValue(): string {
    const prepare = this.column.valuePrepareFunction ?? ((v) => v);
    return prepare.call(null, this.value, this);
  }

  /**
   * Returns the raw value that has not been post-processed by the valuePrepareFunction.
   */
  getRawValue(): string {
    return this.value;
  }

  setValue(value: string) {
    this.newValue = value;
  }

  getId(): string {
    return this.getColumn().id;
  }

  getTitle(): string {
    return this.getColumn().title;
  }

  isEditable(): boolean {
    if (this.getRow().index === -1) {
      return this.getColumn().isAddable ?? false;
    }
    else {
      return this.getColumn().isEditable ?? false;
    }
  }

  resetValue(): void {
    this.newValue = this.getRawValue();
  }
}
