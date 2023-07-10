import {Cell} from "./data-set/cell";
import {Row} from "./data-set/row";
import {ViewCell} from "../components/cell/cell-view-mode/view-cell";

export interface Settings {
  columns: IColumns;
  resizable?: boolean;
  hideable?: boolean;
  mode?: 'external' | 'inline';
  hideHeader?: boolean;
  hideSubHeader?: boolean;
  noDataMessage?: string;
  attr?: Attribute;
  actions?: Actions | false;
  edit?: EditAction;
  add?: AddAction;
  delete?: DeleteAction;
  filter?: Filter;
  expand?: Expand;
  pager?: Pager;
  rowClassFunction?: RowClassFunction;
  selectMode?: 'single' | 'multi' | 'multi_filtered';
  switchPageToSelectedRowPage?: boolean;
}

export interface Filter {
  inputClass?: string;
}

export interface Expand {
  /**
   * The angular component that shall be rendered when the row is expanded.
   * The data of the row is assigned to a property rowData.
   */
  component?: any;
  /**
   * The content of the expand button.
   * This can be HTML or even SVG - see the sanitizer property.
   */
  buttonContent?: string;
  hiddenWhen?: (row: Row) => boolean;
  disabledWhen?: (row: Row) => boolean;
  /**
   * Configures the sanitizer to allow HTML or SVG content in the button.
   */
  sanitizer?: SanitizerSettings;
}

export interface IColumns {
  [key: string]: IColumn;
}

export type IColumnType = 'text' | 'html' | 'custom';

export type ISortDirection = 'asc' | 'desc' | null; // null means: do not sort

export type RowClassFunction = (row: Row) => string;
export type ColumnCompareFunction = (direction: number, left: any, right: any) => number;
export type ColumnValuePrepareFunction = (rawValue: string, cell: Cell) => string;
export type ColumnFilterFunction = (cellValue: any, searchString: string, allData: any, cellName: string, rowData: any) => boolean;
export type ColumnComponentInitFunction = (component: any, cell: ViewCell) => void;

export interface SanitizerSettings {
  /**
   * Set this to true to bypass the sanitizer for HTML content.
   * Security note: do not use this, if the content can be controlled by the user!
   */
  bypassHtml?: boolean;
}

export interface TextEditorSettings {
  disableEnterKeySave?: boolean;
}

export interface ListEditorSettings {
  disableEnterKeySave?: boolean;
  list: { title: string; value: string; }[];
}

export interface CheckboxEditorSettings {
  "true": string;
  "false": string;
}

export interface ListFilterSettings {
  list: { title: string; value: string; }[];
  selectText?: string;
  strict?: boolean;
}

export interface CheckboxFilterSettings {
  "true": string;
  "false": string;
  resetText: string;
}

export interface EditorSettings {
  type: 'text' | 'textarea' | 'list' | 'checkbox' | 'custom';
  config?: TextEditorSettings | ListEditorSettings | CheckboxEditorSettings;
  component?: any;
}

export interface FilterSettings {
  type: 'text' | 'list' | 'checkbox' | 'custom';
  config?: ListFilterSettings | CheckboxFilterSettings;
  component?: any;
}

export interface IColumn {
  title?: string;
  type?: IColumnType;
  sanitizer?: SanitizerSettings;
  classHeader?: string;
  classContent?: string;
  class?: string;
  width?: string;
  sortDirection?: ISortDirection;
  defaultSortDirection?: ISortDirection;
  editor?: EditorSettings;
  filter?: FilterSettings;
  renderComponent?: any;
  compareFunction?: ColumnCompareFunction;
  valuePrepareFunction?: ColumnValuePrepareFunction;
  filterFunction?: ColumnFilterFunction;
  onComponentInitFunction?: ColumnComponentInitFunction;

  placeholder?: string;
  hide?: boolean;
  isSortable?: boolean;
  isEditable?: boolean;
  isAddable?: boolean;
  isFilterable?: boolean;
}

export interface Attribute {
  id?: string;
  class?: string;
}

export interface Actions {
  columnTitle?: string;
  add?: boolean;
  edit?: boolean;
  delete?: boolean;
  position?: 'left' | 'right';
  custom?: CustomAction[];
}

export interface AddAction {
  inputClass?: string;
  sanitizer?: SanitizerSettings;
  hiddenWhen?: () => boolean;
  disabledWhen?: () => boolean;
  addButtonContent?: string;
  createButtonContent?: string;
  cancelButtonContent?: string;
  confirmCreate?: boolean;
}

export interface EditAction {
  inputClass?: string;
  sanitizer?: SanitizerSettings;
  hiddenWhen?: (row: Row) => boolean;
  disabledWhen?: (row: Row) => boolean;
  editButtonContent?: string;
  saveButtonContent?: string;
  cancelButtonContent?: string;
  confirmSave?: boolean;
}

export interface DeleteAction {
  sanitizer?: SanitizerSettings;
  hiddenWhen?: (row: Row) => boolean;
  disabledWhen?: (row: Row) => boolean;
  deleteButtonContent?: string;
  confirmDelete?: boolean;
}

export interface Pager {
  page?: number;
  display?: boolean;
  perPage?: number;
  perPageSelect?: number[];
  perPageSelectLabel?: string;
}

export interface CustomAction {
  name: string;
  title?: string;
  customButtonContent?: string;
  sanitizer?: SanitizerSettings;
  hiddenWhen?: (row: Row) => boolean;
  disabledWhen?: (row: Row) => boolean;
  renderComponent?: any;
}
