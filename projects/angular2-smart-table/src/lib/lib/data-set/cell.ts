import {Column} from './column';
import {Row} from './row';

export class Cell {

  private cachedValue: unknown;
  private cachedPreparedValue: string;

  private newValue: string;

  constructor(protected value: unknown, protected row: Row, protected column: Column) {
    this.cachedValue = this.value;
    this.cachedPreparedValue = this.getPreparedValue();
    this.newValue = this.cachedPreparedValue;
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
    const prepare = this.column.valuePrepareFunction ?? ((v) => (v?.toString()??''));
    return prepare.call(null, this.value, this);
  }

  /**
   * Returns the raw value that has not been post-processed by the valuePrepareFunction.
   */
  getRawValue(): unknown {
    return this.value;
  }

  setValue(value: string) {
    const store = this.column.valueStoreFunction ?? ((v) => v);
    this.newValue = store.call(null, value, this);
  }

  /**
   * Returns the new raw value after being post-processed by the valueStoreFunction.
   */
  getNewRawValue(): any {
    return this.newValue;
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
    this.cachedValue = this.value;
    this.cachedPreparedValue = this.getPreparedValue();
    this.newValue = this.cachedPreparedValue;
  }
}
